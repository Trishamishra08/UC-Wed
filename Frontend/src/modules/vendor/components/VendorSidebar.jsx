import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const navItems = [
  { label: 'Dashboard', to: '/vendor/dashboard', icon: 'home' },
  { label: 'Profile', to: '/vendor/profile', icon: 'account' },
  { label: 'Services', to: '/vendor/services', icon: 'store' },
  { label: 'Pricing', to: '/vendor/pricing', icon: 'money' },
  { label: 'Portfolio', to: '/vendor/portfolio', icon: 'image' },
  { label: 'Inquiries', to: '/vendor/leads', icon: 'mail' },
  { label: 'Quotes', to: '/vendor/quotes', icon: 'book' },
  { label: 'Bookings', to: '/vendor/bookings', icon: 'calendar' },
  { label: 'Calendar', to: '/vendor/calendar', icon: 'clock' },
  { label: 'Chat', to: '/vendor/chat', icon: 'chat' },
  { label: 'Earnings', to: '/vendor/earnings', icon: 'trophy' },
  { label: 'Reviews', to: '/vendor/reviews', icon: 'star' },
  { label: 'Support', to: '/vendor/support', icon: 'help' },
  { label: 'Settings', to: '/vendor/settings', icon: 'edit' }
];

const VendorSidebar = ({ onClose, isApproved }) => {
  const navigate = useNavigate();
  return (
    <aside className="h-screen fixed left-0 top-0 w-72 flex flex-col z-40" style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #F1F5F9 100%)',
      borderRight: '1px solid rgba(15, 23, 42, 0.05)'
    }}>
      <div className="h-full flex flex-col">
        {/* Brand Header */}
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-14 w-auto flex items-center justify-center transition-transform hover:scale-110">
                   <img src="/assets/vendor/logo_theme.png" alt="UtsavChakra Logo" className="h-full w-auto rounded-2xl" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#9D174D' }}>Vendor Panel</p>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">Emerald Studio</h2>
            </div>
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-[#9D174D] transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <Icon name="close" size="lg" color="current" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isApproved ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isApproved ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </span>
            {isApproved ? 'Online & Active' : 'Under Review'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-1.5 custom-scrollbar overscroll-contain touch-pan-y">
          {navItems.map((item) => {
            const isHome = item.label === 'Dashboard' || item.label === 'Profile';
            const isDisabled = !isApproved && !isHome;

            return (
              <NavLink
                key={item.to}
                to={isDisabled ? '#' : item.to}
                onClick={(e) => {
                  if (isDisabled) e.preventDefault();
                  else onClose();
                }}
                className={({ isActive }) =>
                  `group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden px-4 py-2.5 rounded-xl ${
                    isActive && !isDisabled
                    ? 'text-white shadow-lg'
                    : isDisabled ? 'text-slate-300' : 'text-slate-500 hover:text-[#9D174D] hover:bg-slate-50'
                  }`
                }
                style={({ isActive }) => isActive && !isDisabled ? {
                  background: 'linear-gradient(135deg, #9D174D, #831843)',
                  boxShadow: '0 8px 25px rgba(157, 23, 77, 0.3)'
                } : {}}
              >
                {({ isActive }) => (
                  <>
                    <div className={`flex items-center justify-center h-7 w-7 rounded-lg transition-all duration-300 ${
                      isActive && !isDisabled
                      ? 'bg-white/20'
                      : isDisabled ? 'bg-slate-50' : 'bg-slate-50 group-hover:bg-slate-100 shadow-sm'
                      }`}>
                      <Icon name={isDisabled ? 'lock' : item.icon} size="xs" color="current" />
                    </div>
                    <span>{item.label}</span>
                    {isActive && !isDisabled && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(15, 23, 42, 0.05)' }}>
          <button
            type="button"
            className="w-full rounded-xl px-4 h-12 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-rose-100 active:scale-95 transition-all flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #9D174D, #831843)',
            }}
            onClick={() => navigate('/vendor/login')}
          >
            <Icon name="logout" size="sm" color="current" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default VendorSidebar;
