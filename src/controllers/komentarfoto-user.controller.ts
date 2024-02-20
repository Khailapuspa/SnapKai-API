import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Komentarfoto,
  Users,
} from '../models';
import {KomentarfotoRepository} from '../repositories';

export class KomentarfotoUserController {
  constructor(
    @repository(KomentarfotoRepository)
    public komentarfotoRepository: KomentarfotoRepository,
  ) { }

  @get('/komentarfotos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Komentarfoto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Komentarfoto.prototype.KomentarID,
  ): Promise<Users> {
    return this.komentarfotoRepository.user(id);
  }
}
