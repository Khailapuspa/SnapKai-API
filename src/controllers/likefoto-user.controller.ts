import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Likefoto,
  Users,
} from '../models';
import {LikefotoRepository} from '../repositories';

export class LikefotoUserController {
  constructor(
    @repository(LikefotoRepository)
    public likefotoRepository: LikefotoRepository,
  ) { }

  @get('/likefotos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Likefoto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Likefoto.prototype.LikeID,
  ): Promise<Users> {
    return this.likefotoRepository.user(id);
  }
}
