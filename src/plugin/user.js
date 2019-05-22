const fs   = require('fs');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');

const jwt = require('hapi-auth-jwt2');

const validate = async decoded => ({
  isValid: true,
  credentials: decoded,
});

const register = async server => {
  await server.register(jwt);

  server.auth.strategy('jwt', 'jwt', {
    key: publicKEY,
    verifyOptions: { algorithms: ['HS256'] },
    validate,
  });

    server.auth.default('jwt'); // JWT auth is required for all routes
};

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register
};
