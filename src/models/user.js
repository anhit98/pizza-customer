'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        index: { unique: true }
      },
      firstName: {
        type: String,
        required: [true, 'firstName is required']
      },
      lastName: {
        type: String,
        required: [true, 'lastName is required']
      },
      email: {
        type: String,
        required: [true, 'email is required'],
        index: { unique: true }
      },
      password: {
        type: String,
        required: [true, 'password is required']
      },
      phone: { 
        type: String, 
        required: [true, 'User phone number required'] 
      },    
      userStatus: {
        type: Number,
        required: [true, 'userStatus is required']
      },
      scope: {
        type: String,
        required: [true, 'scope is required']
      },
    
});

const UserModel = mongoose.model('User', userSchema);

const findByNameOrEmail = (user,cb) =>  UserModel.findOne({
    $or: [
      { email: user.email },
      { username: user.username }
    ]
  }, cb);

const create =  (user,cb) =>  UserModel.create(user,cb);

const findUserByUsername = (username, cb) => UserModel.find({username: username}, cb);

const updateUser = (id, data, cb) => UserModel.findByIdAndUpdate({_id:id}, data ,{new : true} , cb);

module.exports = {
  create,
  findByNameOrEmail,
  findUserByUsername,
  updateUser
}