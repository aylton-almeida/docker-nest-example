import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PasswordTransformer } from '../transformers/password.transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({
    length: 255,
    transformer: new PasswordTransformer(),
    select: false,
  })
  password: string;
}
