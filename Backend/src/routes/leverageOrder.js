const express = require('express');
const LeverageOrder = require('../controllers/leverageOrder');

const router = express.Router();

router.get('/getPendingOrders', LeverageOrder.getPendingOrders)

router.put('/stop/:id', LeverageOrder.stop);

router.get('/user-orders/:id', LeverageOrder.userOrders);

// RESOLVE ORDERS
router.get('/resolve-orders', LeverageOrder.ordersCron);

//INDEX
router.get('/', LeverageOrder.index);

//STORE
router.post('/add', LeverageOrder.store);

//SHOW
router.get('/:id', LeverageOrder.show);

//UPDATE
// router.put('/update', LeverageOrder.accountsAgainstId);

//DELETE
router.delete('/:id', LeverageOrder.destroy);

module.exports = router;
