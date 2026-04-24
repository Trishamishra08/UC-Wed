import { useState, useMemo } from 'react';
import Icon from '../../../components/ui/Icon';

const INITIAL_USERS = [
    { id: 1, name: 'Amit Verma', email: 'amit@example.com', phone: '9827012345', weddingDate: '2024-11-20', progress: 65, city: 'Indore' },
    { id: 2, name: 'Priya Chouksey', email: 'priya@gmail.com', phone: '9009122334', weddingDate: '2024-12-15', progress: 40, city: 'Bhopal' },
    { id: 3, name: 'Vikram Singh', email: 'vikram@yahoo.com', phone: '9425067890', weddingDate: '2025-01-10', progress: 20, city: 'Gwalior' },
    { id: 4, name: 'Neha Gupta', email: 'neha.g@outlook.com', phone: '8811223344', weddingDate: '2024-10-05', progress: 95, city: 'Indore' },
];

const AdminUsers = () => {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(u =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.phone.includes(searchQuery) ||
            u.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const deleteUser = (id) => {
        if (window.confirm('Erase this client record from the registry?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Client Directory</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Platform User Management</p>
                </div>

                <div className="relative">
                    <Icon name="search" size="xs" color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold focus:ring-2 focus:ring-primary-400/10 outline-none w-56 transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm min-h-[300px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">User Profile</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact Details</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Wedding Date</th>
                                <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Planning Progress</th>
                                <th className="px-6 py-4 text-right border-b border-slate-100">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-primary-50/10 transition-colors group">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} className="h-6 w-6 rounded-md" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-black text-slate-900 leading-tight">{user.name}</p>
                                                <p className="text-[9px] font-bold text-primary-400 uppercase tracking-widest">{user.city}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <p className="text-[11px] font-bold text-slate-600 leading-none">{user.email}</p>
                                        <p className="text-[9px] font-black text-slate-400 mt-1">{user.phone}</p>
                                    </td>
                                    <td className="px-5 py-3 text-[11px] font-black text-slate-500">{user.weddingDate}</td>
                                    <td className="px-5 py-3 min-w-[150px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary-400 transition-all duration-1000" style={{ width: `${user.progress}%` }} />
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400">{user.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="text-[9px] font-black text-primary-400 hover:text-primary-600 uppercase tracking-widest transition-colors">
                                                View
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-[9px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors"
                                            >
                                                Erase
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No clients found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
