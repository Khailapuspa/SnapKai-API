import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from "@loopback/rest";
import {HelperConfig} from '../../helper/helper.config';
import {Album} from '../../models';
import {AlbumRepository} from '../../repositories';
import {CREATE_ALBUM, DELETE_ALBUM, UPDATE_ALBUM} from './album.schema';

export class AlbumController {
  constructor(
    @repository(AlbumRepository)
    protected albumRepository: AlbumRepository,
  ) { }

  @get('/album/view')
  @response(200, {
    description: 'views',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Album, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Album) filter?: Filter<Album>,
  ): Promise<Object> {
    try {
      const albums = await this.albumRepository.find(filter);
      return {
        success: true, dataalbum: albums
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }

  @get('/album/view/user')
  @response(200, {
    description: 'views',
  })
  async useralbum(
    @param.query.number('id') id: number,
  ): Promise<Object> {
    try {
      const useralbum = await this.albumRepository.findById(id)
      return {
        success: true, data: useralbum
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }


  @get('/album/view/foto')
  @response(200, {
    description: 'views',
  })
  async valbum(
    @param.query.number('id') id: number,
  ): Promise<Object> {
    try {
      const valbum = await this.albumRepository.fotos(id).find()
      return {
        success: true, data: valbum
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }

  @post('/album/create', {
    responses: {
      '200': {
        description: 'create album',
        content: {
          'application/json': {
            schema: CREATE_ALBUM,
          },
        },
      },
    },
  })
  async createAlbum(
    @requestBody(CREATE_ALBUM)
    createAlbum: {
      NAMAALBUM: string;
      DESKRIPSI: string;
      USERID: number;
    },
  ): Promise<Object> {
    try {
      const tanggaldibuat = HelperConfig.onGetDateTimeNow();
      const create = await this.albumRepository.create({
        NamaAlbum: createAlbum.NAMAALBUM,
        Deskripsi: createAlbum.DESKRIPSI,
        userId: createAlbum.USERID,
        TanggalDibuat: tanggaldibuat,
      });
      return {
        data: create, success: true
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }

  @post('/album/update', {
    responses: {
        '200': {
            description: 'update album',
            content: {
                'application/json': {
                    schema: UPDATE_ALBUM,
                },
            },
        },
    },
})
async updateAlbum(
    @requestBody(UPDATE_ALBUM)
    updateAlbum: {
        ALBUMID: number;
        NAMAALBUM: string;
        DESKRIPSI: string;
        USERID: number;
    },
): Promise<Object> {
    try {
        const existing = await this.albumRepository.findById(updateAlbum.ALBUMID);
        existing.NamaAlbum = updateAlbum.NAMAALBUM;
        existing.Deskripsi = updateAlbum.DESKRIPSI;
        existing.userId = updateAlbum.USERID;
        await this.albumRepository.update(existing);
        return {success: true, data: existing};
    } catch (error) {
        return {success: false, message: error};
    }
}

@post('/album/delete', {
  responses: {
      '200': {
          description: 'delete album',
      },
  },
})
async deleteAlbum(
  @requestBody(DELETE_ALBUM)
  deleteAlbum: {
      ALBUMID: number;
  }
): Promise<Object> {
  try {
      const existing = await this.albumRepository.findById(deleteAlbum.ALBUMID);
      if (!existing) {
          return {success: false, message: 'Album Tidak Ada'};
      }

      await this.albumRepository.deleteById(deleteAlbum.ALBUMID);

      return {success: true, message: 'Album Berhasil di Hapus'};
  } catch (error) {
      return {success: false, message: error};
  }
}

}

