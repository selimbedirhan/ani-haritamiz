import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CityPath } from './CityPath';
import { provincesByName } from '../../data/turkeyPaths';

interface CityData {
    id: string;
    name: string;
    hexColor: string;
    visited: boolean;
    journalText: string;
    date: string;
    driveFolderId: string | null;
}

interface TurkeyMapProps {
    cities: CityData[];
    onCityClick: (cityId: string) => void;
}

export function TurkeyMap({ cities: citiesData, onCityClick }: TurkeyMapProps) {
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    const cities = useMemo(() => {
        return citiesData
            .map(city => ({
                ...city,
                svgPath: provincesByName[city.name]?.path || '',
            }))
            .filter(city => city.svgPath);
    }, []);

    // Sort cities so hovered one renders last (on top)
    const sortedCities = useMemo(() => {
        return [...cities].sort((a, b) => {
            if (a.id === hoveredCity) return 1;
            if (b.id === hoveredCity) return -1;
            return 0;
        });
    }, [cities, hoveredCity]);

    const hoveredCityData = cities.find(c => c.id === hoveredCity);
    const visitedCount = cities.filter(c => c.visited).length;

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Header - Fixed at top center */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
            >
                <h1 className="glass rounded-2xl px-8 py-3 text-2xl md:text-3xl font-light text-white/90 tracking-widest whitespace-nowrap">
                    Anı Haritamız
                </h1>
            </motion.div>

            {/* Full-screen Map Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full flex items-center justify-center"
            >
                <svg
                    viewBox="0 0 650 380"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-[100vw] max-w-none"
                    style={{
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                        transform: 'scale(1.8)'
                    }}
                >
                    <defs>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2d3748" />
                            <stop offset="100%" stopColor="#1a202c" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Render city paths */}
                    <AnimatePresence>
                        {sortedCities.map((city) => (
                            <CityPath
                                key={city.id}
                                id={city.id}
                                name={city.name}
                                path={city.svgPath}
                                fill={city.hexColor}
                                visited={city.visited}
                                isHovered={hoveredCity === city.id}
                                onHover={setHoveredCity}
                                onClick={onCityClick}
                            />
                        ))}
                    </AnimatePresence>
                </svg>
            </motion.div>

            {/* Hover Tooltip - Floats near top */}
            <AnimatePresence>
                {hoveredCityData && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-30 glass rounded-xl px-6 py-3 pointer-events-none"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: hoveredCityData.hexColor }}
                            />
                            <span className="text-white font-medium">{hoveredCityData.name}</span>
                            {hoveredCityData.visited ? (
                                hoveredCityData.date && (
                                    <span className="text-white/60 text-sm">• {hoveredCityData.date}</span>
                                )
                            ) : (
                                <span className="text-white/40 text-sm">• Henüz ziyaret edilmedi</span>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Counter - Fixed at bottom right */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 z-20 glass rounded-xl px-5 py-3"
            >
                <div className="text-sm text-white/80">
                    <span className="text-white font-semibold text-lg">{visitedCount}</span>
                    <span className="text-white/60"> / 81 şehir keşfedildi</span>
                </div>
            </motion.div>
        </div>
    );
}
