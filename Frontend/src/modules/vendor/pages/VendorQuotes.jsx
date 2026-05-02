import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorQuotes = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteItems, setQuoteItems] = useState([{ name: 'Standard Service', price: '' }]);

  // Local helper to get leads that don't have quotes yet (mock logic)
  const availableLeads = vendorState.leads || [];

  const handleAddQuote = () => {
    if (!selectedLeadId || !quoteAmount) {
      alert('Please select a lead and enter an amount');
      return;
    }

    const lead = availableLeads.find(l => l.id === selectedLeadId);
    const newQuote = {
      _id: `q-${Date.now()}`,
      userId: { name: lead?.customerName || 'Customer' },
      leadId: { eventLocation: lead?.eventLocation || 'Venue' },
      totalAmount: Number(quoteAmount),
      status: 'Sent',
      createdAt: new Date().toISOString(),
      items: quoteItems
    };

    updateVendorState({ quotes: [newQuote, ...(vendorState.quotes || [])] });
    setShowCreate(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedLeadId('');
    setQuoteAmount('');
    setQuoteItems([{ name: 'Standard Service', price: '' }]);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Sent': return { bg: '#F0F9FF', text: '#0284C7', border: '#E0F2FE' };
      case 'Accepted': return { bg: '#F0FDF4', text: '#16A34A', border: '#DCFCE7' };
      case 'Rejected': return { bg: '#FFF1F2', text: '#E11D48', border: '#FFE4E6' };
      default: return { bg: '#F8FAFC', text: '#64748B', border: '#F1F5F9' };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Solid Rose Pastel */}
      <div className="vendor-surface rounded-xl p-4 sm:p-6 relative overflow-hidden bg-[#FDF2F8] border border-rose-100 shadow-sm">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Proposals</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Quotations</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">Create and manage professional itemized proposals.</p>
          </div>
          <button 
            onClick={() => setShowCreate(true)}
            className="vendor-cta rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-100 active:scale-95 transition-all"
          >
            <Icon name="plus" size="xs" />
            Create Quote
          </button>
        </div>
      </div>

      {/* Quote Grid - Solid Pastel Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(!vendorState.quotes || vendorState.quotes.length === 0) ? (
          <div className="col-span-full vendor-surface rounded-2xl p-16 text-center bg-slate-50 border-2 border-dashed border-slate-200">
            <div className="flex justify-center mb-4 text-slate-300">
              <Icon name="money" size="3xl" color="current" />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No Quotations Yet</p>
            <p className="text-xs font-bold text-slate-300 mt-1">Start by converting a lead into a proposal.</p>
          </div>
        ) : (
          vendorState.quotes.map((quote, index) => {
            const status = getStatusStyles(quote.status);
            const pastels = ['#FFF1F2', '#F0F9FF', '#F5F3FF', '#FFFBEB'];
            const bg = pastels[index % pastels.length];
            
            return (
              <div key={quote._id} className="vendor-surface rounded-2xl p-4 sm:p-5 border flex flex-col justify-between gap-4 transition-all hover:scale-[1.01] hover:shadow-md" style={{ backgroundColor: bg, borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/60 flex items-center justify-center text-rose-500 shadow-sm font-black text-sm uppercase">
                         {quote.userId?.name?.[0] || 'U'}
                      </div>
                      <div>
                         <h3 className="text-sm font-black text-slate-900 leading-none">{quote.userId?.name || 'Customer'}</h3>
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">#{quote._id.slice(-6).toUpperCase()}</p>
                      </div>
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border" style={{ backgroundColor: status.bg, color: status.text, borderColor: status.border }}>
                     {quote.status}
                   </span>
                </div>

                <div className="bg-white/40 rounded-xl p-3 border border-white/60">
                   <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest mb-1">Total Amount</p>
                   <p className="text-xl font-black text-slate-900 tracking-tighter">₹{quote.totalAmount.toLocaleString()}</p>
                   <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <Icon name="map" size="xs" />
                      {quote.leadId?.eventLocation || 'Indore'}
                   </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {new Date(quote.createdAt).toLocaleDateString()}
                   </p>
                   <div className="flex gap-2">
                      <button className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm border border-black/5">
                         <Icon name="edit" size="xs" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm border border-black/5">
                         <Icon name="mail" size="xs" />
                      </button>
                   </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Dynamic Create Quote Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCreate(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">New Quotation</h3>
                  <p className="text-xs font-bold text-slate-500">Draft a professional proposal</p>
                </div>
                <button onClick={() => setShowCreate(false)} className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all">
                  <Icon name="close" size="sm" />
                </button>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Active Inquiry</label>
                   <select 
                     className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black focus:outline-none focus:border-rose-400"
                     value={selectedLeadId}
                     onChange={(e) => setSelectedLeadId(e.target.value)}
                   >
                      <option value="">Select a client</option>
                      {availableLeads.map(l => (
                        <option key={l.id} value={l.id}>{l.customerName} - {l.eventLocation}</option>
                      ))}
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Quote Amount (₹)</label>
                   <input 
                     type="number"
                     className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black focus:outline-none focus:border-rose-400"
                     placeholder="e.g. 75000"
                     value={quoteAmount}
                     onChange={(e) => setQuoteAmount(e.target.value)}
                   />
                </div>

                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
                   <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1 text-center">Summary Preview</p>
                   <div className="flex items-center justify-between py-2 border-t border-rose-100/50 mt-2">
                      <span className="text-[10px] font-black text-slate-600 uppercase">Itemized Total</span>
                      <span className="text-sm font-black text-rose-500">₹{Number(quoteAmount || 0).toLocaleString()}</span>
                   </div>
                </div>

                <div className="pt-4">
                   <button 
                     onClick={handleAddQuote}
                     className="w-full vendor-cta h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 transition-all"
                   >
                      Send Proposal
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorQuotes;
