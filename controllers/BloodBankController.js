var BloodBankModel = require('../models/BloodBankModel.js');
var donorModel = require('../models/donorModel.js');

var nodemailer = require('nodemailer');


var mailer2 = { sendMail : function(donor, bank) {
    console.log("mailer.sendMail ...");
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://excalibur506x%40gmail.com:LunaLuna.005@smtp.gmail.com');

    var message = `
    <body>
        <p>
        Dear $name

        We have an request for blood type <b>$type</b>

        If you currently have the required gratefully reply this email 

        Looking forward to hear from you

        The Social Blood Team
        </p>
    </body>
    </html>
    `;

    message = message.replace("$name", bank.name);
    message = message.replace("$type", donor.bloodtype ? donor.blootype : "--");

    console.log(message);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Social Blood" <excalibur506x@gmail.com>', // sender address
        to: bank.email, // list of receivers
        subject: 'Blood request', // Subject line
        text: 'Blood type request', // plaintext body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });    
} };


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
            var BloodBank = new BloodBankModel(req.body.bank);

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

                var banks = BloodBankModel.find(filter, function (err, banks) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error geo locating the blood bank.',
                            error: err
                        });
                    }

                    for (index in banks) {
                        mailer2.sendMail(donor, banks[index]);
                    }
                    return res.json(banks);
                });
            });
        }
    }
};
