const express = require('express');
var router = express.Router();
const csvReader = require('../middlewares/csvReader');
const prnReader = require('../middlewares/prnReader');

router.get('/csv', csvReader('assets/workbook2.csv'));
router.get('/prn', prnReader('assets/workbook2.prn'));

module.exports = router;
