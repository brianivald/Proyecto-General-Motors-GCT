import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPanel from './components/DashboardPanel';
import NewProjectModal from './components/NewProjectModal';
import LogHoursModal from './components/LogHoursModal';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Estados para controlar ventanas emergentes (Modales)
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isLogHoursModalOpen, setIsLogHoursModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gm-bg selection:bg-gm-light selection:text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
          onNewProject={() => setIsNewProjectModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <DashboardPanel
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
            onLogHours={() => setIsLogHoursModalOpen(true)}
          />
        </main>
      </div>

      {/* Renderizado Condicional de Modales */}
      {isNewProjectModalOpen && (
        <NewProjectModal onClose={() => setIsNewProjectModalOpen(false)} />
      )}
      {isLogHoursModalOpen && (
        <LogHoursModal onClose={() => setIsLogHoursModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
