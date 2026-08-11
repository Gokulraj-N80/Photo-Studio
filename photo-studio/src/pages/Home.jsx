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
import BookingSection from '../components/BookingSection';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      <div className="">
        <Navbar />
        <main>
          <Hero />
          <About />
          <PullQuote />
          <Services onBook={(category) => setBookingCategory(category)} />
          <Gallery />
          <HorizontalGallery />
          <Blog />
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
