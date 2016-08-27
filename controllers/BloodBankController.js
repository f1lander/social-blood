var BloodBankModel = require('../models/BloodBankModel.js');
var donorModel = require('../models/donorModel.js');

/**
 * BloodBankController.js
 *
 * @description :: Server-side logic for managing BloodBanks.
 */
module.exports = function() {
    return {
        /**
         * BloodBankController.list()
         */
        list: function (req, res) {
            BloodBankModel.find(function (err, BloodBanks) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting BloodBank.',
                        error: err
                    });
                }
                return res.json(BloodBanks);
            });
        },

        /**
         * BloodBankController.show()
         */
        show: function (req, res) {
            var id = req.params.id;
            BloodBankModel.findOne({ _id: id }, function (err, BloodBank) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting BloodBank.',
                        error: err
                    });
                }
                if (!BloodBank) {
                    return res.status(404).json({
                        message: 'No such BloodBank'
                    });
                }
                return res.json(BloodBank);
            });
        },

        /**
         * BloodBankController.create()
         */
        create: function (req, res) {
            var BloodBank = new BloodBankModel({
                name: req.body.name,
                location : { coordinates : req.body.location },
                contact: req.body.contact,
                phone: req.body.phone,
                address: req.body.address,
                email: req.body.email
            });

            BloodBank.save(function (err, BloodBank) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating BloodBank',
                        error: err
                    });
                }
                return res.status(201).json(BloodBank);
            });
        },

        /**
         * BloodBankController.update()
         */
        update: function (req, res) {
            var id = req.params.id;
            BloodBankModel.findOne({ _id: id }, function (err, BloodBank) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting BloodBank',
                        error: err
                    });
                }
                if (!BloodBank) {
                    return res.status(404).json({
                        message: 'No such BloodBank'
                    });
                }

                BloodBank.name = req.body.name ? req.body.name : BloodBank.name;
                BloodBank.location = req.body.location ? req.body.location : BloodBank.location;
                BloodBank.contact = req.body.contact ? req.body.contact : BloodBank.contact;
                BloodBank.phone = req.body.phone ? req.body.phone : BloodBank.phone;
                BloodBank.address = req.body.address ? req.body.address : BloodBank.address;
                BloodBank.email = req.body.email ? req.body.email : BloodBank.email;

                BloodBank.save(function (err, BloodBank) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating BloodBank.',
                            error: err
                        });
                    }

                    return res.json(BloodBank);
                });
            });
        },

        /**
         * BloodBankController.remove()
         */
        remove: function (req, res) {
            var id = req.params.id;
            BloodBankModel.findByIdAndRemove(id, function (err, BloodBank) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when deleting the BloodBank.',
                        error: err
                    });
                }
                return res.status(204).json();
            });
        },

        /**
         * BloodBankController.remove()
         */
        requestBlood: function (req, res) {
            var id = req.body.id;
            var kmLimit = req.body.kmLimit;
            console.log("kmLimit: ", kmLimit);
            donorModel.findById( id , function (err, donor) {
                if (err) {
                    return res.status(500).json({
                        message: 'Not found.',
                        error: err
                    });
                }

                var filter = {
                    location: {
                        $nearSphere: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [donor.location.coordinates[0], donor.location.coordinates[1]]
                            },
                            $maxDistance: kmLimit
                        }
                    }
                };
                BloodBankModel.find(filter, function (err, bloodBank) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error geo locating the blood bank.',
                            error: err
                        });
                    }
                    return res.json(bloodBank);
                });
            });
        }
    }
};
