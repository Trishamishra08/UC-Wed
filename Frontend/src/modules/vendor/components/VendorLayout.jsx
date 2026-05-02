import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import VendorSidebar from './VendorSidebar';
import VendorTopbar from './VendorTopbar';
import VendorBottomNav from './VendorBottomNav';
import { useVendorState } from '../useVendorState';

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { vendorState, loading } = useVendorState();

  useEffect(() => {
    // Check if vendor has an active subscription after data is fully loaded from backend
    if (!loading && vendorState._id && vendorState.subscription?.status !== 'Active') {
      navigate('/vendor/onboarding/subscription');
    }
  }, [loading, vendorState._id, vendorState.subscription?.status, navigate]);

  const isApproved = vendorState.status === 'Approved';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ed648f]"></div>
      </div>
    );
  }

  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="decor-blob decor-blob-1"></div>
      <div className="decor-blob decor-blob-2"></div>

      <div className="flex min-h-screen relative z-10">
        <div className="hidden lg:block w-72 lg:static">
          <VendorSidebar isApproved={isApproved} onClose={() => { }} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-2 pt-2 lg:px-4 lg:pt-3">
            <VendorTopbar notifications={vendorState.notifications} />
          </div>

          <main className="flex-1 px-2 py-2 lg:px-4 lg:py-3 mb-24 lg:mb-0">
            {!isApproved ? (
              <div className="h-full flex items-center justify-center min-h-[70vh]">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-700">
                  <div className="relative inline-block">
                    <div className="h-24 w-24 rounded-3xl bg-primary-50 flex items-center justify-center mx-auto relative overflow-hidden">
                      <Icon name="shield" size="lg" color="#ed648f" />
                      <div className="absolute inset-0 bg-primary-400/10 animate-pulse"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-lg animate-bounce">
                      <Icon name="clock" size="xs" color="current" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Account Under Review</h2>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">
                      Our admin team is currently verifying your profile and documents. You will get full access once approved.
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] bg-primary-50 py-3 px-6 rounded-2xl border border-primary-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400"></span>
                      </span>
                      Verification in Progress
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
                    Need help? Contact support@utsavchakra.com
                  </p>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
      <VendorBottomNav isApproved={isApproved} />
    </div>
  );
};

export default VendorLayout;
