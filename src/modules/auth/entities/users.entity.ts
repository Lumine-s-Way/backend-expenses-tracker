import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users', { schema: 'auth' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;


  // Fields
  @Column('varchar', {
    name: 'username',
    comment: 'Nombre de usuario',
    unique: true,
  })
  username: string;

  @Column('varchar', {
    name: 'password',
    comment: 'Contraseña del usuario',
  })
  password: string;


  @BeforeInsert()
  insert(): void {
    this.textFormat()
  }

  @BeforeUpdate()
  update(): void {
    this.textFormat()
  }

  textFormat(): void {
    this.username.trim();
    this.password.trim();
  }

}
