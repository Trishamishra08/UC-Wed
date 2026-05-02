const API_URL = '/api/admin';

export const adminApi = {
    getVendors: async (token) => {
        const res = await fetch(`${API_URL}/vendors`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await res.json();
    },

    updateVendorStatus: async (vendorId, status, token) => {
        const res = await fetch(`${API_URL}/vendors/${vendorId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        return await res.json();
    },

    getStats: async (token) => {
        const res = await fetch(`${API_URL}/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await res.json();
    },

    getSubscriptionPlans: async (token) => {
        const res = await fetch(`${API_URL}/subscription-plans`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await res.json();
    },

    createSubscriptionPlan: async (data, token) => {
        const res = await fetch(`${API_URL}/subscription-plans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    },

    updateSubscriptionPlan: async (id, data, token) => {
        const res = await fetch(`${API_URL}/subscription-plans/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
};
