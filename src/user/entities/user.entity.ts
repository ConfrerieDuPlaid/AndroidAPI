import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 32 })
  email: string;

  @Column({ length: 512 })
  password: string;
}
