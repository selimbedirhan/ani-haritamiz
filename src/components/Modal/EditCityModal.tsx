import { useState } from 'react';
import { motion } from 'framer-motion';
import type { CityData } from '../../hooks/useCities';

interface EditCityModalProps {
    city: CityData;
    onSave: (cityId: string, updates: {
        journalText: string;
        date: string;
        driveFolderId: string | null;
        visited: boolean;
    }) => void;
    onClose: () => void;
}

export function EditCityModal({ city, onSave, onClose }: EditCityModalProps) {
    const [journalText, setJournalText] = useState(city.journalText || '');
    const [date, setDate] = useState(city.date || '');
    const [driveFolderId, setDriveFolderId] = useState(city.driveFolderId || '');

    const handleSave = () => {
        const hasContent = journalText.trim() || date.trim() || driveFolderId.trim();
        onSave(city.id, {
            journalText: journalText.trim(),
            date: date.trim(),
            driveFolderId: driveFolderId.trim() || null,
            visited: hasContent ? true : city.visited,
        });
        onClose();
    };

    const handleReset = () => {
        onSave(city.id, {
            journalText: '',
            date: '',
            driveFolderId: null,
            visited: false,
        });
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative glass rounded-3xl p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div
                    className="w-16 h-1 rounded-full mb-4"
                    style={{ backgroundColor: city.hexColor }}
                />
                <h2 className="text-2xl font-light text-white mb-1">{city.name}</h2>
                <p className="text-white/40 text-sm mb-6">Şehir bilgilerini düzenle</p>

                {/* Form */}
                <div className="space-y-5">
                    {/* Journal Text */}
                    <div>
                        <label className="block text-white/60 text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Anı Yazısı
                        </label>
                        <textarea
                            value={journalText}
                            onChange={(e) => setJournalText(e.target.value)}
                            placeholder="Bu şehirde yaşadığınız anıları yazın..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none transition-colors"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-white/60 text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Tarih
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors [color-scheme:dark]"
                        />
                    </div>

                    {/* Drive Folder ID */}
                    <div>
                        <label className="block text-white/60 text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Google Drive Klasör ID
                        </label>
                        <input
                            type="text"
                            value={driveFolderId}
                            onChange={(e) => setDriveFolderId(e.target.value)}
                            placeholder="Drive klasör linkindeki ID'yi yapıştırın"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                        />
                        <p className="text-white/30 text-xs mt-1.5">
                            Örnek: drive.google.com/drive/folders/<span className="text-white/50 underline">BU_KISIM_ID</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    {city.visited && (
                        <button
                            onClick={handleReset}
                            className="px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-2"
                            title="Şehir verilerini sıfırla"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Sil
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors font-medium"
                    >
                        İptal
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all hover:brightness-110 active:scale-[0.98]"
                        style={{ backgroundColor: city.hexColor }}
                    >
                        Kaydet
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
