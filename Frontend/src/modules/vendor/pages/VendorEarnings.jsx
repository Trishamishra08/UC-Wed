import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';

const VendorEarnings = () => {
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayments: 0,
    platformCommission: 0,
    currency: 'INR'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.getEarnings(token);
    if (res.success) {
      setEarnings(res.data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3 sm:space-y-4 max-w-7xl mx-auto">
      {/* Compact Header */}
      <div className="vendor-surface rounded-xl p-4 sm:p-5 relative overflow-hidden bg-[#FDF2F8] border border-rose-100 shadow-sm">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Financials</p>
            <h2 className="text-lg font-black text-slate-900 mt-0.5 tracking-tight">Earnings Summary</h2>
          </div>
          <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-50">
             <Icon name="money" size="xs" />
          </div>
        </div>
      </div>

      {/* High Density Stats Grid */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Total Earnings', value: `₹${earnings.totalEarnings.toLocaleString()}`, sub: '+18% growth', icon: 'money', bg: '#FFF1F2', text: '#E11D48' },
          { label: 'Pending Payout', value: `₹${earnings.pendingPayments.toLocaleString()}`, sub: 'Next 48h', icon: 'clock', bg: '#FFFBEB', text: '#D97706' },
          { label: 'Commission', value: `₹${earnings.platformCommission.toLocaleString()}`, sub: '10% Flat', icon: 'chart', bg: '#F5F3FF', text: '#7C3AED' }
        ].map((stat) => (
          <div key={stat.label} className="vendor-surface rounded-2xl p-4 border border-black/5 shadow-sm transition-all hover:scale-[1.01]" style={{ backgroundColor: stat.bg }}>
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center shadow-sm" style={{ color: stat.text }}>
                <Icon name={stat.icon} size="xs" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-900/20">Active</span>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compact Payout Schedule */}
      <div className="vendor-surface rounded-2xl p-4 sm:p-5 bg-[#F0F9FF] border border-blue-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm">
                <Icon name="calendar" size="xs" />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">Payout Schedule</h3>
           </div>
           <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-white/40 px-3 py-1 rounded-lg border border-blue-50 hover:bg-white transition-all">History</button>
        </div>
        
        <div className="space-y-2">
          {[
            { title: 'Advance Payment', date: 'Apr 15', amount: '₹12,450', status: 'Completed' },
            { title: 'Final Settlement', date: 'May 20', amount: '₹45,000', status: 'Scheduled' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-white/40 rounded-xl p-3 border border-blue-50 transition-all hover:bg-white/60">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shadow-md shadow-blue-100">
                  {i + 1}
                </div>
                <div>
                   <span className="text-xs font-black text-slate-900 uppercase tracking-tight block leading-none">{item.title}</span>
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{item.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-sm font-black text-slate-900 tracking-tight">{item.amount}</span>
                 <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                    {item.status}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
