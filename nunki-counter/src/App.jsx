import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import './App.css';

dayjs.extend(duration);

// --- KONFIGURACJA ---
const START_DATE = '2024-11-10T00:00:00'; // Wasza data
const PHOTOS = [
  '/photos/1.jpg'
];

export default function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [time, setTime] = useState({
    years: 0, months: 0, days: 0, hours: '00', minutes: '00', seconds: '00'
  });

  // Losowanie pierwszego zdjęcia
  useEffect(() => {
    setCurrentPhotoIndex(Math.floor(Math.random() * PHOTOS.length));
  }, []);

  // Funkcja zmiany zdjęcia na kolejne
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  // Licznik czasu
  useEffect(() => {
    const start = dayjs(START_DATE);

    const updateTimer = () => {
      const now = dayjs();
      const diff = dayjs.duration(now.diff(start));

      setTime({
        years: diff.years(),
        months: diff.months(),
        days: diff.days(),
        hours: diff.hours().toString().padStart(2, '0'),
        minutes: diff.minutes().toString().padStart(2, '0'),
        seconds: diff.seconds().toString().padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* TŁO ZE ZDJĘCIEM I ANIMACJĄ PRZEJŚCIA */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentPhotoIndex}
          src={PHOTOS[currentPhotoIndex]}
          alt="Nasze wspomnienie"
          className="bg-photo"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* GRADIENT PRZYCIEMNIAJĄCY */}
      <div className="overlay" />

      {/* PRZYCISK ZMIANY ZDJĘCIA */}
      <button className="change-photo-btn" onClick={nextPhoto} title="Zmień zdjęcie">
        <RefreshCw size={18} />
      </button>

      {/* KARTA Z LICZNIKIEM */}
      <motion.div 
        className="glass-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card-header">
          <Heart className="heart-icon" fill="#ff4b4b" color="#ff4b4b" />
          <h1>Jesteśmy razem już</h1>
        </div>

        <div className="time-row primary">
          <div className="time-box">
            <span className="num">{time.years}</span>
            <span className="lbl">Lat</span>
          </div>
          <div className="time-box">
            <span className="num">{time.months}</span>
            <span className="lbl">Miesięcy</span>
          </div>
        </div>

        <div className="time-row secondary">
          <div className="time-box">
            <span className="num">{time.days}</span>
            <span className="lbl">Dni</span>
          </div>
          <div className="time-box">
            <span className="num">{time.hours}</span>
            <span className="lbl">Godz</span>
          </div>
          <div className="time-box">
            <span className="num">{time.minutes}</span>
            <span className="lbl">Min</span>
          </div>
          <div className="time-box">
            <span className="num">{time.seconds}</span>
            <span className="lbl">Sek</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}