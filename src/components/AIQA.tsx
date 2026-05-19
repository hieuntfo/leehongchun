import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, BarChart2, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockChartData = [
  { name: 'T5/2025', rev: 40.0 },
  { name: 'T5/2026', rev: 47.3 },
];

export default function AIQA() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; hasChart?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestions = [
    "Doanh thu công ty con SX-1 tháng này so với cùng kỳ năm ngoái?",
    "Công ty con nào đang lỗ thực sự (sau khi loại trừ giao dịch nội bộ)?",
    "Top 5 sản phẩm mang lại biên lợi nhuận (gross margin) cao nhất quý 3?",
    "Dự báo doanh thu Quý 4 sẽ đạt bao nhiêu? Có nên cắt giảm Marketing?"
  ];

  const handleAsk = (question: string) => {
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      if (question === suggestions[0]) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "Công ty con **SX-1** đạt **47.3 tỷ** doanh thu tháng 5/2026, **tăng 18.2%** so với cùng kỳ (40.0 tỷ).\n\nĐóng góp chính:\n• Đơn hàng XK Nhật Bản: +12 tỷ\n• Sản phẩm mới Tôn mạ kẽm cao cấp: +3 tỷ\n\n_[Nguồn: BRAVO 10 ERP, Kho dữ liệu hợp nhất. Cập nhật: 09:32 hôm nay]_",
          hasChart: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "Tại bản demo này, tôi được lập trình để trả lời chi tiết cho câu hỏi đầu tiên. Anh vui lòng chọn câu hỏi đầu tiên để xem khả năng giải thích và vẽ biểu đồ từ dữ liệu ERP nhé! 😊" 
        }]);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#003B73] px-6 py-4 text-white z-10 flex justify-between items-center shrink-0">
        <div>
          <h1 className="font-bold text-xl flex items-center">
            <Bot size={24} className="mr-3 text-[#FFC857]" />
            AI Q&A — "Hỏi BRAVO"
          </h1>
          <p className="text-sm text-blue-200 mt-1 flex items-center">
            <Database size={14} className="mr-1.5" />
            Truy vấn ngôn ngữ tự nhiên (NLP) trên nền tảng Decision Intelligence Layer
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-white/80 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
          <Sparkles size={14} className="text-[#FFC857]" />
          <span>Generative AI (GPT-4o) + Dữ liệu ERP nội bộ</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <div className="text-center space-y-4 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center text-[#003B73] shadow-sm transform -rotate-3">
                  <Bot size={32} />
                </div>
                <h2 className="text-gray-900 font-bold text-2xl">Xin chào Chủ tịch,</h2>
                <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                  Trợ lý AI đã được kết nối với toàn bộ dữ liệu hợp nhất 10 công ty con của Tập đoàn BRAVO. Anh cần báo cáo thông tin gì hôm nay?
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-8">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAsk(s)}
                    className="bg-white text-left p-4 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-[#0077B6] hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="font-medium text-[#003B73] mb-1">Ví dụ {i+1}</div>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-3xl mx-auto`}
            >
              <div className="flex items-start max-w-full">
                {m.role === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-[#003B73] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <Bot size={18} />
                  </div>
                )}
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden ml-3 flex-shrink-0 mt-1 order-2">
                     <img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0077B6&color=fff" alt="Avatar" />
                  </div>
                )}
                
                <div 
                  className={`p-4 text-base shadow-sm leading-relaxed order-1 ${
                    m.role === 'user' 
                      ? 'bg-[#0077B6] text-white rounded-2xl rounded-tr-md ml-12' 
                      : 'bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl rounded-tl-md whitespace-pre-wrap mr-12 w-full'
                  }`}
                  dangerouslySetInnerHTML={m.role === 'bot' ? { __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>').replace(/_(.*?)_/g, '<em class="text-gray-500 text-sm italic inline-block mt-3">$1</em>') } : { __html: m.text }}
                />
              </div>

              {m.hasChart && (
                <div className="ml-11 mt-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm w-full max-w-[400px]">
                  <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart2 size={16} className="mr-2 text-[#0077B6]" />
                    So sánh doanh thu T5/2026 (Tỷ ₫)
                  </h4>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', fontSize: '13px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="rev" fill="#0077B6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex items-start max-w-3xl mx-auto"
             >
               <div className="w-8 h-8 rounded-lg bg-[#003B73] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Bot size={18} />
               </div>
               <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl rounded-tl-md flex space-x-2 shadow-sm items-center h-[52px]">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
               </div>
             </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#0077B6] transition-all shadow-inner">
          <input 
            type="text" 
            placeholder="Viết câu hỏi bằng ngôn ngữ tiếng Việt tự nhiên..." 
            className="flex-1 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && input.trim() && handleAsk(input)}
            autoFocus
          />
          <button 
            className={`ml-3 p-2.5 rounded-full transition-all flex items-center justify-center ${input.trim() ? 'bg-[#0077B6] text-white hover:bg-[#005B8C] shadow-md hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400'}`}
            onClick={() => input.trim() && handleAsk(input)}
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} className={input.trim() ? 'translate-x-0.5' : ''}/>
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-3">
          Decision Intelligence Layer đảm bảo bảo mật dữ liệu ở mức hàng (Row-level Security). Chỉ hiển thị dữ liệu người dùng có quyền truy cập.
        </p>
      </div>
    </div>
  );
}
