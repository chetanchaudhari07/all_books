const crypto = require('crypto');
const WebhookLog = require('../models/webHookLog');
const OrderStatus = require('../models/orderStatus');

exports.handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-signature'];
    const rawBody = req.body;
 

    if (!rawBody.orderId) {
      return res.status(400).json({ error: 'orderId is not defined in payload' });
    }

    const log = await WebhookLog.create({
      event: rawBody.event || 'unknown',
      source: 'gateway',
       requestId: rawBody.orderId,
      payload: rawBody,
      headers: req.headers,
    });

   
    if (rawBody.orderId) {
      await OrderStatus.findOneAndUpdate(
        { collectId: rawBody.orderId },
        { status: rawBody.status, paymentMessage: rawBody.message || '', processedAt: new Date() },
        { new: true }
      );
    }

    log.status = 'processed';
    log.processedAt = new Date();
    await log.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};