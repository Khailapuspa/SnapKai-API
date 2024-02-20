import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Album,
  Foto,
} from '../models';
import {AlbumRepository} from '../repositories';

export class AlbumFotoController {
  constructor(
    @repository(AlbumRepository) protected albumRepository: AlbumRepository,
  ) { }

  @get('/albums/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of Album has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.albumRepository.fotos(id).find(filter);
  }

  @post('/albums/{id}/fotos', {
    responses: {
      '200': {
        description: 'Album model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Album.prototype.AlbumID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInAlbum',
            exclude: ['FotoID'],
            optional: ['albumId']
          }),
        },
      },
    }) foto: Omit<Foto, 'FotoID'>,
  ): Promise<Foto> {
    return this.albumRepository.fotos(id).create(foto);
  }

  @patch('/albums/{id}/fotos', {
    responses: {
      '200': {
        description: 'Album.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.albumRepository.fotos(id).patch(foto, where);
  }

  @del('/albums/{id}/fotos', {
    responses: {
      '200': {
        description: 'Album.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.albumRepository.fotos(id).delete(where);
  }
}
