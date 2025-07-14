import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderItem } from "./purchase-order-item.entity";
import { Supplier } from "src/modules/supplier/entities/supplier.entity";
import { OrderStatus } from 'src/common/enums/order-status.enum'; // غيّر المسار حسب مكان الملف

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


   @Column()
  invoiceNumber: string;

  @Column({ type: 'enum', enum: OrderStatus , nullable: true,})
status: OrderStatus;

  @Column({ nullable: true })
  paymentMethod: 'cash' | 'transfer' | 'check';

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => PurchaseOrderItem, item => item.purchaseOrder, { cascade: true })
  items: PurchaseOrderItem[];

  @Column()
  totalAmount: number;
 @Column({ nullable: true })
paidAmount: number;

}
