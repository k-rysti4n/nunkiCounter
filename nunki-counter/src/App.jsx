import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw, CalendarHeart } from 'lucide-react';
import './App.css';

dayjs.extend(duration);

// --- 1. KONFIGURACJA LICZNIKA ---
const START_DATE = '2024-11-10T00:00:00'; 
const PHOTOS = [
  '/photos/1.jpg'
];

// --- 2. KONFIGURACJA OSI CZASU (Dodawaj ile chcesz!) ---
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: '8 Grudnia 2024',
    title: 'Powrót niuńków z pierwszej wizyty w Lublinie',
    desc: 'Niuńki wracają pociągiem z pierwszej wizyty w Lublinie (To moje pierwsze zdjęcie w galerii z niuńką...)',
    photo: '/photos/timeline/4.jpeg' 
  },
  {
    id: 2,
    date: '31 Grudnia 2024 / 1 Stycznia 2025',
    title: 'Nasz pierwszy wspólny sylwester',
    desc: 'Niuńki się wtedy super bawiły i jadły spaghetti Oli o 4 rano',
    photo: '/photos/timeline/1.jpeg' 
  },
  {
    id: 3,
    date: '5 Stycznia 2025',
    title: 'Niuniek pierwszy raz w Gdyni',
    desc: 'Pierwszy wyjazd niuńków do Gdyni, lekki stresik ale było bombowo :)',
    photo: '/photos/timeline/2.jpeg'
  },
  {
    id: 4,
    date: '13 Marca 2025',
    title: 'Pierwszy piknik niuńków',
    desc: 'Super pogoda więc niuńki wpadły na pomysł pikniku',
    photo: '/photos/timeline/3.jpeg'
  },
    {
    id: 6,
    date: '16 Kwietnia 2025',
    title: 'Niuńki po koncercie Kaytranady',
    desc: 'Niuńki sobie pokicały i pośpiewały i następnego dnia miały chill w łazienkach',
    photo: '/photos/timeline/5.jpeg'
  },
  {
    id: 7,
    date: '27 Kwietnia 2025',
    title: 'Niuńki na pierwszej imprezie u Fajfera',
    desc: 'Nic dodać nic ująć',
    photo: '/photos/timeline/6.jpeg'
  },
  {
    id: 8,
    date: '10 Maja 2025',
    title: 'Niuńki na pierwszej wycieczce do Wrocławia',
    desc: 'Pierwszy wyjazd, pierwsza kłódka, dobre bajgle i fajna sesja...',
    photo: '/photos/timeline/7.jpeg'
  },
  {
    id: 9,
    date: '18 Maja 2025',
    title: 'Niuńka odlatuje na silent disco',
    desc: 'Odlatuje jak rakieta...',
    photo: '/photos/timeline/8.jpeg'
  },
  {
    id: 10,
    date: '18 Czerwca 2025',
    title: 'Nuńki na rollercosterze na górce szczęśliwickiej',
    desc: 'Było bez hamowania',
    photo: '/photos/timeline/9.jpeg'
  },
  {
    id: 11,
    date: '7 Lipca 2025',
    title: 'Nuńki po raz pierwszy robią kurczaka z termomixa',
    desc: 'Okazało się że to najlepszy Korean chicken jaki jedli w życiu',
    photo: '/photos/timeline/10.jpeg'
  },
  {
    id: 12,
    date: '12 Lipca 2025',
    title: 'Nuńki po raz pierwszy na elektryków razem',
    desc: 'Deszcz złapał ale nie przeszkadzało to w dobrej zabawie',
    photo: '/photos/timeline/11.jpeg'
  },
  {
    id: 13,
    date: '30 Lipca 2025',
    title: 'Nuńki w Portugalii',
    desc: 'Pierwszy wyjazd za granicę niuńków!',
    photo: '/photos/timeline/12.jpeg'
  },
  {
    id: 14,
    date: '19 Sierpnia 2025',
    title: 'Pierwsze wspólne urodziny niuńki',
    desc: 'Niuniek zapewnił fajny dzień niuńce...',
    photo: '/photos/timeline/13.jpeg'
  },
  {
    id: 15,
    date: '31 Sierpnia 2025',
    title: 'Niuńki wprowadzają się do wspólnego mieszkania',
    desc: 'Dużo roboty było... Ale się udało!',
    photo: '/photos/timeline/14.jpeg'
  },
  {
    id: 16,
    date: '4 Października 2025',
    title: 'Niuńki na pierwszym wspólnym weselu',
    desc: 'Pytanie kiedy ich...',
    photo: '/photos/timeline/15.jpeg'
  },
  {
    id: 17,
    date: '10 Listopada 2025',
    title: 'Pierwsza rocznica niuńków!',
    desc: 'Niuńki wracają po swoich obchodach rocznicy',
    photo: '/photos/timeline/16.jpeg'
  },
  {
    id: 18,
    date: '30 Listopada 2025',
    title: 'Niuńki na wycieczce w Kazimierzu Dolnym',
    desc: 'Niuniek nie był zbytnio przekonany...',
    photo: '/photos/timeline/17.jpeg'
  },
  {
    id: 19,
    date: '5 Grudnia 2025',
    title: 'Niuńki na jarmarku',
    desc: 'Grzane wino i zimne piwo...',
    photo: '/photos/timeline/18.jpeg'
  },
  {
    id: 20,
    date: '31 Grudnia 2025 / 1 Stycznia 2026',
    title: 'Drugi sylwester niuńków',
    desc: 'Niech każdy sylwester już będzie wspólny...',
    photo: '/photos/timeline/19.jpeg'
  },
  {
    id: 21,
    date: '29 Marca 2026',
    title: 'Niuńki w Rzymie',
    desc: 'Pizza, pasta, pasta, pasta, pizza...',
    photo: '/photos/timeline/20.jpeg'
  },
  {
    id: 22,
    date: '4 Lipca 2026',
    title: 'Niuńki na Openerze (pierwszym wspólnym)',
    desc: 'Do białego rana...',
    photo: '/photos/timeline/21.jpeg'
  },
  {
    id: 23,
    date: '18 Lipca 2026',
    title: 'Niuńki w Łodzi',
    desc: 'Niuniek znowu nastawiony...',
    photo: '/photos/timeline/22.jpeg'
  },
  {
    id: 24,
    date: '1 Sierpnia 2026',
    title: 'Niuńki w Krakowie',
    desc: 'Ciepło, poczta i Kazimierz',
    photo: '/photos/timeline/23.jpeg'
  },
];

