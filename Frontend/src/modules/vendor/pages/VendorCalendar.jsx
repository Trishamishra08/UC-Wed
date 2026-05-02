import { useState } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorCalendar = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ customerName: '', eventDate: '', location: '' });
  
  const bookings = vendorState?.bookings || [];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

  const handlePrev = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNext = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDayClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setNewEvent(prev => ({ ...prev, eventDate: dateStr }));
    // Automatically open modal for convenience on mobile
    setShowAddModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.customerName || !newEvent.eventDate) return;

    const eventToAdd = {
      id: Date.now().toString(),
      customerName: newEvent.customerName,
      eventDate: newEvent.eventDate,
      location: newEvent.location || 'Online / Venue TBD',
      status: 'Confirmed',
      totalPrice: 0,
      services: ['Custom Event']
    };

    updateVendorState({
      bookings: [...bookings, eventToAdd]
    });

    setNewEvent({ customerName: '', eventDate: '', location: '' });
    setShowAddModal(false);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-3 sm:space-y-4 max-w-7xl mx-auto animate-in fade-in duration-500 pb-20 sm:pb-0">
      
      {/* Compact Header */}
      <div className="vendor-surface rounded-xl p-3.5 sm:p-5 relative overflow-hidden bg-white border border-slate-100 shadow-sm">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 bg-[#9D174D]"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#9D174D] shadow-sm">
                <Icon name="calendar" size="xs" />
             </div>
             <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Timeline</p>
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none mt-0.5">Event Schedule</h2>
             </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
          >
             <Icon name="plus" size="xs" />
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[380px_1fr]">
        
        {/* Interactive Calendar Card */}
        <div className="vendor-surface rounded-2xl p-4 sm:p-5 bg-white border border-slate-100 shadow-sm flex flex-col w-full h-fit">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tighter">
                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex gap-1">
                 <button onClick={handlePrev} className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-all text-slate-400">
                    <Icon name="chevronDown" className="rotate-90" size="xs" />
                 </button>
                 <button onClick={handleNext} className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-all text-slate-400">
                    <Icon name="chevronDown" className="-rotate-90" size="xs" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-7 gap-1 mb-1.5">
              {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                <div key={day} className="h-7 flex items-center justify-center text-[8px] font-black text-slate-300">
                   {day}
                </div>
              ))}
           </div>

           <div className="grid grid-cols-7 gap-1">
              {[...Array(adjustedStartDay)].map((_, i) => <div key={`off-${i}`} className="h-9"></div>)}
              
              {[...Array(daysInMonth(currentDate.getMonth(), currentDate.getFullYear()))].map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                const hasEvent = bookings.some(b => b.eventDate === dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div key={day} className="relative flex justify-center items-center h-9">
                    <button 
                      onClick={() => handleDayClick(day)}
                      className={`h-8 w-8 flex items-center justify-center rounded-xl text-[10px] font-black transition-all border ${
                        isSelected 
                          ? 'bg-[#9D174D] text-white border-[#9D174D] shadow-lg shadow-rose-100 scale-105' 
                          : isToday 
                            ? 'bg-slate-100 text-[#9D174D] border-slate-200'
                            : 'bg-white text-slate-600 border-transparent hover:bg-slate-50 hover:text-[#9D174D]'
                      }`}
                    >
                       {day}
                       {hasEvent && !isSelected && (
                         <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-emerald-500 border border-white"></div>
                       )}
                    </button>
                  </div>
                );
              })}
           </div>

           <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex-1 text-white h-10 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
              >
                 Add Event
              </button>
              <button className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#9D174D] transition-all"><Icon name="clock" size="xs" /></button>
           </div>
        </div>

        {/* Right Column: Events */}
        <div className="space-y-3">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Schedule Overview</h3>
           </div>
           
           <div className="space-y-2">
             {bookings.length > 0 ? (
                [...bookings].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)).map((booking, index) => (
                  <div key={booking.id || index} className="vendor-surface rounded-2xl p-3 bg-white border border-slate-100 shadow-sm transition-all hover:translate-x-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                           <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#9D174D] border border-white shadow-sm">
                              <Icon name="party" size="xs" />
                           </div>
                           <div>
                              <h4 className="text-[11px] font-black text-slate-900 tracking-tight leading-none">{booking.customerName}</h4>
                              <p className="text-[8px] font-black text-emerald-500 mt-1 uppercase tracking-widest">{booking.status}</p>
                           </div>
                        </div>
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                      <p className="text-[9px] font-bold text-slate-400 flex items-center gap-2 truncate">
                          <Icon name="map" size="xs" /> {booking.location}
                      </p>
                    </div>
                  </div>
                ))
             ) : (
                <div className="vendor-surface rounded-2xl p-8 text-center bg-white border border-dashed border-slate-100">
                   <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">No Events Found</p>
                </div>
             )}
           </div>
        </div>

      </div>

      {/* Add Event Modal - NOW COMPACTED */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
           <div className="bg-white rounded-[2rem] p-5 sm:p-6 max-w-[340px] w-full relative z-[110] shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-white">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#9D174D]">
                    <Icon name="calendar" size="xs" />
                 </div>
                 <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight leading-none">Add Event</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Schedule new booking</p>
                 </div>
              </div>
              
              <div className="space-y-3">
                 <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-400 uppercase px-1">Customer Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={newEvent.customerName}
                      onChange={(e) => setNewEvent({...newEvent, customerName: e.target.value})}
                      className="w-full h-10 rounded-xl bg-slate-50 border-0 px-4 text-xs font-bold focus:ring-1 ring-[#9D174D]/20 transition-all" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-400 uppercase px-1">Event Date</label>
                    <input 
                      type="date" 
                      value={newEvent.eventDate}
                      onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})}
                      className="w-full h-10 rounded-xl bg-slate-50 border-0 px-4 text-xs font-bold focus:ring-1 ring-[#9D174D]/20 transition-all" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-400 uppercase px-1">Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mumbai, Hotel Taj"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      className="w-full h-10 rounded-xl bg-slate-50 border-0 px-4 text-xs font-bold focus:ring-1 ring-[#9D174D]/20 transition-all" 
                    />
                 </div>

                 <button 
                   onClick={handleAddEvent}
                   className="w-full h-11 rounded-xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-100 active:scale-95 transition-all mt-3"
                   style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
                 >
                   Save Event
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VendorCalendar;
