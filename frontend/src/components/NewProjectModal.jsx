// src/components/NewProjectModal.jsx
import React from 'react';
import { X, FolderPlus } from 'lucide-react';

export default function NewProjectModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 transform transition-all translate-y-0 opacity-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center text-gm-blue">
            <FolderPlus className="mr-3" size={24} />
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Crear Nuevo Proyecto</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1.5 rounded-full transition-colors outline-none focus:ring-2 ring-gm-light">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre del Proyecto</label>
            <input type="text" placeholder="Ej. Plataforma EV 2026" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none transition-all shadow-sm" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción General</label>
            <textarea rows="3" placeholder="Define el alcance u objetivo del proyecto en GM..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none transition-all shadow-sm resize-none"></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Inicio (Estimado)</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fin (Estimado)</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-gm-blue focus:ring-2 focus:ring-gm-blue/20 outline-none shadow-sm" />
              </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 font-semibold hover:bg-gray-200 transition-colors focus:ring-2">Cancelar</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gm-blue text-white font-bold shadow-md hover:bg-[#0f4675] hover:shadow-lg transition-all active:scale-95 focus:ring-4 ring-gm-blue/30">Guardar Proyecto</button>
        </div>
      </div>
    </div>
  );
}
