import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
    onLogin: (password: string) => boolean;
}

export function LockScreen({ onLogin }: LockScreenProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const success = onLogin(password);

        if (!success) {
            setError(true);
            setIsShaking(true);
            setPassword('');

            // Reset shake animation
            setTimeout(() => setIsShaking(false), 500);
            // Clear error after delay
            setTimeout(() => setError(false), 3000);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ top: '10%', left: '10%' }}
                />
                <motion.div
                    className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ bottom: '10%', right: '10%' }}
                />
                <motion.div
                    className="absolute w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
            </div>

            {/* Lock screen card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
                }}
                transition={{
                    duration: isShaking ? 0.4 : 0.6,
                    ease: isShaking ? 'easeInOut' : 'easeOut'
                }}
                className="glass rounded-3xl p-8 w-full max-w-md relative z-10"
            >
                {/* Heart icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-2xl font-light text-white text-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Anılarımız
                </motion.h1>
                <motion.p
                    className="text-white/60 text-center text-sm mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Gizli haritamıza hoş geldin
                </motion.p>

                {/* Password form */}
                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Şifreyi gir..."
                            className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-center text-lg tracking-widest"
                            autoFocus
                        />
                    </motion.div>

                    {/* Error message */}
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-red-400 text-center text-sm mt-3"
                            >
                                Yanlış şifre, tekrar dene...
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Submit button */}
                    <motion.button
                        type="submit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        Gir
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
