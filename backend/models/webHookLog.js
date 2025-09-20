const mongoose = require('mongoose');

const webhookLogSchema = new mongoose.Schema(
  {
    event: {
      type: String,           
      required: true,
    },
    source: {
      type: String,           
    },
    requestId: {
      type: String,           
      index: true,
    },
    payload: {
      type: Object,           
      required: true,
    },
    headers: {
      type: Object,         
    },
    orderId: {
      type: String,         
      index: true,
    },
    status: {
      type: String,
      enum: ['received', 'processed', 'failed'],
      default: 'received',
    },
    responseMessage: {
      type: String,       
    },
    retries: {
      type: Number,
      default: 0,
    },
    processedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30d',
    },
  },
  { timestamps: true }     
);

module.exports = mongoose.model('WebhookLog', webhookLogSchema);
