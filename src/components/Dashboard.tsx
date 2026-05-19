import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, TrendingDown, Package, CreditCard, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'T1', rev: 320 },
  { name: 'T2', rev: 350 },
  { name: 'T3', rev: 370 },
  { name: 'T4', rev: 390 },
  { name: 'T5', rev: 385 },
  { name: 'T6', rev: 410 },
  { name: 'T7', rev: 425 },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      {/* Main KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-[#003B73] to-[#0077B6] rounded-2xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 opacity-10 sm:opacity-20 pointer-events-none">
            <Clock size={80} className="sm:w-24 sm:h-24 md:w-32 md:h-32" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <p className="text-blue-100 text-[10px] sm:text-sm font-medium mb-1 sm:mb-2 uppercase tracking-wider">Tốc độ ra quyết định (Decision Speed Time)*</p>
              <div className="flex items-end space-x-2 sm:space-x-3 mb-1">
                <span className="text-4xl sm:text-6xl font-black leading-none text-[#FFC857] drop-shadow-md">7.6</span>
                <span className="text-lg sm:text-2xl pb-1 font-semibold">giờ</span>
              </div>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="bg-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/30 backdrop-blur-sm text-[10px] sm:text-sm font-medium flex items-center">
                  <span className="opacity-80 mr-1 sm:mr-2">Gốc:</span> <span className="line-through opacity-60">14 ngày</span>
                </div>
                <div className="text-[10px] sm:text-sm font-bold bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow inline-flex items-center">
                  <TrendingDown size={14} className="mr-1 sm:w-4 sm:h-4" /> Cải thiện 97.7%
                </div>
              </div>
            </div>
            <div className="hidden md:block text-right self-end mt-4 md:mt-0">
               <p className="text-xs text-blue-200 mb-1">So sánh với Benchmark ngành CNTT tại VN</p>
               <p className="text-sm font-bold">Nhanh hơn 14x so với mức 2-7 ngày</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="bg-green-100 p-1.5 sm:p-2 rounded-lg text-green-600">
              <TrendingUp size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-sm text-gray-500 font-medium">Doanh thu YTD</p>
            <p className="text-base sm:text-2xl font-bold text-gray-900 leading-tight mt-1">425 tỷ ₫</p>
            <p className="text-[9px] sm:text-xs text-green-600 font-medium mt-1 sm:mt-2 flex items-center"><TrendingUp size={10} className="mr-1 sm:w-3 sm:h-3"/> +12% YoY*</p>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="bg-green-100 p-1.5 sm:p-2 rounded-lg text-green-600">
              <TrendingUp size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-sm text-gray-500 font-medium">Tỷ suất EBITDA*</p>
            <p className="text-base sm:text-2xl font-bold text-gray-900 leading-tight mt-1">20.8%</p>
            <p className="text-[9px] sm:text-xs text-green-600 font-medium mt-1 sm:mt-2 flex items-center"><TrendingUp size={10} className="mr-1 sm:w-3 sm:h-3"/> +4.3pp* YoY*</p>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-orange-100 bg-orange-50/10 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg text-orange-600">
              <Package size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-sm text-gray-600 font-medium">Chưa nghiệm thu</p>
            <p className="text-base sm:text-2xl font-bold text-gray-900 leading-tight mt-1">187 tỷ ₫</p>
            <p className="text-[9px] sm:text-xs text-green-600 font-medium mt-1 sm:mt-2 flex items-center"><TrendingDown size={10} className="mr-1 sm:w-3 sm:h-3"/> -15% QoQ*</p>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-red-100 bg-red-50/10 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg text-red-600">
              <CreditCard size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-sm text-gray-600 font-medium">Nợ quá hạn &gt;60 n</p>
            <p className="text-base sm:text-2xl font-bold text-gray-900 leading-tight mt-1">23 tỷ ₫</p>
            <p className="text-[9px] sm:text-xs text-red-600 font-medium mt-1 sm:mt-2 leading-none">4 khách trọng điểm</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800">Doanh thu kinh doanh PM</h3>
            <select className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-[10px] sm:text-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 focus:outline-none">
              <option>Năm 2026</option>
              <option>Năm 2025</option>
            </select>
          </div>
          <div className="h-[200px] sm:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} tickFormatter={(val) => `${val}T`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value} tỷ ₫`, 'Doanh thu']}
                />
                <Line type="monotone" dataKey="rev" stroke="#0077B6" strokeWidth={3} dot={{ strokeWidth: 1, r: 3, fill: 'white' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center border-b border-gray-100 pb-2 sm:pb-3">
            <AlertCircle size={16} className="text-red-500 mr-2" />
            Alert Engine
          </h3>
          <div className="space-y-3 flex-1 overflow-auto max-h-[250px] lg:max-h-none pr-1 custom-scrollbar">
            {[
              { id: 'HCM', text: 'Dự án THACO chậm 12%, đề xuất bổ sung BA.', type: 'critical' },
              { id: 'HN', text: 'Up-sell License giảm 18% — phát hiện bất thường.', type: 'warning' },
              { id: 'R&D', text: 'Chi phí Cloud tăng 35% — kiểm tra môi trường test.', type: 'warning' },
              { id: 'HR', text: 'Năng suất team Dev giảm do training Framework.', type: 'info', color: 'blue' }
            ].map((alert, i) => (
              <div key={i} className={`p-3 sm:p-4 rounded-lg border-l-4 shadow-sm text-[11px] sm:text-sm bg-white border ${
                alert.type === 'critical' ? 'border-l-red-500 border-gray-100' : 
                alert.color === 'blue' ? 'border-l-blue-500 border-gray-100' : 'border-l-orange-400 border-gray-100'
              }`}>
                <span className="font-bold text-gray-900 block mb-0.5">Phân hệ {alert.id}</span>
                <span className="text-gray-600 block line-clamp-2">{alert.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footnotes */}
      <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg">
        <p><strong>* Tốc độ ra quyết định (Decision Speed Time):</strong> Thời gian trung bình từ lúc có thông tin đến khi ra quyết định được lượng hóa.</p>
        <p><strong>* EBITDA (Earnings Before Int., Taxes, Deprec. & Amort.):</strong> Lợi nhuận trước lãi vay, thuế và khấu hao.</p>
        <p><strong>* YTD (Year-To-Date):</strong> Tính từ đầu năm đến nay.</p>
        <p><strong>* YoY / QoQ:</strong> So với cùng kỳ năm trước / Quý trước.</p>
        <p><strong>* pp (percentage point):</strong> Điểm phần trăm.</p>
      </div>

    </motion.div>
  );
}
