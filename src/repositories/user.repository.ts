import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SnapkaiDataSource} from '../datasources';
import {Album, Komentarfoto, Likefoto, UserRelations, Users} from '../models';
import {AlbumRepository} from './album.repository';
import {KomentarfotoRepository} from './komentarfoto.repository';
import {LikefotoRepository} from './likefoto.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UserRelations
> {

  public readonly albums: HasManyRepositoryFactory<Album, typeof Users.prototype.id>;
  public readonly likefotos: HasManyRepositoryFactory<Likefoto, typeof Users.prototype.id>;
  public readonly komenfotos: HasManyRepositoryFactory<Komentarfoto, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.snapkai') dataSource: SnapkaiDataSource,
    @repository.getter('AlbumRepository') protected albumRepositoryGetter: Getter<AlbumRepository>,
    @repository.getter('LikefotoRepository') protected likefotorepositoryGetter: Getter<LikefotoRepository>,
    @repository.getter('KomentarfotoRepository') protected komentarfotoRepositoryGetter: Getter<KomentarfotoRepository>
  ) {
    super(Users, dataSource);
    this.albums = this.createHasManyRepositoryFactoryFor('albums', albumRepositoryGetter,);
    this.likefotos = this.createHasManyRepositoryFactoryFor('likefotos', likefotorepositoryGetter,);
    this.komenfotos = this.createHasManyRepositoryFactoryFor('komenfotos', komentarfotoRepositoryGetter,);
  }
}
