import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import PullQuote from '../components/PullQuote';
import Services from '../components/Services';
import Footer from '../components/Footer';
import BookingSection from '../components/BookingSection';
import SEO from '../components/SEO';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      <div className="">
        <Navbar />
        <main>
      <SEO title="Professional Photography Studio in Salem" description="PixelBees Photography is a professional photography studio in Salem, Tamil Nadu, offering wedding, candid, portrait, pre-wedding and event photography." path="/" />
          <Hero />
          <About />
          <PullQuote />
          <Services onBook={(category) => setBookingCategory(category)} />
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
