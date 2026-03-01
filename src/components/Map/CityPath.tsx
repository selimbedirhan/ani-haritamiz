import { motion } from 'framer-motion';

interface CityPathProps {
    id: string;
    name: string;
    path: string;
    fill: string;
    visited: boolean;
    isHovered: boolean;
    onHover: (id: string | null) => void;
    onClick: (id: string) => void;
}

export function CityPath({
    id,
    name,
    path,
    fill,
    visited,
    isHovered,
    onHover,
    onClick,
}: CityPathProps) {
    return (
        <motion.path
            d={path}
            fill={visited ? fill : '#4a5568'}
            stroke="#1a1a2e"
            strokeWidth="0.5"
            className="transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                scale: isHovered ? 1.05 : 1,
            }}
            transition={{
                duration: 0.2,
                scale: { type: 'spring', stiffness: 300, damping: 20 }
            }}
            style={{
                transformOrigin: 'center',
                transformBox: 'fill-box',
                filter: isHovered ? 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none',
            }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(id)}
        >
            <title>{name}</title>
        </motion.path>
    );
}
