import Icon from '../../../components/ui/Icon';
import weddingImg from '../../../assets/wedding.png';

const VendorPendingApproval = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
            <div className="vendor-surface rounded-[2.5rem] p-8 sm:p-12 max-w-2xl w-full relative overflow-hidden shadow-2xl border-none">
                {/* Decorative background image with low opacity */}
                <div className="absolute top-0 right-0 h-full w-1/2 z-0 opacity-[0.03] pointer-events-none">
                    <img src={weddingImg} alt="Wedding" className="h-full w-full object-cover" />
                </div>

                <div className="relative z-10">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce" style={{
                        background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                        color: '#ed648f'
                    }}>
                        <Icon name="verified" size="lg" color="current" />
                    </div>

                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#ed648f' }}>
                        Application Submitted
                    </p>
                    
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                        Under Verification <span className="text-primary-400">...</span>
                    </h2>

                    <div className="space-y-4 max-w-lg mx-auto text-slate-600">
                        <p className="text-sm sm:text-base font-semibold leading-relaxed">
                            Thank you for joining UtsavChakra! Your payment has been received and your profile is now being verified by our administrative team.
                        </p>
                        <p className="text-[11px] sm:text-xs font-bold leading-relaxed opacity-70 italic">
                            Verification typically takes 24-48 business hours. You will receive an email notification once your account is approved.
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col items-center">
                            <Icon name="sparkles" size="sm" color="#ed648f" />
                            <p className="text-[10px] font-bold uppercase mt-2 text-slate-400">Step 1</p>
                            <p className="text-xs font-black text-slate-800">Reviewing Documents</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col items-center opacity-50">
                            <Icon name="verified" size="sm" color="#ed648f" />
                            <p className="text-[10px] font-bold uppercase mt-2 text-slate-400">Step 2</p>
                            <p className="text-xs font-black text-slate-800">Final Approval</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button 
                            className="vendor-cta rounded-2xl px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-xl transition-all active:scale-95"
                            onClick={() => window.location.reload()}
                        >
                            Check Status
                        </button>
                    </div>
                </div>
            </div>
            
            <p className="mt-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Need Help? <span className="text-primary-400 cursor-pointer hover:underline">Contact Support</span>
            </p>
        </div>
    );
};

export default VendorPendingApproval;
