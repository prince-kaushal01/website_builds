import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

export function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Perfect Wedding Photography',
      excerpt: 'Learn the essential tips and tricks to capture stunning wedding moments that last a lifetime.',
      image: 'https://images.unsplash.com/photo-1600038938045-b5fadbc55083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: 'March 15, 2026',
      author: 'Rahul Sharma',
    },
    {
      id: 2,
      title: 'Choosing the Right Wedding Photographer',
      excerpt: 'A comprehensive guide to selecting the perfect photographer for your special day.',
      image: 'https://images.unsplash.com/photo-1681040259597-8c9f9478e3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: 'March 10, 2026',
      author: 'Priya Mehta',
    },
    {
      id: 3,
      title: 'Destination Wedding Photography Guide',
      excerpt: 'Everything you need to know about planning photography for a destination wedding.',
      image: 'https://images.unsplash.com/photo-1624137924753-2bf0d5f9c469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: 'March 5, 2026',
      author: 'Ankit Verma',
    },
    {
      id: 4,
      title: 'Pre-Wedding Photoshoot Ideas',
      excerpt: 'Creative and romantic ideas for your pre-wedding photoshoot session.',
      image: 'https://images.unsplash.com/photo-1680624528924-7ee5542e4f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: 'February 28, 2026',
      author: 'Neha Singh',
    },
  ];

  return (
    <div className="min-h-screen pt-[72px]">
      <section className="py-16 px-6 text-center" style={{ backgroundColor: 'var(--light)' }}>
        <div className="max-w-[800px] mx-auto">
          <h1
            className="mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', lineHeight: '1.2' }}
          >
            Our Blog
          </h1>
          <p className="text-[var(--gray-text)]" style={{ fontSize: '18px' }}>
            Tips, inspiration, and insights from our wedding photography experts
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[var(--accent-gold)] transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="mb-3 group-hover:text-[var(--accent-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[var(--gray-text)] mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[var(--gray-text)]">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-lg bg-[var(--accent-gold)] text-white">1</button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">2</button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">3</button>
          </div>
        </div>
      </section>
    </div>
  );
}
