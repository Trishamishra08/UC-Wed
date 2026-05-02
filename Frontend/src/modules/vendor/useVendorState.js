import { useCallback, useEffect, useState } from 'react';
import { defaultVendorState } from './vendorStore';
import { vendorApi } from './vendorApi';

export const useVendorState = () => {
  const [vendorState, setVendorState] = useState(defaultVendorState);
  const [loading, setLoading] = useState(!!localStorage.getItem('vendorToken'));

  const fetchAllData = useCallback(async (token) => {
    setLoading(true);
    try {
      const [profileRes, statsRes, leadsRes, bookingsRes, notesRes] = await Promise.all([
        vendorApi.getProfile(token),
        vendorApi.getStats(token),
        vendorApi.getLeads(token),
        vendorApi.getBookings(token),
        vendorApi.getNotifications(token)
      ]);

      const newState = { ...defaultVendorState };

      if (profileRes.success) {
        Object.assign(newState, profileRes.data);
      }
      if (statsRes.success) {
        newState.analytics = statsRes.data;
      }
      if (leadsRes.success) {
        newState.leads = leadsRes.data;
      }
      if (bookingsRes.success) {
        newState.bookings = bookingsRes.data;
      }
      if (notesRes.success) {
        newState.notifications = notesRes.data;
      }

      setVendorState(newState);
    } catch (err) {
      console.error('Failed to fetch vendor data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      fetchAllData(token);
    }
  }, [fetchAllData]);

  const updateVendorState = useCallback((patch) => {
    setVendorState((prev) => ({ ...prev, ...patch }));
  }, []);

  return { vendorState, setVendorState, updateVendorState, loading, refreshData: () => fetchAllData(localStorage.getItem('vendorToken')) };
};
