import { useState, useMemo } from 'react';
import Icon from '../../../components/ui/Icon';

const INITIAL_SUBS = [
    { id: 101, u: 'Royal Photography', p: 'Premium', c: 'Yearly', d: '20 Oct 2024', v: '₹49,999' },
    { id: 102, u: 'Floral Dreams', p: 'Gold', c: 'Monthly', d: '21 Oct 2024', v: '₹2,499' },
    { id: 103, u: 'Indore Caterers', p: 'Standard', c: 'Monthly', d: '22 Oct 2024', v: '₹999' },
    { id: 104, u: 'Grand Venues', p: 'Premium', c: 'Yearly', d: '15 Nov 2024', v: '₹49,999' },
];

const AdminSubscriptions = () => {
    const [billingCycle, setBillingCycle] = useState('Monthly');
    const [subs, setSubs] = useState(INITIAL_SUBS);
    const [searchQuery, setSearchQuery] = useState('');

    const plans = [
        { name: 'Standard Partner', monthly: '₹999', yearly: '₹9,999', vendors: 142, icon: 'rocket', color: 'bg-slate-100 text-slate-500' },
        { name: 'Gold Affiliate', monthly: '₹2,499', yearly: '₹24,999', vendors: 86, icon: 'sparkles', color: 'bg-amber-50 text-amber-500' },
        { name: 'Premium Agency', monthly: '₹4,999', yearly: '₹49,999', vendors: 24, icon: 'money', color: 'bg-primary-50 text-primary-400' },
    ];

    const filteredSubs = useMemo(() => {
        return subs.filter(s =>
            s.u.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.p.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [subs, searchQuery]);

    const terminateSub = (id) => {
        if (window.confirm('Revoke this partner license? Access will be decoupled immediately.')) {
            setSubs(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Vendor Licensing</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Managing Multi-Cycle Monetization</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Icon name="search" size="xs" color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Grep subscribers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold focus:ring-2 focus:ring-primary-400/10 outline-none w-48 transition-all"
                        />
                    </div>
                    <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                        {['Monthly', 'Yearly'].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
                                className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${billingCycle === cycle ? 'bg-primary-400 text-white shadow-sm' : 'text-slate-400 hover:text-slate-900'
                                    }`}
                            >
                                {cycle}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-primary-400 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${plan.color}`}>
                                <Icon name={plan.icon} size="xs" color="current" />
                            </div>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase ${billingCycle === 'Yearly' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                {billingCycle === 'Yearly' ? 'Save 17%' : 'Default'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-[13px] font-black text-slate-900 tracking-tight leading-none">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <p className="text-2xl font-black text-slate-900 tracking-tighter">
                                    {billingCycle === 'Monthly' ? plan.monthly : plan.yearly}
                                </p>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">/ {billingCycle === 'Monthly' ? 'mo' : 'yr'}</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[14px] font-black text-slate-800 leading-none">{plan.vendors}</span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Partners</span>
                            </div>
                            <button className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Config</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm min-h-[300px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-5 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Partner</th>
                                <th className="px-4 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Tier / Cycle</th>
                                <th className="px-4 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Next Billing</th>
                                <th className="px-4 py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Valuation</th>
                                <th className="px-5 py-4 text-right border-b border-slate-100">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredSubs.length > 0 ? filteredSubs.map((sub) => (
                                <tr key={sub.id} className="hover:bg-primary-50/5 transition-colors group">
                                    <td className="px-5 py-2.5 text-[11px] font-black text-slate-900">{sub.u}</td>
                                    <td className="px-4 py-2.5">
                                        <div className="flex flex-col">
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${sub.p === 'Premium' ? 'text-primary-500' : sub.p === 'Gold' ? 'text-amber-500' : 'text-slate-500'}`}>{sub.p}</span>
                                            <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">{sub.c}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase">{sub.d}</td>
                                    <td className="px-4 py-2.5 text-[11px] font-black text-slate-900">{sub.v}</td>
                                    <td className="px-5 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                            <button className="text-[8px] font-black text-primary-400 uppercase hover:text-primary-600 transition-colors">Invoice</button>
                                            <button
                                                onClick={() => terminateSub(sub.id)}
                                                className="text-[8px] font-black text-rose-400 uppercase hover:text-rose-600 transition-colors"
                                            >
                                                Revoke
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No subscribers match grep query</p>
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

export default AdminSubscriptions;
