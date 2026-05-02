import { useState } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorPortfolio = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    tag: 'Decor',
    type: 'Image',
    url: ''
  });

  // Fallback sample data if portfolio is empty
  const samplePortfolio = [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      title: 'Grand Palace Decor',
      tag: 'Wedding',
      type: 'Image'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      title: 'Elegant Reception Hall',
      tag: 'Reception',
      type: 'Image'
    },
    {
      id: 'p3',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Cinematic Highlights',
      tag: 'Video',
      type: 'Video'
    }
  ];

  const portfolio = vendorState.portfolio?.length > 0 ? vendorState.portfolio : samplePortfolio;

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.url) return;

    const itemToAdd = {
      ...newItem,
      id: Date.now().toString()
    };

    updateVendorState({
      portfolio: [...(vendorState.portfolio || []), itemToAdd]
    });

    setNewItem({ title: '', tag: 'Decor', type: 'Image', url: '' });
    setIsModalOpen(false);
  };

  const removeItem = (id) => {
    const updated = (vendorState.portfolio || []).filter(item => item.id !== id);
    updateVendorState({ portfolio: updated });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Card */}
      <div className="vendor-surface rounded-xl p-3 sm:p-5 relative overflow-hidden bg-[#FDF2F8] border border-rose-100">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D28A8C]">Showcase</p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">Portfolio & Media</h2>
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">High-quality work attracts 3x more bookings.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold tracking-wide active:scale-95 transition-all flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon name="plus" size="xs" /> Upload media
          </button>
        </div>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Items', value: portfolio.length, bg: '#FDF2F8', border: '#FCE7F3' },
          { label: 'Verified', value: '100%', bg: '#F0FDF4', border: '#DCFCE7' },
          { label: 'Storage', value: '15%', bg: '#FFFBEB', border: '#FEF3C7' }
        ].map((stat, i) => (
          <div key={i} className="vendor-surface rounded-xl p-2 sm:p-3 border shadow-none flex flex-col items-center justify-center text-center" style={{ background: stat.bg, borderColor: stat.border }}>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mb-0.5">{stat.label}</p>
            <p className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-3 pb-10">
        {portfolio.map((item, i) => (
          <div 
            key={item.id} 
            className="vendor-surface rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-white/50 relative"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {item.type === 'Video' || item.url.includes('.mp4') || item.url.includes('data:video') ? (
                <video 
                  src={item.url} 
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  onMouseOver={e => e.target.play()}
                  onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2.5">
                <div className="flex w-full items-center justify-between">
                   <div className="text-white">
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.tag}</p>
                      <p className="text-xs font-bold leading-tight truncate max-w-[120px]">{item.title}</p>
                   </div>
                   <button 
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-colors"
                   >
                     <Icon name="close" size="xs" />
                   </button>
                </div>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">{item.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div 
          className="vendor-surface rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
            <Icon name="plus" size="md" />
          </div>
          <p className="text-xs font-bold text-slate-500 mt-2">Add New Work</p>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Upload New Media</h3>
                  <p className="text-xs font-bold text-slate-500">Add a stunning project to your portfolio</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <Icon name="close" size="sm" />
                </button>
             </div>

             <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Project Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dreamy Garden Wedding"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 transition-all"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                        value={newItem.tag}
                        onChange={(e) => setNewItem({ ...newItem, tag: e.target.value })}
                      >
                        <option>Wedding</option>
                        <option>Decor</option>
                        <option>Reception</option>
                        <option>Pre-Wedding</option>
                        <option>Other</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Media Type</label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-rose-400 transition-all"
                        value={newItem.type}
                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                      >
                        <option>Image</option>
                        <option>Video Link</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Upload Media</label>
                  <div className="relative group">
                    <div className="w-full min-h-[140px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100/50 hover:border-rose-300 transition-all cursor-pointer flex flex-col items-center justify-center p-4 relative overflow-hidden">
                      {newItem.url ? (
                        <div className="absolute inset-0 group/preview bg-black">
                          {newItem.type === 'Video' || (newItem.url && newItem.url.startsWith('data:video')) ? (
                             <video src={newItem.url} className="w-full h-full object-contain" autoPlay muted loop />
                          ) : (
                             <img src={newItem.url} alt="Preview" className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Change Media</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-rose-400 mb-2">
                             <Icon name={newItem.type === 'Video' ? 'video' : 'image'} size="sm" />
                          </div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Click to Upload {newItem.type}</p>
                          <p className="text-[9px] font-medium text-slate-400 mt-1">Images or MP4 Videos</p>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept={newItem.type === 'Video' ? 'video/mp4,video/x-m4v,video/*' : 'image/*'}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewItem({ ...newItem, url: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                   <button type="submit" className="w-full vendor-cta h-11 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200">
                      Confirm Upload
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPortfolio;
