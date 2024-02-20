import {ResponseObject} from '@loopback/rest';

export const CREATE_KOMENTAR: ResponseObject = {
  description: 'Komentar Foto',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['FOTOID', 'USERID'],
        properties: {
          ISIKOMENTAR: {
            type: 'string',
          },
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

export const DELETER_KOMENTAR: ResponseObject = {
  description: 'delete komentar',
  required: true,
  content: {
      'application/json': {
          schema: {
              type: 'object',
              required: ['KOMENTARID'], // Menambahkan UserID dan FotoID
              properties: {
                  KOMENTARID: {
                      type: 'number',
                  },
              },
          },
      },
  },
};
