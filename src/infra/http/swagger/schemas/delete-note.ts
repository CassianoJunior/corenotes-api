export const DeleteNoteResponseSchema = {
  401: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 401,
      },
      message: {
        type: 'string',
        default: 'Unauthorized',
      },
      errors: {
        type: 'string',
      },
    },
  },
  403: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 403,
      },
      message: {
        type: 'string',
        default: 'Not allowed',
      },
      error: {
        type: 'string',
      },
    },
  },
  404: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 404,
      },
      message: {
        type: 'string',
        default: 'Note not found',
      },
      error: {
        type: 'string',
      },
    },
  },
}
