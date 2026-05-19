import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockChartData = [
  { name: 'T5/2025', rev: 40.0 },
  { name: 'T5/2026', rev: 47.3 },
];

export default function AIQA() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; hasChart?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Doanh thu công ty con SX-1 tháng này so với cùng kỳ năm ngoái?",
    "Top 5 khách hàng đóng góp doanh thu lớn nhất 2025?",
    "Tồn kho hàng nào sắp hết hạn trong 30 ngày?",
    "Năng suất trung bình của khối back-office quý này?"
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
          text: "Công ty con SX-1 đạt **47.3 tỷ** doanh thu tháng 5/2026, **tăng 18.2%** so với tháng 5/2025 (40.0 tỷ). \n\nĐóng góp chính từ đơn hàng XK Nhật Bản (+12 tỷ) và sản phẩm mới ABC (+3 tỷ).\n\n_[Dữ liệu: BRAVO 10 ERP, cập nhật lúc 09:32 hôm nay]_",
          hasChart: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "Hiện tại tôi mới được huấn luyện kỹ trên dữ liệu câu đầu tiên cho buổi demo này. Vui lòng thử lại với câu hỏi về SX-1 nhé! 😊" 
        }]);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#003B73] px-4 py-4 text-white shadow-md z-10 sticky top-0">
        <h1 className="font-bold text-lg flex items-center">
          <Sparkles size={18} className="mr-2 text-[#FFC857]" />
          Hỏi BRAVO AI
        </h1>
        <p className="text-xs text-blue-200">Trợ lý phân tích dữ liệu trực tiếp từ ERP</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-[#0077B6]">
                  <Bot size={24} />
                </div>
                <h2 className="text-gray-800 font-semibold text-lg">Hôm nay anh cần báo cáo gì?</h2>
                <p className="text-xs text-gray-500 max-w-[250px] mx-auto">Chạm vào gợi ý hoặc nhập câu hỏi bằng ngôn ngữ tự nhiên.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAsk(s)}
                    className="bg-white text-left p-3 rounded-xl border border-blue-100 text-sm text-gray-700 hover:border-[#0077B6] hover:text-[#003B73] transition-colors shadow-sm"
                  >
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
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end mb-1">
                {m.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#003B73] text-white flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#0077B6] text-white rounded-br-sm' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm whitespace-pre-wrap'
                  }`}
                  dangerouslySetInnerHTML={m.role === 'bot' ? { __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>').replace(/_(.*?)_/g, '<em class="text-gray-400 text-xs">$1</em>') } : { __html: m.text }}
                />
              </div>

              {m.hasChart && (
                <div className="ml-8 mt-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-[85%] max-w-[280px]">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center">
                    <BarChart2 size={12} className="mr-1" />
                    So sánh doanh thu T5 (Tỷ ₫)
                  </h4>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={5} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', fontSize: '10px' }} />
                        <Bar dataKey="rev" fill="#0077B6" radius={[4, 4, 0, 0]} />
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
               className="flex items-end mb-1"
             >
               <div className="w-6 h-6 rounded-full bg-[#003B73] text-white flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={14} />
               </div>
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm flex space-x-1 shadow-sm">
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-100 fixed bottom-16 left-0 right-0 max-w-[420px] mx-auto z-20">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Hỏi BRAVO bất cứ điều gì..." 
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && input.trim() && handleAsk(input)}
          />
          <button 
            className={`ml-2 p-1.5 rounded-full transition-colors ${input.trim() ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-400'}`}
            onClick={() => input.trim() && handleAsk(input)}
            disabled={!input.trim() || isTyping}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
