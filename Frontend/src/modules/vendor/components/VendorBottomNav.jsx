import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const navPages = [
  // Page 1: Primary Actions
  [
    { label: 'Home', to: '/vendor/dashboard', icon: 'home' },
    { label: 'Leads', to: '/vendor/leads', icon: 'mail' },
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

const VendorBottomNav = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleMoreClick = () => {
    setCurrentPage((prev) => (prev + 1) % navPages.length);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 vendor-bottom-nav">
      <nav className="mx-auto max-w-md bg-white shadow-[0_-5px_25px_rgba(0,0,0,0.05),0_20px_50px_rgba(237,100,143,0.15)] rounded-2xl border border-white/80 px-2 py-2 flex items-center justify-between backdrop-blur-xl transition-all duration-500">
        {navPages[currentPage].map((item) => (
          <NavLink
            key={item.to + item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl transition-all duration-300 relative ${
                isActive ? 'text-[#ed648f]' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {isActive && (
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#ed648f] shadow-[0_0_8px_rgba(237,100,143,0.6)] z-10"></div>
                  )}
                  <div className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                    <Icon 
                      name={item.icon} 
                      size="sm" 
                      color="current"
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                  </div>
                </div>
                <span className={`text-[9px] font-bold tracking-tight transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

        {/* More Button */}
        <button
          onClick={handleMoreClick}
          className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl text-slate-400 active:scale-90 transition-all duration-300"
        >
          <div className="relative">
             <Icon name="more" size="sm" color="current" />
          </div>
          <span className="text-[9px] font-bold tracking-tight opacity-70">More</span>
        </button>
      </nav>
    </div>
  );
};

export default VendorBottomNav;
