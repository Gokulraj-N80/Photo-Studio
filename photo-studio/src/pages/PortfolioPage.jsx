import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import HorizontalGallery from '../components/HorizontalGallery';
import SEO from '../components/SEO';

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <SEO title="Photography Portfolio | Apex Studio" description="View the creative photography portfolio of Apex Studio, featuring our best wedding, editorial, and portrait captures." path="/portfolio" />
      <Navbar />
      <div className="flex-grow pt-24 md:pt-32">
        <Gallery />
        <HorizontalGallery />
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
