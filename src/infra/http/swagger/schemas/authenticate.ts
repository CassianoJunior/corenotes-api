export const AuthenticateRequestSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
      },
    },
  },
}

export const AuthenticateResponseSchema = {
  200: {
    type: 'object',
    properties: {
      access_token: {
        type: 'string',
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
        default: 'Credentials are not valid.',
      },
      error: {
        type: 'string',
      },
    },
  },
}
