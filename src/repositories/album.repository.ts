import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SnapkaiDataSource} from '../datasources';
import {Album, AlbumRelations, Foto, Users} from '../models';
import {FotoRepository} from './foto.repository';
import {UsersRepository} from './user.repository';

export class AlbumRepository extends DefaultCrudRepository<
  Album,
  typeof Album.prototype.AlbumID,
  AlbumRelations
> {

  public readonly user: BelongsToAccessor<Users, typeof Album.prototype.AlbumID>;

  public readonly fotos: HasManyRepositoryFactory<Foto, typeof Album.prototype.AlbumID>;

  constructor(
    @inject('datasources.snapkai') dataSource: SnapkaiDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UsersRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>,
  ) {
    super(Album, dataSource);
    this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoRepositoryGetter,);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

}
