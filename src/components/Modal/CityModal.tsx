import { motion } from 'framer-motion';
import { PhotoGallery } from './PhotoGallery';

interface CityModalProps {
    city: {
        id: string;
        name: string;
        hexColor: string;
        journalText: string;
        date: string;
        driveFolderId: string | null;
    };
    onClose: () => void;
    onEdit: () => void;
}

export function CityModal({ city, onClose, onEdit }: CityModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative glass rounded-3xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
                {/* Edit button */}
                <button
                    onClick={onEdit}
                    className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    title="Düzenle"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* City color accent */}
                <div
                    className="w-16 h-1 rounded-full mb-6"
                    style={{ backgroundColor: city.hexColor }}
                />

                {/* City name */}
                <h2 className="text-3xl font-light text-white mb-2">{city.name}</h2>

                {/* Date */}
                {city.date && (
                    <p className="text-white/60 text-sm mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {city.date}
                    </p>
                )}

                {/* Journal entry */}
                <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed text-lg">
                        {city.journalText || 'Henüz bu şehir için anı yazılmamış...'}
                    </p>
                </div>

                {/* Photo gallery */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-white/60 text-sm mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Fotoğraflar
                    </h3>
                    <PhotoGallery folderId={city.driveFolderId} />
                </div>
            </motion.div>
        </motion.div>
    );
}
