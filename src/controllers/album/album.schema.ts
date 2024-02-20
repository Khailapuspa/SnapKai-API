import {ResponseObject} from '@loopback/rest';

export const CREATE_ALBUM: ResponseObject = {
  description: 'create-album',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['NAMAALBUM'],
        properties: {
          NAMAALBUM: {
            type: 'string',
          },
          DESKRIPSI: {
            type: 'string',
          },
          USERID: {
            type: 'number',
          }
        },
      },
    },
  },
};

export const UPDATE_ALBUM: ResponseObject = {
  description: 'update-album',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['ALBUMID', 'NAMAALBUM', 'USERID'],
        properties: {
          ALBUMID: {
            type: 'number',
          },
          NAMAALBUM: {
            type: 'string',
          },
          DESKRIPSI: {
            type: 'string',
          },
          USERID: {
            type: 'number',
          }
        },
      },
    },
  },
};

export const DELETE_ALBUM: ResponseObject = {
  description: 'delete_album',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['ALBUMID'],
        properties: {
          ALBUMID: {
            type: 'number',
          },
        },
      },
    },
  },
};

