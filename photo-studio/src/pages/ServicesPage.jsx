import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import BookingSection from '../components/BookingSection';

const ServicesPage = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <Navbar />
      <div className="flex-grow pt-4 md:pt-8">
        <Services onBook={(category) => setBookingCategory(category)} />
        <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
