const mongoose = require('mongoose');

const connDB = async () => {

 await mongoose.connect(process.env.MONGO_URI)
.then( () => console.log('Connected to MongoDB successfully'))
.catch(err => console.log(err));

};

module.exports = connDB;