import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { adminApi } from '../services/adminApi';

const AdminVendorVerification = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const token = localStorage.getItem('adminToken');

    const fetchPendingVendors = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getVendors(token);
            if (res.success) {
                // Filter for pending vendors
                const pending = res.data.filter(v => v.status === 'Pending');
                setVendors(pending);
            }
        } catch (err) {
            console.error('Failed to fetch vendors:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingVendors();
    }, []);

    const handleAction = async (id, status) => {
        try {
            setActionLoading(true);
            const res = await adminApi.updateVendorStatus(id, status, token);
            if (res.success) {
                setVendors(prev => prev.filter(v => v._id !== id));
                setModalOpen(false);
                setSelectedVendor(null);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const openDetails = (vendor) => {
        setSelectedVendor(vendor);
        setModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Verification Desk</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">New Partner Approval Queue</p>
                </div>
                
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        {vendors.length} Requests Pending
                    </span>
                </div>
            </div>

            {vendors.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-20 text-center space-y-4">
                    <div className="h-20 w-20 rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
                        <Icon name="sparkles" size="lg" color="current" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-900">Queue is Clear!</h3>
                        <p className="text-slate-400 text-xs font-bold">All partners have been processed. Great job!</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((vendor) => (
                        <div key={vendor._id} className="group bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon name="shield" size="lg" color="#ed648f" />
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0">
                                        <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${vendor.businessName}`} alt="" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 leading-tight">{vendor.businessName}</h3>
                                        <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mt-1">{vendor.category}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                                        <p className="text-[11px] font-bold text-slate-700">{vendor.city}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
                                        <p className="text-[11px] font-bold text-slate-700">{vendor.phone}</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => openDetails(vendor)}
                                    className="w-full py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                                >
                                    Review Documents
                                    <Icon name="eye" size="xs" color="white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Verification Modal */}
            {modalOpen && selectedVendor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setModalOpen(false)}></div>
                    <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 p-1">
                                    <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${selectedVendor.businessName}`} alt="" className="w-full h-full object-cover rounded-xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{selectedVendor.businessName}</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Application Review</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="h-10 w-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                                <Icon name="close" size="sm" color="#64748b" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column: Info */}
                                <div className="lg:col-span-1 space-y-8">
                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest pb-2 border-b border-primary-100">Business Profile</h4>
                                        <div className="space-y-4">
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                                                <p className="text-[13px] font-bold text-slate-900">{selectedVendor.fullName}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                                <p className="text-[13px] font-bold text-slate-900">{selectedVendor.email}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category & Location</p>
                                                <p className="text-[13px] font-bold text-slate-900">{selectedVendor.category} • {selectedVendor.city}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest pb-2 border-b border-primary-100">Performance Metrics</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                                                <p className="text-xl font-black text-slate-900">{selectedVendor.businessDetails?.years || '0'}</p>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Exp. Years</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                                                <p className="text-xl font-black text-slate-900">{selectedVendor.businessDetails?.teamSize || '1'}</p>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Team Size</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest pb-2 border-b border-primary-100">Documents</h4>
                                        <div className="space-y-3">
                                            {selectedVendor.documents?.idProof ? (
                                                <a href={selectedVendor.documents.idProof} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl group transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="shield" size="xs" color="#10b981" />
                                                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">ID Proof Uploaded</span>
                                                    </div>
                                                    <Icon name="eye" size="xs" color="#10b981" />
                                                </a>
                                            ) : (
                                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                                                    <Icon name="shield" size="xs" color="#94a3b8" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No ID Proof</span>
                                                </div>
                                            )}
                                            
                                            {selectedVendor.documents?.gst ? (
                                                <a href={selectedVendor.documents.gst} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl group transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="sparkles" size="xs" color="#10b981" />
                                                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">GST Registered</span>
                                                    </div>
                                                    <Icon name="eye" size="xs" color="#10b981" />
                                                </a>
                                            ) : (
                                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                                                    <Icon name="sparkles" size="xs" color="#94a3b8" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No GST Record</span>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Content & Media */}
                                <div className="lg:col-span-2 space-y-8">
                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest pb-2 border-b border-primary-100">About the Business</h4>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed italic">
                                                "{selectedVendor.businessDetails?.description || 'No description provided yet.'}"
                                            </p>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest pb-2 border-b border-primary-100">Work Portfolio</h4>
                                        {selectedVendor.portfolio && selectedVendor.portfolio.length > 0 ? (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {selectedVendor.portfolio.map((item, idx) => (
                                                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                                                        <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                                            <p className="text-[8px] font-black text-white uppercase tracking-widest truncate">{item.title}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-slate-50 p-10 rounded-3xl border border-dashed border-slate-200 text-center">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No portfolio media uploaded</p>
                                            </div>
                                        )}
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
                            <button 
                                onClick={() => handleAction(selectedVendor._id, 'Rejected')}
                                disabled={actionLoading}
                                className="px-8 py-4 rounded-2xl border border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all disabled:opacity-50"
                            >
                                Reject Application
                            </button>
                            <button 
                                onClick={() => handleAction(selectedVendor._id, 'Approved')}
                                disabled={actionLoading}
                                className="flex-1 max-w-sm py-4 rounded-2xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
                            >
                                {actionLoading ? 'Processing...' : 'Approve & Activate Partner'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVendorVerification;
