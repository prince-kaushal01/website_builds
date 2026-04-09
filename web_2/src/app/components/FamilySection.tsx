import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function FamilySection() {
  const { ref, isInView } = useInView();

  const families = [
    {
      side: "Groom's Family",
      parents: "Mr. Rajesh Kumar & Mrs. Sunita Kumar",
      members: ["Brother: Arjun Kumar", "Sister: Ananya Kumar"],
    },
    {
      side: "Bride's Family",
      parents: "Mr. Vikram Sharma & Mrs. Meera Sharma",
      members: ["Brother: Aditya Sharma", "Sister: Kavya Sharma"],
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-16 bg-gradient-to-br from-pink-50 via-cream-50 to-amber-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <p className='mb-6 uppercase ' style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}>with love</p>
          <h2 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: 'Great Vibes, cursive', color: '#B29431' }}>
            The Families
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {families.map((family, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -30 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="bg-[#F5EFDE] rounded-2xl p-8 shadow-lg border border-pink-100"
            >
              <h3 className="text-3xl mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#ec4899' }}>
                {family.side}
              </h3>
              <div className="space-y-4">
                <p className="text-xl text-center" style={{ fontFamily: 'Cormorant, serif', fontWeight: 600 }}>
                  {family.parents}
                </p>
                <div className="pt-4 border-t border-pink-200 space-y-2">
                  {family.members.map((member, idx) => (
                    <p key={idx} className="text-lg text-gray-700 text-center" style={{ fontFamily: 'Cormorant, serif' }}>
                      {member}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
