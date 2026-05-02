import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';

const VendorQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const token = localStorage.getItem('vendorToken');
    const [qRes, lRes] = await Promise.all([
      vendorApi.getQuotes(token),
      vendorApi.getLeads(token)
    ]);
    if (qRes.success) setQuotes(qRes.data);
    if (lRes.success) setLeads(lRes.data.filter(l => l.status === 'New' || l.status === 'Contacted'));
    setLoading(false);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Sent': return { bg: '#eff6ff', text: '#3b82f6' };
      case 'Accepted': return { bg: '#ecfdf5', text: '#10b981' };
      case 'Rejected': return { bg: '#fef2f2', text: '#ef4444' };
      default: return { bg: '#f8fafc', text: '#64748b' };
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D28A8C]">Document Center</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Quotations & Proposels</h2>
          <p className="text-sm font-medium text-slate-400">Create professional itemized quotes to win more clients.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button className="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
            <Icon name="chart" size="xs" />
            Templates
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:scale-105 transition-all text-sm flex items-center gap-2"
          >
            <Icon name="edit" size="xs" />
            Create Quote
          </button>
        </div>
      </div>

      {/* List */}
      <div className="vendor-surface rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-800">Recent Quotations</h3>
          <div className="flex bg-slate-50 p-1 rounded-xl">
            {['All', 'Sent', 'Accepted'].map(f => (
              <button key={f} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${f === 'All' ? 'bg-white shadow-sm text-rose-500' : 'text-slate-400 hover:text-slate-600'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading Quotes...</div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <Icon name="money" size="xl" color="#cbd5e1" />
            <p className="mt-4 text-slate-400 font-bold">No quotes generated yet</p>
            <p className="text-[11px] text-slate-300 mt-1">Pick a lead and start sending proposals</p>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Client / Event</th>
                  <th className="pb-4">Quote #</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {quotes.map(quote => {
                  const styles = getStatusStyles(quote.status);
                  return (
                    <tr key={quote._id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                            {quote.userId?.name?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{quote.userId?.name || 'Customer'}</p>
                            <p className="text-[11px] font-medium text-slate-400">{quote.leadId?.eventLocation || 'Wedding Event'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-xs font-bold text-slate-500">Q-{quote._id.slice(-6).toUpperCase()}</td>
                      <td className="py-5 text-sm font-black text-slate-900">₹{quote.totalAmount.toLocaleString()}</td>
                      <td className="py-5">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: styles.bg, color: styles.text }}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="py-5 text-xs font-medium text-slate-400">{new Date(quote.createdAt).toLocaleDateString()}</td>
                      <td className="py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center hover:text-rose-500"><Icon name="edit" size="xs" /></button>
                          <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center hover:text-rose-500"><Icon name="mail" size="xs" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Quote Placeholder Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">New Quotation</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-rose-500"><Icon name="logout" size="sm" /></button>
            </div>

            <div className="space-y-6">
              {/* Lead Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Active Lead</label>
                <select className="w-full h-12 rounded-2xl bg-slate-50 border border-slate-100 px-4 text-sm font-semibold outline-none focus:border-rose-200 transition-all">
                  {leads.map(l => (
                    <option key={l._id} value={l._id}>{l.customerName} - {l.eventLocation} ({new Date(l.eventDate).toLocaleDateString()})</option>
                  ))}
                  {leads.length === 0 && <option disabled>No active leads to quote</option>}
                </select>
              </div>

              <p className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-medium">
                Quote itemizer UI coming soon based on your service catalog.
              </p>

              <div className="flex gap-4">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">Back</button>
                <button className="flex-2 py-4 px-8 rounded-2xl bg-rose-500 text-white font-bold opacity-50 cursor-not-allowed">Generate Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorQuotes;
