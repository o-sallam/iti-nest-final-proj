

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    const supplier = await this.supplierRepository.findOne({
      where: { id: createDto.supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${createDto.supplierId} not found`);
    }

    const newOrder = this.purchaseOrderRepository.create({
      ...createDto,
      supplier,
    });

    return await this.purchaseOrderRepository.save(newOrder);
  }

  async findAll(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.find({
      relations: ['supplier'], 
    });
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

  async updateStatus(id: number, status: 'PENDING' | 'RECEIVED') {
    const order = await this.findOne(id);
    order.status = status;
    return this.purchaseOrderRepository.save(order);
  }
}
