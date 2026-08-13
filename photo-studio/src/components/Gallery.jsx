import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const filters = ["DISCOVER", "WEDDINGS", "PORTRAITS", "EVENTS", "PRE-WEDDING", "CANDID", "FASHION"];

import PixelTransition from './PixelTransition';

const works = [
  { src: "/images/wedding/wedding-1.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-10.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-100.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-101.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-102.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-103.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-104.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-105.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-106.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-107.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-108.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-109.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-11.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-110.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-111.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-112.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-113.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-114.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-115.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-116.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-117.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-118.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-119.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-12.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-120.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-121.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-122.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-123.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-124.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-125.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-126.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-127.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-128.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-129.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-13.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-130.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-131.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-132.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-133.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-134.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-14.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-15.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-16.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-17.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-18.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-19.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-2.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-20.webp", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-21.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-22.webp", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-23.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-24.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-25.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-26.webp", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-27.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-28.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-29.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-3.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-30.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-31.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-32.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-33.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-34.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-4.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-5.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-6.jpg", category: "WEDDINGS", title: "The Union", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/wedding/wedding-7.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-8.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/wedding/wedding-9.jpg", category: "PRE-WEDDING", title: "A New Beginning", subtitle: "Before the forever begins" },
  { src: "/images/portraits/portraits-1.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-10.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-100.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-101.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-102.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-103.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-104.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-105.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-106.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-107.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-108.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-109.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-11.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-12.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-2.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-3.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-4.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-5.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-6.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/portraits/portraits-7.webp", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-8.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-9.jpg", category: "PORTRAITS", title: "Stunning Portraits", subtitle: "Light carved from within" },
  { src: "/images/kids/kids-1.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-100.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-101.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-102.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-103.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-104.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-105.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-2.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-3.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-4.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-5.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/kids/kids-6.jpg", category: "CANDID", title: "Little Joy", subtitle: "The purest joy" },
  { src: "/images/events/events-1.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/events/events-100.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/events/events-101.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/events/events-2.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/events/events-3.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/events/events-4.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/events/events-5.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/events/events-6.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-1.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/festivals/festivals-100.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/festivals/festivals-101.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/festivals/festivals-102.webp", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-103.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-104.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-105.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-106.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-107.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/festivals/festivals-2.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-3.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/festivals/festivals-4.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/food/food-1.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/food/food-100.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/food/food-101.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/food/food-102.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/food/food-2.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/food/food-3.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-1", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-10.webp", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-100", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-101.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-102.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-103.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-104.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-105.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-106.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-107.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-108.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-109.webp", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-11.webp", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-110.webp", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-111.webp", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-112.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-113.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-114.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-12.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-13.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-14.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-2.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-3.jpg", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-4.jpg", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
  { src: "/images/others/others-5.jpg", category: "FASHION", title: "Vogue Styles", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/others/others-6.webp", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-7.webp", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-8.webp", category: "EVENTS", title: "Captured Moment", subtitle: "Every detail remembered" },
  { src: "/images/others/others-9.webp", category: "CANDID", title: "Captured Moment", subtitle: "Real moments, real feelings" },
];





const OurWorks = () => {
  const [activeFilter, setActiveFilter] = useState("DISCOVER");
  const sectionRef = useRef(null);

  const filteredWorks = activeFilter === "DISCOVER" ? [...works].sort(() => 0.5 - Math.random()).slice(0, 20) : works.filter(w => w.category === activeFilter);

  const handleFilter = (f) => {
    if (f === activeFilter) return;
    gsap.to('.work-card', {
      scale: 0.96, opacity: 0, duration: 0.25,
      onComplete: () => setActiveFilter(f)
    });
  };

  useEffect(() => {
    // This context runs only once for static elements (Header, Filters)
    const ctx = gsap.context(() => {
      /* Section header reveal */
      gsap.fromTo('.works-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      /* Filters slide in */
      gsap.fromTo('.works-filter',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.filters-row', start: 'top 85%' } }
      );
    }, sectionRef);

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [activeFilter]);

  useEffect(() => {
    // This context runs every time the filter changes (or initial mount)
    const ctx = gsap.context(() => {
      /* Cards Extraordinary Scrub Reveal */
      gsap.utils.toArray('.work-card').forEach((card, idx) => {
        const rotDir = idx % 2 === 0 ? -12 : 12;
        
        gsap.fromTo(card,
          { 
            y: 200, 
            scale: 0.5, 
            opacity: 0, 
            rotationZ: rotDir,
            filter: 'blur(20px)' 
          },
          { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            rotationZ: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      /* Images are now Masonry, removed Parallax wrapper to avoid cropping */
    }, sectionRef);

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [activeFilter]);

  return (
    <section id="gallery" ref={sectionRef} className="py-12 md:py-16 px-6 w-full bg-[#12100E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="works-header flex flex-col items-center text-center justify-center mb-14 gap-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">OUR WORKS</h2>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
            Stories We've Had the Honor to Tell.
          </h3>
          <p className="text-[#FFFDF8]/50 text-sm font-light max-w-md leading-relaxed text-center hidden md:block">
            Every image is a chapter. Every session, a complete story.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filters-row flex overflow-x-auto snap-x md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-8 md:mb-12 pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`works-filter flex-shrink-0 snap-center whitespace-nowrap text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase px-4 md:px-5 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#C5A059] text-[#12100E] border-[#C5A059]'
                  : 'bg-transparent text-[#FFFDF8]/50 border-white/10 hover:text-[#FFFDF8] hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Spotlight Section with Pixel Transition */}
        {activeFilter === "DISCOVER" && (
          <div className="mb-16 w-full flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-[#12100E] flex items-center justify-center">
                    <img
                      src="/images/featured-story.jpg"
                      alt="Featured Story"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                }
                secondContent={
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1714] border border-[#C5A059]/20 p-6 text-center">
                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.3em] mb-4">Behind the Lens</p>
                    <p className="font-serif text-2xl md:text-3xl text-[#FFFDF8] mb-3">Pure Joy</p>
                    <p className="text-xs text-[#FFFDF8]/60 max-w-xs">We captured the raw emotion of their special day. Real smiles, unscripted joy, and the priceless reactions of best friends.</p>
                  </div>
                }
                gridSize={12}
                pixelColor='#1a1714'
                animationStepDuration={0.4}
                className="w-full max-w-[550px] h-auto border-2 border-[#C5A059] shadow-2xl rounded-none md:rounded-lg"
                aspectRatio="62%"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-8">
              <h4 className="font-serif text-3xl font-bold text-[#FFFDF8] mb-4">Featured Story: The Bridal Party</h4>
              <p className="text-sm text-[#FFFDF8]/70 leading-relaxed max-w-md mx-auto md:mx-0">
                Hover over (or tap) the image to reveal the story behind this unscripted moment. The best photos aren't posed; they are the genuine reactions, the inside jokes, and the shared laughter between friends.
              </p>
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredWorks.map((work, idx) => (
            <div
              key={`${work.title}-${activeFilter}-${idx}`}
              className={`work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item`}
            >
              {/* Uncropped Image */}
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-auto block transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
                style={{ willChange: 'transform' }}
              />

              {/* Gradient overlay always-on */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/10 to-transparent" />

              {/* Bottom text — visible always, enhanced on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-6 md:w-8 h-[1.5px] bg-[#C5A059] mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <span className="text-[8px] md:text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.3em] block mb-1">
                  {work.category}
                </span>
                <h4 className="text-[#FFFDF8] font-serif text-lg md:text-2xl font-bold">{work.title}</h4>
                <p className="text-[#FFFDF8]/60 text-[10px] md:text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {work.subtitle}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C5A059]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/#booking"
            className="inline-flex items-center gap-3 bg-transparent text-[#FFFDF8] hover:text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#FFFDF8]/20 hover:border-[#C5A059] px-10 py-4 rounded-full transition-all duration-300"
          >
            Book Your Session <span className="text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OurWorks;
