import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  Album,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoAlbumController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/album', {
    responses: {
      '200': {
        description: 'Album belonging to Foto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Album),
          },
        },
      },
    },
  })
  async getAlbum(
    @param.path.number('id') id: typeof Foto.prototype.FotoID,
  ): Promise<Album> {
    return this.fotoRepository.album(id);
  }
}
