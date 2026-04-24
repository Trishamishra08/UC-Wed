import Icon from '../../../components/ui/Icon';

const bookingsData = [
    { id: 'B-2901', customer: 'Amit Verma', vendor: 'Royal Photography', date: '2024-11-20', amount: '₹12,400', status: 'Confirmed' },
    { id: 'B-2902', customer: 'Priya C.', vendor: 'Floral Dreams', date: '2024-12-15', amount: '₹8,500', status: 'Pending' },
    { id: 'B-2903', customer: 'Vikram S.', vendor: 'Indore Caterers', date: '2025-01-10', amount: '₹15,000', status: 'Completed' },
    { id: 'B-2904', customer: 'Neha G.', vendor: 'Style & Blush', date: '2024-10-05', amount: '₹4,200', status: 'Cancelled' },
];

const AdminBookings = () => {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Global Ledger</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Platform Booking Oversight</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-8 rounded-lg border border-slate-200 bg-white px-3 flex items-center gap-2">
                        <Icon name="calendar" size="xs" color="#94a3b8" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date Range</span>
                    </div>
                    <button className="h-8 px-4 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                        Export XML
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Booking ID</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Client / Customer</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Vendor Partner</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Valuation</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Event Date</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Registry Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bookingsData.map((booking) => (
                                <tr key={booking.id} className="hover:bg-primary-50/10 transition-colors group">
                                    <td className="px-6 py-3 text-[11px] font-black text-slate-900">{booking.id}</td>
                                    <td className="px-5 py-3 text-[11px] font-bold text-slate-600">{booking.customer}</td>
                                    <td className="px-5 py-3">
                                        <p className="text-[11px] font-black text-slate-800">{booking.vendor}</p>
                                    </td>
                                    <td className="px-5 py-3 text-[11px] font-black text-primary-500 tracking-tight">{booking.amount}</td>
                                    <td className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase">{booking.date}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    booking.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                        'bg-primary-50 text-primary-500 border-primary-100'
                                            }`}>{booking.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
