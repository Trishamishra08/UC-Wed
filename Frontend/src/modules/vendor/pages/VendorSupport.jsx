import { useState } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorSupport = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const tickets = [
    { id: 'TKT-9921', subject: 'Payout Delay - April', status: 'In-Progress', date: '2026-04-28', priority: 'High', category: 'Payments' },
    { id: 'TKT-9845', subject: 'Profile Image Not Uploading', status: 'Resolved', date: '2026-04-20', priority: 'Medium', category: 'Technical' },
  ];

  const categories = [
    { id: 'all', label: 'All Tickets', icon: 'checkList' },
    { id: 'payments', label: 'Payments', icon: 'money' },
    { id: 'account', label: 'Account', icon: 'account' },
    { id: 'leads', label: 'Leads', icon: 'leads' }
  ];

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Compact Header */}
      <div className="vendor-surface rounded-xl p-4 sm:p-5 relative overflow-hidden bg-white border border-slate-100 shadow-sm">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 bg-[#9D174D]"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#9D174D] shadow-sm border border-white">
                <Icon name="help" size="sm" />
             </div>
             <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Help Desk</p>
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">Support Center</h2>
             </div>
          </div>
          <button 
            className="rounded-xl px-5 h-10 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-rose-100 active:scale-95 transition-all flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
          >
             <Icon name="plus" size="xs" /> New Ticket
          </button>
        </div>
      </div>

      {/* Quick Access Grid - Added Background Colors */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {[
          { label: 'Live Chat', sub: 'Instant Help', icon: 'chat', bg: '#F0F9FF', text: '#0369a1', border: '#e0f2fe' },
          { label: 'Email Us', sub: '24h Response', icon: 'mail', bg: '#FDF2F8', text: '#9D174D', border: '#fce7f3' },
          { label: 'Phone Help', sub: '10am - 6pm', icon: 'phone', bg: '#F0FDF4', text: '#15803d', border: '#dcfce7' },
          { label: 'Docs', sub: 'Self Help', icon: 'book', bg: '#FFFBEB', text: '#b45309', border: '#fef3c7' }
        ].map((item) => (
          <div 
            key={item.label} 
            className="vendor-surface rounded-2xl p-4 border transition-all hover:translate-y-[-2px] cursor-pointer"
            style={{ backgroundColor: item.bg, borderColor: item.border }}
          >
            <div className="h-8 w-8 rounded-lg mb-3 flex items-center justify-center shadow-sm bg-white" style={{ color: item.text }}>
              <Icon name={item.icon} size="xs" />
            </div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{item.label}</h4>
            <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        
        {/* Sidebar Filter */}
        <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-4 h-11 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap lg:w-full border ${
                activeCategory === cat.id 
                  ? 'bg-[#9D174D] text-white border-[#9D174D] shadow-lg shadow-rose-100' 
                  : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-[#9D174D]'
              }`}
            >
              <Icon name={cat.icon} size="xs" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tickets List */}
        <div className="vendor-surface rounded-2xl p-4 sm:p-5 bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Recent Tickets</h3>
             <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{tickets.length} Active</span>
          </div>

          <div className="space-y-2">
            {tickets.map(ticket => (
              <div key={ticket.id} className="group flex flex-wrap items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-slate-100 bg-slate-50/50 hover:bg-white transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm ${
                    ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {ticket.status === 'Resolved' ? <Icon name="check" size="xs" /> : <Icon name="clock" size="xs" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-300 tracking-tighter">{ticket.id}</span>
                      <h4 className="text-xs font-black text-slate-900 tracking-tight">{ticket.subject}</h4>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ticket.date}</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">•</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ticket.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 sm:mt-0 w-full sm:w-auto justify-end">
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                     ticket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                   }`}>{ticket.priority}</span>
                   <Icon name="chevronRight" size="xs" className="text-slate-300 group-hover:text-[#9D174D] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorSupport;
