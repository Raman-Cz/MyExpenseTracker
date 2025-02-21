const mongoose = require('mongoose');

const db = async() => {
    try{
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected Successfully");
    }
    catch(err){
        console.log("Error in connecting to database");
    }
}
module.exports = {db};