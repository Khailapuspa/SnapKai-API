import {ResponseObject} from '@loopback/rest';

export const UPLOAD_FOTO: ResponseObject = {
  description: 'Request body for uploading a photo',
  required: true,
  content: {
    'multipart/form-data': {
      schema: {
        type: 'object',
        required: ['JUDULFOTO', 'ALBUMID', 'USERID'],
        properties: {
          JUDULFOTO: {
            type: 'string',
          },
          DESKRIPSIFOTO: {
            type: 'string',
          },
          LOKASIFILE: {
            type: 'string',
            format: 'binary'
          },
          ALBUMID: {
            type: 'number',
          },
          USERID: {
            type: 'number',
          }
        }
      }
    }
  }
}

export const UPDATE_FOTO: ResponseObject = {
  description: 'update_foto',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['FOTOID', 'JUDULFOTO', 'DESKRIPSIFOTO', 'USERID'],
        properties: {
          FOTOID: {
            type: 'number',
          },
          JUDULFOTO: {
            type: 'string'
          },
          DESKRIPSIFOTO: {
            type: 'string',
          },
          USERID: {
            type: 'number',
          },
        },
      },
    },
  },
};

export const DELETE_FOTO: ResponseObject = {
  description: 'delete_foto',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['FOTOID'],
        properties: {
          FOTOID: {
            type: 'number',
          },
        },
      },
    },
  },
};
