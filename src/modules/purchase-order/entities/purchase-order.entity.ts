import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderItem } from "./purchase-order-item.entity";
import { Supplier } from "src/modules/supplier/entities/supplier.entity";

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplierId' })

  supplier: Supplier;


@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
orderDate: Date;


  @Column({ nullable: true })
dueDate: Date;


   @Column({ nullable: true })
  invoiceNumber: string;

  @Column()
  status: 'PENDING' | 'RECEIVED'  | 'PAID' | 'overdue'|'cancelled';
  @Column({ nullable: true })
  paymentMethod: 'cash' | 'transfer' | 'check';

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => PurchaseOrderItem, item => item.purchaseOrder, { cascade: true })
  items: PurchaseOrderItem[];

  @Column({ nullable: true })
  totalAmount: number;
}
