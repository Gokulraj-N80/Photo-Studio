import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const filters = ["ALL", "WEDDINGS", "PORTRAITS", "EVENTS", "PRE-WEDDING", "CANDID", "FASHION"];

const works = [
  { src: "/images/wedding/wedding-28.jpg", category: "WEDDINGS", title: "The Vows", subtitle: "Sacred moments, eternal bonds" },
  { src: "/images/portraits/portraits-8.jpg", category: "PORTRAITS", title: "Luminous", subtitle: "Light carved from within" },
  { src: "/images/portraits/portraits-12.jpg", category: "FASHION", title: "Editorial", subtitle: "Bold. Expressive. Fearless." },
  { src: "/images/wedding/wedding-30.jpg", category: "PRE-WEDDING", title: "Love Story", subtitle: "Before the forever begins" },
  { src: "/images/events/events-6.jpg", category: "EVENTS", title: "Celebration", subtitle: "Every detail remembered" },
  { src: "/images/kids/kids-4.jpg", category: "CANDID", title: "Unscripted Joy", subtitle: "Real moments, real feelings" },
  { src: "/images/wedding/wedding-2.jpg", category: "WEDDINGS", title: "First Look", subtitle: "The breath before forever" },
  { src: "/images/portraits/portraits-11.jpg", category: "PORTRAITS", title: "Solitude", subtitle: "A quiet conversation with light" },
  { src: "/images/wedding/wedding-27.jpg", category: "WEDDINGS", title: "Tradition", subtitle: "Rooted in love and custom" },
  { src: "/images/wedding/wedding-24.jpg", category: "PRE-WEDDING", title: "Elegance", subtitle: "A vision of grace" },
  { src: "/images/kids/kids-1.jpg", category: "CANDID", title: "Innocence", subtitle: "The purest joy" },
  { src: "/images/kids/kids-5.jpg", category: "CANDID", title: "Playful", subtitle: "Lost in the moment" },
  { src: "/images/festivals/festivals-1.jpg", category: "EVENTS", title: "Festive Joy", subtitle: "Lights, love, laughter" },
  { src: "/images/portraits/portraits-5.jpg", category: "FASHION", title: "Vogue", subtitle: "Striking and fearless" },
  { src: "/images/events/events-5.jpg", category: "EVENTS", title: "The Crowd", subtitle: "Energy of the celebration" },
  { src: "/images/wedding/wedding-23.jpg", category: "WEDDINGS", title: "New Beginnings", subtitle: "The start of a family" },
  { src: "/images/wedding/wedding-34.jpg", category: "WEDDINGS", title: "Expression", subtitle: "Art and passion" },
  { src: "/images/portraits/portraits-6.webp", category: "PORTRAITS", title: "Glow", subtitle: "Radiant beauty" },
  { src: "/images/others/others-13.jpg", category: "PORTRAITS", title: "Imagination", subtitle: "Creating reality" },
  { src: "/images/wedding/wedding-25.webp", category: "WEDDINGS", title: "Joy", subtitle: "Smiles that last forever" },
];


const OurWorks = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const sectionRef = useRef(null);

  const filteredWorks = activeFilter === "ALL" ? works : works.filter(w => w.category === activeFilter);

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
    return () => ctx.revert();
  }, []);

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
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%', 
              end: 'top 70%',    
              scrub: 1.5,
            }
          }
        );
      });

      /* Images are now Masonry, removed Parallax wrapper to avoid cropping */
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
