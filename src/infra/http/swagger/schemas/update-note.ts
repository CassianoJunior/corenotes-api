export const EditNoteRequestSchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        example: 'My note title',
      },
      content: {
        type: 'string',
        example: 'My note content',
      },
      color: {
        type: 'string',
        pattern: '^#([0-9a-f]{3}){1,2}$',
        example: '#000000',
      },
    },
  },
}

export const EditNoteResponseSchema = {
  204: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 204,
      },
    },
  },
  400: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 400,
      },
      message: {
        type: 'string',
        default: 'Validation failed',
      },
      errors: {
        type: 'string',
      },
    },
  },
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
