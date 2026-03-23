import React from 'react';
import { UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-8 shrink-0 z-20 w-full relative backdrop-blur-md">
      {/* Lado Izquierdo: Logotipo Corporativo de archivo y Menú */}
      <div className="flex items-center space-x-4">
        {/* LOGOTIPO*/}
        <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 cursor-pointer hover:scale-105 transition-transform" title="Sube logo GM en frontend/public/gm-logo.png">
          <img
            src="/gm-logo.svg"
            alt="General Motors Logo"
            className="w-full h-full object-contain drop-shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/General_Motors_logo.svg';
            }}
          />
        </div>

        <nav className="hidden md:flex items-center space-x-6 ml-6 text-[15px] font-medium text-gray-400">
          <a href="#" className="text-gm-blue relative font-semibold after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-gm-blue">Inicio</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Rendimiento</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Ver Proyectos</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Historial</a>
        </nav>
      </div>

      {/* Lado Derecho: Avatar e info */}
      <div className="flex items-center space-x-4 border-l pl-4 border-gray-100">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800 tracking-tight">Roberto Gómez</p>
          <p className="text-xs text-gm-light font-medium">GM-93821</p>
        </div>
        <button className="rounded-full bg-gm-bg p-[3px] text-gm-blue hover:bg-gray-200 transition-all focus:ring-2 focus:ring-gm-light outline-none">
          <UserCircle size={36} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
