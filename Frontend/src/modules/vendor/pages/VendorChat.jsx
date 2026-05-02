import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';

const VendorChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat._id);
    }
  }, [activeChat]);

  const fetchConversations = async () => {
    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.getConversations(token);
    if (res.success) {
      setConversations(res.data);
      if (res.data.length > 0) setActiveChat(res.data[0]);
    }
    setLoading(false);
  };

  const fetchMessages = async (chatId) => {
    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.getMessages(chatId, token);
    if (res.success) {
      setMessages(res.data);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const token = localStorage.getItem('vendorToken');
    const res = await vendorApi.sendMessage({
      conversationId: activeChat._id,
      text: newMessage
    }, token);

    if (res.success) {
      setMessages([...messages, res.data]);
      setNewMessage('');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Chats...</div>;

  return (
    <div className="flex h-[calc(100vh-200px)] vendor-surface rounded-3xl overflow-hidden border border-[#D28A8C10]">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Messages</h3>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No conversations yet</div>
          ) : (
            conversations.map(chat => (
              <div
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 cursor-pointer transition-all hover:bg-slate-50 flex items-center gap-3 ${activeChat?._id === chat._id ? 'bg-rose-50/50' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold">
                  {chat.name?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-700 truncate">{chat.name || 'User'}</h4>
                  <p className="text-xs text-slate-400 truncate">{chat.lastMessage?.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeChat ? (
          <>
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-sm">
                  {activeChat.name?.[0] || 'U'}
                </div>
                <h3 className="font-bold text-slate-800">{activeChat.name || 'User'}</h3>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                <Icon name="settings" size="xs" color="#94a3b8" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map(msg => (
                <div key={msg._id} className={`flex ${msg.senderModel === 'Vendor' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium ${msg.senderModel === 'Vendor'
                      ? 'bg-rose-500 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                    }`}>
                    {msg.text}
                    <p className={`text-[10px] mt-1 opacity-70 ${msg.senderModel === 'Vendor' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold outline-none focus:border-rose-200 transition-all"
              />
              <button className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all">
                <Icon name="mail" size="xs" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Icon name="chat" size="3xl" />
            <p className="mt-4 font-bold text-lg">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorChat;
