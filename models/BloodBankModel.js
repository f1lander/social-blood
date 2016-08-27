var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BloodBankSchema = new Schema({

// mongo ds039155.mlab.com:39155/social-blood-db -u excalibur506 -p luna.5
// mongodb://excalibur506:luna.5@ds039155.mlab.com:39155/social-blood-db
	name : String,
	location : { type:[Number], index: '2d', required: true, unique:false},
	contact : String,
	phone : String,
	address : String,
	email : String
});

module.exports = mongoose.model('BloodBank', BloodBankSchema);
