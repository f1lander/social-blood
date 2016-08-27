var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BloodBankSchema = new Schema({
	'name' : String,
	'location' : Number,
	'contact' : String,
	'phone' : String,
	'address' : String,
	'email' : String
});

// mongo ds039155.mlab.com:39155/social-blood-db -u excalibur506 -p luna.5
// mongodb://excalibur506:luna.5@ds039155.mlab.com:39155/social-blood-db
module.exports = mongoose.model('BloodBank', BloodBankSchema);
