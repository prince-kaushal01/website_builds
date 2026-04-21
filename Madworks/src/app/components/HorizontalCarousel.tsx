import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HorizontalCarouselProps {
  images: string[];
}

export function HorizontalCarousel({ images }: HorizontalCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const images = track.children;
    if (images.length === 0) return;

    // Calculate total width
    const totalWidth = Array.from(images).reduce((sum, img) => sum + (img as HTMLElement).offsetWidth + 20, 0);

    // Duplicate images for seamless loop
    const clone = track.innerHTML;
    track.innerHTML += clone;

    // Create GSAP animation
    animationRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [images]);

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div className="w-full overflow-hidden py-8" style={{ height: '450px' }}>
      <div
        ref={trackRef}
        className="flex gap-5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            style={{ width: '320px', height: '400px' }}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
