import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SnapkaiDataSource} from '../datasources';
import {Foto, Likefoto, LikefotoRelations, Users} from '../models';
import {FotoRepository} from './foto.repository';
import {UsersRepository} from './user.repository';

export class LikefotoRepository extends DefaultCrudRepository<
  Likefoto,
  typeof Likefoto.prototype.LikeID,
  LikefotoRelations
> {

  public readonly foto: BelongsToAccessor<Foto, typeof Likefoto.prototype.LikeID>;

  public readonly user: BelongsToAccessor<Users, typeof Likefoto.prototype.LikeID>;

  // public readonly fotos: HasManyRepositoryFactory<Foto, typeof Likefoto.prototype.LikeID>;

  constructor(
    @inject('datasources.snapkai') dataSource: SnapkaiDataSource, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Likefoto, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.foto = this.createBelongsToAccessorFor('foto', fotoRepositoryGetter,);
    this.registerInclusionResolver('foto', this.foto.inclusionResolver);
    // this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoRepositoryGetter,);
  }
}
