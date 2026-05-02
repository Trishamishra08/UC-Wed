const express = require('express');
const { 
    getAllVendors, 
    updateVendorStatus,
    getStats,
    getAllSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan
} = require('./adminController');

const router = express.Router();

const { protect, authorize } = require('../../middleware/auth.middleware');

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/vendors', getAllVendors);
router.put('/vendors/:id/status', updateVendorStatus);
router.get('/stats', getStats);
router.get('/subscription-plans', getAllSubscriptionPlans);
router.post('/subscription-plans', createSubscriptionPlan);
router.put('/subscription-plans/:id', updateSubscriptionPlan);

module.exports = router;
