import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {HelperConfig} from '../../helper/helper.config';
import {Likefoto} from '../../models';
import {LikefotoRepository} from '../../repositories';
import {CREATE_LIKE} from './likefoto.schema';

export class LikefotoController {
  constructor(
    @repository(LikefotoRepository)
    protected likefotoRepository: LikefotoRepository,
  ) { }

  @get('/like/view')
  @response(200, {
    description: 'views',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Likefoto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Likefoto) filter?: Filter<Likefoto>,
  ): Promise<Object> {
    try {
      const likes = await this.likefotoRepository.find(filter);
      return {
        success: true, datalikefoto: likes
      }
    } catch (Error) {
      return {
        success: false, Error
      }
    }
  }

  @get('/like-foto/user')
@response(200, {
    description: 'views',
})
async userlike(
    @param.query.number('id') id: number,
): Promise<Object> {
    try {
        const userLikes = await this.likefotoRepository.find({
            where: { userId: id },
        });

        const likedPhotoIDs = userLikes.map((like) => like.fotoId);

        return {
            success: true,
            data: likedPhotoIDs,
        };
    } catch (Error) {
        return {
            success: false,
            Error,
        };
    }
}

@get('/like-foto/photo')
@response(200, {
    description: 'likes',
})
async photoLikes(
    @param.query.number('photoId') photoId: number,
): Promise<Object> {
    try {
        const photoLikes = await this.likefotoRepository.find({
            where: { fotoId: photoId },
        });

        const uniqueUserIds = Array.from(new Set(photoLikes.map((like) => like.userId)));

        return {
            success: true,
            data: {
                likeCount: uniqueUserIds.length,
                likedByUsers: uniqueUserIds,
            },
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}

  @post('/like/like&unlike', {
    responses: {
      '200': {
        description: 'mix like and unlike',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async toggleLike(
    @requestBody(CREATE_LIKE)
    createLike: {
      FOTOID: number;
      USERID: number;
    },
  ): Promise<Object> {
    try {
      const filter = {
        where: {
          fotoId: createLike.FOTOID,
          userId: createLike.USERID,
        },
      };

      const existingLike = await this.likefotoRepository.findOne(filter);

      if (existingLike) {
        // Unlike
        await this.likefotoRepository.deleteById(existingLike?.LikeID);
        return { success: true, message: 'Unlike' };
      } else {
        // Like
        const tanggaldilike = HelperConfig.onGetDateTimeNow();
        await this.likefotoRepository.create({
          fotoId: createLike.FOTOID,
          userId: createLike.USERID,
          TanggalLike: tanggaldilike,
        });

        // Fetch totalLikes and userLikes after creating a new like
        const likes = await this.likefotoRepository.find({
          where: {fotoId: createLike.FOTOID},
        });

        return {
          success: true,
          message: 'Like',
          totalLikes: likes.length,
          userLikes: likes.map((like) => like.userId),
        };
      }
    } catch (error) {
      return { success: false, message: error };
    }
  }
}


