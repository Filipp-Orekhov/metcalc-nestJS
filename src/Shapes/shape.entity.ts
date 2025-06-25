import { Entity, Column, OneToMany, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { Material } from '../materials/material.entity';

@Entity()
export class Shape {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  formula: string;

  @Column('simple-array')
  requiredParams: string[];

  @ManyToMany(() => Material, material => material.shapes, { cascade: true })
  @JoinTable()
  materials: Material[];
}
