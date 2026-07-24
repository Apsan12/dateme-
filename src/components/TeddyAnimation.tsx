"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/** A gift box that opens to reveal a bouncing teddy bear 🧸 */
export default function TeddyAnimation() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpened(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <AnimatePresence mode="wait">
        {!opened ? (
          /* Gift box */
          <motion.div
            key="gift"
            className="text-8xl sm:text-9xl cursor-pointer"
            initial={{ scale: 0, rotate: -20 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [-20, 10, 0],
            }}
            exit={{
              scale: [1, 1.3, 0],
              rotate: [0, -20, 20],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={() => setOpened(true)}
          >
            🎁
          </motion.div>
        ) : (
          /* Teddy bear reveal */
          <motion.div
            key="teddy"
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Sparkle burst */}
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 8) * 80,
                  y: Math.sin((i * Math.PI * 2) / 8) * 80,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                ✨
              </motion.span>
            ))}

            {/* Teddy */}
            <motion.div
              className="text-8xl sm:text-9xl"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🧸
            </motion.div>
            <motion.p
              className="text-pink-400 font-medium mt-4 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              🧸 A teddy just for you
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
