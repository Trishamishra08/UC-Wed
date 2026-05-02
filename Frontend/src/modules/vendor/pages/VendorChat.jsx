import { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorChat = () => {
  const { vendorState } = useVendorState();
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Mock Conversations
  const [conversations, setConversations] = useState([
    { 
      id: '1', 
      name: 'Rahul & Sneha', 
      avatar: 'RS', 
      status: 'Online', 
      lastMsg: 'Hey, is the venue available on 20th?',
      time: '12:45 PM',
      messages: [
        { id: 1, text: 'Hi, we are looking for a wedding photographer.', sender: 'user', time: '10:00 AM' },
        { id: 2, text: 'Hello! I am available. Which dates are you looking for?', sender: 'vendor', time: '10:05 AM' },
        { id: 3, text: 'Hey, is the venue available on 20th?', sender: 'user', time: '12:45 PM' },
      ]
    },
    { 
      id: '2', 
      name: 'Vikram Singh', 
      avatar: 'VS', 
      status: 'Offline', 
      lastMsg: 'Quote received, thanks!',
      time: 'Yesterday',
      messages: [
        { id: 1, text: 'Can you share your pricing for catering?', sender: 'user', time: '9:00 AM' },
        { id: 2, text: 'Sent you the quote via the portal.', sender: 'vendor', time: '9:30 AM' },
        { id: 3, text: 'Quote received, thanks!', sender: 'user', time: '10:00 AM' },
      ]
    },
    { 
      id: '3', 
      name: 'Priya Sharma', 
      avatar: 'PS', 
      status: 'Online', 
      lastMsg: 'Perfect, see you then.',
      time: '2 days ago',
      messages: [
        { id: 1, text: 'Hi Priya, confirmed the booking.', sender: 'vendor', time: 'Yesterday' },
        { id: 2, text: 'Perfect, see you then.', sender: 'user', time: 'Yesterday' },
      ]
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat, conversations]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: 'vendor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConversations = conversations.map(chat => {
      if (chat.id === activeChat.id) {
        const updatedChat = {
          ...chat,
          lastMsg: newMessage,
          time: 'Just now',
          messages: [...chat.messages, msg]
        };
        setActiveChat(updatedChat);
        return updatedChat;
      }
      return chat;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-3 animate-in fade-in duration-500 overflow-hidden">
      
      {/* Sidebar - Contacts List (Hidden on mobile if chat active) */}
      <div className={`${activeChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-72 flex-col gap-2`}>
         {/* Sidebar Header */}
         <div className="vendor-surface rounded-xl p-3 bg-white border border-slate-100 shadow-sm">
            <h2 className="text-[12px] font-black text-slate-900 tracking-tight uppercase">Messages</h2>
            <div className="mt-2 relative">
               <input 
                 type="text" 
                 placeholder="Search chats..."
                 className="w-full h-8 rounded-lg bg-slate-50 border-0 px-3 pl-8 text-[10px] font-bold focus:ring-1 ring-slate-200 transition-all"
               />
               <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name="search" size="xs" />
               </div>
            </div>
         </div>

         {/* Contacts List */}
         <div className="flex-1 overflow-y-auto space-y-1.5 no-scrollbar">
            {conversations.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`vendor-surface rounded-xl p-3 cursor-pointer transition-all border group ${activeChat?.id === chat.id ? 'bg-[#9D174D] border-[#9D174D] shadow-lg' : 'bg-white border-slate-50 hover:bg-slate-50'}`}
              >
                 <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-black relative shrink-0 ${activeChat?.id === chat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#9D174D]'}`}>
                       {chat.avatar}
                       {chat.status === 'Online' && (
                         <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between">
                          <h4 className={`text-[11px] font-black truncate leading-none ${activeChat?.id === chat.id ? 'text-white' : 'text-slate-900'}`}>{chat.name}</h4>
                          <span className={`text-[8px] font-black shrink-0 uppercase ${activeChat?.id === chat.id ? 'text-white/60' : 'text-slate-400'}`}>{chat.time}</span>
                       </div>
                       <p className={`text-[9px] font-bold truncate mt-1 leading-none ${activeChat?.id === chat.id ? 'text-white/80' : 'text-slate-500'}`}>{chat.lastMsg}</p>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main Chat Area (Hidden on mobile if no chat active) */}
      <div className={`${activeChat ? 'flex' : 'hidden lg:flex'} flex-1 flex-col gap-2 min-w-0`}>
         {activeChat ? (
            <>
               {/* Chat Header */}
               <div className="vendor-surface rounded-xl p-2.5 bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <button onClick={() => setActiveChat(null)} className="lg:hidden h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Icon name="chevronRight" className="rotate-180" size="xs" />
                     </button>
                     <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-[#9D174D] font-black text-[11px] border border-white">
                        {activeChat.avatar}
                     </div>
                     <div>
                        <h3 className="text-[11px] font-black text-slate-900 leading-none truncate max-w-[120px] sm:max-w-none">{activeChat.name}</h3>
                        <p className="text-[8px] font-black text-emerald-500 mt-1 uppercase tracking-widest">{activeChat.status}</p>
                     </div>
                  </div>
                  <div className="flex gap-1">
                     <button className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#9D174D] transition-all"><Icon name="phone" size="xs" /></button>
                     <button className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#9D174D] transition-all"><Icon name="edit" size="xs" /></button>
                  </div>
               </div>

               {/* Messages Window */}
               <div className="flex-1 vendor-surface rounded-2xl p-4 bg-white border border-slate-50 shadow-sm overflow-y-auto no-scrollbar space-y-3">
                  {activeChat.messages.map(msg => (
                     <div key={msg.id} className={`flex ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] group relative ${msg.sender === 'vendor' ? 'items-end' : 'items-start'}`}>
                           <div className={`px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm ${msg.sender === 'vendor' 
                              ? 'bg-[#9D174D] text-white rounded-tr-none' 
                              : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'}`}
                           >
                              {msg.text}
                           </div>
                           <p className="text-[7px] font-black text-slate-400 mt-1 uppercase tracking-tighter px-1">{msg.time}</p>
                        </div>
                     </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>

               {/* Message Input */}
               <form onSubmit={handleSendMessage} className="vendor-surface rounded-xl p-1.5 bg-white border border-slate-100 shadow-xl flex items-center gap-2">
                  <button type="button" className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#9D174D] transition-all">
                     <Icon name="plus" size="xs" />
                  </button>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type..."
                    className="flex-1 bg-transparent border-0 px-1 text-[11px] font-bold text-slate-700 placeholder:text-slate-300 focus:ring-0"
                  />
                  <button 
                    type="submit"
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-lg active:scale-90 transition-all shrink-0"
                    style={{ background: 'linear-gradient(135deg, #9D174D, #831843)' }}
                  >
                     <Icon name="mail" size="xs" />
                  </button>
               </form>
            </>
         ) : (
            <div className="flex-1 vendor-surface rounded-2xl bg-white border border-slate-50 flex flex-col items-center justify-center text-center p-8">
               <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
                  <Icon name="chat" size="xl" />
               </div>
               <h3 className="text-xs font-black text-slate-300 tracking-tight uppercase">No Chat Selected</h3>
            </div>
         )}
      </div>

    </div>
  );
};

export default VendorChat;
