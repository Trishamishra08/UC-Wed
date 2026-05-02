import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';

const VendorSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Technical',
    message: '',
    priority: 'Medium'
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.getSupportTickets(token);
    if (res.success) {
      setTickets(res.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.createSupportTicket(formData, token);
    if (res.success) {
      setTickets([res.data, ...tickets]);
      setShowCreate(false);
      setFormData({ subject: '', category: 'Technical', message: '', priority: 'Medium' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return '#3b82f6';
      case 'In-Progress': return '#f59e0b';
      case 'Resolved': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">Support Center</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Help & Assistance</h2>
          <p className="text-sm font-medium text-slate-400">Get quick resolution for your queries from our expert team.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="relative z-10 px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:scale-105 transition-all text-sm flex items-center gap-2"
        >
          <Icon name="edit" size="xs" />
          New Ticket
        </button>
      </div>

      {/* List */}
      <div className="vendor-surface rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Tickets</h3>

        {loading ? (
          <div className="text-center py-10">Loading Tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <Icon name="checkList" size="xl" color="#cbd5e1" />
            <p className="mt-4 text-slate-400 font-bold">No active support tickets</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.map(ticket => (
              <div key={ticket._id} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-rose-100 transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-800">{ticket.subject}</h4>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase tracking-tighter">
                      #{ticket._id.slice(-6)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1"><Icon name="clock" size="xs" /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Icon name="account" size="xs" /> {ticket.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: getStatusColor(ticket.status) }}>{ticket.status}</span>
                    <span className="text-[10px] font-medium text-slate-300">Priority: {ticket.priority}</span>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 flex items-center justify-center transition-all">
                    <Icon name="chevronDown" size="xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900">Raise a Support Ticket</h3>
              <p className="text-sm text-slate-400 font-medium">Please provide detailed information about your issue.</p>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-12 rounded-2xl bg-slate-50 border border-slate-100 px-4 text-sm font-semibold outline-none focus:border-rose-200 transition-all"
                  >
                    <option>Technical</option>
                    <option>Payments</option>
                    <option>Profile</option>
                    <option>Leads</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full h-12 rounded-2xl bg-slate-50 border border-slate-100 px-4 text-sm font-semibold outline-none focus:border-rose-200 transition-all"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <input
                  placeholder="Enter brief summary of issue"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full h-12 rounded-2xl bg-slate-50 border border-slate-100 px-4 text-sm font-semibold outline-none focus:border-rose-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Describe your concern in detail..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm font-semibold outline-none focus:border-rose-200 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
              <button type="submit" className="flex-2 py-4 px-8 rounded-2xl bg-rose-500 text-white font-bold shadow-xl shadow-rose-200 hover:scale-105 transition-all">Submit Ticket</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VendorSupport;
