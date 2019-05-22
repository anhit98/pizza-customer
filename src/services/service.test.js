

const create = require('../services/user.js').createUser;
jest.mock('../models/user', () => ({
    create: (data,cb) => Promise.resolve({
    _id: '5c6d066ec13e6e002cd89a86',
    username: "hainguyen",
    lastName:"Nguyen",
    firstName:"Hai",
    email: "hai@gmail.com",
    password:"123456",
    phone:"039 908929",
    userStatus:1
  })
}));

describe('User Route - Test the create user service', () => {
  it('Should create', async () => {
    // jest.setTimeout(30000);
    const res = await create({
      payload: {
        username: "hainguyen",
        lastName:"Nguyen",
        firstName:"Hai",
        email: "hai@gmail.com",
        password:"123456",
        phone:"039 908 2929",
        userStatus:1
      }
    },30000);
    console.log(res);
    expect(res._id).toEqual('5c6d066ec13e6e002cd89a86');
  });
});
