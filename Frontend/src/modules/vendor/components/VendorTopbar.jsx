import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const VendorTopbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="group rounded-2xl lg:rounded-3xl px-4 py-2.5 lg:px-6 lg:py-3.5 transition-all duration-500 relative overflow-hidden shadow-lg border border-white/20" style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 242, 242, 0.9) 100%)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
    }}>
      {/* Subtle bottom accent line in Maroon */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9D174D]/10"></div>

      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Logo + Brand */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer group/logo" onClick={() => navigate('/vendor/dashboard')}>
            <div className="h-9 w-9 lg:h-11 lg:w-11 rounded-xl overflow-hidden transition-transform group-hover/logo:scale-110 active:scale-95 shadow-md border border-white">
              <img src="/assets/vendor/logo_theme.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] lg:text-[15px] font-black text-slate-900 tracking-tight leading-none uppercase">UtsavChakra</span>
              <span className="text-[8px] font-black uppercase tracking-[0.25em] mt-1 text-[#9D174D]">Vendor Portal</span>
            </div>
          </div>
        </div>

        {/* Right Side: Navigation Icons - Now with Maroon Tints */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button 
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative bg-white border border-rose-50 text-[#9D174D] shadow-sm" 
            onClick={() => navigate('/vendor/notifications')}
            title="Notifications"
          >
            <Icon name="bell" size="xs" color="current" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#9D174D] shadow-[0_0_8px_#9D174D]"></span>
          </button>
          
          <button 
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white border border-rose-50 text-[#9D174D] shadow-sm" 
            onClick={() => navigate('/vendor/profile')}
            title="Profile"
          >
            <Icon name="user" size="xs" color="current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorTopbar;
