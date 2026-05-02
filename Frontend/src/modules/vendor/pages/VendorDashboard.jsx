import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import weddingImg from '../../../assets/wedding.png';
import { useVendorState } from '../useVendorState';
import { computeProfileCompletion, getListingStatusClass } from '../vendorStore';
import VendorPendingApproval from '../components/VendorPendingApproval';

// Advertisement Banner Images
import ads1 from '../../../assets/vendor/ads1.png';
import ads2 from '../../../assets/vendor/ads2.png';
import ads3 from '../../../assets/vendor/ads3.png';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState, loading } = useVendorState();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const scrollRef = useRef(null);
  
  const adsBanners = [
    { id: 1, img: ads1, title: 'Grow Business', desc: 'Reach more couples' },
    { id: 2, img: ads2, title: 'Premium Leads', desc: 'Verified inquiries' },
    { id: 3, img: ads3, title: 'Top Visibility', desc: 'Featured listing' },
  ];

  // Autoscroll Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adsBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [adsBanners.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * currentAdIndex;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentAdIndex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9D174D]"></div>
      </div>
    );
  }

  if (vendorState.status === 'Pending') {
    return <VendorPendingApproval />;
  }

  const completion = computeProfileCompletion(vendorState);

  const handleSubmitListing = () => {
    updateVendorState({ listingStatus: 'Pending' });
  };

  const displayAnalytics = {
    profileViews: vendorState.analytics.profileViews || 1240,
    inquiries: vendorState.analytics.inquiries || 45,
    bookings: vendorState.analytics.bookings || 12,
    conversionRate: vendorState.analytics.conversionRate || 8.5
  };

  const displayNotifications = vendorState.notifications.length > 0 ? vendorState.notifications : [
    { id: '1', message: 'You have a new inquiry for Wedding Decor', time: '2 hours ago' },
    { id: '2', message: 'Booking confirmed for Rahul & Sneha', time: '5 hours ago' },
    { id: '3', message: 'Your KYC documents have been verified', time: '1 day ago' }
  ];

  const displayBookings = vendorState.bookings.length > 0 ? vendorState.bookings : [
    { id: '1', customerName: 'Rahul & Sneha', eventDate: '2026-05-20', location: 'Sayaji Hotel, Indore', status: 'Upcoming' },
    { id: '2', customerName: 'Vikram Singh', eventDate: '2026-05-28', location: 'Radisson Blu, Indore', status: 'Upcoming' }
  ];

  const statCards = [
    { label: 'Views', value: displayAnalytics.profileViews, sub: '+12%', icon: 'eye', color: '#9D174D', bg: 'rgba(157, 23, 77, 0.1)', bgPastel: '#F8FAFC', to: '/vendor/profile' },
    { label: 'Leads', value: displayAnalytics.inquiries, sub: 'New', icon: 'leads', color: '#9D174D', bg: 'rgba(157, 23, 77, 0.1)', bgPastel: '#F8FAFC', to: '/vendor/leads' },
    { label: 'Events', value: displayAnalytics.bookings, sub: 'Confirmed', icon: 'party', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', bgPastel: '#F0FDF4', to: '/vendor/bookings' },
    { label: 'Rate', value: displayAnalytics.conversionRate + '%', icon: 'chart', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', bgPastel: '#FFFBEB', to: '/vendor/earnings' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500 pb-20 sm:pb-0">
      {/* Stats Grid */}
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="vendor-surface rounded-xl p-2.5 sm:p-3 group cursor-pointer border border-white/80 transition-all hover:translate-y-[-2px]"
            style={{ 
              animationDelay: `${i * 0.08}s`,
              background: stat.bgPastel,
            }}
            onClick={() => navigate(stat.to)}
          >
            <div className="flex items-center justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</h3>
              </div>
              <div className="h-6 w-6 rounded-lg flex items-center justify-center text-white" style={{ background: stat.color }}>
                <Icon name={stat.icon} size="xs" color="current" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion */}
      <div className="vendor-surface rounded-2xl relative overflow-hidden group shadow-sm border border-slate-100 bg-white">
        <div className="absolute top-0 right-[-10px] sm:right-0 h-full w-3/5 sm:w-1/2 z-0 pointer-events-none overflow-hidden">
          <img
            src={weddingImg}
            alt="Wedding Couple"
            className="h-full w-full object-contain object-right-bottom sm:object-right transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-4 sm:p-7 relative z-10">
          <div className="flex flex-col w-3/4 sm:w-3/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#9D174D]">Profile Status</p>
                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-[#9D174D]/5 border border-[#9D174D]/10 text-[#9D174D]">
                  {vendorState.listingStatus}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{completion}% Complete</h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400">Improve your visibility today.</p>
            </div>

            <div className="mt-4 h-1.5 w-32 sm:w-full rounded-full overflow-hidden bg-slate-50">
              <div className="h-full rounded-full transition-all duration-1000" style={{
                width: completion + '%',
                background: 'linear-gradient(90deg, #9D174D, #831843)',
              }}></div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button 
                type="button" 
                className="rounded-lg px-4 h-9 text-[9px] font-black uppercase tracking-widest text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
                onClick={handleSubmitListing}
              >
                Submit
              </button>
              <button
                type="button"
                className="rounded-lg px-4 h-9 text-[9px] font-black uppercase tracking-widest border border-slate-100 text-slate-400 bg-white hover:bg-slate-50 transition-all"
                onClick={() => navigate('/vendor/profile')}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full View Autoscrolling Advertisement Banners with Sharp Corners */}
      <div className="-mx-3 sm:-mx-8 overflow-hidden relative group">
         <div 
           ref={scrollRef}
           className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
         >
            {adsBanners.map((ad) => (
               <div key={ad.id} className="min-w-full h-40 sm:h-52 relative snap-center overflow-hidden">
                  <img src={ad.img} alt={ad.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent p-6 flex flex-col justify-end">
                     <h4 className="text-white text-base sm:text-lg font-black tracking-tight leading-none">{ad.title}</h4>
                     <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1.5">{ad.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                     <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-black text-white uppercase tracking-widest">Sponsored</div>
                  </div>
               </div>
            ))}
         </div>
         
         {/* Dot Indicators */}
         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {adsBanners.map((_, i) => (
               <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentAdIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'}`}></div>
            ))}
         </div>
      </div>

      {/* Activity Grid */}
      <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
         <div className="vendor-surface rounded-2xl p-4 bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-50 text-[#9D174D] shadow-sm border border-white">
                  <Icon name="bell" size="xs" color="current" />
               </div>
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
            </div>
            <div className="space-y-2">
               {displayNotifications.map((note) => (
                  <div key={note.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 cursor-pointer">
                     <div className="h-1.5 w-1.5 rounded-full bg-[#9D174D] shrink-0"></div>
                     <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-800 leading-tight truncate">{note.message}</p>
                        <p className="text-[8px] font-black text-slate-400 mt-0.5 uppercase">{note.time}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="vendor-surface rounded-2xl p-4 bg-[#F1F5F9] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-white text-emerald-500 shadow-sm border border-emerald-50">
                  <Icon name="calendar" size="xs" color="current" />
               </div>
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Upcoming</h3>
            </div>
            <div className="space-y-2">
               {displayBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-white">
                     <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-800 truncate leading-none">{booking.customerName}</p>
                        <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-tighter truncate">{booking.eventDate} • {booking.location}</p>
                     </div>
                     <span className="text-[7px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md shrink-0">Active</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
