var BloodBankModel = require('../models/BloodBankModel.js');

/**
 * BloodBankController.js
 *
 * @description :: Server-side logic for managing BloodBanks.
 */
module.exports = {

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
        BloodBankModel.findOne({_id: id}, function (err, BloodBank) {
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
        BloodBankModel.findOne({_id: id}, function (err, BloodBank) {
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
    }
};