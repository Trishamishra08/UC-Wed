import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorReviews = () => {
  const reviews = [
    { id: 'rev-1', name: 'Meera Kapoor', rating: 5, comment: 'Loved the stage decor and punctual setup. Highly recommend!' },
    { id: 'rev-2', name: 'Sahil Jain', rating: 4, comment: 'Great execution, minor delay in floral delivery but managed well.' }
  ];

  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (selectedReview) { 
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
  }, [selectedReview]);

  const handleReplySubmit = () => {
    alert(`Reply sent to ${selectedReview.name}: ${replyText}`);
    setSelectedReview(null);
    setReplyText('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Solid Rose Pastel */}
      <div className="vendor-surface rounded-xl p-4 sm:p-6 relative overflow-hidden bg-[#FDF2F8] border border-rose-100 shadow-sm">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ed648f, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ed648f]">Social Proof</p>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Client Feedback</h2>
          <p className="text-xs font-bold text-slate-500 mt-1">Monitor your ratings and engage with your clients.</p>
        </div>
      </div>

      {/* Stats Row - Solid Pastel Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="vendor-surface rounded-2xl p-5 border border-rose-100 shadow-sm transition-all hover:scale-[1.02]" style={{ backgroundColor: '#FFF1F2' }}>
           <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-xl bg-white/60 flex items-center justify-center text-rose-500 shadow-sm">
                 <Icon name="star" size="sm" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-rose-400">Trust Score</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-1">Overall Rating</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">4.8</h3>
              <p className="text-[10px] font-bold text-rose-500 mt-1">Out of 48 reviews</p>
           </div>
        </div>

        <div className="vendor-surface rounded-2xl p-5 border border-purple-100 shadow-sm transition-all hover:scale-[1.02] sm:col-span-2" style={{ backgroundColor: '#F5F3FF' }}>
           <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4">Rating Distribution</p>
           <div className="space-y-3">
              {[5, 4, 3].map((star, i) => (
                <div key={star} className="flex items-center gap-3">
                   <span className="text-[10px] font-black text-slate-600 w-8">{star} ★</span>
                   <div className="h-1.5 flex-1 bg-white/40 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: `${85 - i*20}%` }}></div>
                   </div>
                   <span className="text-[10px] font-black text-purple-600 w-10 text-right">{85 - i*20}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Reviews List - Solid Pastel Cards */}
      <div className="grid gap-3">
        <div className="flex items-center gap-2 mb-2 px-1">
           <div className="h-2 w-2 rounded-full bg-[#ed648f]"></div>
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Testimonials</h3>
        </div>
        
        {reviews.map((review, index) => {
           const pastels = ['#FFF1F2', '#F0F9FF', '#F5F3FF', '#FFFBEB'];
           const bg = pastels[index % pastels.length];
           
           return (
             <div key={review.id} className="vendor-surface rounded-2xl p-5 border border-black/5 transition-all hover:shadow-md" style={{ backgroundColor: bg }}>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/60 flex items-center justify-center text-rose-500 font-black text-sm shadow-sm">
                         {review.name[0]}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-900 leading-none">{review.name}</h4>
                         <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon key={i} name="star" size="xs" color={i < review.rating ? '#ed648f' : '#cbd5e1'} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setSelectedReview(review)}
                     className="bg-white/60 rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border border-black/5 hover:bg-white transition-all shadow-sm"
                   >
                      Reply
                   </button>
                </div>
                <div className="bg-white/40 rounded-xl p-4 border border-white/60 italic text-xs font-bold text-slate-600 leading-relaxed">
                   "{review.comment}"
                </div>
             </div>
           );
        })}
      </div>

      {/* Reply Modal - Rose Themed */}
      {selectedReview && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedReview(null)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Review Reply</h3>
                  <p className="text-xs font-bold text-slate-500">Respond to {selectedReview.name}</p>
                </div>
                <button onClick={() => setSelectedReview(null)} className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <Icon name="close" size="sm" />
                </button>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-xs font-bold text-slate-500">
                   "{selectedReview.comment}"
                </div>
                
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Your Response</label>
                   <textarea 
                     className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all resize-none"
                     placeholder="Type your reply here..."
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                   />
                </div>

                <div className="pt-2">
                   <button onClick={handleReplySubmit} className="w-full vendor-cta h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200">
                      Post Response
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorReviews;
