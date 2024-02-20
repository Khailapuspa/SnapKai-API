import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Komentarfoto,
  Foto,
} from '../models';
import {KomentarfotoRepository} from '../repositories';

export class KomentarfotoFotoController {
  constructor(
    @repository(KomentarfotoRepository)
    public komentarfotoRepository: KomentarfotoRepository,
  ) { }

  @get('/komentarfotos/{id}/foto', {
    responses: {
      '200': {
        description: 'Foto belonging to Komentarfoto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Foto),
          },
        },
      },
    },
  })
  async getFoto(
    @param.path.number('id') id: typeof Komentarfoto.prototype.KomentarID,
  ): Promise<Foto> {
    return this.komentarfotoRepository.foto(id);
  }
}
