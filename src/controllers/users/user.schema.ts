import {ResponseObject} from "@loopback/rest";

export const CREATE_USER: ResponseObject = {
    description: 'create-user',
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['USERNAME', 'PASSWORD', 'EMAIL', 'NAMALENGKAP'],
                properties: {
                    USERNAME: {
                        type: 'string',
                    },
                    PASSWORD: {
                        type: 'string',
                    },
                    EMAIL: {
                        type: 'string',
                    },
                    NAMALENGKAP: {
                        type: 'string',
                    },
                    ALAMAT: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

export const LOGIN_USER: ResponseObject = {
    description: 'Login User',
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['EMAIL', 'PASSWORD'],
                properties: {
                    EMAIL: {
                        type: 'string',
                    },
                    PASSWORD: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

export const UPDATE_USER: ResponseObject = {
    description: 'update_user',
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['USERID', 'USERNAME', 'PASSWORD', 'EMAIL', 'NAMALENGKAP'],
                properties: {
                    USERID: {
                        type: 'number'
                    },
                    USERNAME: {
                        type: 'string'
                    },
                    PASSWORD: {
                        type: 'string',
                    },
                    EMAIL: {
                        type: 'string',
                    },
                    NAMALENGKAP: {
                        type: 'string',
                    },
                    ALAMAT: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

export const DELETE_USERS: ResponseObject = {
    description: 'delete_users',
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['USERID'],
                properties: {
                    USERID: {
                        type: 'number',
                    },
                },
            },
        },
    },
};
