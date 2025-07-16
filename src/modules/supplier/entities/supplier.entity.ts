import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  @Column({ nullable: true})
  email: string;

  @Column()
  address: string;

    @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  taxNumber: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true, type: 'text' })
  notes: string;

@Column({ default: 0 })
accountBalance: number;
}
