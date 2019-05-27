'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const fs   = require('fs');
const jwt = require('jsonwebtoken');
var model = require('../models/user.js');
var privateKEY  = fs.readFileSync('private.key', 'utf8');
var publicKEY  = fs.readFileSync('public.key', 'utf8');

let signOptions = {
  expiresIn:  "5h",
  algorithm:  "RS256"
 };

 const verifyToken = function (token) {
   console.log("token");
  if (!token)
  return res.status(403).send({ auth: false, message: 'No token provided.' });
  // return decoded._id;
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, function(err, decoded) {
      if(err) reject(Boom.badRequest(err));
      else resolve(decoded.id);
    });
  });
}

 const createToken = function (user) {
  return jwt.sign({ id: user._id, username: user.username},  privateKEY, signOptions );
}

function hashPasswordSync(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(Boom.badRequest(err));
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(Boom.badRequest(err));
        } else
          resolve(hash);
      });

    })
  }
  )
};

const validateRegister = {
  username: Joi.string().max(100).required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  userStatus: Joi.number().required()
}
const validateUpdate= {
  username: Joi.string().max(100).optional(),
  firstName: Joi.string().max(100).optional(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().optional(),
  userStatus: Joi.number().optional()
}

const validateLogin = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(200).required()
}).xor('username', 'email')

const verifyUniqueUser = function (req, res) {
  return new Promise((resolve, reject) => {
  model.findByNameOrEmail(req.payload, function(err, user) {
    if (err) {
      reject(Boom.badRequest(err));
    }
    if (user) { 
      if (user.username === req.payload.username) {
        reject(Boom.badRequest('Username taken'));
      }
  
      if (user.email === req.payload.email) {
        reject(Boom.badRequest('Email taken'));
      }
  
    } else resolve(null) 
    
  });  
});
}
const createUser = async function (req, reply) {
  await verifyUniqueUser(req, reply);

  const password = await hashPasswordSync(req.payload.password);
  req.payload.password = password;
  // console.log(req.payload)
  return new Promise((resolve, reject) => {
    model.create(req.payload, function(err, user){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({user: user }).code(200));
    }});
  });
}

const login = async function (req, reply) {
  return new Promise((resolve, reject) => {
    const password = req.payload.password;
    model.findByNameOrEmail(req.payload, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          const token =  createToken(user);
          resolve(reply.response({ data: {token_id: token, user: user} }).code(200));
        }
        else {
          reject(Boom.badRequest('Incorrect password!'));
        }
      });
    } else {
          reject(Boom.badRequest('Incorrect username or email!'));
    }
  });
  })
}
const getUserByUsername = async function (req, reply) {
  const token = req.headers.authorization;
  console.log(token)
  await verifyToken(token);
  const username = req.params.username;
  return new Promise((resolve, reject) => {
    model.findUserByUsername(username, function(err, user){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        if(!user===[]){
          resolve(reply.response({user: user }).code(200));
        }
        else{
          reject(Boom.badRequest('User does not exist'));
        }
      }});
    });
}

const updateUser = async function (req, reply) {
  const token = req.headers.authorization;
  await verifyToken(token);
  if(req.payload && eq.payload.password){
    let pass = await hashPasswordSync(req.payload.password);
    req.payload.password = pass;
  }

  return new Promise((resolve, reject) => {
    model.updateUser(req.params.id, req.payload, function(err, user){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({user: user }).code(200));
      }});
    });
}

const createQuickUser = async function (req, reply) {
  await verifyUniqueUser(req, reply);

  const password = await hashPasswordSync(req.payload.password);
  req.payload.password = password;
  return new Promise((resolve, reject) => {
    model.create(req.payload, function(err, user){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      const token =  createToken(user);
      resolve(reply.response({token_id: token}).code(200));
    }});
  });
}


module.exports = {
  createUser,
  validateRegister,
  validateLogin,
  login,
  getUserByUsername,
  updateUser,
  createQuickUser,
  validateUpdate
}

