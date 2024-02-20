import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Foto} from './foto.model';
import {Users} from './user.model';

@model()
export class Likefoto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  LikeID?: number;

  @property({
    type: 'date',
    required: true,
  })
  TanggalLike: string;

  @belongsTo(() => Foto)
  fotoId: number;

  @belongsTo(() => Users)
  userId: number;

  constructor(data?: Partial<Likefoto>) {
    super(data);
  }
}

export interface LikefotoRelations {
  // describe navigational properties here
}

export type LikefotoWithRelations = Likefoto & LikefotoRelations;
