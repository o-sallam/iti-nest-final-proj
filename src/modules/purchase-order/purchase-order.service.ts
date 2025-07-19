

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Supplier } from '../supplier/entities/supplier.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum'; 
import { Inventory } from '../inventory/inventory.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
     @InjectRepository(Inventory)
        private readonly inventoryRepo: Repository<Inventory>,
        @InjectRepository(Warehouse)
  private   readonly warehouseRepo: Repository<Warehouse>,
  ) {}

 /* async findAll(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.find({
      relations: ['supplier'], 
    });
  }*/


async create(createDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
  const supplier = await this.supplierRepository.findOne({
    where: { id: createDto.supplierId },
  });

  if (!supplier) {
    throw new NotFoundException(`Supplier with ID ${createDto.supplierId} not found`);
  }

  const remainingAmount = createDto.totalAmount - createDto.paidAmount;
  if (remainingAmount !== 0) {
    supplier.accountBalance += remainingAmount;
    await this.supplierRepository.save(supplier);
  }

  const newOrder = this.purchaseOrderRepository.create({
    ...createDto,
    supplier,
  });
  const savedOrder = await this.purchaseOrderRepository.save(newOrder);

  for (const item of createDto.items) {
    const { productId, warehouseId, quantity } = item;

    const warehouse = await this.warehouseRepo.findOne({
      where: { id: warehouseId },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${warehouseId} not found`);
    }

    let inventory = await this.inventoryRepo.findOne({
      where: { productId, warehouseId },
    });

    if (inventory) {
      inventory.quantity += quantity;
    } else {
      inventory = this.inventoryRepo.create({
        productId,
        warehouseId,
        quantity,
        warehouse,
        product: { id: productId } as any, 
      });
    }

    await this.inventoryRepo.save(inventory);
  }

  return savedOrder;
}




 async findAll(params: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{
  data: PurchaseOrder[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  const { search = '', status = 'all', page = 1, limit = 10 } = params;

  const skip = (page - 1) * limit;

  const query = this.purchaseOrderRepository
    .createQueryBuilder('purchaseOrder')
    .leftJoinAndSelect('purchaseOrder.supplier', 'supplier');

  if (search) {
    query.andWhere(
      '(LOWER(purchaseOrder.invoiceNumber) LIKE :search OR LOWER(supplier.name) LIKE :search)',
      { search: `%${search.toLowerCase()}%` },
    );
  }

  // فلترة حسب الحالة
  if (status !== 'all') {
    query.andWhere('purchaseOrder.status = :status', { status });
  }

  const [data, total] = await query
    .skip(skip)
    .take(limit)
    .orderBy('purchaseOrder.orderDate', 'DESC')
    .getManyAndCount();

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    totalPages,
    page,
    limit,
  };
}

async getInvoiceStats() {
  const [paid, pending, overdue,cancelled, total] = await Promise.all([
    this.purchaseOrderRepository.count({ where: { status: OrderStatus.PAID } }),
    this.purchaseOrderRepository.count({ where: { status: OrderStatus.PENDING } }),
    this.purchaseOrderRepository.count({ where: { status: OrderStatus.OVERDUE } }),
        this.purchaseOrderRepository.count({ where: { status:  OrderStatus.CANCELLED } }),

    this.purchaseOrderRepository.count(),
  ]);

  return { paid, pending, overdue,cancelled,  total };
}


  async findOne(id: number): Promise<PurchaseOrder> {
    const order = await this.purchaseOrderRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });

    if (!order) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    const order = await this.findOne(id);

    Object.assign(order, updateDto);

    return this.purchaseOrderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const result = await this.purchaseOrderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
  }

  async updateStatus(id: number,  status: OrderStatus) {
    const order = await this.findOne(id);
    order.status = status;
    return this.purchaseOrderRepository.save(order);
  }
}
