export const FetchUserNotesResponseSchema = {
  200: {
    type: 'object',
    properties: {
      notes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
            color: {
              type: 'string',
            },
            markedAsFavorite: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
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
}
