const express = require('express');
const {
    getAllVendors,
    updateVendorStatus,
    getStats,
    getAllSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('./adminController');

const router = express.Router();

const { protect, authorize } = require('../../middleware/auth.middleware');

// Public Category Route (for vendor registration)
router.get('/categories', getAllCategories);

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/vendors', getAllVendors);
router.put('/vendors/:id/status', updateVendorStatus);
router.get('/stats', getStats);
router.get('/subscription-plans', getAllSubscriptionPlans);
router.post('/subscription-plans', createSubscriptionPlan);
router.put('/subscription-plans/:id', updateSubscriptionPlan);
router.delete('/subscription-plans/:id', deleteSubscriptionPlan);

// Admin Category Management
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
