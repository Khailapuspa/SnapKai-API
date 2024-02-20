import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Foto} from './foto.model';
import {Users} from './user.model';

@model()
export class Komentarfoto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      dataLength: 11,
    }
  })
  KomentarID?: number;

  @property({
    type: 'string',
    required: true,
  })
  IsiKomentar: string;

  @property({
    type: 'date',
    required: true,
  })
  TanggalKomentar: string;

  @belongsTo(() => Foto)
  fotoId: number;

  @belongsTo(() => Users)
  userId: number;

  constructor(data?: Partial<Komentarfoto>) {
    super(data);
  }
}

export interface KomentarfotoRelations {
  // describe navigational properties here
}

export type KomentarfotoWithRelations = Komentarfoto & KomentarfotoRelations;
