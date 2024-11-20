import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;
}
