import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Wish extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  appid: string;

  @Column()
  user: ObjectID;
}
