var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var donorSchema = new Schema({
	name : {type: String},
	lastname : {type: String},
	address:{type:String},
	location: { type: { type: String, enum: "Point", default: "Point" }, coordinates: { type: [Number], default: [0, 0] } },
	bloodtype : {type: String},
	gender:{type:String},
	age:{type:Number},
	weight:{type:Number}
});


donorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('donor', donorSchema);