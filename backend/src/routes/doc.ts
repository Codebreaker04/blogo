export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Blogo API',
    version: '1.0.0',
    description: 'API documentation for Blogo - A blogging platform',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      BlogInput: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          published: { type: 'boolean' },
        },
      },
      SignupInput: {
        type: 'object',
        required: ['email', 'username', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          username: { type: 'string' },
          password: { type: 'string', minLength: 6 },
        },
      },
      SigninInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/signup': {
      post: {
        summary: 'Register a new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SignupInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    msg: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid input or user already exists',
          },
        },
      },
    },
    '/auth/signin': {
      post: {
        summary: 'Sign in existing user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SigninInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'User signed in successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid input or user does not exist',
          },
          '401': {
            description: 'Invalid password',
          },
        },
      },
    },
    '/blog': {
      post: {
        summary: 'Create a new blog post',
        tags: ['Blog'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BlogInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Blog post created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    postId: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid input' },
          '500': { description: 'Server error' },
        },
      },
      get: {
        summary: 'Get all blog posts for the authenticated user',
        tags: ['Blog'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'offset',
            schema: { type: 'integer', default: 0 },
            description: 'Number of posts to skip',
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', default: 10 },
            description: 'Number of posts to return',
          },
        ],
        responses: {
          '200': {
            description: 'Blog posts retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    offset: { type: 'integer' },
                    limit: { type: 'integer' },
                    msg: { type: 'string' },
                    blogs: {
                      type: 'array',
                      items: { type: 'object' },
                    },
                  },
                },
              },
            },
          },
          '500': { description: 'Server error' },
        },
      },
    },
    '/blog/{id}': {
      get: {
        summary: 'Get a specific blog post',
        tags: ['Blog'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Blog post ID',
          },
        ],
        responses: {
          '200': {
            description: 'Blog post retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    post: { type: 'object' },
                  },
                },
              },
            },
          },
          '500': { description: 'Server error' },
        },
      },
      put: {
        summary: 'Update a blog post',
        tags: ['Blog'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Blog post ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BlogInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Blog post updated successfully' },
          '400': { description: 'Invalid input' },
          '500': { description: 'Server error' },
        },
      },
      delete: {
        summary: 'Delete a blog post',
        tags: ['Blog'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Blog post ID',
          },
        ],
        responses: {
          '200': {
            description: 'Blog post deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    post: { type: 'object' },
                  },
                },
              },
            },
          },
          '500': { description: 'Server error' },
        },
      },
    },
    '/user/profile': {
      get: {
        summary: 'Get user profile',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Profile fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    profile: {
                      type: 'object',
                      properties: {
                        email: { type: 'string' },
                        username: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          '500': { description: 'Unable to fetch profile' },
        },
      },
    },
    '/user/profile/email': {
      put: {
        summary: 'Update user email',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Email updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    updatedEmail: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid email type' },
          '500': { description: 'Email already exists' },
        },
      },
    },
    '/user/profile/username': {
      put: {
        summary: 'Update user username',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username'],
                properties: {
                  username: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Username updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    updatedUsername: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid username type' },
          '500': { description: 'Username already exists' },
        },
      },
    },
    '/user/profile/password': {
      put: {
        summary: 'Update user password',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['password'],
                properties: {
                  password: { type: 'string', minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Password updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid password type' },
          '500': { description: 'Password update failed' },
        },
      },
    },
    '/user': {
      delete: {
        summary: 'Delete user',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        email: { type: 'string' },
                        username: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          '500': { description: 'Deletion process of the user failed' },
        },
      },
    },
    '/open/bulk': {
      get: {
        summary: 'Get all blogs (public, no auth)',
        tags: ['Open'],
        parameters: [
          {
            in: 'query',
            name: 'offset',
            schema: { type: 'integer', default: 0 },
            description: 'Number of posts to skip',
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', default: 10 },
            description: 'Number of posts to return',
          },
        ],
        responses: {
          '200': {
            description: 'Fetched all blogs',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    offset: { type: 'integer' },
                    limit: { type: 'integer' },
                    msg: { type: 'string' },
                    blogs: {
                      type: 'array',
                      items: { type: 'object' },
                    },
                  },
                },
              },
            },
          },
          '500': { description: 'Unable to fetch the blogs' },
        },
      },
    },
  },
};
