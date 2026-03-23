// src/components/LogHoursModal.jsx
import React from 'react';
import { X, Clock, Info } from 'lucide-react';

export default function LogHoursModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gm-blue relative overflow-hidden">
          {/* Adorno estético */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-2xl rounded-full"></div>
          
          <div className="flex items-center text-white relative z-10">
            <Clock className="mr-3 text-gm-light" size={24} strokeWidth={2.5}/>
            <h2 className="text-xl font-extrabold tracking-tight shadow-sm">Registrar Carga Semanal</h2>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors relative z-10">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100 flex items-start shadow-sm">
             <Info className="shrink-0 mr-2 mt-0.5 text-blue-500" size={18} />
             <span>Recuerda: El máximo garantizado de capacidad en General Motors es equivalente a <b>42.5 horas semanales (100%)</b>.</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Semana de Reporte</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none bg-white shadow-sm font-medium text-gray-800">
                <option>Semana Actual (Del 23 al 29 de Marzo)</option>
                <option>Semana Pasada (Del 16 al 22 de Marzo)</option>
                <option>Semana Crítica (Del 09 al 15 de Marzo)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end bg-gray-50 border border-gray-100 p-4 rounded-xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Porcentaje (%)</label>
                <div className="relative">
                  <input type="number" defaultValue="50" min="0" max="100" className="w-full border border-gray-300 rounded-lg pl-4 pr-8 py-2.5 focus:border-gm-blue font-black text-xl text-gm-blue outline-none focus:ring-2 ring-gm-blue/20 shadow-inner" />
                  <span className="absolute right-3 top-3.5 text-gray-400 font-bold">%</span>
                </div>
              </div>
              <div className="pb-3 text-sm text-gray-500 font-bold ml-2 flex items-center">
                <span className="text-lg mr-2">≈</span> 21.25 Horas
              </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Comentarios / Avances</label>
            <textarea rows="2" placeholder="Opcional. Breve resumen para el project manager..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none resize-none shadow-sm"></textarea>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 flex justify-end space-x-3 bg-gray-50/80">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 font-semibold hover:bg-gray-200 transition-colors">Cancelar</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gm-blue text-white font-bold shadow-md hover:bg-blue-800 hover:shadow-lg transition-all active:scale-95 focus:ring-4 ring-gm-blue/30">Enviar Registro</button>
        </div>
      </div>
    </div>
  );
}
