import React, { useEffect, useState } from "react";
import MuteIcon from './img/mute.png'
import SoundIcon from './img/sound.png'
import Sena from './img/sena.jpg'
import wendingImg from './img/wendingImg.jpg'
import wendingHall from './img/wendingHall.png'
import Map from './img/map.png'
import Call from './img/call.png'
import Telegram from './img/telegram.png'
import Instagram from './img/instagram.png'
import CallIcon from './img/callIcon.png'
import WebIcon from './img/web.png'
import Music from './img/Ordinary.ogg'
import "./style.css";
import "./style.scss";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [musicOn, setMusicOn] = useState(true);

  const weddingDate = new Date("2026-05-05T18:00:00");

  const Mute = <img className="soundIcons" src={MuteIcon} alt="mute" />
  const Sound = <img className="soundIcons" src={SoundIcon} alt="sound" />

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const audio = document.getElementById("music");

  const playMusic = () => {
    audio.play();
    document.removeEventListener("click", playMusic);
  };

  document.addEventListener("click", playMusic);
}, []);

  const toggleMusic = () => {
    const audio = document.getElementById("music");
    if (musicOn) {
      audio.pause();
    } else {
      audio.play();
    }
    setMusicOn(!musicOn);
  };

  const copyCard = () => {
    navigator.clipboard.writeText("8600 1234 5678 9012");
    alert("Karta nusxalandi!");
  };

  return (
    <section className="taklifnoma">
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>

      <div className="container">
        <audio id="music" loop>
          <source src={Music} type="audio/mp3"/>
        </audio>

        <button className="music-btn" onClick={toggleMusic}>
          {musicOn ? Mute : Sound}
        </button>

        <h1 className="initials">F & Sh</h1>
        <h2 className="names">Farhod & Shirin</h2>

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
          <img src={wendingImg} alt="wending img"></img>
        </div>

        <div className="maps">
          <button
            className="btn"
            onClick={() => window.open("https://maps.google.com")}
          >
            Lokatsiyani ochish
          </button>
          <a href="https://maps.google.com" target="_blank">
            <img src={Map} alt="map" />
          </a>
        </div>

        <div className="donateText">
          <h2>To'yona</h2>
          <p>Agar bizni tabriklab to'yona jo'natmoqchi bo'lsangiz, quyidagi karta raqamidan foydalanishingiz mumkin!</p>
        </div>
        <div className="donateInfo">
          <span>Karta egasi</span>
          <h2>Farhod Mannopov</h2>
          <span>Karta raqami</span>
          <p>8600 1234 5678 9012</p>
          <button className="btn" onClick={copyCard}>Nusxalash</button>
        </div>

        <img className="wendingHall" src={wendingHall} alt="wendingHall" />

        <div className="contact">
          <h3>Aloqa uchun</h3>
          <a href="tel:+998500105610"><img src={Call} alt="call" /> +998 90 123 45 67</a>
        </div>

        <div className="myInfo">
          <h2>Zakaz berish uchun</h2>
          <div>
            <a href="https://t.me/inSITE_marketing" target="_blank"><img src={Telegram} alt="Telegram" />inSite Marketing</a>
            <a href="https://www.instagram.com/marketing.insite" target="_blank"><img src={Instagram} alt="Instagram" />marketing.insite</a>
            <a className="myInfoA" href="https://in-site-marketing.vercel.app/" target="_blank"><img src={WebIcon} alt="Web icon" />inSiteMarketing.uz</a>
            <a className="myInfoA" href="tel:+998500105610"><img src={CallIcon} alt="Call icon"  target="_blank"/>+998 (50) 010-56-10</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
