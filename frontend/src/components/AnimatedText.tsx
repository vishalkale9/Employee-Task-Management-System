import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  "Manage Tasks Effortlessly",
  "Boost Team Productivity",
  "Track Progress in Real-time"
];

export const AnimatedText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-24 py-2 relative flex items-center justify-center overflow-hidden w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
