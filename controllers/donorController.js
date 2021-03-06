var donorModel = require('../models/donorModel.js');

/**
 * donorController.js
 *
 * @description :: Server-side logic for managing donors.
 */
module.exports = {

    /**
     * donorController.list()
     */
    list: function(req, res) {
        donorModel.find(function(err, donors){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting donor.'
                });
            }
            return res.json(donors);
        });
    },
    
    getNearBy:function (req, res) {
        
    },

    /**
     * donorController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        donorModel.findOne({_id: id}, function(err, donor){
            if(err) {
                return res.status(500).json( {
                    message: 'Error getting donor.'
                });
            }
            if(!donor) {
                return res.json(404, {
                    message: 'No such donor'
                });
            }
            return res.json(donor);
        });
    },

    /**
     * BloodBankController.show()
     */
    login: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        console.log("login", email, password);
        donorModel.findOne({ email: email }, function (err, donor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Donor.',
                    error: err
                });
            }
            if (!donor) {
                return res.status(404).json({
                    message: 'Donante/Clave Incorrectos'
                });
            }
            if (donor.password === password) {                    
                return res.json(donor);
            } else {
                return res.status(404).json({
                    message: 'Donante/Clave Incorrectos'
                });
            }
        });
    },

    /**
     * donorController.create()
     */
    create: function(req, res) {        
       var donor = new donorModel(req.body.donor);
    
        //console.log(donor);
        donorModel.findOne({email: donor.email}, function(err, data){
            if(err) {
                return res.status(500).json( {
                    message: 'Error getting donor.'
                });
            }
            if(data) {
                return res.json(404, {
                    message: 'Donante ya tiene registrado ese correo'
                });
            }
            donor.save(function(err, donor){
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Error saving donor',
                        error: err
                    });
                }
                return res.json(donor);
            });
        });
    },

    /**
     * donorController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        donorModel.findOne({_id: id}, function(err, donor){
            if(err) {
                return res.status(500).json( {
                    message: 'Error saving donor',
                    error: err
                });
            }
            if(!donor) {
                return res.json(404, {
                    message: 'No such donor'
                });
            }

            donor.name =  req.body.name ? req.body.name : donor.name;
			donor.lastname =  req.body.lastname ? req.body.lastname : donor.lastname;
            donor.address =  req.body.address ? req.body.address : donor.address;
            donor.age =  req.body.age ? req.body.age : donor.age;
            donor.weight =  req.body.weight ? req.body.weight : donor.weight;
            donor.gender =  req.body.gender ? req.body.gender : donor.gender;
			donor.location =  req.body.location ? req.body.location : donor.location;
			donor.bloodtype =  req.body.bloodtype ? req.body.bloodtype : donor.bloodtype;
			
            donor.save(function(err, donor){
                if(err) {
                    return res.status(500).json( {
                        message: 'Error getting donor.'
                    });
                }
                if(!donor) {
                    return res.json(404, {
                        message: 'No such donor'
                    });
                }
                return res.json(donor);
            });
        });
    },

    /**
     * donorController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        donorModel.findByIdAndRemove(id, function(err, donor){
            if(err) {
                return res.status(500).json( {
                    message: 'Error getting donor.'
                });
            }
            return res.json(donor);
        });
    }
};