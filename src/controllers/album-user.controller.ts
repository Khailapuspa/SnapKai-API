import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Album,
  Users,
} from '../models';
import {AlbumRepository} from '../repositories';

export class AlbumUserController {
  constructor(
    @repository(AlbumRepository)
    public albumRepository: AlbumRepository,
  ) { }

  @get('/albums/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Album',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Album.prototype.AlbumID,
  ): Promise<Users> {
    return this.albumRepository.user(id);
  }
}
