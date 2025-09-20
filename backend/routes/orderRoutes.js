const express = require('express');
const { createOrder, updateStatus, getAllTransactions } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize('student', 'admin'), createOrder);
router.post('/:orderId/status', protect, updateStatus);
router.get('/transactions', protect, authorize('admin'), getAllTransactions);

module.exports = router;
