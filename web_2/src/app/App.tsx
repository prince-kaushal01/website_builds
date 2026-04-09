import { useState } from 'react';
import { IntroAnimation } from './components/IntroAnimation';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { ScratchCard } from './components/ScratchCard';
import { EventSection } from './components/EventSection';
import { FamilySection } from './components/FamilySection';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import mehndi from "./assets/mehndi.jpeg";
import sangeet from "./assets/sangeet.jpeg";
import wedding from "./assets/wedding.png";
import reception from "./assets/reception.jpeg";
import cocktail from "./assets/cocktail.jpeg";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <>
          <MusicPlayer />
          
          <main className="overflow-x-hidden">
            <HeroSection />
            
            <ScratchCard />
            
            {/* Mehndi */}
            <EventSection
              title="Mehendi"
              subtitle="A playful morning of mehendi and cultural festivities"
              day="Tues"
              date="Dec 22 2026"
              time="4:00 PM onwards"
              venue="Uttar Garden Lawn"
              dressCode="Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya or Kutchi Mirrorwork"
              backgroundImage={mehndi}
              titleColor="#f97316"
              subtitleColor="#775A00"
              textColor="text-gray-800"
              isDark={false}
              variant="mehndi"
            />
            
            {/* Sangeet */}
            <EventSection
              title="Sangeet"
              subtitle="A playful night of sangeet and cultural festivities with a touch of Bollywood glamour"
              day="Wed"
              date="December 23, 2026"
              time="7:00 PM onwards"
              venue="Uttar Garden Lawn"
              dressCode="Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya or Kutchi Mirrorwork"
              backgroundImage={sangeet}
              titleColor="white"
              subtitleColor="white"
              textColor="text-gray-800"
              isDark={true}
            />
            
            {/* Wedding */}
            <EventSection
              title="Wedding"
              subtitle="A sacred union of love and tradition Where two hearts become one"
              day="Thurs"
              date="December 25, 2026"
              time="10:00 AM"
              venue="Main Mandap, The Grand Palace"
              dressCode="Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya or Kutchi Mirrorwork"
              backgroundImage={wedding}
              titleColor="#f97316"
              subtitleColor="#536D3B"
              textColor="text-gray-800"
              isDark={false}
            />
            
            {/* Reception */}
            <EventSection
              title="Reception"
              subtitle="An evening of elegance and celebration Celebrating love with joy"
              day="Fri"
              date="December 25, 2026"
              time="7:00 PM onwards"
              venue="Crystal Hall, The Grand Palace"
              dressCode="Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya or Kutchi Mirrorwork"
              backgroundImage={reception}
              titleColor="white"
              subtitleColor="white"
              textColor="text-gray-800"
              isDark={true}
            />
            
            {/* Cocktail */}
            <EventSection
              title="Cocktail"
              subtitle="A playful morning of mehendi and cultural festivities"
              date="December 24, 2026"
              time="8:00 PM onwards"
              venue="Rooftop Lounge, The Grand Palace"
              dressCode="Embracing the charm of Gujarati heritage Bandhani, Patola, Leheriya or Kutchi Mirrorwork"
              backgroundImage={cocktail}
              titleColor="#c084fc"
              subtitleColor="white"
              textColor="text-gray-800"
              isDark={true}
            />
            
            <FamilySection />
            
            <VenueSection />
            
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
