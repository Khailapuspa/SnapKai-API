import {TokenService, authenticate} from '@loopback/authentication';
import {TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {Filter, repository} from "@loopback/repository";
import {get, getModelSchemaRef, param, post, requestBody, response} from "@loopback/rest";
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import {compare, genSalt, hash} from 'bcryptjs';
import {Users} from "../../models";
import {UsersRepository} from "../../repositories";
import {MyUserService} from '../../services/user.service';
import {CREATE_USER, DELETE_USERS, LOGIN_USER, UPDATE_USER} from "./user.schema";

export class UserController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: MyUserService,
        @inject(SecurityBindings.USER, {optional: true})
        public user: UserProfile,
        @repository(UsersRepository)
        protected userRepository: UsersRepository,
    ) { }

    @get('/user/views')
    @response(200, {
        description: 'views',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Users, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(Users) filter?: Filter<Users>,
    ): Promise<Object> {
        try {
            const users = await this.userRepository.find(filter);
            return {
                success: true, datauser: users
            }
        } catch (Error) {
            return {
                success: false, Error
            }
        }
    }

    @get('/user/view/{id}')
@response(200, {
    description: 'View user by ID',
    content: {
        'application/json': {
            schema: getModelSchemaRef(Users, {includeRelations: true}),
        },
    },
})
async findById(
    @param.path.number('id') id: number,
): Promise<Object> {
    try {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return {
                success: false,
                error: 'User not found',
            };
        }

        return {
            success: true,
            datauser: user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

    @get('/user/view/album')
    @response(200, {
        description: 'views',
    })
    async useralbum(
        @param.query.number('id') id: number,
    ): Promise<Object> {
        try {
            const useralbum = await this.userRepository.albums(id).find()
            return {
                success: true, data: useralbum
            }
        } catch (Error) {
            return {
                success: false, Error
            }
        }
    }

    @get('/user/view/likefoto')
    @response(200, {
        description: 'views',
    })
    async userlike(
        @param.query.number('id') id: number,
    ): Promise<Object> {
        try {
            const userlike = await this.userRepository.likefotos(id).find()
            return {
                success: true, data: userlike
            }
        } catch (Error) {
            return {
                success: false, Error
            }
        }
    }

    @get('/user/view/komenfoto')
    @response(200, {
        description: 'views',
    })
    async userkomen(
        @param.query.number('id') id: number,
    ): Promise<Object> {
        try {
            const userkomen = await this.userRepository.komenfotos(id).find()
            return {
                success: true, data: userkomen
            }
        } catch (Error) {
            return {
                success: false, Error
            }
        }
    }

    @post('/login-user/users', {
        responses: {
            '200': {
                description: 'user login',
                content: {
                    'application/json': {
                        schema: LOGIN_USER,
                    },
                },
            },
        },
    })
    async loginUser(
        @requestBody(LOGIN_USER)
        loginUser: {
            EMAIL: string;
            PASSWORD: string;
        },
    ): Promise<Object> {
        try {
            // Cari pengguna berdasarkan email
            const existingUser = await this.userRepository.findOne({
                where: {
                    email: loginUser.EMAIL,
                },
            });
            // const existingUse = await this.userRepository.findOne({
            //     where: {
            //         id: 1,
            //     },
            // });
            // Jika pengguna tidak ditemukan
            if (!existingUser) {
                return {
                    success: false,
                    error: 'Invalid credentials', // Pesan kesalahan sesuai kebutuhan Anda
                };
            }

            // Verifikasi password
            const isPasswordValid = await compare(loginUser.PASSWORD, existingUser.Password);

            if (!isPasswordValid) {
                return {
                    success: false,
                    error: 'Invalid credentials',
                };
            }

            const user = {
                id: existingUser.id,
                username: existingUser.Username,
                email: existingUser.email,
                namalengkap: existingUser.NamaLengkap,
                alamat: existingUser.Alamat,
            }

            // Jika password valid, buat token
            const userProfile = this.userService.convertToUserProfile(existingUser);
            const token = await this.jwtService.generateToken(userProfile);

            return {
                success: true,
                data: user,
                token: token,
            };
        } catch (Error) {
            return {
                success: false,
                error: Error.message,
            }
        }
    }

    @authenticate('jwt')
    @get('/valid-token', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                success: {type: 'boolean'},
                                message: {type: 'string'},
                                token: {type: 'string'},
                            },
                        },
                    },
                },
            },
        },
    })
    async whoAmI(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
    ): Promise<{success: boolean; message: string; token: string}> {
        return {
            success: true,
            message: 'Token valid',
            token: currentUserProfile[securityId],
        };
    }


    @post('/register-user/users', {
        responses: {
            '200': {
                description: 'create user',
                content: {
                    'application/json': {
                        schema: CREATE_USER,
                    },
                },
            },
        },
    })
    async createUser(
        @requestBody(CREATE_USER)
        createUser: {
            USERNAME: string;
            PASSWORD: string;
            EMAIL: string;
            NAMALENGKAP: string;
            ALAMAT: string;
        },
    ): Promise<Object> {
        try {
            const password = await hash(createUser.PASSWORD, await genSalt());
            const create = await this.userRepository.create({
                Username: createUser.USERNAME,
                Password: password,
                email: createUser.EMAIL,
                NamaLengkap: createUser.NAMALENGKAP,
                Alamat: createUser.ALAMAT,
            });
            console.log(create);
            return {
                data: create, success: true
            }
        } catch (Error) {
            return {
                success: false, Error
            }
        }
    }

    @post('/users/update', {
        responses: {
            '200': {
                description: 'update users',
                content: {
                    'application/json': {
                        schema: UPDATE_USER,
                    },
                },
            },
        },
    })
    async updateUsers(
        @requestBody(UPDATE_USER)
        updateUsers: {
            USERID: number;
            USERNAME: string;
            PASSWORD: string;
            EMAIL: string;
            NAMALENGKAP: string;
            ALAMAT: string;
        },
    ): Promise<Object> {
        try {
            const existing = await this.userRepository.findById(updateUsers.USERID);
            const password = await hash(updateUsers.PASSWORD, await genSalt());
            existing.Username = updateUsers.USERNAME;
            existing.Password = password;
            existing.email = updateUsers.EMAIL;
            existing.NamaLengkap = updateUsers.NAMALENGKAP;
            existing.Alamat = updateUsers.ALAMAT;
            await this.userRepository.update(existing);
            return {success: true, data: existing};
        } catch (error) {
            return {success: false, message: error};
        }
    }

    @post('/users/delete', {
        responses: {
            '200': {
                description: 'delete users',
            },
        },
    })
    async delete(
        @requestBody(DELETE_USERS)
        deleteUsers: {
            USERID: number;
        }
    ): Promise<Object> {
        try {
            const existing = await this.userRepository.findById(deleteUsers.USERID);
            if (!existing) {
                return {success: false, message: 'Pengguna tidak ditemukan'};
            }

            await this.userRepository.deleteById(deleteUsers.USERID);

            return {success: true, message: 'Pengguna berhasil dihapus'};
        } catch (error) {
            return {success: false, message: error};
        }
    }
}
