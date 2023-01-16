const express = require('express');
const Account = require('../controllers/account');

const router = express.Router();

//INDEX
router.get('/', Account.index);

//STORE
router.post('/add', Account.store);

//SHOW
router.get('/:id', Account.show);

//UPDATE
router.put('/update', Account.accountsAgainstId);

//DELETE
router.delete('/:id', Account.destroy);

module.exports = router;
