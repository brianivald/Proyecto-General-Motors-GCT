import React from 'react';
import { Plus } from 'lucide-react';

const mockProjects = [
  { id: 1, name: 'Línea Ensamblaje EV', role: 'Ingeniero Sr.' },
  { id: 2, name: 'Chasis Autonómo', role: 'Diseñador CAD' },
];

export default function Sidebar({ selectedProjectId, onSelectProject, onNewProject }) {
  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-6 overflow-y-auto shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.01)] relative">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-[17px] font-extrabold text-gray-800 tracking-tight uppercase text-xs text-gm-light">Mis Proyectos</h2>
      </div>

      {/* Lista de proyectos */}
      <div className="space-y-3 flex-1">
        {mockProjects.map(proj => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden focus:outline-none ${
                isSelected 
                ? 'bg-gm-blue border-gm-blue shadow-lg shadow-gm-blue/20' 
                : 'bg-white border-transparent text-gray-600 hover:bg-gm-bg hover:border-gray-100'
              }`}
            >
              <h3 className={`font-bold text-[15px] truncate relative z-10 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                {proj.name}
              </h3>
              <p className={`text-xs mt-1 font-medium truncate relative z-10 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                {proj.role}
              </p>
              
              {/* Círculo luminoso decorativo */}
              {isSelected && (
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 blur-xl rounded-full pointer-events-none"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Botón flotante al final que abre Modal Mágico */}
      <div className="pt-4 mt-auto border-t border-gray-100">
        <button 
           onClick={onNewProject} 
           className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gm-blue font-bold border-2 border-dashed border-gray-200 hover:border-gm-light rounded-xl transition-all duration-200 focus:ring-2 focus:ring-gm-light/50 outline-none active:scale-95 group"
        >
            <Plus size={20} className="mr-2 text-gray-400 group-hover:text-gm-blue transition-colors" strokeWidth={2.5} /> 
            Nuevo proyecto
        </button>
      </div>
    </aside>
  );
}
