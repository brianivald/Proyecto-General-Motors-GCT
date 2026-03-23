import React from 'react';
import { AlertTriangle, ClipboardList, CalendarDays, ArrowLeft, Clock } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar Controladores de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Configuración visual de la Gráfica
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, padding: 20, font: { family: 'sans-serif', weight: 'bold' } } },
      tooltip: { mode: 'index', intersect: false, backgroundColor: 'rgba(26, 32, 44, 0.9)', titleFont: { size: 14 }, padding: 12, cornerRadius: 8 }
    },
    scales: {
      y: { min: 0, max: 120, grid: { borderDash: [4, 4], color: '#f1f5f9' }, title: { display: true, text: 'Carga de Trabajo (%)', font: { weight: 'bold' } } },
      x: { grid: { display: false } }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false }
};

const chartData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5 (Actual)'],
    datasets: [
      {
        label: 'Carga Semanal Acumulada',
        data: [40, 60, 85, 95, 20],
        borderColor: '#165D98', // gm-blue
        backgroundColor: 'rgba(22, 93, 152, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#165D98',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Capacidad Máxima (100%)',
        data: [100, 100, 100, 100, 100],
        borderColor: '#EF4444', // Red Alert
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        borderWidth: 2
      }
    ],
};

export default function DashboardPanel({ projectId, onBack, onLogHours }) {
    
  if (projectId) {
    // ESTADO 2: Proyecto Seleccionado
    return (
      <div className="flex flex-col h-full animate-fade-in relative">
        <button onClick={onBack} className="absolute -top-4 -left-2 text-gray-400 hover:text-gm-blue hover:-translate-x-1 p-2 transition-all flex items-center text-sm font-bold">
            <ArrowLeft size={16} className="mr-1"/> Inicio
        </button>
        
        <div className="mt-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
           <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                   {projectId === 1 ? 'Línea Ensamblaje EV' : 'Chasis Autonómo'}
               </h1>
               <p className="text-gray-500 mt-2 flex items-center text-sm font-medium">
                   <CalendarDays size={16} className="mr-2 text-gm-light" /> Inicio: 01 Enero, 2026 &nbsp;|&nbsp; Vence estimado: 12 Mayo, 2026
               </p>
           </div>
           {/* MANDA LLAMAR EL MODAL ON LOG HOURS */}
           <button onClick={onLogHours} className="mt-4 sm:mt-0 bg-gm-blue hover:bg-[#0f4675] text-white px-6 py-3.5 rounded-xl font-bold shadow-xl shadow-gm-blue/20 transition-all active:scale-95 flex items-center border border-white/10">
               <ClipboardList size={18} className="mr-2" /> Registrar Semana Actual
           </button>
        </div>

        {/* Panel Grafica Chart.JS Real */}
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-6 lg:p-8 flex flex-col relative overflow-hidden group">
            <div className="mb-6 flex justify-between items-end">
                <div>
                   <h3 className="text-xl font-bold text-gray-800 tracking-tight">Proyección de Carga</h3>
                   <p className="text-sm text-gray-400 font-medium">Resumen histórico quincenal y tendencia vs Disponibilidad del Proyecto</p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 hidden md:block">
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Eficiencia Actual</span>
                   <span className="text-lg font-black text-gm-blue leading-none">95%</span>
                </div>
            </div>
            
            <div className="w-full flex-1 relative min-h-[300px]">
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
      </div>
    );
  }

  // ESTADO 1: Reportes Pendientes Inicial
  return (
    <div className="animate-fade-in flex flex-col h-full max-w-5xl mx-auto w-full">
      <div className="mb-10 bg-gradient-to-r from-gm-blue to-gm-light rounded-3xl p-8 text-white shadow-xl shadow-gm-blue/10 relative overflow-hidden transition-all hover:scale-[1.01] duration-500 cursor-default">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 w-full sm:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Hola, Roberto Gómez</h1>
            <p className="text-gm-bg/90 font-medium text-lg">Tienes tu carga de trabajo cubierta al 100% en las últimas 3 semanas. Sin embargo, requiere atención inmediata:</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
        Reportes semanales pendientes
        <span className="ml-3 bg-red-100 border border-red-200 text-red-700 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md">2 Críticos</span>
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white border-2 border-amber-200/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
           <div className="bg-gradient-to-b from-amber-100 to-amber-50 border border-amber-200 p-4 rounded-xl mr-6 shrink-0 z-10 text-amber-500">
              <AlertTriangle size={30} strokeWidth={2} />
           </div>
           <div className="flex-1 z-10 mt-4 sm:mt-0">
               <h3 className="text-xl font-black text-gray-800 tracking-tight">Línea Ensamblaje EV</h3>
               <p className="text-gray-600 text-sm mt-1.5 flex items-center">
                   <Clock size={16} className="text-amber-500 mr-1.5"/>
                   Semana del <b>16 al 22 de Marzo</b> pendiente por registrar.
               </p>
           </div>
           <button onClick={onLogHours} className="z-10 mt-5 sm:mt-0 bg-white border-2 border-gray-200 hover:border-gm-blue hover:text-gm-blue text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm transition-all focus:ring-4 ring-gm-blue/10 flex shrink-0 items-center justify-center w-full sm:w-auto">
               <ClipboardList size={18} className="mr-2" /> Completar 42.5 hrs
           </button>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
           <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl mr-6 shrink-0 z-10 text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-colors">
              <AlertTriangle size={30} strokeWidth={2} />
           </div>
           <div className="flex-1 z-10 mt-4 sm:mt-0">
               <h3 className="text-xl font-black text-gray-800 tracking-tight">Chasis Autonómo</h3>
               <p className="text-gray-600 text-sm mt-1.5 flex items-center">
                   <Clock size={16} className="text-gray-400 mr-1.5 group-hover:text-amber-400"/>
                   Semana del <b>09 al 15 de Marzo</b> olvidada por reportar.
               </p>
           </div>
           <button onClick={onLogHours} className="z-10 mt-5 sm:mt-0 bg-white border-2 border-gray-200 hover:border-gm-blue hover:text-gm-blue text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm transition-all flex shrink-0 items-center justify-center w-full sm:w-auto">
               <ClipboardList size={18} className="mr-2" /> Llenar Timesheet
           </button>
        </div>
      </div>
    </div>
  );
}
