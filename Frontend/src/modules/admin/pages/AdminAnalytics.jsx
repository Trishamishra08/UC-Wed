import Icon from '../../../components/ui/Icon';

const AdminAnalytics = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Growth Insights</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Quantitative Platform Performance</p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                    {['24H', '7D', '30D', '1Y'].map(t => (
                        <button key={t} className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest transition-all ${t === '7D' ? 'bg-primary-400 text-white shadow-sm' : 'text-slate-400 hover:text-slate-900'}`}>{t}</button>
                    ))}
                </div>
            </div>

            {/* High Density Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Session Velocity', val: '42.8k', g: '+14%', i: 'chart' },
                    { label: 'Conversion Lift', val: '3.24%', g: '+0.8%', i: 'sparkles' },
                    { label: 'Customer LTV', val: '₹14,290', g: '+5.2%', i: 'money' },
                    { label: 'Churn Index', val: '0.12%', g: '-2%', i: 'bell' },
                ].map(m => (
                    <div key={m.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary-400 transition-colors">
                                <Icon name={m.i} size="xs" color="current" />
                            </div>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${m.g.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{m.g}</span>
                        </div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{m.label}</p>
                        <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">{m.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Data Node */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Revenue Trajectory</h3>
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-400" />
                                <span className="text-slate-400">Current Node</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-200" />
                                <span className="text-slate-400">Baseline</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 w-full flex items-end justify-between px-2 pb-2 gap-3">
                        {[40, 70, 45, 90, 30, 80, 50, 60, 85, 40, 75, 55, 65, 45, 95].map((h, i) => (
                            <div key={i} className="flex-1 max-w-[12px] bg-slate-50 rounded-full relative group overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-400 opacity-20 h-full transform transition-transform duration-1000 scale-y-0 group-hover:scale-y-100" />
                                <div className="absolute inset-x-0 bottom-0 bg-primary-400 h-full rounded-full transition-all duration-700 opacity-60" style={{ height: `${h}%` }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Distribution Radar Placeholder */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Segment Mix</h3>
                    <div className="space-y-6">
                        {[
                            { l: 'Tier 1 Metro', p: 65, c: 'bg-primary-400' },
                            { l: 'Tier 2 Cities', p: 25, c: 'bg-emerald-400' },
                            { l: 'Emerging Mkts', p: 10, c: 'bg-slate-200' },
                        ].map(s => (
                            <div key={s.l}>
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5 text-slate-500">
                                    <span>{s.l}</span>
                                    <span>{s.p}%</span>
                                </div>
                                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full ${s.c} rounded-full`} style={{ width: `${s.p}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-10 w-full py-3 rounded-xl border border-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:border-primary-400/30 hover:text-primary-500 transition-all">
                        Atomic Breakdown
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
