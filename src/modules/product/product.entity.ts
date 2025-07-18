import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Inventory } from 'src/modules/inventory/inventory.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  purchase_price: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  sale_price: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];
}
