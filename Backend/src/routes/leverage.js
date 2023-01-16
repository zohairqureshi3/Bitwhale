const express = require('express');
const Leverage = require('../controllers/leverage');

const router = express.Router();

//INDEX
router.get('/', Leverage.index);

//STORE
router.post('/add', Leverage.store);

//SHOW
router.get('/:id', Leverage.show);

//UPDATE
router.put('/:id', Leverage.update);

//DELETE
router.delete('/:id', Leverage.destroy);

module.exports = router;
