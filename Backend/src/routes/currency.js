const express = require('express');
const Currency = require('../controllers/currency');

const router = express.Router();

//INDEX
router.get('/', Currency.index);

//STORE
router.post('/add', Currency.store);

//SHOW
router.get('/:id', Currency.show);

//UPDATE
router.put('/:id', Currency.update);

//DELETE
router.delete('/:id', Currency.destroy);

module.exports = router;
