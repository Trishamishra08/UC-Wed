const Vendor = require('../vendor/Vendor');
const User = require('../user/user.model');
const SubscriptionPlan = require('./SubscriptionPlan');

// @desc    Get all subscription plans
// @route   GET /api/admin/subscription-plans
// @access  Private/Admin
exports.getAllSubscriptionPlans = async (req, res, next) => {
    try {
        const plans = await SubscriptionPlan.find().sort('-createdAt');
        
        if (plans.length === 0) {
            // Create initial default plan
            const defaultPlan = await SubscriptionPlan.create({
                name: 'Premium Partner',
                price: 4999,
                durationValue: 1,
                durationUnit: 'year',
                features: ['All Features']
            });
            return res.status(200).json({ success: true, data: [defaultPlan] });
        }

        res.status(200).json({
            success: true,
            data: plans
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create subscription plan
// @route   POST /api/admin/subscription-plans
// @access  Private/Admin
exports.createSubscriptionPlan = async (req, res, next) => {
    try {
        const { name, price, features, durationValue, durationUnit } = req.body;

        const plan = await SubscriptionPlan.create({
            name,
            price,
            features: features || ['Full Access'],
            durationValue,
            durationUnit,
            lastUpdatedBy: req.user.id
        });

        res.status(201).json({
            success: true,
            data: plan
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update subscription plan
// @route   PUT /api/admin/subscription-plans/:id
// @access  Private/Admin
exports.updateSubscriptionPlan = async (req, res, next) => {
    try {
        const { name, price, features, durationValue, durationUnit, isActive } = req.body;

        const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, {
            name,
            price,
            features,
            durationValue,
            durationUnit,
            isActive,
            lastUpdatedBy: req.user.id
        }, { new: true });

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all vendors
// @route   GET /api/admin/vendors
// @access  Private/Admin
exports.getAllVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find().sort('-createdAt');

        res.status(200).json({
            success: true,
            count: vendors.length,
            data: vendors
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update vendor status (Approve/Reject)
// @route   PUT /api/admin/vendors/:id/status
// @access  Private/Admin
exports.updateVendorStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const vendor = await Vendor.findByIdAndUpdate(req.params.id, { 
            status,
            isVerified: status === 'Approved'
        }, {
            new: true,
            runValidators: true
        });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res, next) => {
    try {
        const [vendorCount, userCount, pendingVendors] = await Promise.all([
            Vendor.countDocuments(),
            User.countDocuments({ role: 'user' }),
            Vendor.countDocuments({ status: 'Pending' })
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalVendors: vendorCount,
                totalUsers: userCount,
                pendingApprovals: pendingVendors
            }
        });
    } catch (err) {
        next(err);
    }
};
