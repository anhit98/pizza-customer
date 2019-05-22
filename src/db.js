const mongoose  = require("mongoose");
const url = "mongodb://localhost:27017/user";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});
let db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Connected succesfully to server");
});