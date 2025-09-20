const OrderStatus = require('../models/orderStatus');

exports.createOrderStatus = async (req, res) => {
    try {
        const { collectId,orderamount,transactionAmount,paymentMode, paymentDetails,  bankReference,  paymentMessage, status,errorMessage,  } = req.body;

        const orderStatus = await OrderStatus.create({
            collectId,
            orderamount,
            transactionAmount,
            paymentMode,
            paymentDetails,
            bankReference,
            paymentMessage,
            status,
            errorMessage,
        });

        res.status(201).json({ success: true, data: orderStatus });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const updated = await OrderStatus.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Status not found' });
        }
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.getOrderStatus = async (req, res) => {
    try {
        const status = await OrderStatus.findById(req.params.id)
            .populate({
                path: 'collectId',
                populate: { path: 'studentinfo', select: 'name email' },
            });

        if (!status) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

       
        if (req.user.role === 'student') {
            if (status.collectId.studentinfo.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to view this transaction' });
            }
        }

        res.json({ success: true, data: status });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.getAllOrderStatuses = async (req, res) => {
    try {
        const { status, from, to } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (from || to) {
            filter.paymentTime = {};
            if (from) filter.paymentTime.$gte = new Date(from);
            if (to) filter.paymentTime.$lte = new Date(to);
        }

        const statuses = await OrderStatus.find(filter)
            .populate({
                path: 'collectId',
                populate: { path: 'studentinfo', select: 'name email' },
            })
            .sort({ paymentTime: -1 });

        res.json({ success: true, count: statuses.length, data: statuses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};