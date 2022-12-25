import { ObjectID } from 'typeorm';
import * as mongodb from 'mongodb';

export class IdUtils {
  public static objectIdFromString(str: string): ObjectID {
    const ObjectId = mongodb.ObjectID;
    return ObjectId(str);
  }
}
