import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Product } from 'src/modules/product/product.entity';
import { Warehouse } from 'src/modules/warehouse/warehouse.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Product, (product) => product.inventory)
    product: Product;
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories)
    warehouse: Warehouse;
}
