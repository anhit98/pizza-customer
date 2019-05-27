
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
        params: {
          username: Joi.string(),
          access_token: Joi.string()
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
        cors: {
          origin: ['*']
      },
        handler: function (request, reply) {
            return reply.response('You are logged out now').code(401);
        }
    }
]