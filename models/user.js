var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

userSchema = Schema({
	name:String,
	email:{ type: String, unique: true },
	password:String,
	gender:String,
	contact:String
});

module.exports = mongoose.model('users',userSchema);