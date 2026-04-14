import { useEffect, useRef } from "react";
import music from "../assets/weddingsong.mp3";

export function MusicAutoPlay() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.6; // optional
        audioRef.current.play().catch(() => {});
      }
    };

    // Try autoplay immediately
    playAudio();

    // Fallback: play on first user interaction
    window.addEventListener("click", playAudio, { once: true });
    window.addEventListener("scroll", playAudio, { once: true });

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("scroll", playAudio);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={music} type="audio/mpeg" />
    </audio>
  );
}
