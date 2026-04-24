import { useState, useMemo } from 'react';
import Icon from '../../../components/ui/Icon';

const INITIAL_VENDORS = [
    { id: 1, name: 'Royal Photography', owner: 'Arjun Das', category: 'Photographer', status: 'Pending', city: 'Indore', revenue: '₹4.2L' },
    { id: 2, name: 'Floral Dreams', owner: 'Meera Singh', category: 'Decorator', status: 'Verified', city: 'Bhopal', revenue: '₹8.1L' },
    { id: 3, name: 'Indore Caterers', owner: 'Rahul Jain', category: 'Caterer', status: 'Pending', city: 'Indore', revenue: '₹2.8L' },
    { id: 4, name: 'Grand Venues', owner: 'Suresh Kumar', category: 'Venue', status: 'Rejected', city: 'Ujjain', revenue: '₹0' },
    { id: 5, name: 'Style & Blush', owner: 'Priya Sharma', category: 'Makeup Artist', status: 'Verified', city: 'Dewas', revenue: '₹1.5L' },
];

const AdminVendors = () => {
    const [vendors, setVendors] = useState(INITIAL_VENDORS);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVendors = useMemo(() => {
        return vendors.filter(v => {
            const matchStatus = filter === 'All' || v.status === filter;
            const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchStatus && matchSearch;
        });
    }, [vendors, filter, searchQuery]);

    const toggleStatus = (id) => {
        setVendors(prev => prev.map(v => {
            if (v.id === id) {
                const nextStatus = v.status === 'Verified' ? 'Pending' : 'Verified';
                return { ...v, status: nextStatus };
            }
            return v;
        }));
    };

    const deleteVendor = (id) => {
        if (window.confirm('Are you sure you want to decouple this vendor node?')) {
            setVendors(prev => prev.filter(v => v.id !== id));
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
                                <tr key={vendor.id} className="group hover:bg-primary-50/10 transition-colors">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                                <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${vendor.name}`} className="h-6 w-6 opacity-60" alt={vendor.name} />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-black text-slate-900 leading-tight">{vendor.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">{vendor.owner}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{vendor.category}</span>
                                    </td>
                                    <td className="px-5 py-3 text-[11px] font-bold text-slate-600">{vendor.city}</td>
                                    <td className="px-5 py-3">
                                        <p className="text-[11px] font-black text-slate-900">{vendor.revenue}</p>
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() => toggleStatus(vendor.id)}
                                            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                                        >
                                            <div className={`h-1 w-1 rounded-full ${vendor.status === 'Verified' ? 'bg-emerald-500' :
                                                    vendor.status === 'Pending' ? 'bg-amber-500' :
                                                        'bg-rose-500'
                                                }`} />
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${vendor.status === 'Verified' ? 'text-emerald-600' :
                                                    vendor.status === 'Pending' ? 'text-amber-600' :
                                                        'text-rose-600'
                                                }`}>
                                                {vendor.status}
                                            </span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:text-primary-400 transition-all">
                                                <Icon name="eye" size="xs" />
                                            </button>
                                            <button
                                                onClick={() => deleteVendor(vendor.id)}
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
