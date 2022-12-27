import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column({ length: 32 })
  email: string;

  @Column({ length: 64 })
  password: string;

  @Column()
  token: string;
}
