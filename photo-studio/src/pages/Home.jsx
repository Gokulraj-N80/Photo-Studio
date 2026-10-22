import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Services from '../components/Services';
import HorizontalGallery from '../components/HorizontalGallery';
import PricingPackages from '../components/PricingPackages';
import BookingSection from '../components/BookingSection';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  useEffect(() => {
    // Refresh ScrollTrigger calculations as assets settle on initial visit
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      <div>
        <Navbar />
        <main>
          <SEO 
            title="Luxury Creative Photography Studio | New York" 
            description="Apex Studio is a premier creative photography studio in New York, NY, offering editorial wedding, portrait, and commercial visual storytelling." 
            path="/" 
          />
          <Hero />
          
          {/* Our Works Section placed directly after Hero as requested */}
          <Gallery />
          
          {/* Studio Story & Animated Statistics */}
          <About />
          
          {/* 3D Fold Interactive Services */}
          <Services onBook={(category) => setBookingCategory(category)} />
          
          {/* Interactive 3D Depth Carousel */}
          <HorizontalGallery />
          
          {/* Investment Packages */}
          <PricingPackages onBook={(category) => setBookingCategory(category)} />
          
          {/* Interactive Booking & Calendar */}
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
          
          {/* Editorial Stories & Journal */}
          <Blog />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
