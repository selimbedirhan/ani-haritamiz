import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useCities } from './hooks/useCities';
import { LockScreen } from './components/Auth/LockScreen';
import { TurkeyMap } from './components/Map/TurkeyMap';
import { CityModal } from './components/Modal/CityModal';
import { EditCityModal } from './components/Modal/EditCityModal';
import { CanvasAnimation } from './components/SpecialMemory/CanvasAnimation';
import './index.css';

function App() {
  const { isAuthenticated, login } = useAuth();
  const { cities, updateCity } = useCities();
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [editingCityId, setEditingCityId] = useState<string | null>(null);
  const [showSpecialMemory, setShowSpecialMemory] = useState(false);

  const selectedCity = cities.find((c) => c.id === selectedCityId);
  const editingCity = cities.find((c) => c.id === editingCityId);

  const handleCityClick = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleCloseModal = () => {
    setSelectedCityId(null);
  };

  const handleEditCity = () => {
    if (selectedCityId) {
      setEditingCityId(selectedCityId);
      setSelectedCityId(null);
    }
  };

  const handleCloseEdit = () => {
    setEditingCityId(null);
  };

  const handleSaveCity = (cityId: string, updates: {
    journalText: string;
    date: string;
    driveFolderId: string | null;
    visited: boolean;
  }) => {
    updateCity(cityId, updates);
  };

  const handleOpenSpecialMemory = () => {
    setShowSpecialMemory(true);
  };

  const handleCloseSpecialMemory = () => {
    setShowSpecialMemory(false);
  };

  // If not authenticated, show lock screen
  if (!isAuthenticated) {
    return <LockScreen onLogin={login} />;
  }

  // Authenticated content
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Main map view */}
      <TurkeyMap cities={cities} onCityClick={handleCityClick} />

      {/* Easter egg trigger - couple photo in bottom left */}
      <button
        onClick={handleOpenSpecialMemory}
        className="fixed bottom-6 left-6 z-30 group"
        aria-label="Special memory"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-pink-400/50 group-hover:shadow-pink-500/20">
          {/* Placeholder heart icon - replace with actual couple photo */}
          <div className="w-full h-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 rounded-lg bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Hemen Tıkla ✨
        </span>
      </button>

      {/* City memory modal */}
      <AnimatePresence>
        {selectedCity && (
          <CityModal
            city={selectedCity}
            onClose={handleCloseModal}
            onEdit={handleEditCity}
          />
        )}
      </AnimatePresence>

      {/* City edit modal */}
      <AnimatePresence>
        {editingCity && (
          <EditCityModal
            city={editingCity}
            onSave={handleSaveCity}
            onClose={handleCloseEdit}
          />
        )}
      </AnimatePresence>

      {/* Special memory canvas overlay */}
      <AnimatePresence>
        {showSpecialMemory && (
          <CanvasAnimation onClose={handleCloseSpecialMemory} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
