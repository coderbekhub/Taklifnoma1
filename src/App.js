import React, { useEffect, useState, useRef } from "react";
import MuteIcon from './img/mute.png';
import SoundIcon from './img/sound.png';
import Sena from './img/sena.jpg';
import wendingImg from './img/wendingImg.jpg';
import wendingHall from './img/wendingHall.png';
import Call from './img/call.png';
import Telegram from './img/telegram.png';
import Instagram from './img/instagram.png';
import CallIcon from './img/callIcon.png';
import WebIcon from './img/web.png';
import Music from './img/Ordinary.ogg';
import Cloud from './img/cloud.mp4';
import MapIcon from './img/map.png'
import CopyIcon from './img/copy.png'

import "./style.scss";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [musicOn, setMusicOn] = useState(false);
  const [step, setStep] = useState(0);

  const audioRef = useRef(null); 

  const bride = "Munisa";
  const groom = "Farhod";
  const initials = `${groom[0]} & ${bride[0]}`;
  const weddingDate = new Date("2026-05-05T18:00:00");

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

  useEffect(() => {
    setTimeout(() => setStep(1), 500);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 5000);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const startMusic = () => {
      if (!audio) return;
      audio.play()
        .then(() => setMusicOn(true))
        .catch(() => {});
      document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setMusicOn(true);
    } else {
      audio.pause();
      setMusicOn(false);
    }
  };

  const copyCard = () => {
    navigator.clipboard.writeText("8600 1234 5678 9012");
    alert("Karta nusxalandi!");
  };

  const Mute = <img className="soundIcons" src={MuteIcon} alt="MuteIcon" />;
  const Sound = <img className="soundIcons" src={SoundIcon} alt="SoundIcon" />;

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={Music} />
      </audio>

      <button className="music-btn" onClick={toggleMusic}>
        {musicOn ? Mute : Sound}
      </button>

      {step !== 3 && (
        <div className="intro">
          <video autoPlay muted loop playsInline className="bg-video">
            <source src={Cloud} type="video/mp4" />
          </video>

          {step >= 1 && <h1 className="logo shine">{initials}</h1>}
          {step >= 2 && <h2 className="fullname fade">{groom} & {bride}</h2>}
        </div>
      )}

      {step === 3 && (
        <section className="taklifnoma">
          <div className="container">
            <div className="taklifnomaCard">

              <h1 className="initials">{initials}</h1>
              <h2 className="names">{groom} & {bride}</h2>

              <div className="photo-frame">
                <img className="photo" src={Sena} alt="" />
              </div>

              <p className="text">
                sizni ushbu unutilmas lahzalarga guvoh bo’lishga taklif qilamiz
              </p>
              <div className="line"></div>

              <div className="countdown">
                {timeLeft.days} kun {timeLeft.hours} soat {timeLeft.minutes} daqiqa
              </div>

              <div className="info">05/05/2026</div>

              <div className="wendingImg">
                <img src={wendingImg} alt="wendingImg" />
              </div>

              <button className="btn" onClick={() => window.open("https://maps.google.com")}>
                Manzilni ko'rish
              </button>
              <a className="mapIcon" href="https://maps.google.com">
                <img src={MapIcon} alt="map" />
              </a>
              <div className="donateCard">
                <h2>To'yona</h2>
                <p>Bizni tabriklab to'yona yubormoqchi bo'lsangiz, quyidagi karta raqamidan foydalanishingiz mumkin</p>
                <div className="donateInfo">
                  <span>Karta egasi</span>
                  <h2>Farhod Mannopov</h2>
                  <div className="contact">
                    <a href="tel:+998901234567">
                      <img src={Call} alt="" /> +998 90 123 45 67
                    </a>
                  </div>
                  <div class="line"></div>
                  <h3>8600 1234 5678 9012</h3>
                  <button className="btn copyBtn" onClick={copyCard}><img src={CopyIcon} alt="CopyIcon" /> Nusxalash</button>
                </div>
              </div>

              <img className="wendingHall" src={wendingHall} alt="" />

              {/* <div className="contact">
                <a href="tel:+998901234567">
                  <img src={Call} alt="" /> +998 90 123 45 67
                </a>
              </div> */}

              <div className="myInfo">
                <a href="https://t.me/inSITE_marketing"><img src={Telegram} alt="telegram" />Telegram</a>
                <a href="https://www.instagram.com/marketing.insite"><img src={Instagram} alt="instagram" />Instagram</a>
                <a href="https://in-site-marketing.vercel.app/"><img src={WebIcon} alt="web site" />Website</a>
                <a href="tel:+998500105610"><img src={CallIcon} alt="call me" />Call</a>
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default App;