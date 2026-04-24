import { useState, useEffect } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorServices = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#ed648f' }}>Services</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Service listings</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Showcase the services and packages you provide.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-1.5 sm:gap-2"
            onClick={() => setShowModal(true)}
          >
            <Icon name="plus" size="xs" /> Add service
          </button>
        </div>
      </div>

      {/* Add Service Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <div className="w-full max-w-xl rounded-[1.5rem] p-4 sm:p-6 shadow-2xl relative my-auto" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
            border: '1px solid rgba(210, 138, 140, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-none">Add New Service</h3>
                <p className="text-[11px] font-medium mt-1" style={{ color: '#94a3b8' }}>Create a new service listing.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                style={{ background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)' }}
              >
                <Icon name="close" size="xs" color="current" />
              </button>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 no-scrollbar">
              <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Service Name</label>
                  <input 
                    className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(237, 100, 143, 0.12)',
                      background: 'rgba(253, 242, 248, 0.25)'
                    }}
                    placeholder="e.g. Royal Stage Decor"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category</label>
                  <div className="relative">
                    <div 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold border transition-all cursor-pointer flex items-center justify-between gap-2 shadow-sm"
                      style={{
                        borderColor: 'rgba(237, 100, 143, 0.2)',
                        background: 'rgba(253, 242, 248, 0.25)',
                        color: '#ed648f'
                      }}
                      onClick={() => setOpenDropdown(!openDropdown)}
                    >
                      {newService.category || 'Select Category'}
                      <Icon name="chevronDown" size="xs" color="#ed648f" className={`transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Custom Dropdown Menu */}
                    {openDropdown && (
                      <>
                        <div className="fixed inset-0 z-[90]" onClick={() => setOpenDropdown(false)}></div>
                        <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-xl shadow-2xl border border-[#ed648f20] transition-all z-[100] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                          {['Decoration', 'Photography', 'Catering', 'Venue'].map((cat) => (
                            <div
                              key={cat}
                              className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors flex items-center gap-3 ${
                                newService.category === cat ? 'bg-[#ed648f10] text-[#ed648f]' : 'text-slate-600 hover:bg-[#ed648f08] hover:text-[#ed648f]'
                              }`}
                              onClick={() => {
                                setNewService({...newService, category: cat});
                                setOpenDropdown(false);
                              }}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full transition-all ${newService.category === cat ? 'bg-[#ed648f] scale-100' : 'bg-transparent scale-0'}`}></div>
                              {cat}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Starting Price (₹)</label>
                <input 
                  type="number"
                  className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(237, 100, 143, 0.12)',
                    background: 'rgba(253, 242, 248, 0.25)'
                  }}
                  placeholder="e.g. 50000"
                  value={newService.basePrice}
                  onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Key Inclusions</p>
                <div className="space-y-2">
                  {newService.inclusions.map((inc, idx) => (
                    <input 
                      key={idx}
                      placeholder={`Service Feature ${idx + 1}`}
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-medium transition-all outline-none"
                      style={{
                        border: '1px solid rgba(237, 100, 143, 0.12)',
                        background: 'rgba(253, 242, 248, 0.2)'
                      }}
                      value={inc}
                      onChange={(e) => {
                        const incs = [...newService.inclusions];
                        incs[idx] = e.target.value;
                        setNewService({...newService, inclusions: incs});
                      }}
                    />
                  ))}
                </div>
              </div>

              <button 
                className="vendor-cta w-full rounded-xl py-3.5 font-semibold text-sm sm:text-base mt-2 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                onClick={handleSave}
              >
                <Icon name="sparkles" size="xs" /> Save Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Cards */}
      <div className="grid gap-3 sm:gap-5 lg:grid-cols-2">
        {vendorState.services.map((service, i) => (
          <div key={service.id} className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 group relative overflow-hidden" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{
              background: 'radial-gradient(circle, #ed648f, transparent 70%)'
            }}></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                  color: '#ed648f'
                }}>
                  {service.category === 'Decoration' ? <Icon name="palette" size="sm" /> : 
                   service.category === 'Photography' ? <Icon name="camera" size="sm" /> : 
                   service.category === 'Catering' ? <Icon name="party" size="sm" /> : <Icon name="building" size="sm" />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-slate-900">{service.name}</h3>
                  <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ color: '#ed648f' }}>Starting at ₹{service.basePrice.toLocaleString()}</p>
                </div>
              </div>
              <span className="rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                color: '#ed648f'
              }}>{service.category}</span>
            </div>
            
            <div className="mt-3 sm:mt-5 relative z-10">
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-1.5 sm:mb-2" style={{ color: '#94a3b8' }}>Packages</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.packages.map((pkg) => (
                  <span key={pkg.name} className="rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold" style={{
                    background: 'rgba(253, 242, 248, 0.5)',
                    border: '1px solid rgba(237, 100, 143, 0.08)',
                    color: '#475569'
                  }}>
                    {pkg.name} • ₹{pkg.price.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 relative z-10">
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-1.5 sm:mb-2" style={{ color: '#94a3b8' }}>Inclusions</p>
              <ul className="text-xs sm:text-sm font-medium space-y-0.5 sm:space-y-1" style={{ color: '#64748b' }}>
                {service.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ed648f' }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorServices;
