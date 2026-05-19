import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Filter, PieChart, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const stages = [
  { id: 1, name: 'Thu thập dữ liệu', icon: Database, timeStr: '0.1h', oldTimeStr: '48h', desc: 'Tự động lấy dữ liệu từ Hồ dữ liệu (Data Lake*).', sys: 'BRAVO Data Lake', sysColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, name: 'Làm sạch', icon: Filter, timeStr: '0.5h', oldTimeStr: '72h', desc: 'Luồng ETL* tự động chuẩn hóa dữ liệu.', sys: 'BRAVO Data Prep', sysColor: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, name: 'Phân tích', icon: PieChart, timeStr: '2.0h', oldTimeStr: '96h', desc: 'Phân tích đa chiều bằng màn hình BI* & Máy học (ML*).', sys: 'BRAVO AI Engine', sysColor: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 4, name: 'Tổng hợp', icon: FileText, timeStr: '1.0h', oldTimeStr: '60h', desc: 'Tự động sinh Báo cáo Ban Lãnh đạo (Board Pack).', sys: 'Báo cáo Tự động', sysColor: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 5, name: 'Phê duyệt', icon: CheckCircle, timeStr: '4.0h', oldTimeStr: '60h', desc: 'Sử dụng hệ thống Mobile Cockpit.', sys: 'Mobile Cockpit', sysColor: 'bg-green-100 text-green-700 border-green-200' },
];

export default function Timeline() {
  const [activeStage, setActiveStage] = useState(stages[4]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-12 w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="space-y-1">
          <h1 className="font-bold text-gray-900 text-2xl flex items-center">
            <Clock className="mr-3 text-[#0077B6]" size={28} />
            Decision Timeline
          </h1>
          <p className="text-base text-gray-500 mt-1">Mô phỏng hành trình ra một "quyết định lớn" chạy qua hệ thống 4 lớp</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#003B73] to-[#005B8C] p-8 rounded-2xl shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl transition-shadow">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <Clock size={250} />
        </div>
        
        <div className="relative z-10 max-w-xl">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3 border-l-2 border-[#FFC857] pl-3">Trường hợp minh họa (Use case)</p>
          <h2 className="text-white font-black text-2xl md:text-3xl leading-snug drop-shadow-sm">
            "Có nên đầu tư dây chuyền mới 80 tỷ vào Công ty SX-1?"
          </h2>
        </div>
        
        <div className="flex bg-white/10 rounded-2xl p-5 border border-white/20 relative z-10 backdrop-blur-md shrink-0 shadow-inner w-full md:w-auto mt-4 md:mt-0">
          <div className="pr-6">
            <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wider">Thời gian mới</p>
            <p className="text-white font-black text-4xl drop-shadow-md text-[#FFC857]">7.6 <span className="text-2xl font-bold text-white">giờ</span></p>
          </div>
          <div className="w-px bg-white/20 mx-2"></div>
          <div className="pl-6 relative">
            <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wider">Cách cũ</p>
            <p className="text-red-200 font-bold text-2xl line-through opacity-70">336 giờ</p>
            <p className="text-red-200 text-sm mt-1 opacity-70 font-medium">(= 14 ngày làm việc)</p>
          </div>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mt-8 relative">
        <div className="hidden md:flex absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-gray-100 z-0 rounded-full"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 md:gap-0 relative z-10 w-full px-2">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeStage.id === stage.id;
            const isPast = stage.id < activeStage.id;
            
            return (
              <div key={stage.id} className="flex-1 flex flex-col items-center relative group">
                {/* Mobile line connector */}
                {index !== stages.length - 1 && (
                   <div className="md:hidden h-8 w-0.5 bg-gray-200 my-1"></div>
                )}
                
                <button 
                  onClick={() => setActiveStage(stage)}
                  className="flex flex-col items-center relative z-10 outline-none w-full group transition-transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-4 z-10 ${
                    isActive 
                    ? 'bg-[#0077B6] border-white text-white shadow-lg ring-4 ring-[#0077B6]/20 scale-110' 
                    : isPast
                    ? 'bg-blue-50 border-[#0077B6] text-[#0077B6]'
                    : 'bg-white border-gray-200 text-gray-400 group-hover:border-blue-300 group-hover:text-blue-400'
                  }`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <div className={`mt-4 text-sm font-bold transition-colors w-24 text-center leading-tight hidden md:block ${isActive ? 'text-[#003B73]' : isPast ? 'text-gray-700' : 'text-gray-400'}`}>
                    G.Đoạn {stage.id}<br/>{stage.name}
                  </div>
                  
                  {/* Mobile Label */}
                  <div className="md:hidden flex items-center justify-between w-full mt-2 px-6">
                    <span className={`font-bold ${isActive ? 'text-[#0077B6]' : 'text-gray-600'}`}>{stage.name}</span>
                    <span className="text-xs text-gray-400">{stage.timeStr}</span>
                  </div>
                </button>
              </div>
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
           className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeStage.sysColor} bg-opacity-10 border shadow-sm`}>
                 <activeStage.icon size={32} />
              </div>
              <div>
                <p className="text-[#0077B6] font-bold text-sm mb-1 uppercase tracking-wider">Giai đoạn {activeStage.id}</p>
                <h3 className="font-bold text-gray-900 text-2xl">{activeStage.name}</h3>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl">
              <p className="text-base text-gray-700 leading-relaxed">
                {activeStage.desc}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2 py-1 bg-white border border-gray-300 rounded shadow-sm">Hệ thống:</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border shadow-sm ${activeStage.sysColor}`}>
                  {activeStage.sys}
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-72 shrink-0 space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl text-center shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 w-2 h-full bg-[#0077B6]"></div>
               <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1">Thời gian triển khai mới</p>
               <p className="text-4xl font-black text-[#003B73]">{activeStage.timeStr}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl text-center flex justify-between items-center opacity-80">
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-left">Cách thức<br/>cũ</p>
               <p className="text-2xl font-bold text-gray-400 line-through shrink-0">{activeStage.oldTimeStr}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footnotes */}
      <div className="pt-8 border-t border-gray-200 text-xs text-gray-500 grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <p><strong className="text-gray-700">* Data Lake:</strong> Kho lưu trữ dữ liệu trung tâm chứa dữ liệu thô từ toàn tập đoàn.</p>
        <p><strong className="text-gray-700">* ETL (Extract, Transform, Load):</strong> Quá trình tích hợp tự động trích xuất, làm sạch và tải dữ liệu.</p>
        <p><strong className="text-gray-700">* BI (Business Intelligence):</strong> Hệ thống dashboard quản trị trực quan với dữ liệu thật.</p>
        <p><strong className="text-gray-700">* ML (Machine Learning):</strong> Công nghệ Máy học dự báo tự động mà không cần can thiệp thủ công.</p>
      </div>
    </motion.div>
  );
}
