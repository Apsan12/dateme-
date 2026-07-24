"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";

interface SurpriseScreenProps {
  visible: boolean;
}

/** Final full-screen romantic surprise message with stars, hearts, and sparkles */
export default function SurpriseScreen({ visible }: SurpriseScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 160,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fbbf24", "#ffffff"],
        scalar: 1.5,
      });
    }, 600);
    return () => clearTimeout(t);
  }, [visible]);

  // Star field positions
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #1a0a2e 60%, #0f0520 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Star field */}
          {mounted &&
            stars.map((s) => (
              <motion.div
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Floating hearts */}
          {mounted &&
            [...Array(10)].map((_, i) => (
              <motion.span
                key={`h-${i}`}
                className="absolute text-xl sm:text-2xl pointer-events-none select-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: "-30px",
                }}
                animate={{
                  y: [0, -(typeof window !== "undefined" ? window.innerHeight + 60 : 900)],
                  opacity: [0, 0.8, 0],
                  x: [0, Math.sin(i * 1.5) * 50],
                }}
                transition={{
                  duration: 8 + Math.random() * 5,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {["❤️", "✨", "💖", "⭐", "💕"][i % 5]}
              </motion.span>
            ))}

          {/* Content */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-pink-200 font-light max-w-xl leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            You just made someone
            <br />
            <span className="text-pink-400 font-semibold">incredibly happy.</span>
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-pink-300/80 font-light max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            I promise to make this date
            <br />
            <span className="text-white font-medium">unforgettable. ❤️</span>
          </motion.p>

          {/* Beating heart */}
          <motion.div
            className="text-7xl sm:text-8xl md:text-9xl my-6"
            animate={{
              scale: [1, 1.25, 1, 1.25, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.div>

          {/* Sparkles around the heart */}
          {mounted &&
            [...Array(6)].map((_, i) => (
              <motion.span
                key={`sp-${i}`}
                className="absolute text-2xl pointer-events-none"
                style={{
                  left: `${45 + Math.cos((i * Math.PI * 2) / 6) * 12}%`,
                  top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 15}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.span>
            ))}

          {/* Thank you */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-2xl">🌹</span>
              <span className="text-pink-200 font-medium text-lg">Thank You</span>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-pink-300/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
