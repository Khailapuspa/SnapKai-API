import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {compare} from 'bcryptjs';
import {UserWithRelations, Users} from '../models';
import {UsersRepository} from '../repositories';
/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  email: string;
  password: string;
};

export class MyUserService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) public userRepository: UsersRepository,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Users> {

    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });


    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      foundUser.Password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: Users): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.Username,
      id: user.id,
      email: user.email,
    };
  }

  //function to find user by id
  async findUserById(id: number): Promise<Users & UserWithRelations> {
    const userNotfound = 'invalid User';
    const foundUser = await this.userRepository.findOne({
      where: {id: id},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}
