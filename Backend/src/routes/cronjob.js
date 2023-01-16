const express = require('express');
const Cronjob = require('../controllers/cronjob');
const router = express.Router();

router.get('/get-market-data', Cronjob.getMarketData);

module.exports = router;
