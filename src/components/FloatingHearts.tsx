"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

/** Floating hearts and sparkles that drift upward continuously */
export default function FloatingHearts({ count = 20 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hearts = useMemo(() => {
    const emojis = ["❤️", "💕", "💖", "💗", "✨", "💝", "🩷", "✨", "💓"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
      emoji: emojis[i % emojis.length],
    }));
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            bottom: "-40px",
          }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight + 100 : 1000)],
            x: [0, Math.sin(heart.id) * 60],
            opacity: [0, 1, 1, 0],
            rotate: [0, Math.random() > 0.5 ? 360 : -360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
