
require('dotenv').config();
const mongoose  = require("mongoose");
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DP_HOST;
const url = process.env.MONGOLAB_URI;
console.log(username, password, host)
// const url = `mongodb+srv://${username}:${password}${host}`;
// const d ="mongodb+srv://NHI-NGUYEN_97:nhinguyen040197%40@cluster0-odomf.mongodb.net/order?retryWrites=true";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});
let db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Connected succesfully to server");
});