export const CreateUserRequestSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'John Doe',
      },
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

export const CreateUserResponseSchema = {
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
  409: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        default: 409,
      },
      message: {
        type: 'string',
        default: 'User already exists',
      },
      error: {
        type: 'string',
      },
    },
  },
}
