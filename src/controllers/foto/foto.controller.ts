import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {RestBindings, get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import dotenv from 'dotenv';
import {Request, Response} from 'express';
import multer, {Multer, StorageEngine} from 'multer';
import {HelperConfig} from '../../helper/helper.config';
import {Foto} from '../../models';
import {FotoRepository} from '../../repositories';
import {DELETE_FOTO, UPDATE_FOTO} from './foto.schema';
dotenv.config();

interface FileFoto {
  JUDULFOTO: string,
  DESKRIPSIFOTO: string,
  ALBUMID: number,
  USERID: number,
}


export class FotoController {
  private storage: StorageEngine;
  private upload: Multer;

  constructor(
    @repository(FotoRepository)
    protected fotoRepository: FotoRepository,
  ) {
    this.storage = multer.diskStorage({
      destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, './public/images');
      },
      filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const newFilename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, newFilename);
      }
    });

    this.upload = multer({storage: this.storage});
  }

  @get('/foto/view')
  @response(200, {
    description: 'views',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Foto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Foto) filter?: Filter<Foto>,
  ): Promise<Object> {
    try {
      const fotos = await this.fotoRepository.find(filter);
      return {
        success: true, datafoto: fotos
      };
    } catch (Error) {
      return {
        success: false, Error
      };
    }
  }

  @get('/foto/{id}') //buat naro foto di FE tapi sesuai id
  @response(200, {
    description: 'Get a photo by ID',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Foto, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Foto> {
    return this.fotoRepository.findById(id);
  }

  @post('/foto/uploads', {
    responses: {
      200: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fotoupload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.upload.single('file')(request, response, async (err: any) => {
        if (err) {
          reject({
            success: false,
            message: 'Failed to upload photo',
            error: err,
          });
        } else {
          try {
            const data: FileFoto = request.body
            const tanggalunggah = HelperConfig.onGetDateTimeNow();
            const filelokasi = `http://${process.env.HOST}:${process.env.PORT}/images/${request.file?.filename}`
            const create = await this.fotoRepository.create({
              JudulFoto: data.JUDULFOTO,
              DeskripsiFoto: data.DESKRIPSIFOTO,
              LokasiFile: filelokasi,
              TanggalUnggah: tanggalunggah,
              albumId: data.ALBUMID,
              userId: data.USERID
            });
            resolve({
              data: create,
              success: true,
              message: 'Photo uploaded successfully',
            });
          } catch (err) {
            resolve({
              success: false,
              message: err,
            });
          }
        }
      });
    });
  }

  @post('/foto/update', {
    responses: {
        '200': {
            description: 'update foto',
            content: {
                'application/json': {
                    schema: UPDATE_FOTO,
                },
            },
        },
    },
})
async updateFoto(
    @requestBody(UPDATE_FOTO)
    updateFoto: {
        FOTOID: number;
        JUDULFOTO: string;
        DESKRIPSIFOTO: string;
        USERID: number;
    },
): Promise<Object> {
    try {
        const existing = await this.fotoRepository.findById(updateFoto.FOTOID);
        existing.JudulFoto = updateFoto.JUDULFOTO;
        existing.DeskripsiFoto = updateFoto.DESKRIPSIFOTO;
        existing.userId = updateFoto.USERID;
        await this.fotoRepository.update(existing);
        return {success: true, data: existing};
    } catch (error) {
        return {success: false, message: error};
    }
}


  @post('/foto/delete', {
    responses: {
        '200': {
            description: 'delete foto',
        },
    },
})
async deleteFoto(
    @requestBody(DELETE_FOTO)
    deleteFoto: {
        FOTOID: number;
    }
): Promise<Object> {
    try {
        const existing = await this.fotoRepository.findById(deleteFoto.FOTOID);
        if (!existing) {
            return {success: false, message: 'Foto Tidak di Temukan'};
        }

        await this.fotoRepository.deleteById(deleteFoto.FOTOID);

        return {success: true, message: 'Foto Berhasil di Hapus'};
    } catch (error) {
        return {success: false, message: error};
    }
}

}
