import { useState, useMemo, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { adminApi } from '../services/adminApi';

const AdminVendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const token = localStorage.getItem('adminToken');

    const fetchVendors = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getVendors(token);
            if (res.success) {
                setVendors(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch vendors:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const filteredVendors = useMemo(() => {
        return vendors.filter(v => {
            const statusMap = {
                'Verified': 'Approved',
                'Pending': 'Pending',
                'Rejected': 'Rejected'
            };
            const targetStatus = statusMap[filter] || filter;
            const matchStatus = filter === 'All' || v.status === targetStatus;
            const matchSearch = (v.businessName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (v.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (v.category || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchStatus && matchSearch;
        });
    }, [vendors, filter, searchQuery]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const nextStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
            const res = await adminApi.updateVendorStatus(id, nextStatus, token);
            if (res.success) {
                setVendors(prev => prev.map(v => v._id === id ? res.data : v));
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const deleteVendor = (id) => {
        if (window.confirm('Are you sure you want to decouple this vendor node?')) {
            // Delete logic can be added later
            setVendors(prev => prev.filter(v => v._id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Partners Console</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Vendor Ecosystem Oversight</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Icon name="search" size="xs" color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Grep partners..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold focus:ring-2 focus:ring-primary-400/10 outline-none w-56 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
                        {['All', 'Pending', 'Verified'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${filter === status
                                        ? 'bg-primary-400 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-900'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Partner Details</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Service</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">City</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Stat</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Verify</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredVendors.length > 0 ? filteredVendors.map((vendor) => (
                                <tr key={vendor._id} className="group hover:bg-primary-50/10 transition-colors">
                                     <td className="px-6 py-3">
                                         <div className="flex items-center gap-3">
                                             <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                                 <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${vendor.businessName}`} className="h-6 w-6 opacity-60" alt={vendor.businessName} />
                                             </div>
                                             <div>
                                                 <p className="text-[12px] font-black text-slate-900 leading-tight">{vendor.businessName}</p>
                                                 <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">{vendor.fullName}</p>
                                             </div>
                                         </div>
                                     </td>
                                     <td className="px-5 py-3">
                                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{vendor.category}</span>
                                     </td>
                                     <td className="px-5 py-3 text-[11px] font-bold text-slate-600">{vendor.city}</td>
                                     <td className="px-5 py-3">
                                         <p className="text-[11px] font-black text-slate-900">₹{(vendor.subscription?.amount || 0).toLocaleString()}</p>
                                     </td>
                                     <td className="px-5 py-3">
                                         <button
                                             onClick={() => toggleStatus(vendor._id, vendor.status)}
                                             className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                                         >
                                             <div className={`h-1 w-1 rounded-full ${vendor.status === 'Approved' ? 'bg-emerald-500' :
                                                     vendor.status === 'Pending' ? 'bg-amber-500' :
                                                         'bg-rose-500'
                                                 }`} />
                                             <span className={`text-[9px] font-black uppercase tracking-widest ${vendor.status === 'Approved' ? 'text-emerald-600' :
                                                     vendor.status === 'Pending' ? 'text-amber-600' :
                                                         'text-rose-600'
                                                 }`}>
                                                 {vendor.status === 'Approved' ? 'Verified' : vendor.status}
                                             </span>
                                         </button>
                                     </td>
                                     <td className="px-6 py-3 text-right">
                                         <div className="flex items-center justify-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                             <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:text-primary-400 transition-all">
                                                 <Icon name="eye" size="xs" />
                                             </button>
                                             <button
                                                 onClick={() => deleteVendor(vendor._id)}
                                                 className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-rose-500 hover:text-rose-500 transition-all"
                                             >
                                                 <Icon name="logout" size="xs" />
                                             </button>
                                         </div>
                                     </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No nodes match your query</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminVendors;
