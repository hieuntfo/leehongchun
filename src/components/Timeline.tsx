import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Filter, PieChart, FileText, CheckCircle, Clock } from 'lucide-react';

const stages = [
  { id: 1, name: 'Thu thập dữ liệu', icon: Database, timeStr: '0.1h', oldTimeStr: '48h', desc: 'Auto pull từ Data Lake (ERP, CRM, HRM).', sys: 'BRAVO Data Lake', sysColor: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Làm sạch', icon: Filter, timeStr: '0.5h', oldTimeStr: '72h', desc: 'ETL pipeline tự động chuẩn hóa dữ liệu.', sys: 'BRAVO Data Prep', sysColor: 'bg-purple-100 text-purple-700' },
  { id: 3, name: 'Phân tích', icon: PieChart, timeStr: '2.0h', oldTimeStr: '96h', desc: 'Phân tích đa chiều bằng BI dashboard & ML.', sys: 'BRAVO AI Engine', sysColor: 'bg-yellow-100 text-yellow-700' },
  { id: 4, name: 'Tổng hợp', icon: FileText, timeStr: '1.0h', oldTimeStr: '60h', desc: 'Tự động sinh Board Pack (báo cáo tóm tắt).', sys: 'Auto-Gen Report', sysColor: 'bg-indigo-100 text-indigo-700' },
  { id: 5, name: 'Phê duyệt', icon: CheckCircle, timeStr: '4.0h', oldTimeStr: '60h', desc: 'Sử dụng hệ thống Mobile Cockpit.', sys: 'Mobile Cockpit', sysColor: 'bg-green-100 text-green-700' },
];

export default function Timeline() {
  const [activeStage, setActiveStage] = useState(stages[4]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 space-y-6 pb-24 h-screen overflow-y-auto bg-[#F8FAFC]"
    >
      <div className="space-y-1">
        <h1 className="font-bold text-[#003B73] text-lg">Decision Timeline</h1>
        <p className="text-xs text-gray-500">Mô phỏng hành trình ra quyết định lớn</p>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#003B73] p-4 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <Clock size={100} />
        </div>
        <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wider mb-2">QUYẾT ĐỊNH</p>
        <h2 className="text-white font-bold leading-snug w-4/5 text-sm">Có nên đầu tư dây chuyền mới 80 tỷ vào SX-1?</h2>
        
        <div className="flex bg-white/10 rounded-lg p-3 mt-4 border border-white/5 relative z-10">
          <div className="flex-1">
            <p className="text-blue-100 text-[10px]">Thời gian mới</p>
            <p className="text-white font-bold text-xl">7.6 giờ</p>
          </div>
          <div className="w-px bg-white/20 mx-3"></div>
          <div className="flex-1">
            <p className="text-blue-100 text-[10px]">Cách cũ</p>
            <p className="text-red-300 font-bold text-xl line-through opacity-80">336 giờ</p>
            <p className="text-[9px] text-white bg-green-500 rounded px-1 py-0.5 inline-block absolute bottom-3 right-4 shadow-sm">
              Nhanh hơn 97.7%
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-end mb-8 relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 -z-0"></div>
          
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage.id === stage.id;
            
            return (
              <button 
                key={stage.id} 
                onClick={() => setActiveStage(stage)}
                className="flex flex-col items-center relative z-10 group outline-none"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive 
                  ? 'bg-[#0077B6] border-white text-white shadow-md ring-2 ring-[#0077B6]/30' 
                  : 'bg-white border-gray-200 text-gray-400 group-hover:border-[#0077B6] group-hover:text-[#0077B6]'
                }`}>
                  <Icon size={14} />
                </div>
                <div className={`mt-2 text-[10px] font-medium transition-colors w-16 text-center leading-tight ${isActive ? 'text-[#003B73]' : 'text-gray-400'}`}>
                  {stage.name}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
           key={activeStage.id}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2 }}
           className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeStage.sysColor} bg-opacity-20 text-current`}>
               <activeStage.icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Giai đoạn {activeStage.id}: {activeStage.name}</h3>
              <div className="flex items-center mt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded mr-2 ${activeStage.sysColor}`}>
                  {activeStage.sys}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 border-l-2 border-gray-200 pl-3 py-1">
            {activeStage.desc}
          </p>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
               <p className="text-[10px] text-gray-500 uppercase tracking-wide">Thời gian (Mới)</p>
               <p className="text-base font-bold text-[#0077B6]">{activeStage.timeStr}</p>
            </div>
            <div className="bg-red-50 border border-red-100 p-2 rounded-lg text-center opacity-80">
               <p className="text-[10px] text-gray-500 uppercase tracking-wide">Thời gian (Cũ)</p>
               <p className="text-base font-bold text-gray-600 line-through">{activeStage.oldTimeStr}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
}
