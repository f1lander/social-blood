var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BloodBankSchema = new Schema({	'name' : String,	'location' : Number,	'contact' : String,	'phone' : String,	'address' : String,	'email' : String});

module.exports = mongoose.model('BloodBank', BloodBankSchema);
