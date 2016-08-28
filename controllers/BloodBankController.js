var BloodBankModel = require('../models/BloodBankModel.js');
var donorModel = require('../models/donorModel.js');

var nodemailer = require('nodemailer');


var mailer2 = { 
    sendMailBank : function(donor, bank) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://excalibur506x%40gmail.com:LunaLuna.005@smtp.gmail.com');

        var message = `
        <body>
            <p>
            Señores $name<br>
<br>
            Se requiere el siguuiente sangre del tipo <b>$type</b><br>
<br>
            Si ustedes cuentan en inventario con este tipo, <br>
            le agradeceriamos nos pueda reenviar este correo indicandonoslo.<br> 
<br>
            Quedamos a la espera de su respuesta<br>
<br>
            Equipo de Sangre Social<br>
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
    },
    sendMailDonor : function(donor, banks) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://excalibur506x%40gmail.com:LunaLuna.005@smtp.gmail.com');

        var message = `
        <body>
            <p>
            Señor $name<br>
<br>
            Hemos contactado via correo electrònico a <b>$banks</b> bancos de sangre, para su solicitud<br>

            Confiamos contactarlo pronto con una respuesta positiva a su solicitud.<br>
<br>
            Equipo de Sangre Social<br>
            </p>
        </body>
        </html>
        `;

        console.log("donor: ", donor);
        message = message.replace("$name", donor.name + " " + donor.lastname);
        message = message.replace("$banks", banks.length + "");

        console.log(message);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Social Blood" <excalibur506x@gmail.com>', // sender address
            to: donor.email, // list of receivers
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
    }
};




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
         * BloodBankController.show()
         */
        login: function (req, res) {
            var user = req.body.user;
            var password = req.body.password;
            BloodBankModel.findOne({ user: user }, function (err, BloodBank) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting BloodBank.',
                        error: err
                    });
                }
                if (!BloodBank) {
                    return res.status(404).json({
                        message: 'Usuario/Clave Incorrectos'
                    });
                }
                if (BloodBank.password === password) {                    
                    return res.json(BloodBank);
                } else {
                    return res.status(404).json({
                        message: 'Usuario/Clave Incorrectos'
                    });
                }
            });
        },

        /**
         * BloodBankController.create()
         */
        create: function (req, res) {
            console.log(req.body.bank);
            var BloodBank = new BloodBankModel(req.body.bank);

            BloodBankModel.findOne({ user: BloodBank.user }, function (err, data) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting BloodBank.',
                        error: err
                    });
                }
                if (data) {
                    return res.status(404).json({
                        message: 'User already exit'
                    });
                }
                BloodBank.save(function (err, _data) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating BloodBank',
                            error: err
                        });
                    }
                    return res.status(201).json(_data);
                });
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

                BloodBankModel.find(filter, function (err, banks) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error geo locating the blood bank.',
                            error: err
                        });
                    }

                    banks.forEach(function(index, bank) {
                        mailer2.sendMailBank(donor, bank);
                    });
                    if (donor.allowEmail) {
                        mailer2.sendMailDonor(donor, banks);
                    }
                    return res.status(200).send(true);                 
                });
            });
        }
    }
};
