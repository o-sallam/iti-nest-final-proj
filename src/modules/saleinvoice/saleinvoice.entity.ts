import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_invoices')
export class SaleInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  invoiceDate: Date;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;
}
