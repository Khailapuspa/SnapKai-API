import {ResponseObject} from '@loopback/rest';

export const CREATE_LIKE: ResponseObject = {
  description: 'Like Foto',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['FOTOID', 'USERID'],
        properties: {
          FOTOID: {
            type: 'number',
          },
          USERID: {
            type: 'number',
          },
        },
      },
    },
  },
};

export const DELETE_LIKE: ResponseObject = {
  description: 'delete like',
  required: true,
  content: {
      'application/json': {
          schema: {
              type: 'object',
              required: ['FOTOID', 'USERID'],
              properties: {
                  FOTOID: {
                      type: 'number',
                  },
                  USERID: {
                    type: 'number',
                },
              },
          },
      },
  },
};

