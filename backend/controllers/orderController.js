const Order = require('../models/orderSchem');
const OrderStatus = require('../models/orderStatus');
const WebhookLog = require('../models/webHookLog');
const User = require('../models/userSchema');



exports.createOrder = async (req, res) => {
    try {
        const { schoolid, trusteeid, gatewayName } = req.body;

        const order = await Order.create({
            schoolid,
            trusteeid,
            studentinfo: req.user._id,
            gatewayName,
        });


        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.updateStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const data = req.body;

        const orderStatus = await OrderStatus.create({ collectId: orderId, ...data });
        res.status(201).json({ success: true, orderStatus });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getAllTransactions = async (req, res) => {
    try {
        const { studentId, schoolId, from, to } = req.query;

        const filter = {};

       
        if (studentId) {
            const student = await User.findOne({ id: studentId });
            if (!student) {
                return res.json({ success: true, count: 0, data: [] });
            }
            filter.studentinfo = student._id;
        }

        
        if (schoolId) {
            filter.schoolid = schoolId;
        }

       
        if (from || to) {
            filter.paymentTime = {};
            if (from) filter.paymentTime.$gte = new Date(from);
            if (to) filter.paymentTime.$lte = new Date(to);
        }

        const statuses = await OrderStatus.find(filter)
            .populate({
                path: 'collectId',
                populate: { path: 'studentinfo', select: 'name email id' },
            })
            .sort({ paymentTime: -1 });

        res.json({ success: true, count: statuses.length, data: statuses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
