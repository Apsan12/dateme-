"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LocationCards from "./LocationCards";

interface DateFormProps {
  visible: boolean;
  onSubmit: (data: DateFormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

export interface DateFormData {
  name: string;
  date: string;
  time: string;
  dateType: string;
  message: string;
}

export default function DateForm({ visible, onSubmit, isSubmitting = false }: DateFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateType, setDateType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<DateFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<DateFormData> = {};

    if (!name.trim()) newErrors.name = "Please enter your name 💕";
    if (!date.trim()) newErrors.date = "Please choose a date 💕";
    if (!time.trim()) newErrors.time = "Please choose a time 🕒";
    if (!dateType.trim()) newErrors.dateType = "Please choose a date type 💌";
    if (!message.trim()) newErrors.message = "Please leave a message 💕";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ name, date, time, dateType, message });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="glass-card-strong w-full max-w-lg p-6 sm:p-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Plan Our Date ❤️
              </h2>
              <p className="text-pink-400 mt-2 text-sm sm:text-base">
                Let&apos;s make it perfect together 💕
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-pink-600 mb-2">
                  👤 Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tell me your name..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-pink-100
                           text-gray-700 focus:border-pink-400 transition-all duration-300
                           placeholder:text-pink-300"
                />
                {errors.name && (
                  <motion.p
                    className="text-rose-400 text-xs mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Date picker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-pink-600 mb-2">
                  📅 Choose Date 
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-pink-100
                           text-gray-700 focus:border-pink-400 transition-all duration-300"
                />
                {errors.date && (
                  <motion.p
                    className="text-rose-400 text-xs mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.date}
                  </motion.p>
                )}
              </motion.div>

              {/* Time picker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-pink-600 mb-2">
                  🕒 Choose Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-pink-100
                           text-gray-700 focus:border-pink-400 transition-all duration-300"
                />
                {errors.time && (
                  <motion.p
                    className="text-rose-400 text-xs mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.time}
                  </motion.p>
                )}
              </motion.div>

              {/* Location cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-pink-600 mb-3">
                  📍 Choose Date Type
                </label>
                <LocationCards selected={dateType} onSelect={setDateType} />
                {errors.dateType && (
                  <motion.p
                    className="text-rose-400 text-xs mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.dateType}
                  </motion.p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-pink-600 mb-2">
                  💌 Leave Me A Cute Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Location and a cute message... 💕"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-pink-100
                           text-gray-700 focus:border-pink-400 transition-all duration-300 resize-none
                           placeholder:text-pink-300"
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl text-white font-semibold text-lg
                           bg-linear-to-r from-pink-500 via-rose-500 to-pink-600
                           shadow-lg shadow-pink-300/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: isSubmitting ? undefined : "0 0 30px rgba(236,72,153,0.5)",
                  }}
                  whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "💌 Send My Answer"}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
