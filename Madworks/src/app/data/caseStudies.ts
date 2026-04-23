export interface CaseStat {
  value: string;
  label: string;
}

export interface CaseTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  category: string;
  categorySlug: string;
  location: string;
  year: string;
  duration: string;
  tagline: string;
  description: string;
  coverImage: string;
  heroImage: string;
  gallery: string[];
  services: string[];
  brief: string;
  approach: string;
  stats: CaseStat[];
  testimonial: CaseTestimonial;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: 'Mehta × Singh Wedding',
    category: 'Wedding Film',
    categorySlug: 'weddings',
    location: 'Udaipur, Rajasthan',
    year: '2025',
    duration: '4 Days',
    tagline: 'A royal four-day celebration preserved in cinematic gold.',
    description:
      'Four days, three ceremonies, one palace — and one film that brought it all together into a 22-minute cinematic masterpiece.',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Cinematography', 'Photography', 'Drone Footage', 'Same-Day Edit'],
    brief:
      "The families wanted more than documentation — they wanted a film worthy of their heritage. Three ceremonies across four days, 800 guests, and a colour palette shifting from saffron to ivory to deep red demanded a storytelling approach that was both comprehensive and emotionally precise.",
    approach:
      "We deployed a 6-camera setup across all ceremonies with two drones for aerial sequences at golden hour. A dedicated photographer embedded with the family for candid coverage. The final film was structured in three acts — arrival, union, celebration — with a commissioned score composed specifically for the project.",
    stats: [
      { value: '4', label: 'Days of Coverage' },
      { value: '800+', label: 'Guests' },
      { value: '22 min', label: 'Feature Film' },
      { value: '6', label: 'Cameras' },
    ],
    testimonial: {
      quote:
        "We watched it together for the first time and cried within the opening 90 seconds. They captured everything — the chaos, the love, the quiet moments we didn't know anyone was watching.",
      author: 'Riya Mehta',
      role: 'Bride',
    },
    featured: true,
  },
  {
    id: 2,
    client: 'Aria Resort & Spa',
    category: 'Brand Campaign',
    categorySlug: 'brand-ads',
    location: 'Maldives',
    year: '2025',
    duration: '6 Days',
    tagline: 'Redefining luxury — one frame at a time.',
    description:
      'A brand campaign that repositioned a world-class resort at the forefront of experiential luxury.',
    coverImage:
      'https://images.unsplash.com/photo-1439130490301-25e322d88054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1439130490301-25e322d88054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1582610116397-edb72ad0ce5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Brand Filmmaking', 'Photography', 'Drone', 'Social Cut-downs'],
    brief:
      "Aria had a world-class property but its visual identity didn't reflect the experience. The brief: create a campaign that communicated aspirational luxury without feeling inaccessible — something that belonged in Condé Nast Traveller.",
    approach:
      "We spent 6 days capturing the resort across every light condition — pre-dawn, golden hour, and the deep indigo of twilight. We collaborated with a lifestyle model and the resort's culinary team to build scenes that felt lived-in rather than staged. The hero film ran at 3 minutes with 30 and 15-second social versions.",
    stats: [
      { value: '6', label: 'Shoot Days' },
      { value: '3 min', label: 'Hero Film' },
      { value: '14', label: 'Social Cuts' },
      { value: '4×', label: 'Booking Growth' },
    ],
    testimonial: {
      quote:
        'The campaign changed how people perceived us. Within 60 days of launch, we saw a 400% increase in direct inquiry — the imagery elevated every aspect of our brand.',
      author: 'Nadia Al-Rashid',
      role: 'Marketing Director, Aria Resorts',
    },
  },
  {
    id: 3,
    client: 'De Souza Bali Elopement',
    category: 'International Wedding',
    categorySlug: 'international',
    location: 'Ubud, Bali',
    year: '2024',
    duration: '3 Days',
    tagline: 'Two souls. One island. An elopement worth the flight.',
    description:
      'An intimate Bali elopement where the jungle became the ceremony and the film became a love letter.',
    coverImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1559628129-67cf63b72248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1550159930-40066082a4fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1610633389918-7d5b62977dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Destination Photography', 'Cinematic Film', 'Drone', 'Highlight Reel'],
    brief:
      "The couple had 12 guests and a vision: escape the noise, marry in Bali's jungle, and come home with something real. No ballroom, no 500-person guest list — just the two of them, the elements, and an honest film.",
    approach:
      'We scouted three locations across Ubud, selecting a private jungle cliff for the ceremony and a rice terrace trail for the post-ceremony walk. We shot with a single camera and natural light only — no artificial fill. The 8-minute film was edited to a single piece of music chosen by the couple.',
    stats: [
      { value: '12', label: 'Guests' },
      { value: '3', label: 'Locations' },
      { value: '8 min', label: 'Feature Film' },
      { value: '400+', label: 'Photographs' },
    ],
    testimonial: {
      quote:
        "We didn't want a wedding video. We wanted a film. What Madworks gave us was something we'll show our grandchildren.",
      author: 'Isabelle De Souza',
      role: 'Bride',
    },
  },
  {
    id: 4,
    client: 'Zara Bridal Collection',
    category: 'Fashion Ad',
    categorySlug: 'brand-ads',
    location: 'Mumbai',
    year: '2025',
    duration: '2 Days',
    tagline: 'The bride as the protagonist. The garment as her armour.',
    description:
      'A fashion editorial campaign for a heritage bridal couture label — cinematic, editorial, unforgettable.',
    coverImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1542060748-10c28b62716f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Fashion Photography', 'Brand Film', 'Lookbook', 'Reels'],
    brief:
      "The label wanted to launch their 2025 bridal collection with a visual campaign that felt elevated above typical Indian bridal photography — closer to Vogue Paris than a catalogue shoot.",
    approach:
      'We art-directed a two-day shoot at a heritage haveli in Versova. Hard shadow, rich textile close-ups, and slow-motion sequences gave the campaign its signature look. The brand film ran 60 seconds with a voiceover scripted around the philosophy of the modern Indian bride.',
    stats: [
      { value: '2', label: 'Shoot Days' },
      { value: '60 sec', label: 'Brand Film' },
      { value: '80+', label: 'Campaign Stills' },
      { value: '2.1M', label: 'Campaign Reach' },
    ],
    testimonial: {
      quote:
        'Every shot felt intentional. Our collection sold out within three weeks of launch — we attribute a huge part of that to the campaign.',
      author: 'Priya Chopra',
      role: 'Creative Director, Zara Bridal',
    },
  },
  {
    id: 5,
    client: 'The Patel Grand Wedding',
    category: 'Wedding Film',
    categorySlug: 'weddings',
    location: 'Jaipur, Rajasthan',
    year: '2024',
    duration: '5 Days',
    tagline: 'A thousand stories. One film.',
    description:
      'The largest project in our portfolio — a 1,200-guest wedding across five days and six venues.',
    coverImage:
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1624137924753-2bf0d5f9c469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Multi-Camera Cinematography', 'Aerial Photography', '4K Editing', 'Live Streaming'],
    brief:
      "Coordinating a creative team across 6 venues, 5 days, and 1,200 guests while maintaining a consistent visual language was the challenge. The family's ask was simple: 'Make it feel like one story, not five separate events.'",
    approach:
      'We assigned lead cinematographers to each venue with a shared shot list and colour brief. All footage was graded with the same LUT in post. The 35-minute feature film was accompanied by a 5-minute highlights reel and a full gallery of 3,000+ culled images.',
    stats: [
      { value: '5', label: 'Days' },
      { value: '1,200+', label: 'Guests' },
      { value: '35 min', label: 'Feature Film' },
      { value: '3,000+', label: 'Photographs' },
    ],
    testimonial: {
      quote:
        'We had 14 family members review the film before we sent feedback. Every single one of them cried. That says everything.',
      author: 'Kiran Patel',
      role: 'Father of the Groom',
    },
  },
  {
    id: 6,
    client: 'Vista Realty',
    category: 'Real Estate',
    categorySlug: 'real-estate',
    location: 'New Delhi',
    year: '2025',
    duration: '3 Days',
    tagline: 'Architecture deserves more than a floor plan.',
    description:
      'A premium residential property campaign that sold units before the building was even complete.',
    coverImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    gallery: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1600607687939-ce8a6d349947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    ],
    services: ['Architectural Photography', 'Property Film', 'Drone Survey', 'VR Walkthrough'],
    brief:
      "Vista needed their luxury residential development to sell 40% of units before construction was complete. The visual content had to communicate not just architecture, but lifestyle — a future the buyer could already imagine living.",
    approach:
      'We produced a cinematic property film at dusk with lifestyle elements — a family scene, a rooftop gathering — anchoring the architecture in emotion rather than specification. Drone footage was captured at blue hour. The film drove a landing page that converted 43% of visitors into direct inquiries.',
    stats: [
      { value: '3', label: 'Shoot Days' },
      { value: '43%', label: 'Conversion Rate' },
      { value: '₹90Cr', label: 'Pre-Sales Value' },
      { value: '18', label: 'Drone Sequences' },
    ],
    testimonial: {
      quote:
        "The film didn't just show the property — it sold a way of life. We moved inventory we weren't expecting to move for another year.",
      author: 'Aakash Jain',
      role: 'CEO, Vista Realty',
    },
  },
];
