import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, Search, X, CheckCircle2, SlidersHorizontal, UserMinus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const mockReductions = [
  { id: 'NV001245', name: 'Nguyễn Văn A', role: 'Chuyên viên Manual QC', perf: '52/100', prod: '0.62', strat: 'Test thủ công', score: 34.2 },
  { id: 'NV001899', name: 'Lê Thị B', role: 'Nhân viên Support T1', perf: '55/100', prod: '0.65', strat: 'Trung bình', score: 36.8 },
  { id: 'NV002102', name: 'Trần Văn C', role: 'Chuyên viên Tuyển dụng', perf: '58/100', prod: '0.70', strat: 'Trung bình', score: 41.5 },
];

const mockRetentions = [
  { id: 'NV000812', name: 'Phạm Minh D', role: 'Solution Architect', perf: '95/100', prod: '1.42', strat: 'Nòng cốt', score: 92.1 },
  { id: 'NV000504', name: 'Hoàng Thị E', role: 'Senior Data Engineer', perf: '92/100', prod: '1.30', strat: 'Cốt lõi AI', score: 89.5 },
];

const shapData = [
  { name: 'Hiệu suất (Perf)', val: -15.6 },
  { name: 'Năng suất (ROI)', val: -7.4 },
  { name: 'Kỹ năng C.lược', val: -5.2 },
  { name: 'Thâm niên', val: 3.1 },
  { name: 'Kỷ luật', val: 2.0 },
];

interface WDEProps { }

