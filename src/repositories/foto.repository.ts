import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SnapkaiDataSource} from '../datasources';
import {Album, Foto, FotoRelations, Users} from '../models';
import {AlbumRepository} from './album.repository';
import {UsersRepository} from './user.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.FotoID,
  FotoRelations
> {

  public readonly album: BelongsToAccessor<Album, typeof Foto.prototype.FotoID>;

  public readonly user: BelongsToAccessor<Users, typeof Foto.prototype.FotoID>;

  constructor(
    @inject('datasources.snapkai') dataSource: SnapkaiDataSource, @repository.getter('AlbumRepository') protected albumRepositoryGetter: Getter<AlbumRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Foto, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.album = this.createBelongsToAccessorFor('album', albumRepositoryGetter,);
    this.registerInclusionResolver('album', this.album.inclusionResolver);
  }
}
