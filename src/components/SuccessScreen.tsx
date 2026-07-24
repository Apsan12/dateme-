"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import TeddyAnimation from "./TeddyAnimation";

interface SuccessScreenProps {
  visible: boolean;
  onContinue: () => void;
}

export default function SuccessScreen({ visible, onContinue }: SuccessScreenProps) {
  useEffect(() => {
    if (!visible) return;

    // Fire confetti bursts
    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.3, y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fce7f3"],
        shapes: ["circle"],
        scalar: 1.2,
      });
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.7, y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fce7f3"],
        shapes: ["circle"],
        scalar: 1.2,
      });
    };

    fire();
    const t1 = setTimeout(fire, 800);
    const t2 = setTimeout(fire, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating hearts background for this section */}
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl pointer-events-none select-none"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: "0%",
              }}
              animate={{
                y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800)],
                opacity: [0, 1, 0],
                x: [0, Math.sin(i) * 40],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {["❤️", "💕", "💖", "💗", "🩷"][i % 5]}
            </motion.span>
          ))}

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            Yay!! ❤️
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-pink-400 font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            I can&apos;t wait to see you.
          </motion.p>

          {/* Teddy animation with gift box */}
          <TeddyAnimation />

          {/* Continue button */}
          <motion.button
            onClick={onContinue}
            className="mt-8 px-10 py-4 rounded-full text-white font-semibold text-lg
                     bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600
                     shadow-lg shadow-pink-300/40 cursor-pointer pulse-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            💕 See Our Surprise
          </motion.button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
