import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, FileText, SlidersHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

type ScenarioItem = {
  id: string;
  name: string;
  desc: string;
  impactDesc: string;
  costChange: number;
  revChange: number;
  churnChange: number;
  roiChange: number;
};

const pdfScenarios: ScenarioItem[] = [
  {
    id: "k1",
    name: "Kịch bản 1: Cắt cứng",
    desc: "Cắt 30% nhân sự hỗ trợ, admin và test thủ công.",
    impactDesc: "Tiết kiệm 84 tỷ/năm; Mất 18% năng suất release phần mềm Q1; 12 người được giữ nhờ pháp lý.",
    costChange: -84,
    revChange: -120, // Tạm map
    churnChange: 2,
    roiChange: 1.2,
  },
  {
    id: "k2",
    name: "Kịch bản 2: Bảo vệ Top Talent",
    desc: "Giữ 100% nhân sự Coder/BA/PM Nòng cốt, dồn cắt các bộ phận phi kỹ thuật.",
    impactDesc: "Tiết kiệm 70 tỷ/năm; Năng suất giảm 8%, phục hồi 2 tháng; bảo toàn hoàn toàn đội ngũ R&D.",
    costChange: -70,
    revChange: -40,
    churnChange: 0.5,
    roiChange: 2.5,
  },
  {
    id: "k3",
    name: "Kịch bản 3: Upskilling",
    desc: "Cắt 20% + dùng phần tiết kiệm đầu tư dạy Manual Tester thành Automation.",
    impactDesc: "Tiết kiệm thuần 35 tỷ/năm; engagement tăng mạnh; rủi ro pháp lý thấp. 200 nghỉ, 80 lên vị trí mới.",
    costChange: -35,
    revChange: +15,
    churnChange: -1.0,
    roiChange: 3.8,
  },
  {
    id: "k4",
    name: "Kịch bản 4: Shared Service Support",
    desc: "Hợp nhất 3 đội Customer Support của 3 chi nhánh (Bắc-Trung-Nam) thành 1 trung tâm.",
    impactDesc: "Tiết kiệm 42 tỷ/năm; cải thiện 60% tốc độ đóng ticket hỗ trợ khách hàng.",
    costChange: -42,
    revChange: +5,
    churnChange: 0,
    roiChange: 4.5,
  }
];

export default function WhatIf() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("k2");
  
  const activeScenario = useMemo(() => pdfScenarios.find(s => s.id === activeScenarioId) || pdfScenarios[1], [activeScenarioId]);

  const baseRevenue = 5000;
  const baseTCO = 2500;
  const baseChurn = 8.5; // Turnover rate
  const baseROI = 15.0;

  const simRevenue = baseRevenue + activeScenario.revChange;
  const simTCO = baseTCO + activeScenario.costChange;
  const simChurn = baseChurn + activeScenario.churnChange;
  const simROI = baseROI + activeScenario.roiChange;

  const chartData = useMemo(() => {
    return [
      { name: 'Tháng 1', current: 100, sim: 100 },
      { name: 'Tháng 3', current: 100, sim: 100 + (activeScenario.roiChange > 2 ? -2 : -10) }, 
      { name: 'Tháng 6', current: 100, sim: 100 + (activeScenario.roiChange > 2 ? 5 : -5) },
      { name: 'Tháng 9', current: 100, sim: 100 + activeScenario.roiChange * 4 },
      { name: 'Tháng 12', current: 100, sim: 100 + activeScenario.roiChange * 8 },
    ]
  }, [activeScenario]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-xl flex items-center">
            <SlidersHorizontal className="mr-2 text-[#0077B6]" size={24} />
            What-if Scenario Simulator (Mở rộng)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Chạy mô phỏng tính toán tác động trước khi ra quyết định lớn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Scenarios List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Chọn kịch bản (Input)</h3>
          {pdfScenarios.map((scen) => (
             <div 
                key={scen.id}
                onClick={() => setActiveScenarioId(scen.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeScenarioId === scen.id 
                    ? 'bg-blue-50 border-[#0077B6] shadow-md ring-1 ring-[#0077B6] scale-[1.02]' 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
             >
               <h4 className={`font-bold text-sm mb-1 ${activeScenarioId === scen.id ? 'text-[#003B73]' : 'text-gray-800'}`}>{scen.name}</h4>
               <p className="text-xs text-gray-600 leading-relaxed">{scen.desc}</p>
             </div>
          ))}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start gap-4">
             <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0">
               <FileText size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900 mb-1">Kết quả dự báo từ Hệ thống <em>(hiện ra trong &lt;3 giây)</em></h3>
               <p className="text-sm text-gray-700 leading-relaxed font-medium">
                 {activeScenario.impactDesc}
               </p>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 mb-2 text-gray-500">
                <DollarSign size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Chi phí quỹ lương</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 leading-tight">{simTCO.toLocaleString('vi-VN')} tỷ</p>
              <p className={`text-xs font-medium mt-2 flex items-center ${activeScenario.costChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {activeScenario.costChange < 0 ? <TrendingDown size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
                Tiết kiệm {Math.abs(activeScenario.costChange)} tỷ/năm
              </p>
            </div>

            <div className={`p-4 rounded-xl shadow-sm border flex flex-col justify-between ${simChurn > 10 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center space-x-1.5 mb-2 text-gray-500">
                <Users size={16} className={simChurn > 10 ? 'text-red-600' : ''}/>
                <span className="text-xs font-semibold uppercase tracking-wider">Tỷ lệ nghỉ việc</span>
              </div>
              <p className={`text-2xl font-bold leading-tight ${simChurn > 10 ? 'text-red-700' : 'text-gray-900'}`}>{simChurn.toFixed(1)}%</p>
              <p className="text-xs font-medium mt-2 text-gray-500 flex items-center">
                Base: {baseChurn.toFixed(1)}% ({activeScenario.churnChange > 0 ? '+' : ''}{activeScenario.churnChange.toFixed(1)}%)
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 mb-2 text-gray-500">
                <Activity size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Doanh thu dự kiến</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 leading-tight">{simRevenue.toLocaleString('vi-VN')} tỷ</p>
              <p className={`text-xs font-medium mt-2 flex items-center ${activeScenario.revChange >= 0 ? 'text-green-600' : 'text-orange-500'}`}>
                {activeScenario.revChange >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {activeScenario.revChange >= 0 ? '+' : ''}{activeScenario.revChange.toFixed(0)} tỷ sv. ngân sách
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 mb-2 text-gray-500">
                <TrendingUp size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Năng suất ROI</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 leading-tight">{simROI.toFixed(1)}%</p>
              <p className={`text-xs font-medium mt-2 flex items-center ${activeScenario.roiChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {activeScenario.roiChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {activeScenario.roiChange > 0 ? '+' : ''}{activeScenario.roiChange.toFixed(1)}pp cải thiện
              </p>
            </div>
          </div>

          {/* Overlay Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-6">Mô phỏng phục hồi năng suất sau quyết định (Chỉ số: 100 = Hiện tại)</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} domain={[70, 150]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', fontSize: '13px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                  <Line type="monotone" name="Nếu không thay đổi (Base)" dataKey="current" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                  <Line type="monotone" name="Dự báo Kịch bản chọn" dataKey="sim" stroke="#0077B6" strokeWidth={4} dot={{ strokeWidth: 2, r: 6, fill: 'white' }} activeDot={{ r: 8 }} animationDuration={1000} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
