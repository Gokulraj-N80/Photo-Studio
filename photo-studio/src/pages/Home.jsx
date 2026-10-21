import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import PricingPackages from '../components/PricingPackages';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

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
          {/* Our Works Section placed directly after Hero */}
          <Gallery />
          <PricingPackages onBook={(category) => setBookingCategory(category)} />
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
