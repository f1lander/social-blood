var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BloodBankSchema = new Schema({
	name : String,
	location: { type: { type: String, enum: "Point", default: "Point" }, coordinates: { type: [Number], default: [0, 0] } },
	contact : String,
	phone : String,
	address : String,
	email : String
});

BloodBankSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BloodBank', BloodBankSchema);
