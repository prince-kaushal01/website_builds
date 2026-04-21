import { VideoCard } from '../components/VideoCard';
import { Award, Camera, Heart, Users } from 'lucide-react';

export function InternationalPage() {
  const videos = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Sarah & James - Santorini',
      country: 'Greece',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1617725145063-56958eadf557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Emma & Lucas - Paris',
      country: 'France',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1608326670856-e3b41eecb106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Olivia & Noah - Tuscany',
      country: 'Italy',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1562826772-be179f321470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Mia & Ethan - Maldives',
      country: 'Maldives',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Sophia & Liam - Bali',
      country: 'Indonesia',
    },
    {
      thumbnail: 'https://images.unsplash.com/flagged/photo-1566150217714-ebfea356f885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Isabella & Mason - Iceland',
      country: 'Iceland',
    },
  ];

  const features = [
    {
      icon: Camera,
      title: 'Cinematic Quality',
      description: 'Professional-grade equipment and techniques for stunning visuals',
    },
    {
      icon: Heart,
      title: 'Authentic Moments',
      description: 'Capturing genuine emotions and candid interactions',
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Skilled photographers who understand cultural nuances',
    },
    {
      icon: Award,
      title: 'Award-Winning',
      description: 'Recognized excellence in destination wedding photography',
    },
  ];

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Destination wedding"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <h1
            className="mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', lineHeight: '1.2' }}
          >
            International Weddings
          </h1>
          <p className="text-xl text-white/90">Destination weddings across the globe</p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-20 px-6 md:px-10" style={{ backgroundColor: 'var(--light)' }}>
        <div className="max-w-[1280px] mx-auto">
          <h2
            className="mb-12 text-center"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '36px' }}
          >
            Destination Wedding Films
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <h2
            className="mb-12 text-center"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '36px' }}
          >
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200 hover:border-[var(--accent-gold)] transition-colors"
              >
                <feature.icon size={32} className="text-[var(--accent-gold)] mb-4" />
                <h3 className="mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>
                  {feature.title}
                </h3>
                <p className="text-[var(--gray-text)] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
