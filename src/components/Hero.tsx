"use client";

import { motion, AnimatePresence } from "framer-motion";
import HeroButtons from "./HeroButtons";

interface HeroProps {
  onYesClick: () => void;
  visible: boolean;
}

export default function Hero({ onYesClick, visible }: HeroProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent leading-tight"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ❤️ Will You Go On
              <br />
              A Date With Me?
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-pink-400/90 font-light max-w-md mx-auto mb-10 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            &ldquo;I don&apos;t need the perfect day... I just need you beside me. ❤️&rdquo;
          </motion.p>

          {/* Decorative floating heart */}
          <motion.div
            className="text-6xl mb-6"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.div>

          {/* Buttons */}
          <HeroButtons onYesClick={onYesClick} />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
