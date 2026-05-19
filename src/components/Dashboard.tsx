import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, TrendingDown, Package, CreditCard } from 'lucide-react';
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
      className="p-4 space-y-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#003B73] text-white flex items-center justify-center font-bold text-sm">
            BG
          </div>
          <div>
            <h1 className="font-bold text-[#003B73] leading-tight">BRAVO Group</h1>
            <p className="text-xs text-gray-500">Chào, Chủ tịch Nguyễn Văn A</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" />
        </div>
      </div>

      {/* Main KPI */}
      <div className="bg-gradient-to-r from-[#003B73] to-[#0077B6] rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <p className="text-blue-100 text-sm font-medium mb-1 relative z-10">Decision Speed Time hôm nay</p>
        <div className="flex items-end space-x-2 relative z-10">
          <span className="text-4xl font-bold">0.8</span>
          <span className="text-lg pb-1">ngày</span>
        </div>
        <div className="mt-2 text-xs text-[#FFC857] font-medium bg-white/10 inline-block px-2 py-1 rounded">
          Đạt mục tiêu &lt; 1 ngày 🎯
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="bg-green-100 p-1.5 rounded-lg text-green-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Doanh thu tháng</p>
            <p className="text-lg font-bold text-gray-900 leading-tight mt-0.5">425 tỷ ₫</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">+12% YoY</p>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="bg-green-100 p-1.5 rounded-lg text-green-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">EBITDA Margin</p>
            <p className="text-lg font-bold text-gray-900 leading-tight mt-0.5">20.8%</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">+4.3pp YoY</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-orange-100 bg-orange-50/30 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="bg-orange-100 p-1.5 rounded-lg text-orange-600">
              <Package size={16} />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">Tồn kho thừa</p>
            <p className="text-lg font-bold text-gray-900 leading-tight mt-0.5">187 tỷ ₫</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">-32% QoQ</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-red-100 bg-red-50/30 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="bg-red-100 p-1.5 rounded-lg text-red-600">
              <CreditCard size={16} />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">Nợ quá hạn &gt;60 ng</p>
            <p className="text-lg font-bold text-gray-900 leading-tight mt-0.5">23 tỷ ₫</p>
            <p className="text-[10px] text-red-600 font-medium mt-1">4 khách hàng</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Doanh thu hợp nhất 10 cty con</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} tỷ ₫`, 'Doanh thu']}
              />
              <Line type="monotone" dataKey="rev" stroke="#0077B6" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: 'white' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <AlertCircle size={16} className="text-red-500 mr-1.5" />
          Cần chú ý (3)
        </h3>
        <div className="space-y-2">
          {[
            { id: 'SX-1', text: 'Tồn kho thép giảm 22%, đề xuất nhập thêm trong 5 ngày.', type: 'critical' },
            { id: 'TM-2', text: 'Doanh số tháng giảm 18% — cần kiểm tra bất thường.', type: 'warning' },
            { id: 'KS', text: 'Công ty con Khách sạn: chi phí điện tăng 35% — kiểm tra hóa đơn.', type: 'warning' }
          ].map((alert, i) => (
            <div key={i} className="bg-white p-3 rounded-lg border-l-4 border-l-red-500 shadow-sm text-sm">
              <span className="font-bold text-gray-900 mr-2">{alert.id}:</span>
              <span className="text-gray-600">{alert.text}</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
