var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: [true, 'email not found'] }, 
  password: { type: String, required: [true, 'password not found'] },
  mobile: Number,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

module.exports = {
  "UserModel": mongoose.model('UserModel', userSchema)
}