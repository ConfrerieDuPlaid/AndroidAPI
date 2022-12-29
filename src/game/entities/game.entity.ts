import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Game {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  rank?: number;

  @Column()
  steamAppid: number;

  @Column()
  name: string;

  @Column()
  publishers: string[];

  @Column()
  headerImage: string;

  @Column()
  backgroundImage: string;

  @Column()
  description: string;

  @Column()
  priceInCents: number;
}
