"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const locations = [
  { id: "coffee", emoji: "☕", label: "Coffee Date" },
  { id: "pizza", emoji: "🍕", label: "Pizza" },
  { id: "movie", emoji: "🎬", label: "Movie" },
  { id: "icecream", emoji: "🍦", label: "Ice Cream" },
  { id: "sunset", emoji: "🌅", label: "Sunset Walk" },
  { id: "dinner", emoji: "🍜", label: "Dinner" },
];

interface LocationCardsProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function LocationCards({ selected, onSelect }: LocationCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {locations.map((loc, i) => {
        const isSelected = selected === loc.id;
        return (
          <motion.button
            key={loc.id}
            type="button"
            onClick={() => onSelect(loc.id)}
            className={`
              relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl
              cursor-pointer transition-all duration-300 border-2
              ${
                isSelected
                  ? "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-400 shadow-lg shadow-pink-200/50"
                  : "bg-white/50 backdrop-blur-sm border-white/60 hover:border-pink-200 hover:bg-white/70"
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Heart pop animation when selected */}
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  className="absolute -top-2 -right-2 text-lg"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  ❤️
                </motion.span>
              )}
            </AnimatePresence>

            {/* Glow ring when selected */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: "0 0 20px rgba(236,72,153,0.3), inset 0 0 20px rgba(236,72,153,0.05)",
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            <motion.span
              className="text-3xl sm:text-4xl mb-2"
              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {loc.emoji}
            </motion.span>
            <span
              className={`text-sm sm:text-base font-medium ${
                isSelected ? "text-pink-600" : "text-gray-600"
              }`}
            >
              {loc.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
