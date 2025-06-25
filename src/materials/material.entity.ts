import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Shape } from '../Shapes/shape.entity';

@Entity()
export class Material {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('float')
  density: number;

  @ManyToMany(() => Shape, shape => shape.materials)
  shapes: Shape[];
}
