import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Product } from 'src/modules/product/product.entity';
import { Warehouse } from 'src/modules/warehouse/warehouse.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryColumn()
    warehouseId: number;

    @PrimaryColumn()
    productId: number;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories)
    @JoinColumn({ name: 'warehouseId' })
    warehouse: Warehouse;

    @ManyToOne(() => Product, (product) => product.inventories)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
