import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  thumbnail: string;
  videoUrl: string;
  title: string;
  country?: string;
}

export function VideoCard({ thumbnail, videoUrl, title, country }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      />

      {country && (
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
          {country}
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
        <div
          className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-125' : 'scale-100'
          }`}
        >
          <Play size={28} className="text-[var(--dark)] ml-1" fill="var(--dark)" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white">{title}</h3>
      </div>
    </div>
  );
}
