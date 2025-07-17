import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleInvoice } from './saleinvoice.entity';
import { SaleInvoiceItem } from './saleinvoice-item.entity';
import { Client } from '../client/client.entity';
import { CreateSaleInvoiceDto } from './saleinvoice.dto';

@Injectable()
export class SaleInvoiceService {
  constructor(
    @InjectRepository(SaleInvoice)
    private readonly SaleInvoiceRepo: Repository<SaleInvoice>,
    @InjectRepository(SaleInvoiceItem)
    private readonly SaleInvoiceItemRepo: Repository<SaleInvoiceItem>,
    @InjectRepository(Client)
    private readonly ClientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateSaleInvoiceDto) {
    // Get client and calculate old balance
    const client = await this.ClientRepo.findOne({ where: { id: dto.clientId } });
    if (!client) {
      throw new Error(`Client with id ${dto.clientId} not found`);
    }
    const oldBalance = client.balance;

    // Create sale invoice
    const saleInvoice = this.SaleInvoiceRepo.create({
      clientId: dto.clientId,
      date: new Date(),
    });
    const savedInvoice = await this.SaleInvoiceRepo.save(saleInvoice);

    // Create sale invoice items
    const items = dto.items.map(itemDto => 
      this.SaleInvoiceItemRepo.create({
        ...itemDto,
        saleInvoiceId: savedInvoice.id,
      })
    );
    await this.SaleInvoiceItemRepo.save(items);

    // Calculate total amount and update client balance
    const totalAmount = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const remainingAmount = totalAmount - dto.paid;
    client.balance += remainingAmount;
    await this.ClientRepo.save(client);

    return this.findOneWithDetails(savedInvoice.id);
  }

  async findAllWithDetails() {
    const invoices = await this.SaleInvoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.client', 'client')
      .leftJoinAndSelect('invoice.items', 'items')
      .orderBy('invoice.date', 'DESC')
      .getMany();

    return invoices.map(invoice => {
      const totalAmount = invoice.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
      const paid = totalAmount - (invoice.client.balance - (invoice.client.balance - totalAmount + (totalAmount - (invoice.client.balance - (invoice.client.balance - totalAmount)))));
      const lastBalance = invoice.client.balance;

      return {
        sale_invoice_id: invoice.id,
        date: invoice.date,
        client_name: invoice.client.name,
        old_balance: invoice.client.balance - totalAmount + paid,
        total_amount: totalAmount,
        paid: paid,
        last_balance: lastBalance,
      };
    });
  }

  async findOneWithDetails(id: number) {
    const invoice = await this.SaleInvoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.client', 'client')
      .leftJoinAndSelect('invoice.items', 'items')
      .where('invoice.id = :id', { id })
      .getOne();

    if (!invoice) return null;

    const totalAmount = invoice.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const paid = totalAmount - (invoice.client.balance - (invoice.client.balance - totalAmount + (totalAmount - (invoice.client.balance - (invoice.client.balance - totalAmount)))));
    const lastBalance = invoice.client.balance;

    return {
      sale_invoice_id: invoice.id,
      date: invoice.date,
      client_name: invoice.client.name,
      old_balance: invoice.client.balance - totalAmount + paid,
      total_amount: totalAmount,
      paid: paid,
      last_balance: lastBalance,
    };
  }

  findAll() {
    return this.SaleInvoiceRepo.find();
  }
}
