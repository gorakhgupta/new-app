const mongoose = require('mongoose');

// Define a schema for your data
const Users = new mongoose.Schema({
  name: { type: String,},
  email: { type: String, required: true },
  mobile: { type: Number, },
  gender: { type: String },
  password: { type: String, required: true },
});

// Create a model based on the schema
const UsersModel = mongoose.model('user', Users);
module.exports = UsersModel;
