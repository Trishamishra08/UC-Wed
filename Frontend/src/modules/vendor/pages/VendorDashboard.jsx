import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import weddingImg from '../../../assets/wedding.png';
import { useVendorState } from '../useVendorState';
import { computeProfileCompletion, getListingStatusClass } from '../vendorStore';
import VendorPendingApproval from '../components/VendorPendingApproval';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState, loading } = useVendorState();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ed648f]"></div>
      </div>
    );
  }

  // Check if vendor is pending approval
  if (vendorState.status === 'Pending') {
    return <VendorPendingApproval />;
  }

  const completion = computeProfileCompletion(vendorState);

  const handleSubmitListing = () => {
    updateVendorState({ listingStatus: 'Pending' });
  };

  const statCards = [
    { label: 'Profile views', value: vendorState.analytics.profileViews, sub: '+12% this month', icon: 'eye', color: '#ed648f', bg: 'rgba(237, 100, 143, 0.1)', to: '/vendor/profile' },
    { label: 'Inquiries', value: vendorState.analytics.inquiries, sub: 'New leads today', icon: 'leads', color: '#ed648f', bg: 'rgba(237, 100, 143, 0.1)', to: '/vendor/leads' },
    { label: 'Bookings', value: vendorState.analytics.bookings, sub: 'Confirmed events', icon: 'party', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', to: '/vendor/bookings' },
    { label: 'Conversion rate', value: vendorState.analytics.conversionRate + '%', icon: 'chart', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', to: '/vendor/earnings' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-2.5 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="vendor-surface rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 group cursor-pointer transition-all duration-500 hover:translate-y-[-4px] active:scale-[0.98]"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => navigate(stat.to)}
          >
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] truncate" style={{ color: '#64748b' }}>{stat.label}</p>
                <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-slate-900 mt-0.5 sm:mt-1 lg:mt-2 tracking-tight drop-shadow-sm">{stat.value}</h3>
                <p className="text-[9px] lg:text-xs font-bold mt-0.5 sm:mt-1 lg:mt-1.5 truncate" style={{ color: stat.color }}>{stat.sub}</p>
              </div>
              <div className="h-8 w-8 sm:h-11 sm:w-11 lg:h-14 lg:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm" style={{ background: stat.bg, color: stat.color }}>
                <Icon name={stat.icon} size="lg" color="current" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion + Recent Activity */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl relative overflow-hidden group shadow-none border-none">
          {/* Background Image */}
          <div className="absolute top-0 right-0 h-full w-4/5 sm:w-1/2 z-0 pointer-events-none overflow-hidden">
            <img
              src={weddingImg}
              alt="Wedding Theme"
              className="h-full w-full object-contain object-right-bottom sm:object-right transition-transform duration-700 group-hover:scale-105 opacity-90 sm:opacity-100"
            />
          </div>

          <div className="p-4 sm:p-7 relative z-10">
            <div className="flex flex-col md:w-3/5">
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#ed648f' }}>Profile completion</p>
                    <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-[#ed648f]/5 border border-[#ed648f]/20" style={{ color: '#ed648f' }}>
                      {vendorState.listingStatus}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">{completion}% complete</h3>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 max-w-[180px] sm:max-w-[240px]" style={{ color: '#94a3b8' }}>Complete your profile to improve ranking.</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 sm:mt-5 h-2 sm:h-2.5 w-full max-w-[220px] sm:max-w-none rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(237, 100, 143, 0.08)' }}>
                <div className="h-full rounded-full transition-all duration-1000 ease-out relative" style={{
                  width: completion + '%',
                  background: 'linear-gradient(90deg, #ed648f, #f182a5, #f4a0bb)',
                  boxShadow: '0 0 20px rgba(237, 100, 143, 0.4)'
                }}>
                  <div className="absolute inset-0 rounded-full" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite'
                  }}></div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <button type="button" className="vendor-cta rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center gap-1.5" onClick={handleSubmitListing}>
                  <Icon name="sparkles" size="xs" /> Submit for review
                </button>
                <button
                  type="button"
                  className="rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold transition-all active:scale-95"
                  style={{
                    border: '1px solid rgba(237, 100, 143, 0.2)',
                    color: '#ed648f',
                    background: 'rgba(253, 242, 248, 0.5)'
                  }}
                  onClick={() => navigate('/vendor/profile')}
                >
                  Update profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="bell" size="xs" color="#ed648f" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Recent activity</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.notifications.map((note) => (
              <div
                key={note._id || note.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(255,241,242,0.5))',
                  border: '1px solid rgba(237, 100, 143, 0.06)'
                }}
                onClick={() => navigate('/vendor/leads')}
              >
                <div className="mt-0.5 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #ed648f, #ed648f)',
                  color: 'white'
                }}>
                  <Icon name="bell" size="sm" color="current" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{note.message}</p>
                  <p className="text-[10px] sm:text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Leads + Upcoming Bookings */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-2">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="star" size="xs" color="#ed648f" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Latest leads</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.leads.map((lead) => (
              <div
                key={lead._id || lead.id}
                style={{
                  border: '1px solid rgba(237, 100, 143, 0.08)',
                  background: 'rgba(253, 242, 248, 0.3)'
                }}
                onClick={() => navigate('/vendor/leads')}
              >
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{lead.customerName}</p>
                  <p className="text-[10px] sm:text-xs font-medium" style={{ color: '#94a3b8' }}>{lead.eventDate} • {lead.eventLocation}</p>
                </div>
                <span className="rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                  color: '#ed648f'
                }}>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="calendar" size="xs" color="#ed648f" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Upcoming bookings</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.bookings.map((booking) => (
              <div
                key={booking._id || booking.id}
                style={{
                  border: '1px solid rgba(237, 100, 143, 0.08)',
                  background: 'rgba(253, 242, 248, 0.3)'
                }}
                onClick={() => navigate('/vendor/bookings')}
              >
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{booking.customerName}</p>
                  <p className="text-[10px] sm:text-xs font-medium" style={{ color: '#94a3b8' }}>{booking.eventDate} • {booking.location}</p>
                </div>
                <span className="rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                  color: '#15803d'
                }}>{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
