import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 

  const [settings, setSettings] = useState({
    email: 'contact@emeraldstudio.com',
    phone: '+91 98765 43210',
    language: 'English (India)',
    notifications: {
      push: true,
      email: true,
      whatsapp: true,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showPricing: true,
      showContact: true
    }
  });

  const toggleSetting = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Compact Header */}
      <div className="vendor-surface rounded-xl p-4 sm:p-5 relative overflow-hidden bg-[#FFF5F7] border border-rose-100 shadow-sm">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{
          background: 'radial-gradient(circle, #9D174D, transparent 70%)'
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#9D174D] shadow-sm">
                <Icon name="settings" size="sm" />
             </div>
             <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9D174D]">Preferences</p>
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">Account Settings</h2>
             </div>
          </div>
          <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest hidden sm:block">Configuration Hub</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        
        {/* Sidebar Tabs - Compact High Density */}
        <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          {[
            { id: 'account', label: 'General', icon: 'account' },
            { id: 'notifications', label: 'Alerts', icon: 'clock' },
            { id: 'privacy', label: 'Privacy', icon: 'checkList' },
            { id: 'security', label: 'Security', icon: 'mail' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 h-11 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap lg:w-full border ${
                activeTab === tab.id 
                  ? 'bg-[#9D174D] text-white border-[#9D174D] shadow-lg shadow-rose-100' 
                  : 'bg-white text-slate-400 border-rose-50 hover:bg-[#FFF5F7] hover:text-[#9D174D]'
              }`}
            >
              <Icon name={tab.icon} size="xs" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          
          {activeTab === 'account' && (
            <div className="grid gap-3 animate-in fade-in duration-300">
               {/* Personal Info Card */}
               <div className="vendor-surface rounded-2xl p-5 bg-white border border-rose-50 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Personal Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                     <div className="space-y-1">
                        <label className="text-[8px] font-black text-slate-300 uppercase px-1">Email Address</label>
                        <div className="flex gap-2">
                           <input 
                             className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 border-0 text-slate-500"
                             value={settings.email}
                             readOnly
                           />
                           <button className="h-9 w-9 rounded-xl bg-[#FFF5F7] text-[#9D174D] flex items-center justify-center shadow-sm">
                              <Icon name="edit" size="xs" />
                           </button>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[8px] font-black text-slate-300 uppercase px-1">Phone Number</label>
                        <div className="flex gap-2">
                           <input 
                             className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 border-0 text-slate-500"
                             value={settings.phone}
                             readOnly
                           />
                           <button className="h-9 w-9 rounded-xl bg-[#FFF5F7] text-[#9D174D] flex items-center justify-center shadow-sm">
                              <Icon name="edit" size="xs" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* App Preferences Card */}
               <div className="vendor-surface rounded-2xl p-5 bg-[#FDF2F8] border border-rose-50 shadow-sm">
                  <h3 className="text-[10px] font-black text-[#ed648f] uppercase tracking-widest mb-4">Platform Config</h3>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white">
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Display Language</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">Application default localization</p>
                     </div>
                     <button className="text-[10px] font-black text-[#9D174D] flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-rose-50 uppercase tracking-widest">
                        {settings.language}
                        <Icon name="chevronDown" size="xs" />
                     </button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="vendor-surface rounded-2xl p-5 bg-white border border-rose-50 shadow-sm space-y-2 animate-in fade-in duration-300">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Alert Preferences</h3>
               {[
                  { id: 'push', label: 'Push Notifications', desc: 'New leads and direct messages alerts' },
                  { id: 'email', label: 'Email Reports', desc: 'Weekly summaries and account updates' },
                  { id: 'whatsapp', label: 'WhatsApp Direct', desc: 'Instant lead alerts on mobile' }
               ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-[#FFF5F7] transition-all group border border-transparent hover:border-rose-100">
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-0.5">{item.desc}</p>
                     </div>
                     <button 
                       onClick={() => toggleSetting('notifications', item.id)}
                       className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                         settings.notifications[item.id] ? 'bg-[#9D174D]' : 'bg-slate-200'
                       }`}
                     >
                       <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                         settings.notifications[item.id] ? 'left-5.5' : 'left-0.5'
                       }`}></div>
                     </button>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="vendor-surface rounded-2xl p-5 bg-white border border-rose-50 shadow-sm space-y-2 animate-in fade-in duration-300">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Privacy & Visibility</h3>
               {[
                  { id: 'profilePublic', label: 'Public Visibility', desc: 'Show your profile in search results' },
                  { id: 'showPricing', label: 'Price Transparency', desc: 'Show starting prices to clients' }
               ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-[#FFF5F7] transition-all border border-transparent hover:border-rose-100">
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-0.5">{item.desc}</p>
                     </div>
                     <button 
                       onClick={() => toggleSetting('privacy', item.id)}
                       className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                         settings.privacy[item.id] ? 'bg-[#9D174D]' : 'bg-slate-200'
                       }`}
                     >
                       <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                         settings.privacy[item.id] ? 'left-5.5' : 'left-0.5'
                       }`}></div>
                     </button>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 animate-in fade-in duration-300">
               <div className="vendor-surface rounded-2xl p-5 bg-white border border-rose-50 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Access</h3>
                  <div className="space-y-2">
                     <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
                        <div>
                           <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Account Password</p>
                           <p className="text-[9px] font-bold text-slate-400">Last updated 90 days ago</p>
                        </div>
                        <button className="text-[9px] font-black text-[#9D174D] uppercase tracking-widest bg-white px-4 py-2 rounded-lg shadow-sm border border-rose-50 hover:bg-[#9D174D] hover:text-white transition-all">Change</button>
                     </div>
                  </div>
               </div>

               <div className="vendor-surface rounded-2xl p-5 bg-[#FFF1F2] border border-rose-100 shadow-sm">
                  <h3 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white">
                     <div>
                        <p className="text-xs font-black text-rose-900 uppercase tracking-tight">Delete Account</p>
                        <p className="text-[9px] font-bold text-rose-400 mt-0.5">Permanently remove all business data</p>
                     </div>
                     <button className="text-[9px] font-black text-white uppercase tracking-widest bg-rose-600 px-4 py-2 rounded-lg shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all">Terminate</button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
