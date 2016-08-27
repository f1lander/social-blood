var express = require('express');
var router = express.Router();
var BloodBankController = require('../controllers/BloodBankController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    BloodBankController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    BloodBankController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    BloodBankController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    BloodBankController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    BloodBankController.remove(req, res);
});

module.exports = router;
