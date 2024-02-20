import {Entity, hasMany, model, property} from '@loopback/repository';
import {Album} from './album.model';
import {Komentarfoto} from './komentarfoto.model';
import {Likefoto} from './likefoto.model';

@model({
  settings: {postgresql: {schema: 'public', table: 'user'}}
})
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      dataLength: 11,
      columnName: 'userid',
    }
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  Username: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    },
    index: {
      unique: true
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  NamaLengkap: string;

  @property({
    type: 'string',
    required: true,
  })
  Alamat: string;

  @hasMany(() => Album, {keyTo: 'userId'})
  albums: Album[];

  @hasMany(() => Likefoto, {keyTo: 'userId'})
  likefotos: Likefoto[];

  @hasMany(() => Komentarfoto, {keyTo: 'userId'})
  komenfotos: Komentarfoto[];



  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = Users & UserRelations;
