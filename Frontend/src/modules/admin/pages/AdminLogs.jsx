import Icon from '../../../components/ui/Icon';

const logsData = [
    { id: 'LOG-4092', user: 'Super Admin', action: 'Modified Payout Commission', target: 'Finance', level: 'Warning', time: '2m ago', ip: '192.168.1.45' },
    { id: 'LOG-4091', user: 'System', action: 'Failed Login Attempt', target: 'Auth API', level: 'Critical', time: '12m ago', ip: '103.45.21.10' },
    { id: 'LOG-4090', user: 'Sneha Kapur', action: 'Account Registration', target: 'User DB', level: 'Info', time: '45m ago', ip: '157.34.12.98' },
    { id: 'LOG-4089', user: 'Arjun Das', action: 'Document Upload (GST)', target: 'Vendor S3', level: 'Info', time: '1h ago', ip: '42.102.33.11' },
    { id: 'LOG-4088', user: 'System', action: 'SSL Certificate Renewal', target: 'Infra', level: 'Success', time: '3h ago', ip: 'Local' },
];

const AdminLogs = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Security Audit</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Historical Node Event Registry</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-lg border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50">Clear Buffer</button>
                    <button className="h-8 px-3 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest shadow-md">Export Audit</button>
                </div>
            </div>

            <div className="bg-[#1A0F0F] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Monitor Active</span>
                        </div>
                        <select className="bg-transparent border-none text-[9px] font-black text-white/40 uppercase tracking-widest outline-none cursor-pointer hover:text-white transition-colors">
                            <option>Level: ALL</option>
                            <option>Level: FATAL</option>
                            <option>Level: WARN</option>
                        </select>
                    </div>

                    <div className="relative">
                        <Icon name="search" size="xs" color="#4a2b2b" className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Grep..." className="bg-white/5 border border-white/5 pl-9 pr-4 py-1.5 rounded-lg text-[10px] font-medium text-slate-300 focus:ring-1 focus:ring-primary-400/20 outline-none w-56 transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-6 py-4 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">Time & ID</th>
                                <th className="px-5 py-4 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">Initiator</th>
                                <th className="px-5 py-4 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">Operational Action</th>
                                <th className="px-5 py-4 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">Status</th>
                                <th className="px-6 py-4 text-[8px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 text-right">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logsData.map((log) => (
                                <tr key={log.id} className="hover:bg-white/2 transition-colors group/row">
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-white group-hover/row:text-primary-300">{log.time}</span>
                                            <span className="text-[8px] font-bold text-white/10 mt-0.5 uppercase">{log.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="text-[10px] font-black text-primary-400">{log.user}</span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <p className="text-[12px] font-medium text-slate-300 leading-tight">{log.action}</p>
                                        <p className="text-[8px] font-black text-white/10 mt-1 uppercase tracking-widest">{log.target}</p>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${log.level === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                                log.level === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    log.level === 'Success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                        'bg-primary-500/10 text-primary-400 border-primary-500/20'
                                            }`}>{log.level}</span>
                                    </td>
                                    <td className="px-6 py-3 text-right font-mono text-[10px] text-white/20 group-hover/row:text-primary-300">
                                        {log.ip}
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

export default AdminLogs;
