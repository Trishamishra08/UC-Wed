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
      const token = localStorage.getItem('vendorToken');
      // Use _id instead of id for backend compatibility
      const targetLead = vendorState.leads.find(l => (l.id || l._id) === leadId);
      const dbId = targetLead?._id || targetLead?.id;

      const res = await vendorApi.updateLeadStatus(dbId, status, token);
      if (res.success) {
        const updated = vendorState.leads.map((lead) =>
          (lead._id || lead.id) === leadId ? { ...lead, status } : lead
        );
        updateVendorState({ leads: updated });
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleCreateQuote = (customerName) => {
    navigate('/vendor/quotes', { state: { prefillName: customerName } });
  };

  const getLeadStatusStyle = (status) => {
    switch (status) {
      case 'New': return { bg: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)', color: '#ed648f' };
      case 'Quoted': return { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', color: '#1d4ed8' };
      case 'Confirmed': return { bg: 'linear-gradient(135deg, #ed648f, #f182a5)', color: '#ffffff' };
      default: return { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', color: '#475569' };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#ed648f' }}>Vendor Live Control</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 sm:mt-1">Incoming inquiries</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Tracking {(vendorState.leads || []).length} active potential clients</p>
          </div>
          <button
            onClick={() => refreshData()}
            className="h-9 sm:h-10 px-3 sm:px-5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
              border: '1px solid rgba(237, 100, 143, 0.1)',
              color: '#ed648f'
            }}
          >
            <Icon name="clock" size="xs" /> Refresh
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
        <div className="space-y-3 sm:space-y-4">
          {(vendorState.leads || []).length === 0 ? (
            <div className="text-center py-10 sm:py-16">
              <div className="flex justify-center mb-3 sm:mb-4">
                <Icon name="mail" size="3xl" color="#cbd5e1" />
              </div>
              <p className="font-semibold text-slate-400 text-sm">No leads found</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>New inquiries will appear here</p>
            </div>
          ) : (
            vendorState.leads.map((lead) => {
              const statusStyle = getLeadStatusStyle(lead.status);
              const leadId = lead._id || lead.id;
              return (
                <div key={leadId} className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all hover:scale-[1.01] group" style={{
                  border: '1px solid rgba(237, 100, 143, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex-1 min-w-[180px] sm:min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{
                        background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
                      }}>
                        <Icon name="rings" size="sm" color="#ed648f" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">{lead.customerName}</p>
                        <span className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{
                          background: statusStyle.bg,
                          color: statusStyle.color
                        }}>{lead.status}</span>
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium mt-1.5 sm:mt-2" style={{ color: '#94a3b8' }}>{lead.eventDate} • {lead.eventLocation}</p>
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs italic font-medium" style={{ color: '#64748b' }}>"{lead.message}"</p>
                    <div className="mt-1.5 sm:mt-2 flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#cbd5e1' }}>
                      <span>{lead.phone}</span>
                      <span>{lead.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {lead.status !== 'Quoted' && lead.status !== 'Confirmed' && (
                      <button
                        onClick={() => handleCreateQuote(lead.customerName)}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                          color: '#ed648f',
                          border: '1px solid rgba(237, 100, 143, 0.15)'
                        }}
                      >
                        <Icon name="edit" size="xs" /> Quote
                      </button>
                    )}
                    <div className="relative">
                      <div
                        className="rounded-lg sm:rounded-xl bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between gap-2 min-w-[120px] shadow-sm hover:shadow-md active:scale-95"
                        style={{
                          borderColor: 'rgba(237, 100, 143, 0.3)',
                          color: '#ed648f'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === leadId ? null : leadId);
                        }}
                      >
                        {lead.status}
                        <Icon name="chevronDown" size="xs" color="#ed648f" className={`transition-transform duration-300 ${openDropdown === leadId ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Custom Dropdown Menu - Opens Upwards */}
                      {openDropdown === leadId && (
                        <>
                          <div className="fixed inset-0 z-[90]" onClick={() => setOpenDropdown(null)}></div>
                          <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border border-[#ed648f20] transition-all z-[100] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 origin-bottom-right">
                            {statusOptions.map((option) => (
                              <div
                                key={option}
                                className={`px-4 py-3 text-[11px] sm:text-xs font-bold cursor-pointer transition-colors flex items-center gap-3 ${lead.status === option ? 'bg-[#ed648f10] text-[#ed648f]' : 'text-slate-600 hover:bg-[#ed648f08] hover:text-[#ed648f]'
                                  }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus(leadId, option);
                                  setOpenDropdown(null);
                                }}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${lead.status === option ? 'bg-[#ed648f] scale-100' : 'bg-transparent scale-0'}`}></div>
                                {option}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorLeads;
