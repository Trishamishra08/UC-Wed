import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const statusOptions = ['New', 'Contacted', 'Quoted', 'Confirmed', 'Not converted'];

const VendorLeads = () => {
  const { vendorState, updateVendorState, refreshData } = useVendorState();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const updateStatus = async (leadId, status) => {
    try {
      // Ensure we match either _id or id
      const updated = (vendorState.leads || []).map((lead) => {
        const currentId = lead._id || lead.id;
        return currentId === leadId ? { ...lead, status } : lead;
      });
      updateVendorState({ leads: updated });
      // Close dropdown
      setOpenDropdown(null);
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  const handleCreateQuote = (customerName) => {
    navigate('/vendor/quotes', { state: { prefillName: customerName } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return { bg: '#FFFBEB', border: '#FEF3C7', text: '#D97706' };
      case 'Quoted': return { bg: '#F0F9FF', border: '#E0F2FE', text: '#0284C7' };
      case 'Confirmed': return { bg: '#F0FDF4', border: '#DCFCE7', text: '#16A34A' };
      default: return { bg: '#F8FAFC', border: '#F1F5F9', text: '#64748B' };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Compact & Vibrant */}
      <div className="vendor-surface rounded-xl p-3 sm:p-5 relative overflow-hidden bg-[#FDF2F8] border border-rose-100 mt-4 shadow-sm">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ed648f]">Live Stream</p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">Inquiry Pipeline</h2>
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Tracking {(vendorState.leads || []).length} active client requests.</p>
          </div>
          <button
            onClick={() => refreshData()}
            className="h-9 px-4 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 bg-white border border-rose-100 text-rose-500 shadow-sm"
          >
            <Icon name="clock" size="xs" /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Row - Soft Pastel */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'New', value: (vendorState.leads || []).filter(l => l.status === 'New').length, bg: '#FFFBEB', border: '#FEF3C7' },
          { label: 'Follow Ups', value: (vendorState.leads || []).filter(l => l.status === 'Contacted').length, bg: '#F0F9FF', border: '#E0F2FE' },
          { label: 'Converted', value: (vendorState.leads || []).filter(l => l.status === 'Confirmed').length, bg: '#F0FDF4', border: '#DCFCE7' }
        ].map((stat, i) => (
          <div key={i} className="vendor-surface rounded-xl p-2 sm:p-3 border shadow-none flex flex-col items-center justify-center text-center" style={{ background: stat.bg, borderColor: stat.border }}>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{stat.label}</p>
            <p className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Inquiry List */}
      <div className="space-y-3">
        {(vendorState.leads || []).length === 0 ? (
          <div className="vendor-surface rounded-xl p-12 text-center bg-white border border-dashed border-slate-200">
             <div className="flex justify-center mb-4 opacity-20">
               <Icon name="mail" size="3xl" />
             </div>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No Inquiries Found</p>
             <p className="text-[11px] font-bold text-slate-300 mt-1">Your marketing is live, wait for the buzz!</p>
          </div>
        ) : (
          vendorState.leads.map((lead) => {
            const colors = getStatusColor(lead.status);
            const leadId = lead._id || lead.id;
            return (
              <div key={leadId} className="vendor-surface rounded-xl p-3 sm:p-4 bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: colors.text }}></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400">
                          <Icon name="account" size="sm" />
                       </div>
                       <div>
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{lead.customerName}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                               {lead.status}
                             </span>
                             <span className="text-[10px] font-bold text-slate-400">#{leadId.slice(-6).toUpperCase()}</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                       <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Event Date</p>
                          <p className="text-[11px] font-black text-slate-700">{lead.eventDate}</p>
                       </div>
                       <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                          <p className="text-[11px] font-black text-slate-700 truncate">{lead.eventLocation}</p>
                       </div>
                       <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 col-span-2 sm:col-span-1">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contact</p>
                          <p className="text-[11px] font-black text-slate-700">{lead.phone}</p>
                       </div>
                    </div>

                    <div className="mt-4 p-3 bg-rose-50/50 rounded-xl border border-rose-100/50">
                       <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <Icon name="chat" size="xs" /> Customer Requirement
                       </p>
                       <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic">"{lead.message}"</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-col sm:items-stretch sm:min-w-[140px]">
                    <button
                      onClick={() => handleCreateQuote(lead.customerName)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-500 text-white shadow-lg shadow-rose-200 active:scale-95 transition-all"
                    >
                      Create Quote
                    </button>
                    
                    <div className="relative flex-1">
                      <button
                        className="w-full h-10 px-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center justify-between gap-2 active:scale-95 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === leadId ? null : leadId);
                        }}
                      >
                        Status
                        <Icon name="chevronDown" size="xs" className={`transition-transform ${openDropdown === leadId ? 'rotate-180' : ''}`} />
                      </button>

                      {openDropdown === leadId && (
                        <>
                          <div className="fixed inset-0 z-[120]" onClick={() => setOpenDropdown(null)}></div>
                          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-[130] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                             {statusOptions.map((opt) => (
                               <button 
                                 key={opt}
                                 className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-colors border-b border-slate-50 last:border-0"
                                 onClick={() => {
                                   updateStatus(leadId, opt);
                                   setOpenDropdown(null);
                                 }}
                               >
                                 {opt}
                               </button>
                             ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VendorLeads;
