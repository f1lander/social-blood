var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var donorSchema = new Schema({
	name : {type: String},
	lastname : {type: String},
	address:{type:String},
	location : { type:[Number], index: '2d', required: true, unique:false},
	bloodtype : {type: String},
	gender:{type:String},
	age:{type:Number},
	weight:{type:Number}
});

// mongodb://<dbuser>:<dbpassword>@ds039155.mlab.com:39155/social-blood-db
module.exports = mongoose.model('donor', donorSchema);