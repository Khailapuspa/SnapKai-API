import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SnapkaiDataSource} from '../datasources';
import {Foto, Komentarfoto, KomentarfotoRelations, Users} from '../models';
import {FotoRepository} from './foto.repository';
import {UsersRepository} from './user.repository';

export class KomentarfotoRepository extends DefaultCrudRepository<
  Komentarfoto,
  typeof Komentarfoto.prototype.KomentarID,
  KomentarfotoRelations
> {

  public readonly foto: BelongsToAccessor<Foto, typeof Komentarfoto.prototype.KomentarID>;

  public readonly user: BelongsToAccessor<Users, typeof Komentarfoto.prototype.KomentarID>;

  constructor(
    @inject('datasources.snapkai') dataSource: SnapkaiDataSource, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Komentarfoto, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.foto = this.createBelongsToAccessorFor('foto', fotoRepositoryGetter,);
    this.registerInclusionResolver('foto', this.foto.inclusionResolver);
  }
}
