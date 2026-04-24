import Icon from '../../../components/ui/Icon';

const AdminDashboard = () => {
    const stats = [
        { label: 'Platform Revenue', value: '₹12.4L', change: '+14%', icon: 'money' },
        { label: 'Active Vendors', value: '482', change: '+28', icon: 'user' },
        { label: 'Total Base Users', value: '8,294', change: '+12%', icon: 'users' },
        { label: 'Pending Reviews', value: '14', change: 'Urgent', icon: 'bell' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header - Professional */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Console Overview</h1>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-2">Real-time Platform Operational Status</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="h-9 px-4 rounded-xl bg-white border border-slate-200 text-[9px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Export CSV
                    </button>
                    <button className="h-9 px-4 rounded-xl bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all">
                        Add Module
                    </button>
                </div>
            </div>

            {/* Stats - Grid Dense */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between">
                            <div className="h-10 w-10 rounded-xl bg-primary-400/10 flex items-center justify-center text-primary-500">
                                <Icon name={stat.icon} size="xs" color="current" />
                            </div>
                            <span className={`text-[8px] font-black px-2 py-1 rounded-lg ${stat.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Analytics - Professional Density */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm group">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Market Analytics</h3>
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">Live fulfillment metrics</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                            {['D', 'W', 'M'].map(t => (
                                <button key={t} className={`w-8 h-8 rounded-md text-[9px] font-black transition-all ${t === 'D' ? 'bg-white text-primary-500 shadow-sm' : 'text-slate-400'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="h-60 w-full flex items-end justify-between px-2 pb-2 gap-3">
                        {[45, 65, 40, 85, 35, 95, 55, 75, 45, 60, 80, 50, 40, 70, 90, 30].map((h, i) => (
                            <div key={i} className="flex-1 max-w-[16px] bg-slate-50 rounded-md relative group/bar overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-400/20 h-full transform transition-transform duration-1000 origin-bottom scale-y-0 group-hover:scale-y-100" style={{ transitionDelay: `${i * 30}ms` }} />
                                <div className="absolute inset-x-0 bottom-0 bg-primary-400 h-full transform transition-transform duration-700 origin-bottom opacity-40" style={{ height: `${h}%` }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Log - Professional Density */}
                <div className="lg:col-span-4 bg-[#1A0F0F] rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-white tracking-widest uppercase">System Pulse</h3>
                        <div className="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(249,174,175,1)]" />
                    </div>

                    <div className="space-y-6">
                        {[
                            { u: 'Admin', a: 'Update ACL', t: '1m' },
                            { u: 'Sys', a: 'DB Backup', t: '5m' },
                            { u: 'Partner', a: 'New Sub', t: '12m' },
                            { u: 'Bot', a: 'Grep Clean', t: '1h' },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 group/item items-start">
                                <div className="h-1.5 w-1.5 rounded-full bg-white/10 mt-1.5 group-hover/item:bg-primary-400 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] text-white/50 font-medium leading-none">
                                        <span className="text-white font-black">{log.u}</span> {log.a}
                                    </p>
                                    <p className="text-[8px] font-black text-white/10 uppercase tracking-widest mt-1.5">{log.t} ago • node_02</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        Full System Trace
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
