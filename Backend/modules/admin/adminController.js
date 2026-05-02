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

// @desc    Delete subscription plan
// @route   DELETE /api/admin/subscription-plans/:id
// @access  Private/Admin
exports.deleteSubscriptionPlan = async (req, res, next) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Plan deleted successfully'
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

const Category = require('./Category');

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Public (for registration) / Admin
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true }).sort('name');
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
};

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Category already exists' });
        }
        const category = await Category.create({ name, description });
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
    try {
        const { name, description, isActive } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name,
            description,
            isActive
        }, { new: true, runValidators: true });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted' });
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
