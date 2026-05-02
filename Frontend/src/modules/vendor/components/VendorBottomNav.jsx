import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const navPages = [
  // Page 1: Primary Actions
  [
    { label: 'Home', to: '/vendor/dashboard', icon: 'home' },
    { label: 'Inquiries', to: '/vendor/leads', icon: 'mail' },
    { label: 'Services', to: '/vendor/services', icon: 'store' },
    { label: 'Chat', to: '/vendor/chat', icon: 'chat' },
  ],
  // Page 2: Profile & Management
  [
    { label: 'Home', to: '/vendor/dashboard', icon: 'home' },
    { label: 'Profile', to: '/vendor/profile', icon: 'account' },
    { label: 'Pricing', to: '/vendor/pricing', icon: 'money' },
    { label: 'Portfolio', to: '/vendor/portfolio', icon: 'image' },
  ],
  // Page 3: Bookings & Financials
  [
    { label: 'Home', to: '/vendor/dashboard', icon: 'home' },
    { label: 'Bookings', to: '/vendor/bookings', icon: 'calendar' },
    { label: 'Quotes', to: '/vendor/quotes', icon: 'book' },
    { label: 'Earnings', to: '/vendor/earnings', icon: 'trophy' },
  ],
  // Page 4: Support & Feedback
  [
    { label: 'Home', to: '/vendor/dashboard', icon: 'home' },
    { label: 'Reviews', to: '/vendor/reviews', icon: 'star' },
    { label: 'Calendar', to: '/vendor/calendar', icon: 'clock' },
    { label: 'Support', to: '/vendor/support', icon: 'help' },
    { label: 'Settings', to: '/vendor/settings', icon: 'edit' },
  ]
];

const VendorBottomNav = ({ isApproved }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleMoreClick = () => {
    setCurrentPage((prev) => (prev + 1) % navPages.length);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 vendor-bottom-nav">
      <nav className="mx-auto max-w-md bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)] rounded-[2.2rem] border border-slate-100 px-3 py-2 flex items-center justify-between backdrop-blur-xl transition-all duration-500">
        {navPages[currentPage].map((item) => {
          const isHome = item.label === 'Home';
          const isDisabled = !isApproved && !isHome;

          return (
            <NavLink
              key={item.to + item.label}
              to={isDisabled ? '#' : item.to}
              onClick={(e) => isDisabled && e.preventDefault()}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 relative ${
                  isActive && !isDisabled ? 'text-[#9D174D]' : isDisabled ? 'text-slate-200' : 'text-slate-700'
                }`
              }
              style={({ isActive }) => isActive && !isDisabled ? {
                  background: '#FDF2F8',
                  color: '#9D174D'
                } : {}}
            >
              {({ isActive }) => (
                <>
                  <div className={`transition-all duration-300 ${isActive && !isDisabled ? 'scale-110' : ''}`}>
                    <Icon 
                      name={isDisabled ? 'lock' : item.icon} 
                      size="sm" 
                      color="current"
                      fill={isActive && !isDisabled ? 'currentColor' : 'none'}
                    />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tight transition-all duration-300 ${
                    isActive && !isDisabled ? 'opacity-100' : 'opacity-100'
                  }`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* More Button */}
        <button
          onClick={handleMoreClick}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-slate-700 active:scale-90 transition-all duration-300"
        >
          <Icon name="more" size="sm" color="current" />
          <span className="text-[9px] font-black uppercase tracking-tight">More</span>
        </button>
      </nav>
    </div>
  );
};

export default VendorBottomNav;
