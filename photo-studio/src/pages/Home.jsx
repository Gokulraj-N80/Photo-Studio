import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import About from '../components/About';
import PullQuote from '../components/PullQuote';
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
    // Refresh ScrollTrigger calculations after initial mount and font/asset settlements
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
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
          
          {/* Atmospheric Quote */}
          <PullQuote />
          
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
