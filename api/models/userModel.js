const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Utils = require("../utils");
const { usernameValidation } = Utils;

const UserSchema = new Schema({
  username: {type:String , required:true , unique:true , validate:usernameValidation },
  password: {type:String , required:true }
})

module.exports = mongoose.model('User',UserSchema)
