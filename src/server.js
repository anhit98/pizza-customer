'use strict'; 
const Hapi = require('hapi'); 
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');
const Authentication = require("./plugin/user.js");
require('dotenv').config()
const port=process.env.PORT || 3050
const server = Hapi.server({ port: port, host: process.env.HOST}); 

const init = async () => {
    
    const swaggerOptions = {
            info: {
                    title: 'Customer API Documentation',
                    version: Pack.version,
                },
            };
        
        await server.register([
            // await Auth,
            // myAuth,
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
            // Authentication
        ]);
        await server.start(); 
        console.log(`Server running at: ${server.info.uri}`); 
        server.route(require('./../src/routes/user'));
}; 

init().catch(err => {
    console.error('An error happened while initializing the server', {
        err,
    });
    process.exit(1);
});
module.exports = server;
