import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export function BlogDetailPage() {
  const { id } = useParams();

  const blogPost = {
    id: id,
    title: '10 Tips for Perfect Wedding Photography',
    image: 'https://images.unsplash.com/photo-1600038938045-b5fadbc55083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    date: 'March 15, 2026',
    author: 'Rahul Sharma',
    content: `
      <p>Wedding photography is an art that requires skill, patience, and a keen eye for detail. After photographing hundreds of weddings, we've compiled our top tips to help you capture those magical moments.</p>

      <h3>1. Scout the Venue Beforehand</h3>
      <p>Always visit the venue before the wedding day. This allows you to identify the best spots for photography, understand the lighting conditions, and plan your shots accordingly.</p>

      <h3>2. Create a Shot List</h3>
      <p>Work with the couple to create a comprehensive shot list. This ensures you don't miss any important moments or family combinations they want captured.</p>

      <h3>3. Capture Candid Moments</h3>
      <p>While posed shots are important, the most memorable photos are often the candid ones. Keep your camera ready to capture spontaneous laughter, tears of joy, and genuine interactions.</p>

      <h3>4. Use Natural Light Whenever Possible</h3>
      <p>Natural light creates the most flattering and romantic images. Position your subjects near windows or outdoors during golden hour for stunning results.</p>

      <h3>5. Focus on Details</h3>
      <p>Don't forget to photograph the small details: the rings, invitations, flowers, and decor. These shots help tell the complete story of the day.</p>

      <h3>6. Stay Calm Under Pressure</h3>
      <p>Wedding days can be hectic. Maintain your composure and professionalism, even when things don't go as planned. Your calm demeanor will help keep everyone relaxed.</p>

      <h3>7. Work with the Videographer</h3>
      <p>Coordinate with the videographer to ensure you're both capturing the key moments without getting in each other's way.</p>

      <h3>8. Be Prepared for Any Weather</h3>
      <p>Have backup plans for outdoor shoots. Bring equipment to handle rain, extreme sun, or other weather conditions.</p>

      <h3>9. Engage with Your Subjects</h3>
      <p>Make your subjects feel comfortable by engaging with them. A relaxed couple will produce more natural and beautiful photographs.</p>

      <h3>10. Edit Thoughtfully</h3>
      <p>Post-processing is crucial. Develop a consistent editing style that enhances the images while maintaining their natural beauty.</p>

      <p>Remember, every wedding is unique. Use these tips as a foundation, but always be ready to adapt to the specific circumstances of each celebration.</p>
    `,
  };

  return (
    <div className="min-h-screen pt-[72px]">
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-[800px] mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[var(--accent-gold)] hover:text-[#B39859] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <h1
            className="mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', lineHeight: '1.3' }}
          >
            {blogPost.title}
          </h1>

          <div className="flex items-center gap-4 text-[var(--gray-text)] mb-8">
            <div className="flex items-center gap-1">
              <Calendar size={18} />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={18} />
              <span>{blogPost.author}</span>
            </div>
          </div>

          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full rounded-2xl mb-10"
          />

          <div
            className="prose prose-lg max-w-none"
            style={{
              color: 'var(--gray-text)',
              fontSize: '17px',
              lineHeight: '1.8',
            }}
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-[var(--gray-text)] italic">
              Want to learn more about wedding photography? Follow us on social media for more tips and
              inspiration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
