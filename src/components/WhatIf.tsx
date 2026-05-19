import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function WhatIf() {
  const [priceChange, setPriceChange] = useState(5);
  const [marketingChange, setMarketingChange] = useState(10);
  const [rdChange, setRdChange] = useState(15);

  const baseRevenue = 5000;
  const baseEbitda = 1050;
  const baseChurn = 10;
  const baseRoe = 20.6;

  // Simulate complex logic
  const simRevenue = baseRevenue * (1 + priceChange / 100) * (1 - (marketingChange / 100) * 0.2);
  const simEbitda = (simRevenue * (baseEbitda/baseRevenue)) + (marketingChange * 5) - rdChange;
  const simChurn = baseChurn + (priceChange > 0 ? priceChange * 0.8 : priceChange * -0.2);
  const simRoe = baseRoe + (simEbitda - baseEbitda) / 50;

  const chartData = useMemo(() => {
    return [
      { name: 'Q1', current: 1200, sim: 1200 },
      { name: 'Q2', current: 1250, sim: 1250 + (simRevenue - baseRevenue)*0.1 },
      { name: 'Q3', current: 1300, sim: 1300 + (simRevenue - baseRevenue)*0.4 },
      { name: 'Q4', current: 1250, sim: 1250 + (simRevenue - baseRevenue)*0.5 },
    ]
  }, [simRevenue, baseRevenue]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 space-y-6 pb-24 h-screen overflow-y-auto bg-[#F8FAFC]"
    >
      <div className="space-y-1">
        <h1 className="font-bold text-[#003B73] text-lg">Mô phỏng kịch bản</h1>
        <p className="text-xs text-gray-500">Kịch bản: Điều chỉnh chiến lược Q3/2026</p>
      </div>

      {/* Sliders */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-gray-700">Giá bán (%)</label>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${priceChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {priceChange > 0 ? '+' : ''}{priceChange}%
            </span>
          </div>
          <input type="range" min="-10" max="20" value={priceChange} onChange={(e) => setPriceChange(Number(e.target.value))} className="w-full accent-[#003B73]" />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>-10%</span><span>0</span><span>+20%</span></div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-gray-700">Chi phí Marketing (%)</label>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${marketingChange > 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
              {marketingChange > 0 ? '-' : '+'}{marketingChange}%
            </span>
          </div>
          <input type="range" min="0" max="30" value={marketingChange} onChange={(e) => setMarketingChange(Number(e.target.value))} className="w-full accent-orange-500" />
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-gray-700">Đầu tư R&D (Tỷ ₫)</label>
            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">+{rdChange}</span>
          </div>
          <input type="range" min="0" max="50" value={rdChange} onChange={(e) => setRdChange(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 mb-1 text-gray-500">
            <DollarSign size={14} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Doanh thu năm</span>
          </div>
          <p className="text-lg font-bold text-gray-900 leading-tight">{simRevenue.toLocaleString('vi-VN', {maximumFractionDigits: 0})} tỷ</p>
          <p className={`text-[10px] font-medium mt-1 flex flex-wrap items-center ${simRevenue >= baseRevenue ? 'text-green-600' : 'text-red-600'}`}>
            {simRevenue >= baseRevenue ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
            {((simRevenue - baseRevenue)/baseRevenue*100).toFixed(1)}% vs Base
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 mb-1 text-gray-500">
            <Activity size={14} />
            <span className="text-[10px] font-medium uppercase tracking-wider">EBITDA</span>
          </div>
          <p className="text-lg font-bold text-gray-900 leading-tight">{simEbitda.toLocaleString('vi-VN', {maximumFractionDigits: 0})} tỷ</p>
           <p className={`text-[10px] font-medium mt-1 flex flex-wrap items-center ${simEbitda >= baseEbitda ? 'text-green-600' : 'text-red-600'}`}>
            {simEbitda >= baseEbitda ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
            {((simEbitda - baseEbitda)/baseEbitda*100).toFixed(1)}% vs Base
          </p>
        </div>

        <div className={`p-3 rounded-xl shadow-sm border flex flex-col justify-between ${simChurn > 15 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center space-x-1.5 mb-1 text-gray-500">
            <Users size={14} className={simChurn > 15 ? 'text-red-500' : ''}/>
            <span className="text-[10px] font-medium uppercase tracking-wider">KH Rời bỏ</span>
          </div>
          <p className={`text-lg font-bold leading-tight ${simChurn > 15 ? 'text-red-700' : 'text-gray-900'}`}>{simChurn.toFixed(1)}%</p>
          <p className="text-[10px] font-medium mt-1 text-gray-500">
            Base: {baseChurn}%
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 mb-1 text-gray-500">
            <TrendingUp size={14} />
            <span className="text-[10px] font-medium uppercase tracking-wider">ROE</span>
          </div>
          <p className="text-lg font-bold text-gray-900 leading-tight">{simRoe.toFixed(1)}%</p>
           <p className={`text-[10px] font-medium mt-1 flex flex-wrap items-center ${simRoe >= baseRoe ? 'text-green-600' : 'text-red-600'}`}>
            {(simRoe - baseRoe) > 0 ? '+' : ''}{(simRoe - baseRoe).toFixed(1)}pp vs Base
          </p>
        </div>
      </div>

      {/* Overlay Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
         <h3 className="text-xs font-semibold text-gray-800 mb-4">Dự báo Doanh thu theo Quý (Tỷ ₫)</h3>
         <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: number) => Math.round(val)}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
              <Line type="monotone" name="Hiện tại" dataKey="current" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line type="monotone" name="Mô phỏng" dataKey="sim" stroke="#003B73" strokeWidth={3} dot={{ r: 4, fill: '#003B73' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
