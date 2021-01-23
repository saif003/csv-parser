const express = require('express');
var router = express.Router();
const fileReader = require('../middlewares/fileReader');

router.get('/csv', fileReader('assets/workbook2.csv'));

// router.get('/prn', fileReader('assets/workbook2.prn', ' '));

module.exports = router;
