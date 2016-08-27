var express = require('express');
var router = express.Router();
var BloodBankController = require('../controllers/BloodBankController.js')();

/*
 * GET
 */
router.get('/', BloodBankController.list);

/*
 * GET
 */
router.get('/:id', BloodBankController.show);

/*
 * POST
 */
router.post('/', BloodBankController.create);

/*
 * PUT
 */
router.put('/:id', BloodBankController.update);

/*
 * DELETE
 */
router.delete('/:id', BloodBankController.remove);

/*
 * POST
 */
router.post('/requestBlood', BloodBankController.requestBlood);

module.exports = router;
