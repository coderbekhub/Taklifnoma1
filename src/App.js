import React, { useEffect, useState } from "react";
import MuteIcon from './img/mute.png';
import SoundIcon from './img/sound.png';
import Sena from './img/sena.jpg';
import wendingImg from './img/wendingImg.jpg';
import wendingHall from './img/wendingHall.png';
import Map from './img/map.png';
import Call from './img/call.png';
import Telegram from './img/telegram.png';
import Instagram from './img/instagram.png';
import CallIcon from './img/callIcon.png';
import WebIcon from './img/web.png';
import Music from './img/Ordinary.ogg';

import "./style.scss";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [musicOn, setMusicOn] = useState(false);
  const [step, setStep] = useState(0);

  const bride = "Shirin";
  const groom = "Farhod";
  const initials = `${groom[0]} & ${bride[0]}`;

  const weddingDate = new Date("2026-05-05T18:00:00");

  // ⏳ countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🎬 intro + music
  useEffect(() => {
    const start = () => {
      const audio = document.getElementById("music");
      if (audio) {
        audio.play().then(() => setMusicOn(true)).catch(() => {});
      }

      setTimeout(() => setStep(1), 1000);
      setTimeout(() => setStep(2), 3000);
      setTimeout(() => setStep(3), 6000);

      document.removeEventListener("click", start);
    };

    document.addEventListener("click", start);
  }, []);

  // 🔊 toggle music
  const toggleMusic = () => {
    const audio = document.getElementById("music");
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setMusicOn(true);
    } else {
      audio.pause();
      setMusicOn(false);
    }
  };

  // 💳 copy
  const copyCard = () => {
    navigator.clipboard.writeText("8600 1234 5678 9012");
    alert("Karta nusxalandi!");
  };

  const Mute = <img className="soundIcons" src={MuteIcon} alt="mute" />;
  const Sound = <img className="soundIcons" src={SoundIcon} alt="sound" />;

  // 🎬 INTRO SCREEN
  if (step !== 3) {
    return (
      <div className="intro">

        <video autoPlay muted loop className="bg-video">
          <source src="https://cdn.coverr.co/videos/coverr-clouds-2765/1080p.mp4" type="video/mp4" />
        </video>

        <audio id="music" loop>
          <source src={Music} />
        </audio>

        {step >= 1 && <h1 className="logo shine">{initials}</h1>}
        {step >= 2 && <h2 className="fullname fade">{groom} & {bride}</h2>}

      </div>
    );
  }

  // 🚀 MAIN SITE
  return (
    <section className="taklifnoma">
      <audio id="music" loop>
        <source src={Music} />
      </audio>

      <button className="music-btn" onClick={toggleMusic}>
        {musicOn ? Mute : Sound}
      </button>

      <div className="container">
        <div className="taklifnomaCard">

          <h1 className="initials">{initials}</h1>
          <h2 className="names">{groom} & {bride}</h2>

          <div className="photo-frame">
            <img className="photo" src={Sena} alt="couple" />
          </div>

          <p className="text">
            sizni ushbu unutilmas lahzalarga guvoh bo’lishga taklif qilamiz
          </p>

          <div className="countdown">
            {timeLeft.days} kun {timeLeft.hours} soat {timeLeft.minutes} daqiqa
          </div>

          <div className="info">05/05/2026</div>

          <div className="wendingImg">
            <img src={wendingImg} alt="" />
          </div>

          <button className="btn" onClick={() => window.open("https://maps.google.com")}>
            Lokatsiya
          </button>

          <div className="donateInfo">
            <h2>To'yona</h2>
            <p>8600 1234 5678 9012</p>
            <button className="btn" onClick={copyCard}>Nusxalash</button>
          </div>

          <img className="wendingHall" src={wendingHall} alt="" />

          <div className="contact">
            <a href="tel:+998901234567">
              <img src={Call} alt="" /> +998 90 123 45 67
            </a>
          </div>

          <div className="myInfo">
            <a href="#"><img src={Telegram} alt="" />Telegram</a>
            <a href="#"><img src={Instagram} alt="" />Instagram</a>
            <a href="#"><img src={WebIcon} alt="" />Website</a>
            <a href="tel:+998500105610"><img src={CallIcon} alt="" />Call</a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default App;