export default function Workforce({}: WDEProps) {
  const [cutPercent, setCutPercent] = useState(30);
  const [selectedShap, setSelectedShap] = useState<string | null>(null);
  const selectedEmployee = mockReductions.find(nv => nv.id === selectedShap) || mockReductions[0];
  const [biasCheck, setBiasCheck] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full border border-blue-100">Use Case minh họa</p>
          <h1 className="font-bold text-gray-900 text-xl leading-tight mt-2">Workforce Decision Engine
            <span className="block text-sm font-normal text-gray-500 mt-1">Giải bài toán: Cắt giảm 30% nhân sự khối back-office (~300/1000 người)</span>
          </h1>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full md:w-72 mt-4 md:mt-0">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-800">Tỷ lệ cắt giảm mục tiêu</label>
            <span className="text-xl font-bold text-[#0077B6]">{cutPercent}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="50" step="5"
            value={cutPercent} 
            onChange={(e) => setCutPercent(parseInt(e.target.value))}
            className="w-full accent-[#0077B6]"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>0%</span>
            <span>Tối đa: 50%</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start text-sm text-amber-900 shadow-sm">
        <AlertTriangle size={20} className="text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Cảnh báo tuân thủ pháp lý (Compliance Constraints)</p>
          <p>Hệ thống tự động loại trừ <strong>12 nhân viên</strong> thuộc diện bảo vệ pháp lý (thai sản, nghỉ ốm dài ngày, đoàn viên công đoàn lãnh đạo) khỏi danh sách xem xét để tránh rủi ro pháp lý.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Reductions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <UserMinus size={18} className="text-red-500 mr-2" />
              Gợi ý cắt giảm (Bottom 20% Score)
            </h3>
            <div className="flex items-center space-x-2 text-sm bg-gray-50 py-1.5 px-3 rounded-lg border border-gray-200">
              <span className="text-gray-600 font-medium">Chỉ số Công bằng (Bias Check)</span>
              <button 
                className={`w-10 h-5 rounded-full relative transition-colors ${biasCheck ? 'bg-[#003B73]' : 'bg-gray-300'}`}
                onClick={() => setBiasCheck(!biasCheck)}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${biasCheck ? 'left-5.5' : 'left-0.5 shadow-sm'}`} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {biasCheck && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-[#003B73] p-4 rounded-xl text-white text-sm space-y-3 shadow-md mb-4 overflow-hidden">
                <h4 className="font-semibold flex items-center mb-2"><CheckCircle2 size={16} className="mr-2 text-green-400"/> Phân tích thiên kiến (Fairness Stats)</h4>
                <div className="bg-white/10 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2"><span>Tỷ lệ Nữ trong danh sách:</span> <div><span className="font-bold">47%</span> <span className="text-xs text-blue-200 ml-1">(vs 52% toàn phòng)</span> <span className="text-green-300 ml-2 font-bold">✓ OK</span></div></div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2"><span>Tỷ lệ &gt;40 tuổi:</span> <div><span className="font-bold">22%</span> <span className="text-xs text-blue-200 ml-1">(vs 25% toàn phòng)</span> <span className="text-green-300 ml-2 font-bold">✓ OK</span></div></div>
                  <div className="flex justify-between items-center"><span>Tỷ lệ &lt;2 năm thâm niên:</span> <div><span className="font-bold text-[#FFC857]">35%</span> <span className="text-xs text-blue-200 ml-1">(vs 30% toàn phòng)</span> <span className="text-[#FFC857] ml-2 font-bold">⚠ Chú ý</span></div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left bg-white">
              <thead className="bg-gray-50/80 text-gray-600 border-b border-gray-200 text-sm">
                <tr>
                  <th className="p-4 font-semibold w-1/3">Nhân sự</th>
                  <th className="p-4 font-semibold text-center">Hiệu suất</th>
                  <th className="p-4 font-semibold text-center">Retention Score</th>
                  <th className="p-4 font-semibold text-center w-24">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80 text-sm">
                {mockReductions.map((nv, i) => (
                  <tr key={nv.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{nv.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{nv.id} • {nv.role}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-medium text-gray-800">{nv.perf}</div>
                      <div className="text-xs mt-1 px-2 py-0.5 bg-gray-100 rounded-md inline-block text-gray-600">ROI: {nv.prod}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-lg text-red-600 font-bold bg-red-50 py-1 rounded-lg w-16 mx-auto border border-red-100">
                        {nv.score}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => setSelectedShap(nv.id)}
                        className="bg-white hover:bg-blue-50 border border-blue-200 text-[#0077B6] p-2 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-blue-100 outline-none w-full flex justify-center items-center"
                        title="Explainable AI"
                      >
                        <Search size={16} className="mr-0 xl:mr-1" />
                        <span className="hidden xl:inline font-medium">Lý do</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

         {/* Explainable AI View - Side View on Desktop, overlay on small */}
         <div className="xl:h-full">
          {selectedShap ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={selectedShap}
              className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden sticky top-6"
            >
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center text-lg">
                    <span className="bg-[#003B73] text-white text-xs px-2 py-1 rounded mr-3 uppercase tracking-wide font-semibold">Explainable AI</span>
                    Giải thích quyết định
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Phân tích bằng thuật toán SHAP</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Vì sao <strong>{selectedEmployee.name} ({selectedEmployee.id})</strong> có Retention Score thấp mức <span className="font-bold text-red-600 text-lg mx-1">{selectedEmployee.score} / 100</span>?
                  </p>
                </div>

                <div className="flex-1 min-h-[220px] w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={shapData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" domain={[-20, 10]} stroke="#9ca3af" tick={{fontSize: 12}} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 500 }} width={120} />
                      <Tooltip contentStyle={{ fontSize: '13px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                      <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={2} />
                      <Bar dataKey="val" radius={4} barSize={24}>
                        {shapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.val < 0 ? '#ef4444' : '#10b981'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 text-sm mb-2">Chi tiết Tăng/Giảm điểm:</h4>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4">
                    <li className="flex items-start"><span className="text-red-500 mr-2 mt-0.5 block">↓</span> <strong>Hiệu suất 12 tháng:</strong> 52/100 (vs TB phòng 78) → giảm 15.6 điểm</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 mt-0.5 block">↓</span> <strong>Năng suất ROI:</strong> 0.62 (vs Benchmark 1.0) → giảm 7.4 điểm</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 mt-0.5 block">↓</span> <strong>Kỹ năng chiến lược:</strong> Kỹ năng test thủ công (Manual QC) đang bị thay thế bởi Automated Testing → giảm 5.2 điểm</li>
                  </ul>
                  
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 flex items-start">
                    <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p><strong>Khuyến nghị AI:</strong> Cân nhắc <em>upskilling</em> sang vai trò Automation Engineer (đào tạo 6 tháng) thay vì sa thải ngay do thâm niên đóng góp 8 năm hiểu rõ nghiệp vụ (domain knowledge).</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-gray-200 border-dashed h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 p-8 text-center mt-4 xl:mt-0">
              <Search size={48} className="mb-4 text-gray-300" />
              <p className="font-medium text-lg text-gray-500 mb-2">Chọn một nhân sự để xem giải thích</p>
              <p className="text-sm">Hệ thống sẽ dùng Explainable AI (SHAP) để giải thích sự đóng góp của từng tiêu chí vào điểm số cuối cùng.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Context Info */}
      <div className="mt-8 border-t border-gray-200 pt-6 max-w-4xl">
        <h4 className="font-bold text-gray-800 text-sm mb-3">Thông tin Hệ thống Chấm điểm & Quy trình Phê duyệt</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
           <div>
              <p className="font-semibold mb-1 text-gray-700">Mô hình chấm điểm (Multi-Criteria):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Hiệu suất (25%):</strong> Lấy từ phân hệ HR (BRAVO 10 ERP).</li>
                <li><strong>Năng suất / ROI (20%):</strong> Từ phân hệ Tài chính và Quản lý công việc.</li>
                <li><strong>Độ quan trọng chiến lược (20%):</strong> Từ HR Skills DB mapping với Strategy.</li>
                <li><strong>Khả năng thay thế (10%):</strong> Lấy từ Recruitment module.</li>
              </ul>
           </div>
           <div>
              <p className="font-semibold mb-1 text-gray-700">Quy trình quyết định:</p>
              <p className="mb-2">Hệ thống <strong>không tự động sa thải</strong>, chỉ rà soát dữ liệu và đề xuất xếp hạng một cách minh bạch.</p>
              <p>Quyết định cuối cùng cần chữ ký số của: <br/><strong className="text-gray-800">Tổng Giám đốc + Giám đốc Nhân sự (CHRO) + Giám đốc Pháp chế (Legal)</strong>.</p>
              <p className="mt-1 text-xs text-gray-500 italic">Mọi quyết định giữ hay loại đều lưu Audit Log đề phòng khiếu kiện.</p>
           </div>
        </div>
      </div>

    </motion.div>
  );
}
