
const service = require('../services/user.js');
const Joi = require('joi');
module.exports =[ {
    method: 'POST',
    path: '/users/register',
    config: {
      tags: ['api'], // ADD THIS TAG
      auth: false,
      handler: service.createUser,
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
    validate: {
      payload: service.validateLogin
  }
  }},

  {
    method: 'GET',
    path: '/users/{username}',
    config: {
      tags: ['api'],
      handler: service.getUserByUsername
    }},

    {
      method: 'PUT',
      path: `/users/update/{id}`,
      config: {
        tags: ['api'],
        handler: service.updateUser,
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
        handler: function (request, reply) {
            return reply.response('You are logged out now').code(401);
        }
    }
]