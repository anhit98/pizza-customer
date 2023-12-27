// init-mongo.js

// Connect to the MongoDB instance
db.createUser({
    user: "admin",
    pwd: "123456",
    roles: [
        {
            role: "readWrite",
            db: "order",
        },
    ],
});

// Define your seed data
var users = [
    {
        "_id" : ObjectId("658a4e97a7c87322bc4c1ed2"),
        "username" : "admin",
        "firstName" : "ad",
        "lastName" : "min",
        "email" : "admin@gmail.con",
        "password" : "$2b$10$NXJaut/XwypdvprpP49qPu.SFo2lcdr7tYQbClphyMKdn55Hhbn0G",
        "phone" : "0309878878",
        "userStatus" : 0,
        "scope" : "admin",
    }
    // Add more data as needed
];
db.users.insertMany(users);
