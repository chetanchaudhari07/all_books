const express = require('express');
const {
  createOrderStatus,
  updateOrderStatus,
  getOrderStatus,
  getAllOrderStatuses,
} = require('../controllers/orderStatusController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); 

router
  .route('/order-status')
  .post(authorize('student', 'admin'), createOrderStatus)
  .get(authorize('admin'), getAllOrderStatuses);

router
  .route('/:id')
  .get(getOrderStatus)
  .patch(authorize('admin'), updateOrderStatus);

module.exports = router;
