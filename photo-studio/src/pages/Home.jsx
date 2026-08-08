import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import PullQuote from '../components/PullQuote';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import HorizontalGallery from '../components/HorizontalGallery';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-base selection:bg-accent selection:text-white">
      <Preloader onComplete={() => setLoading(false)} />
      
      {/* Hide overflow during preloader, but keep it in DOM so ScrollTrigger can measure */}
      <div className={`${loading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <PullQuote />
          <div className="bg-surface">
            <Services />
          </div>
          <div className="bg-base border-t border-secondary/10">
            <Gallery />
          </div>
          <div className="bg-ink">
            <HorizontalGallery />
          </div>
          <div className="bg-surface">
            <Blog />
          </div>
          <div className="bg-base border-t border-secondary/10">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
