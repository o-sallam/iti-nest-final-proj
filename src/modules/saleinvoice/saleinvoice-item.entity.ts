import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SaleInvoice } from './saleinvoice.entity';

@Entity('sale_invoice_items')
export class SaleInvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  saleInvoiceId: number;

  @ManyToOne(() => SaleInvoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saleInvoiceId' })
  saleInvoice: SaleInvoice;

  @Column()
  productId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
} 