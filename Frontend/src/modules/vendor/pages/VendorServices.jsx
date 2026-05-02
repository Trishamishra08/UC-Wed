import { useState, useEffect } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorServices = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    basePrice: '',
    inclusions: ['', '']
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

  const handleSave = () => {
    if (!newService.name || !newService.category || !newService.basePrice) {
      alert('Please fill in all basic fields.');
      return;
    }
    const serviceToAdd = {
      id: `s-${Date.now()}`,
      name: newService.name,
      category: newService.category,
      basePrice: Number(newService.basePrice),
      packages: [
        { name: 'Standard', price: Number(newService.basePrice) },
        { name: 'Premium', price: Number(newService.basePrice) * 1.5 }
      ],
      inclusions: newService.inclusions.filter(Boolean)
    };
    updateVendorState({ services: [...vendorState.services, serviceToAdd] });
    setShowModal(false);
    setNewService({ name: '', category: '', basePrice: '', inclusions: ['', ''] });
  };

  const getServiceColor = (index) => {
    const colors = [
      { bg: '#FFF1F2', border: '#FFE4E6', text: '#E11D48' }, // Rose
      { bg: '#F0F9FF', border: '#E0F2FE', text: '#0284C7' }, // Sky
      { bg: '#F5F3FF', border: '#EDE9FE', text: '#7C3AED' }, // Purple
      { bg: '#FFFBEB', border: '#FEF3C7', text: '#D97706' }, // Amber
      { bg: '#F0FDF4', border: '#DCFCE7', text: '#16A34A' }  // Emerald
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Solid Pastel Rose */}
      <div className="vendor-surface rounded-xl p-3 sm:p-5 relative overflow-hidden bg-[#FDF2F8] border border-rose-100">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Catalogue</p>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">Service Management</h2>
            <p className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">Organize your offerings into premium listings.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-lg px-5 py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-rose-200"
            onClick={() => setShowModal(true)}
          >
            <Icon name="plus" size="xs" /> Add service
          </button>
        </div>
      </div>

      {/* Stats Row - Soft Pastel */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Services', value: vendorState.services.length, bg: '#F0F9FF', border: '#E0F2FE' },
          { label: 'Rating', value: '4.9 ⭐', bg: '#FFFBEB', border: '#FEF3C7' },
          { label: 'Visibility', value: 'High', bg: '#F0FDF4', border: '#DCFCE7' }
        ].map((stat, i) => (
          <div key={i} className="vendor-surface rounded-xl p-2 sm:p-3 border shadow-none flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]" style={{ background: stat.bg, borderColor: stat.border }}>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{stat.label}</p>
            <p className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Service Grid - Solid Pastel Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {vendorState.services.map((service, i) => {
          const theme = getServiceColor(i);
          return (
            <div key={service.id} className="vendor-surface rounded-2xl p-5 relative overflow-hidden transition-all hover:shadow-md border" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-white/60 flex items-center justify-center shadow-sm" style={{ color: theme.text }}>
                    {service.category === 'Decoration' ? <Icon name="palette" size="sm" /> : 
                     service.category === 'Photography' ? <Icon name="camera" size="sm" /> : 
                     service.category === 'Catering' ? <Icon name="party" size="sm" /> : <Icon name="building" size="sm" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{service.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-0.5" style={{ color: theme.text }}>{service.category}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest">Starting Price</p>
                   <p className="text-sm font-black text-slate-900 tracking-tight">₹{service.basePrice.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="bg-white/40 rounded-xl p-3 border" style={{ borderColor: theme.border }}>
                  <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest mb-2">Available Packages</p>
                  <div className="flex flex-wrap gap-2">
                    {service.packages.map((pkg) => (
                      <div key={pkg.name} className="flex items-center gap-2 bg-white/60 rounded-lg px-2.5 py-1.5 border border-white/80 text-[10px] font-bold text-slate-700">
                         <div className="h-1 w-1 rounded-full" style={{ backgroundColor: theme.text }}></div>
                         {pkg.name} • <span style={{ color: theme.text }}>₹{pkg.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-1">
                  <p className="text-[9px] font-black text-slate-900/30 uppercase tracking-widest mb-2">Included Highlights</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {service.inclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <Icon name="check" size="xs" color="#10b981" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">New Listing</h3>
                  <p className="text-xs font-bold text-slate-500">Add a specialized service</p>
                </div>
                <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <Icon name="close" size="sm" />
                </button>
             </div>

             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Name</label>
                    <input 
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black focus:outline-none focus:border-rose-400 transition-all"
                      placeholder="e.g. Stage Decor"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                    <select 
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black focus:outline-none focus:border-rose-400"
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="Decoration">Decoration</option>
                      <option value="Photography">Photography</option>
                      <option value="Catering">Catering</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Base Price (₹)</label>
                  <input 
                    type="number"
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black focus:outline-none focus:border-rose-400"
                    placeholder="e.g. 50000"
                    value={newService.basePrice}
                    onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                  />
                </div>

                <div className="pt-2">
                   <button onClick={handleSave} className="w-full vendor-cta h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200">
                      Create Service
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorServices;
