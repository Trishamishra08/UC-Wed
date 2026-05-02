import { useState } from 'react';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorBookings = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [openMenu, setOpenMenu] = useState(null);

  const bookings = vendorState?.bookings || [];

  const handleStatusUpdate = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    updateVendorState({ bookings: updatedBookings });
    setOpenMenu(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return { bg: '#F0FDF4', color: '#16A34A', border: '#DCFCE7' };
      case 'Rejected': return { bg: '#FFF1F2', color: '#E11D48', border: '#FFE4E6' };
      case 'Confirmed': return { bg: '#F0F9FF', color: '#0284C7', border: '#E0F2FE' };
      case 'Pending': return { bg: '#FFFBEB', color: '#D97706', border: '#FEF3C7' };
      default: return { bg: '#F8FAFC', color: '#64748B', border: '#F1F5F9' };
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Operations</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Event Bookings</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">Manage your active schedule and client orders.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white/60 rounded-xl px-4 py-2 border border-rose-100 text-center shadow-sm">
                <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Total</p>
                <p className="text-lg font-black text-slate-900">{bookings.length}</p>
             </div>
             <div className="bg-white/60 rounded-xl px-4 py-2 border border-rose-100 text-center shadow-sm">
                <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Pending</p>
                <p className="text-lg font-black text-rose-500">{bookings.filter(b => b.status === 'Pending').length}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-3">
        {bookings.length === 0 ? (
          <div className="vendor-surface rounded-2xl p-16 text-center bg-slate-50 border-2 border-dashed border-slate-200">
            <div className="flex justify-center mb-4 text-slate-300">
              <Icon name="checkList" size="3xl" color="current" />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No Active Bookings</p>
            <p className="text-xs font-bold text-slate-300 mt-1">Confirmed orders will appear here.</p>
          </div>
        ) : (
          bookings.map((booking, index) => {
            const status = getStatusColor(booking.status);
            const pastels = ['#FFF1F2', '#F0F9FF', '#F5F3FF', '#FFFBEB'];
            const bg = pastels[index % pastels.length];
            
            return (
              <div key={booking.id || index} className="vendor-surface rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md" style={{ backgroundColor: bg, borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/60 flex items-center justify-center text-rose-500 shadow-sm">
                    <Icon name="party" size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">{booking.customerName || 'Customer'}</h3>
                       <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border" style={{ backgroundColor: status.bg, color: status.color, borderColor: status.border }}>
                         {booking.status || 'Active'}
                       </span>
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Icon name="calendar" size="xs" /> {booking.eventDate || 'TBD'}
                       <span className="opacity-20 text-slate-900">|</span>
                       <Icon name="map" size="xs" /> {booking.location || 'Venue Not Set'}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                       {booking.services?.map(s => (
                         <span key={s} className="bg-white/40 rounded-lg px-2 py-0.5 text-[9px] font-black text-slate-600 border border-white/60 uppercase tracking-tight">{s}</span>
                       )) || <span className="text-[9px] font-bold text-slate-400 italic">No services listed</span>}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-black/5">
                   <div className="text-left sm:text-right">
                      <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Order Total</p>
                      <p className="text-base sm:text-xl font-black text-slate-900 tracking-tight">₹{(booking.totalPrice || 0).toLocaleString()}</p>
                   </div>
                   
                   <div className="flex gap-2 relative">
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, 'Accepted')}
                          className="bg-emerald-500 text-white rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                        >
                          Accept
                        </button>
                      )}
                      
                      <button 
                        className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 border border-black/5 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(openMenu === booking.id ? null : booking.id);
                        }}
                      >
                         <Icon name="more" size="xs" />
                      </button>

                      {openMenu === booking.id && (
                        <>
                          <div className="fixed inset-0 z-[120]" onClick={() => setOpenMenu(null)}></div>
                          <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-xl shadow-2xl border border-slate-100 z-[130] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                             <button className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-colors border-b border-slate-50 flex items-center gap-2">
                                <Icon name="edit" size="xs" /> Edit Details
                             </button>
                             <button className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-colors border-b border-slate-50 flex items-center gap-2">
                                <Icon name="mail" size="xs" /> Message Client
                             </button>
                             <button 
                               onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                               className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-colors flex items-center gap-2"
                             >
                                <Icon name="logout" size="xs" /> Cancel Booking
                             </button>
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
  );
};

export default VendorBookings;
