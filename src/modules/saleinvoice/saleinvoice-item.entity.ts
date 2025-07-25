import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SaleInvoice } from './saleinvoice.entity';
import { Product } from '../product/product.entity';

@Entity('sale_invoice_items')
export class SaleInvoiceItem {
  @PrimaryColumn()
  saleInvoiceId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => SaleInvoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saleInvoiceId' })
  saleInvoice: SaleInvoice;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
} 