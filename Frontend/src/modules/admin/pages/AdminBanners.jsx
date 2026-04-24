import { useState } from 'react';
import Icon from '../../../components/ui/Icon';

const bannersData = [
    { id: 1, title: 'Summer Wedding Bonanza 2024', status: 'Active', clicks: '1,240', ctr: '3.2%', placement: 'Hero Main', platform: 'Mobile/Web' },
    { id: 2, title: 'Premium Decor Showcase', status: 'Draft', clicks: '-', ctr: '-', placement: 'Sub-Category', platform: 'Web' },
    { id: 3, title: 'Royal Venue Collection', status: 'Active', clicks: '842', ctr: '1.9%', placement: 'Featured List', platform: 'All' },
    { id: 4, title: 'Early Bird Bridal Offers', status: 'Scheduled', clicks: '-', ctr: '-', placement: 'Popup Modal', platform: 'All' },
];

const AdminBanners = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Promotion Assets</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Marketing Nodes & Banner Deployments</p>
                </div>
                <button className="h-8 px-4 rounded-lg bg-primary-400 text-white text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-primary-500 transition-all active:scale-95">
                    Upload Asset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Impressions</p>
                    <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">84.2k</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Conversion</p>
                    <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">2.84%</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Asset Title</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Placement</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Platform</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">CTR</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                <th className="px-6 py-4 text-right border-b border-slate-100"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bannersData.map((b) => (
                                <tr key={b.id} className="hover:bg-primary-50/10 transition-colors group">
                                    <td className="px-6 py-3">
                                        <p className="text-[11px] font-black text-slate-900">{b.title}</p>
                                    </td>
                                    <td className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase">{b.placement}</td>
                                    <td className="px-5 py-3 text-[10px] font-bold text-slate-400">{b.platform}</td>
                                    <td className="px-5 py-3 text-[11px] font-black text-primary-500">{b.ctr}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${b.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                                b.status === 'Scheduled' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-slate-100 text-slate-400'
                                            }`}>{b.status}</span>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <button className="text-[9px] font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest opacity-0 group-hover:opacity-100">Edit Node</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBanners;
