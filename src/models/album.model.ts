import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Foto} from './foto.model';
import {Users} from './user.model';

@model()
export class Album extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      dataLength: 11,
    }
  })
  AlbumID?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  NamaAlbum: string;

  @property({
    type: 'string',
  })
  Deskripsi?: string;

  @property({
    type: 'date',
    required: true,
  })
  TanggalDibuat: string;

  @belongsTo(() => Users)
  userId: number;

  @hasMany(() => Foto)
  fotos: Foto[];

  constructor(data?: Partial<Album>) {
    super(data);
  }
}

export interface AlbumRelations {
  // describe navigational properties here
}

export type AlbumWithRelations = Album & AlbumRelations;
