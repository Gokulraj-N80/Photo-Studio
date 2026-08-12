import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <Navbar />
      <div className="flex-grow pt-4 md:pt-8">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
