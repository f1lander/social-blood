var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BloodBankSchema = new Schema({
	name : String,
	location : { type:[Number], index: '2d', required: true, unique:false},
	contact : String,
	phone : String,
	address : String,
	email : String
});

module.exports = mongoose.model('BloodBank', BloodBankSchema);
