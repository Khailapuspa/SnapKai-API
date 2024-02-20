import {Filter, repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {HelperConfig} from '../../helper/helper.config';
import {Komentarfoto} from '../../models';
import {KomentarfotoRepository} from '../../repositories';
import {CREATE_KOMENTAR, DELETER_KOMENTAR} from './komentarfoto.schema';

export class KomentarfotoController {
  constructor(
    @repository(KomentarfotoRepository)
    protected komentarfotorepository: KomentarfotoRepository,
  ) { }


  @get('/komentar/view')
  @response(200, {
    description: 'views',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Komentarfoto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Komentarfoto) filter?: Filter<Komentarfoto>,
  ): Promise<Object> {
    try {
      const komen = await this.komentarfotorepository.find(filter);
      return {
        success: true, datakomenfoto: komen
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }

  @post('/komentar/create', {
    responses: {
      '200': {
        description: 'create komentar',
        content: {
          'application/json': {
            schema: CREATE_KOMENTAR,
          },
        },
      },
    },
  })
  async createKomentar(
    @requestBody(CREATE_KOMENTAR)
    createKomentar: {
      ISIKOMENTAR: string;
      FOTOID: number;
      USERID: number;
    },
  ): Promise<Object> {
    try {
      const tanggakomentar = HelperConfig.onGetDateTimeNow();
      const create = await this.komentarfotorepository.create({
        IsiKomentar: createKomentar.ISIKOMENTAR,
        fotoId: createKomentar.FOTOID,
        userId: createKomentar.USERID,
        TanggalKomentar: tanggakomentar,
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

  @get('/komentar/total/{fotoId}')
@response(200, {
  description: 'Total komentar for a photo',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          totalKomentar: { type: 'number' },
        },
      },
    },
  },
})
async totalKomentarByFotoId(
  @param.path.number('fotoId') fotoId: number,
): Promise<{ totalKomentar: number }> {
  try {
    const totalKomentar = await this.komentarfotorepository.count({
      fotoId: fotoId,
    });

    return {
      totalKomentar: totalKomentar.count,
    };
  } catch (error) {
    return { totalKomentar: 0 };
  }
}

  @del('/komentar/delete', {
    responses: {
        '200': {
            description: 'delete like',
        },
    },
})
async delete(
    @requestBody(DELETER_KOMENTAR)
    deleteKomentar: {
      KOMENTARID: number,
    }
): Promise<Object> {
    try {
        const existing = await this.komentarfotorepository.findById(deleteKomentar.KOMENTARID);
        if (!existing) {
            return {success: false, message: 'Komentar Kosong'};
        }

        await this.komentarfotorepository.deleteById(deleteKomentar.KOMENTARID);

        return {success: true, message: 'Komentar di Hapus'};
    } catch (error) {
        return {success: false, message: error};
    }
}

}
