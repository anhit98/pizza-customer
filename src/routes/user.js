
const service = require('../services/user.js');
const Joi = require('joi');
module.exports =[ {
    method: 'POST',
    path: '/users/register',
    config: {
      tags: ['api'], // ADD THIS TAG
      auth: false,
      handler: service.createUser,
      cors: {
        origin: ['*']
    },
      validate: {
        payload: service.validateRegister
    }
    }
  },
  
  {
    method: 'POST',
    path: '/users/quick-register',
    config: {
      tags: ['api'], // ADD THIS TAG
      auth: false,
      handler: service.createQuickUser,
      cors: {
        origin: ['*']
    },
      validate: {
        payload: service.validateRegister
    }
    }
  },
  {
  method: 'POST',
  path: '/users/login',
  config: {
    tags: ['api'],
    auth: false,
    handler: service.login,
    cors: {
      origin: ['*']
  },
    validate: {
      payload: service.validateLogin
  }
  }},

  {
    method: 'GET',
    path: '/users/{username}',
    config: {
      tags: ['api'],
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        params: {
          username: Joi.string()
      }
    },
      handler: service.getUserByUsername,
      cors: {
        origin: ['*']
    },
    }},

    {
      method: 'PUT',
      path: `/users/update/{id}`,
      config: {
        tags: ['api'],
        handler: service.updateUser,
        cors: {
          origin: ['*']
      },
        validate: {
          headers:
          Joi.object().keys({
            'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
          }).options({ allowUnknown: true }),
          payload: service.validateUpdate,
          params: {
            id: Joi.string().min(3).max(100)
        }
      }
      },
},
      {
        method: 'GET',
        path: '/users/logout',
        config: {
          tags: ['api'],
          cors: {
            origin: ['*']
        },
        validate: {
          headers:
          Joi.object().keys({
            'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
          }).options({ allowUnknown: true })
      },
          handler: function (request, reply) {
              return reply.response('You are logged out now').code(401);
          }
        }

    }
]