import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

type Bubble = {
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
    wobble: number;
};

const BUBBLE_COUNT = 60;
const TOTAL_DURATION = 2.4; // seconds for the whole transition

const BubbleTransition = ({ show }: { show: boolean }) => {
    const bubbles = useMemo<Bubble[]>(() => {
        return Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 10 + Math.random() * 55,
            delay: Math.random() * 0.8,
            duration: 1.2 + Math.random() * 0.8,
            wobble: (Math.random() - 0.5) * 40, // horizontal drift in px
        }));
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.6,
                        exit: { duration: 0.7, delay: TOTAL_DURATION - 0.7 },
                    }}
                >
                    {bubbles.map((b) => (
                        <motion.div
                            key={b.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${b.x}%`,
                                width: b.size,
                                height: b.size,
                                background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(251,207,232,0.55) 50%, rgba(244,163,196,0.25))`,
                                boxShadow: `inset -2px -2px 6px rgba(244,163,196,0.25), 0 0 10px rgba(255,255,255,0.35)`,
                            }}
                            initial={{
                                bottom: -(b.size + 20),
                                scale: 0.2,
                                opacity: 0,
                                x: 0,
                            }}
                            animate={{
                                bottom: `115%`,
                                scale: [0.2, 0.9, 1.05, 0.95, 0.7],
                                opacity: [0, 0.5, 0.85, 0.75, 0],
                                x: [0, b.wobble * 0.4, b.wobble, b.wobble * 0.6, b.wobble * 0.3],
                            }}
                            transition={{
                                duration: b.duration,
                                delay: b.delay,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    {/* Soft pink wash — smooth fade in then out */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-pink-200/50 via-white/30 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0.5, 0] }}
                        transition={{
                            duration: TOTAL_DURATION,
                            times: [0, 0.25, 0.65, 1],
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BubbleTransition;
export { TOTAL_DURATION };
