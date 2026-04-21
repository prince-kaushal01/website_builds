import { HorizontalCarousel } from '../components/HorizontalCarousel';
import { VideoCard } from '../components/VideoCard';

export function IndianWeddingsPage() {
  const carouselImages = [
    'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  ];

  const videos = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Priya & Raj - Mumbai Wedding',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Ananya & Vikram - Delhi Celebration',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Meera & Arjun - Jaipur Palace',
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Kavya & Rohan - Goa Beach',
    },
  ];

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: 'var(--light)' }}>
        <div className="max-w-[800px] mx-auto">
          <h1
            className="mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', lineHeight: '1.2' }}
          >
            Indian Weddings
          </h1>
          <p className="text-[var(--gray-text)]" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            Celebrating the vibrant colors, traditions, and emotions of Indian wedding ceremonies
          </p>
        </div>
      </section>

      {/* Horizontal Carousel */}
      <section className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="text-center mb-8 px-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '36px' }}
          >
            Gallery Highlights
          </h2>
          <HorizontalCarousel images={carouselImages} />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 md:px-10" style={{ backgroundColor: 'var(--light)' }}>
        <div className="max-w-[1280px] mx-auto">
          <h2
            className="mb-12 text-center"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '36px' }}
          >
            Wedding Films
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
