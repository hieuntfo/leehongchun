import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, Search, X, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const mockReductions = [
  { id: 'NV034', name: 'NV-034', perf: '2.1/5', prod: '60%', strat: 'Thấp', score: 2.34 },
  { id: 'NV018', name: 'NV-018', perf: '2.5/5', prod: '75%', strat: 'TB', score: 2.81 },
  { id: 'NV041', name: 'NV-041', perf: '2.4/5', prod: '82%', strat: 'Thấp', score: 2.95 },
];

const mockRetentions = [
  { id: 'NV012', name: 'NV-012', perf: '4.7/5', prod: '142%', strat: 'Critical', score: 4.61 },
  { id: 'NV005', name: 'NV-005', perf: '4.5/5', prod: '130%', strat: 'Cao', score: 4.45 },
];

const shapData = [
  { name: 'Performance', val: -0.8 },
  { name: 'Productivity', val: -0.4 },
  { name: 'Strategic', val: -0.6 },
  { name: 'Replaceability', val: 0.2 },
  { name: 'Engagement', val: -0.3 },
  { name: 'Tenure-Adj', val: -0.2 },
  { name: 'Compliance', val: 0 },
];

interface WDEProps { }

export default function Workforce({}: WDEProps) {
  const [cutPercent, setCutPercent] = useState(30);
  const [selectedShap, setSelectedShap] = useState<string | null>(null);
  const [biasCheck, setBiasCheck] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6 pb-24 h-screen overflow-y-auto bg-[#F8FAFC]"
    >
      <div className="space-y-1">
        <h1 className="font-bold text-[#003B73] text-lg">Tối ưu hóa nhân sự</h1>
        <p className="text-xs text-gray-500">Kịch bản: Phòng Tài chính (45 người)</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-gray-800">Tỷ lệ cắt giảm mục tiêu (%)</label>
          <span className="text-lg font-bold text-[#0077B6]">{cutPercent}%</span>
        </div>
        <input 
          type="range" 
          min="0" max="50" step="5"
          value={cutPercent} 
          onChange={(e) => setCutPercent(parseInt(e.target.value))}
          className="w-full accent-[#0077B6]"
        />
        <div className="flex justify-between mt-1 text-[10px] text-gray-400">
          <span>0%</span>
          <span>50%</span>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-start text-xs text-red-800">
        <AlertTriangle size={16} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">⚠ Cảnh báo:</span> 3 NV trong danh sách thuộc diện bảo vệ pháp lý (mang thai/nuôi con &lt;12 tháng) — đã loại trừ tự động.
        </p>
      </div>

      {/* Top Reductions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Gợi ý cắt giảm (Bottom Score)</h3>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-500">Bias Check</span>
            <button 
              className={`w-8 h-4 rounded-full relative transition-colors ${biasCheck ? 'bg-[#0077B6]' : 'bg-gray-300'}`}
              onClick={() => setBiasCheck(!biasCheck)}
            >
              <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${biasCheck ? 'left-4.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {biasCheck && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-[#003B73] p-3 rounded-lg text-white text-xs space-y-2 mb-2">
            <h4 className="font-semibold flex items-center mb-1"><CheckCircle2 size={12} className="mr-1 text-green-400"/> Fairness Stats:</h4>
            <div className="flex justify-between"><span>Nữ: 47% (vs 52% toàn phòng)</span> <span className="text-green-300">✓ OK</span></div>
            <div className="flex justify-between"><span>&gt;40 tuổi: 22% (vs 25% toàn phòng)</span> <span className="text-green-300">✓ OK</span></div>
            <div className="flex justify-between"><span>&lt;2 năm: 35% (vs 30% toàn phòng)</span> <span className="text-[#FFC857]">⚠ Hơi cao</span></div>
          </motion.div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-2 font-medium">Mã NV</th>
                <th className="p-2 font-medium">Perf</th>
                <th className="p-2 font-medium">Score</th>
                <th className="p-2 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockReductions.map((nv, i) => (
                <tr key={nv.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="p-2 font-medium text-gray-800">{nv.id}</td>
                  <td className="p-2">
                    <div className="text-gray-800">{nv.perf}</div>
                    <div className="text-[9px] text-gray-400">Prod: {nv.prod}</div>
                  </td>
                  <td className="p-2 text-red-600 font-bold">{nv.score}</td>
                  <td className="p-2 text-center">
                    <button 
                      onClick={() => setSelectedShap(nv.id)}
                      className="bg-blue-50 text-[#0077B6] px-2 py-1 rounded flex items-center justify-center w-full whitespace-nowrap"
                    >
                      <Search size={12} className="mr-1" /> TT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       {/* Top Retentions */}
       <div className="space-y-3 mt-6">
        <h3 className="text-sm font-semibold text-gray-800">Danh sách bảo vệ (Top Score)</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-2 font-medium">Mã NV</th>
                <th className="p-2 font-medium">Perf</th>
                <th className="p-2 font-medium">Strat</th>
                <th className="p-2 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockRetentions.map((nv, i) => (
                <tr key={nv.id} className="border-b border-gray-50 last:border-0">
                  <td className="p-2 font-medium text-gray-800">{nv.id}</td>
                  <td className="p-2">
                    <div className="text-gray-800">{nv.perf}</div>
                    <div className="text-[9px] text-green-600">Prod: {nv.prod}</div>
                  </td>
                  <td className="p-2 text-gray-600">{nv.strat}</td>
                  <td className="p-2 text-green-600 font-bold">{nv.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-[10px] text-gray-400 text-center mt-8 px-4">
        Quyết định cuối cùng cần có chữ ký của TGĐ, CHRO và Legal. Hệ thống lưu vết chi tiết (Audit log).
      </p>

      {/* SHAP Modal */}
      <AnimatePresence>
        {selectedShap && (
          <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800 text-sm">Giải thích điểm: {selectedShap}</h3>
                <button onClick={() => setSelectedShap(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-4">
                  Vì sao {selectedShap} có Retention Score <span className="font-bold text-red-600">2.34</span>? Đóng góp của 7 tiêu chí:
                </p>
                <div className="h-48 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={shapData} margin={{ top: 0, right: 30, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" hide domain={[-1, 1]} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} width={80} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <ReferenceLine x={0} stroke="#cbd5e1" />
                      <Bar dataKey="val" radius={[0, 4, 4, 0]}>
                        {shapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.val < 0 ? '#ef4444' : '#10b981'} radius={entry.val < 0 ? [4, 0, 0, 4] : [0, 4, 4, 0]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    Score thấp chủ yếu do <span className="text-red-500">Performance (-0.8)</span> và <span className="text-red-500">Strategic Skill (-0.6)</span>. Có yếu tố Replaceability gỡ lại điểm nhưng không đáng kể.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
