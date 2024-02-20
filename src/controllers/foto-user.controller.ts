import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Foto,
  Users,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoUserController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Foto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Foto.prototype.FotoID,
  ): Promise<Users> {
    return this.fotoRepository.user(id);
  }
}
