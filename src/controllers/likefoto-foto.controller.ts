import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Likefoto,
  Foto,
} from '../models';
import {LikefotoRepository} from '../repositories';

export class LikefotoFotoController {
  constructor(
    @repository(LikefotoRepository)
    public likefotoRepository: LikefotoRepository,
  ) { }

  @get('/likefotos/{id}/foto', {
    responses: {
      '200': {
        description: 'Foto belonging to Likefoto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Foto),
          },
        },
      },
    },
  })
  async getFoto(
    @param.path.number('id') id: typeof Likefoto.prototype.LikeID,
  ): Promise<Foto> {
    return this.likefotoRepository.foto(id);
  }
}
