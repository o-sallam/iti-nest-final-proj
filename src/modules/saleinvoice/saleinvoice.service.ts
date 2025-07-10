import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleInvoice } from './saleinvoice.entity';
import { CreateSaleInvoiceDto } from './saleinvoice.dto';

@Injectable()
export class SaleInvoiceService {
  constructor(
    @InjectRepository(SaleInvoice)
    private readonly SaleInvoiceRepo: Repository<SaleInvoice>,
  ) {}

  create(dto: CreateSaleInvoiceDto) {
    const saleInvoice = this.SaleInvoiceRepo.create({...dto});
    return this.SaleInvoiceRepo.save(saleInvoice);
  }
}
