import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Client } from '../client/client.entity';
import { SaleInvoiceItem } from './saleinvoice-item.entity';

@Entity('sale_invoices')
export class SaleInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  clientId: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => SaleInvoiceItem, (item) => item.saleInvoice, { cascade: true })
  items: SaleInvoiceItem[];

  get totalAmount(): number {
    if (!this.items) return 0;
    return this.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }
}
