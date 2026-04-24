import { useState } from 'react';
import Icon from '../../../components/ui/Icon';

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Super Admin',
        role: 'Platform Master',
        email: 'admin@utsavchakra.com',
        phone: '+91 98270 12345',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        bio: 'Overseeing the UtsavChakra ecosystem and primary partner deployments.',
        location: 'Indore, MP',
        operatorId: 'UC_MASTER_01',
        password: ''
    });

    const handleSave = (e) => {
        e.preventDefault();
        alert('Security Architecture Updated: Credentials and profile data successfully synchronized.');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Security Identity</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Manage Administrative Protocol & Access</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="h-24 bg-primary-400/10 relative">
                        <div className="absolute -bottom-10 left-8">
                            <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-lg group relative cursor-pointer border border-slate-100">
                                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Icon name="sparkles" size="xs" color="white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-16 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Display Identity</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-900 outline-none focus:border-primary-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Email Registry</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-900 outline-none focus:border-primary-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Professional Brief</label>
                            <textarea
                                rows="2"
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-900 outline-none focus:border-primary-400 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Master Access Credentials */}
                <div className="bg-[#1A0F0F] rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/5 rounded-bl-[4rem]" />
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-8 w-8 rounded-lg bg-primary-400/20 text-primary-400 flex items-center justify-center">
                            <Icon name="dashboard" size="xs" color="current" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Master Access</h3>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-1">Operational ID & Key Management</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1">Operator ID</label>
                            <input
                                type="text"
                                value={profile.operatorId}
                                onChange={(e) => setProfile({ ...profile, operatorId: e.target.value })}
                                className="w-full h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-[12px] font-bold text-white outline-none focus:border-primary-400 focus:bg-white/10 transition-all"
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest px-1 group-hover:text-primary-400/60 transition-colors">Credential Access Key</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter new master key"
                                    value={profile.password}
                                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                    className="w-full h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-[12px] font-bold text-white outline-none focus:border-primary-400 focus:bg-white/10 transition-all"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
                                    <Icon name="sparkles" size="xs" color="white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] font-black text-white/10 uppercase tracking-widest">Two-Factor Authentication protocol active</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="h-11 px-10 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Synchronize All Protcols
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProfile;
