import { useState } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorProfile = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [isEditing, setIsEditing] = useState(false);
  
  // Ensure we capture all existing data correctly
  const [tempProfile, setTempProfile] = useState({ 
    businessName: vendorState.profile?.businessName || '',
    category: vendorState.profile?.category || '',
    location: vendorState.profile?.location || '',
    experience: vendorState.profile?.experience || '5 Years',
    teamSize: vendorState.profile?.teamSize || '7 Max',
    accName: vendorState.bankInfo?.accName || 'trisha',
    accNo: vendorState.bankInfo?.accNo || '123456789012',
    ifsc: vendorState.bankInfo?.ifsc || 'SBI1234567',
    upiId: vendorState.bankInfo?.upiId || 'name@upi'
  });

  const handleSave = () => {
    updateVendorState({ 
      profile: { 
        businessName: tempProfile.businessName,
        category: tempProfile.category,
        location: tempProfile.location,
        experience: tempProfile.experience,
        teamSize: tempProfile.teamSize
      },
      bankInfo: { 
        accName: tempProfile.accName,
        accNo: tempProfile.accNo,
        ifsc: tempProfile.ifsc,
        upiId: tempProfile.upiId
      }
    });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-0">
      {/* Header */}
      <div className="vendor-surface rounded-xl p-4 sm:p-6 relative overflow-hidden bg-white border border-rose-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Management</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Business Profile</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">Verified details & credentials</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="vendor-cta rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-100 active:scale-95 transition-all"
          >
            <Icon name={isEditing ? 'check' : 'edit'} size="xs" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Main Grid - Restoring individual small cards with full data */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Business Overview - Rose */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden border border-rose-100/50 shadow-sm transition-all" style={{ backgroundColor: '#FFF1F2' }}>
           <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-[#ed648f] shadow-sm">
                 <Icon name="store" size="sm" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Business Info</h3>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Business Name</p>
                 {isEditing ? (
                   <input className="w-full bg-white/60 border border-rose-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.businessName} onChange={(e) => handleChange('businessName', e.target.value)} />
                 ) : (
                   <p className="text-sm font-black text-slate-900 truncate">{tempProfile.businessName || 'Not Set'}</p>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Category</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-rose-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.category} onChange={(e) => handleChange('category', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-slate-900 truncate">{tempProfile.category || 'Not Set'}</p>
                    )}
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Location</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-rose-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.location} onChange={(e) => handleChange('location', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-slate-900 truncate">{tempProfile.location || 'Not Set'}</p>
                    )}
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Experience</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-rose-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.experience} onChange={(e) => handleChange('experience', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-slate-900">{tempProfile.experience}</p>
                    )}
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Team Size</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-rose-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.teamSize} onChange={(e) => handleChange('teamSize', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-slate-900">{tempProfile.teamSize}</p>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Card 2: Bank Account & Name - Sky */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden border border-blue-100/50 shadow-sm transition-all" style={{ backgroundColor: '#F0F9FF' }}>
           <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm">
                 <Icon name="card" size="sm" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Bank Details</h3>
           </div>
           
           <div className="space-y-4">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Account Name</p>
                 {isEditing ? (
                   <input className="w-full bg-white/60 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.accName} onChange={(e) => handleChange('accName', e.target.value)} />
                 ) : (
                   <p className="text-sm font-black text-slate-900 truncate">{tempProfile.accName || 'Not Set'}</p>
                 )}
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Account Number</p>
                 {isEditing ? (
                   <input className="w-full bg-white/60 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.accNo} onChange={(e) => handleChange('accNo', e.target.value)} />
                 ) : (
                   <p className="text-sm font-black text-slate-900 truncate">{tempProfile.accNo || 'Not Set'}</p>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">IFSC Code</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.ifsc} onChange={(e) => handleChange('ifsc', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-slate-900">{tempProfile.ifsc || 'Not Set'}</p>
                    )}
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">UPI ID</p>
                    {isEditing ? (
                      <input className="w-full bg-white/60 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-black" value={tempProfile.upiId} onChange={(e) => handleChange('upiId', e.target.value)} />
                    ) : (
                      <p className="text-[11px] font-black text-rose-500 truncate">{tempProfile.upiId || 'Not Set'}</p>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Card 3: Strength - Purple */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden border border-purple-100/50 shadow-sm transition-all" style={{ backgroundColor: '#F5F3FF' }}>
           <div className="flex items-center justify-between mb-5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-purple-600 shadow-sm">
                 <Icon name="star" size="sm" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/60 rounded-lg text-purple-600 border border-purple-100">Live Rating</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-1">Profile Strength</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-3">67%</h3>
              <div className="h-2 w-full bg-white/60 rounded-full overflow-hidden">
                 <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: '67%' }}></div>
              </div>
              <p className="text-[9px] font-bold text-slate-500 mt-3 italic leading-tight">Complete bank details for 100% verification.</p>
           </div>
        </div>

        {/* Card 4: Verification - Orange */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden border border-orange-100/50 shadow-sm transition-all" style={{ backgroundColor: '#FFF7ED' }}>
           <div className="flex items-center justify-between mb-5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm">
                 <Icon name="check" size="sm" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/60 rounded-lg text-emerald-600 border border-emerald-100">Approved</span>
           </div>
           <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-1">Credential Status</p>
              <div className="grid grid-cols-2 gap-2">
                 {['ID Proof', 'GST Cert', 'Contract'].map(doc => (
                   <div key={doc} className="bg-white/40 rounded-xl px-3 py-2 border border-orange-100/50 flex items-center gap-2">
                      <Icon name="check" size="xs" color="#10b981" />
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight">{doc}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Card 5: Visibility - Green */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden border border-emerald-100/50 shadow-sm transition-all" style={{ backgroundColor: '#F0FDF4' }}>
           <div className="flex items-center justify-between mb-5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                 <Icon name="stats" size="sm" />
              </div>
              <Icon name="more" size="xs" color="currentColor" className="opacity-20" />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-1">Market Visibility</p>
              <h3 className="text-xl font-black text-slate-900 truncate">High Visibility</h3>
              <div className="flex items-center gap-2 mt-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">Active Ranking</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default VendorProfile;
