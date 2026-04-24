import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorTopbar from './VendorTopbar';
import VendorBottomNav from './VendorBottomNav';
import { useVendorState } from '../useVendorState';

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { vendorState } = useVendorState();

  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="decor-blob decor-blob-1"></div>
      <div className="decor-blob decor-blob-2"></div>

      <div className="flex min-h-screen relative z-10">
        <div className="hidden lg:block w-72 lg:static">
          <VendorSidebar onClose={() => {}} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-2 pt-2 lg:px-4 lg:pt-3">
            <VendorTopbar notifications={vendorState.notifications} />
          </div>

          <main className="flex-1 px-2 py-2 lg:px-4 lg:py-3 mb-24 lg:mb-0">
            <Outlet />
          </main>
        </div>
      </div>
      <VendorBottomNav />
    </div>
  );
};

export default VendorLayout;
