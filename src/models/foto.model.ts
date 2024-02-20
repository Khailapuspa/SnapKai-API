import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Album} from './album.model';
import {Users} from './user.model';

@model()
export class Foto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      dataLength: 11,
    }
  })
  FotoID?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  JudulFoto: string;

  @property({
    type: 'string',
  })
  DeskripsiFoto?: string;

  @property({
    type: 'date',
    required: true,
  })
  TanggalUnggah: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataLength: 255,
      dataType: 'varchar'
    }
  })
  LokasiFile: string;

  @belongsTo(() => Album)
  albumId: number;

  @belongsTo(() => Users)
  userId: number;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