export default function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [time, setTime] = useState({
    years: 0, months: 0, days: 0, hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    setCurrentPhotoIndex(Math.floor(Math.random() * PHOTOS.length));
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
  };

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
    <div className="app-wrapper">
      {/* TŁO PRZYKLEJONE DO EKRANU (Nie przewija się) */}
      <div className="fixed-background">
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
        <div className="overlay" />
      </div>

      {/* PRZEWIJANA ZAWARTOŚĆ */}
      <div className="scrollable-content">
        
        {/* SEKCJA 1: LICZNIK (Pełny ekran) */}
        <section className="hero-section">
          <button className="change-photo-btn" onClick={nextPhoto} title="Zmień zdjęcie">
            <RefreshCw size={18} />
          </button>

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
            
            <div className="scroll-indicator">
              <p>Przewiń w dół</p>
              <motion.div 
                className="scroll-arrow"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SEKCJA 2: OŚ CZASU (POZIOMA) */}
        <section className="timeline-section">
          <div className="timeline-header">
            <CalendarHeart size={28} color="#ff4b4b" />
            <h2>Nasza Historia</h2>
          </div>

          {/* Kontener przewijany w poziomie */}
          <div className="timeline-container">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div 
                className="timeline-item" 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
              >
                {/* Pozioma linia i kropka */}
                <div className="timeline-track">
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                </div>

                {/* Zawartość karty */}
                <div className="timeline-content glass-card-timeline">
                  <span className="timeline-date">{event.date}</span>
                  <h3>{event.title}</h3>
                  {event.photo && (
                    <img src={event.photo} alt={event.title} className="timeline-image" />
                  )}
                  <p>{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}