const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    message: [String]
});
const Users = mongoose.model('Users', usersSchema);
module.exports = Users;