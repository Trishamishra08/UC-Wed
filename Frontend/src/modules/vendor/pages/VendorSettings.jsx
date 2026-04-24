import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'password', 'delete', 'logout'

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

  useEffect(() => {
    if (showModal) { 
      document.body.style.overflow = 'hidden'; 
      document.body.classList.add('modal-open');
    } else { 
      document.body.style.overflow = 'unset'; 
      document.body.classList.remove('modal-open');
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const toggleNotification = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const togglePrivacy = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#ed648f' }}>Settings</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Account Preferences</h2>
          <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Manage your account security, notifications, and app behavior.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar Tabs */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {[
            { id: 'account', label: 'Account', icon: 'account' },
            { id: 'notifications', label: 'Notifications', icon: 'clock' },
            { id: 'privacy', label: 'Privacy', icon: 'checkList' },
            { id: 'security', label: 'Security', icon: 'mail' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap lg:w-full ${
                activeTab === tab.id 
                  ? 'bg-white text-[#ed648f] shadow-sm border border-[#ed648f20]' 
                  : 'text-slate-500 hover:bg-white hover:text-[#ed648f]'
              }`}
            >
              <Icon name={tab.icon} size="xs" color="current" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-5 sm:p-8 min-h-[400px]">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Email Address</label>
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-100 text-slate-500 cursor-not-allowed"
                        value={settings.email}
                        readOnly
                      />
                      <button className="px-3 py-2 rounded-xl bg-slate-100 text-slate-400 hover:text-[#ed648f] transition-all">
                        <Icon name="edit" size="xs" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Phone Number</label>
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-100 text-slate-500 cursor-not-allowed"
                        value={settings.phone}
                        readOnly
                      />
                      <button className="px-3 py-2 rounded-xl bg-slate-100 text-slate-400 hover:text-[#ed648f] transition-all">
                        <Icon name="edit" size="xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">App Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-700">Display Language</p>
                      <p className="text-xs text-slate-500 font-medium">Select your preferred language for the app.</p>
                    </div>
                    <button className="text-sm font-bold text-[#ed648f] flex items-center gap-1">
                      {settings.language}
                      <Icon name="chevronDown" size="xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Notification Settings</h3>
              <div className="space-y-3">
                {[
                  { id: 'push', label: 'Push Notifications', desc: 'Get alerts for new leads and messages on your device.' },
                  { id: 'email', label: 'Email Alerts', desc: 'Receive weekly summaries and important account updates.' },
                  { id: 'whatsapp', label: 'WhatsApp Updates', desc: 'Get instant lead notifications directly on WhatsApp.' },
                  { id: 'marketing', label: 'Marketing Communications', desc: 'Stay updated with new features and special offers.' }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white group">
                    <div className="pr-4">
                      <p className="text-sm font-bold text-slate-700">{item.label}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => toggleNotification(item.id)}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                        settings.notifications[item.id] ? 'bg-[#ed648f]' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        settings.notifications[item.id] ? 'left-7' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Privacy & Visibility</h3>
              <div className="space-y-3">
                {[
                  { id: 'profilePublic', label: 'Public Profile Visibility', desc: 'Make your business profile visible to all potential customers.' },
                  { id: 'showPricing', label: 'Show Starting Prices', desc: 'Display your base prices on the listing cards.' },
                  { id: 'showContact', label: 'Direct Contact Access', desc: 'Allow verified users to see your phone number directly.' }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white">
                    <div className="pr-4">
                      <p className="text-sm font-bold text-slate-700">{item.label}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => togglePrivacy(item.id)}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                        settings.privacy[item.id] ? 'bg-[#ed648f]' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        settings.privacy[item.id] ? 'left-7' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-700">Account Password</p>
                      <p className="text-xs text-slate-500 font-medium">Last changed 3 months ago.</p>
                    </div>
                    <button 
                      onClick={() => openModal('password')}
                      className="px-4 py-2 rounded-xl border border-[#ed648f20] text-[#ed648f] text-xs font-bold hover:bg-[#ed648f] hover:text-white transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-700">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-500 font-medium">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-rose-50">
                <h3 className="text-lg font-bold text-rose-600 mb-4">Danger Zone</h3>
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-rose-900">Delete Vendor Account</p>
                    <p className="text-xs text-rose-500 font-medium max-w-md">Once deleted, your portfolio, leads, and reviews will be permanently removed.</p>
                  </div>
                  <button 
                    onClick={() => openModal('delete')}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all shadow-md shadow-rose-200"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modals */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}>
          <div className="w-full max-w-md rounded-[2rem] p-6 sm:p-8 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            {modalType === 'password' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
                    <Icon name="mail" size="lg" color="#ed648f" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Update Password</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">Protect your account with a strong password.</p>
                </div>
                <div className="space-y-4">
                  <input type="password" placeholder="Current Password" className="w-full rounded-xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-semibold outline-none focus:border-[#ed648f20] transition-all" />
                  <input type="password" placeholder="New Password" className="w-full rounded-xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-semibold outline-none focus:border-[#ed648f20] transition-all" />
                  <input type="password" placeholder="Confirm New Password" className="w-full rounded-xl px-4 py-3 bg-slate-50 border border-slate-100 text-sm font-semibold outline-none focus:border-[#ed648f20] transition-all" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                  <button className="flex-1 py-3 rounded-xl bg-[#ed648f] text-white font-bold shadow-lg shadow-[#ed648f30]">Save Changes</button>
                </div>
              </div>
            )}

            {modalType === 'delete' && (
              <div className="space-y-6 text-center">
                <div className="h-16 w-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                  <Icon name="logout" size="lg" color="#e11d48" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Are you absolutely sure?</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                    This action cannot be undone. All your business data, reviews, and portfolio items will be permanently erased.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button className="w-full py-3.5 rounded-2xl bg-rose-600 text-white font-bold shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all">Yes, Delete Account</button>
                  <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">I'll Stay</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorSettings;
