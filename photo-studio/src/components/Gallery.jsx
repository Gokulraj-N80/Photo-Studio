import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const filters = ["ALL", "WEDDINGS", "PORTRAITS", "FASHION"];

const portfolioImages = [
  { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=1200&auto=format&fit=crop", category: "WEDDINGS", title: "ARUN & PRIYA", year: "2026", height: "h-[600px]" },
  { src: "https://images.unsplash.com/photo-1549471013-3364d7220b75?q=80&w=1200&auto=format&fit=crop", category: "PORTRAITS", title: "STILL / I", year: "2025", height: "h-[450px]" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", category: "FASHION", title: "NOIR", year: "2025", height: "h-[500px]" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", category: "PORTRAITS", title: "THE QUIET MOMENT", year: "2026", height: "h-[600px]" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop", category: "WEDDINGS", title: "FORM & LIGHT", year: "2025", height: "h-[450px]" },
  { src: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1200&auto=format&fit=crop", category: "FASHION", title: "EDITORIAL BLEND", year: "2026", height: "h-[550px]" }
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch(".gallery-img", {
          start: "top 85%",
          onEnter: (elements) => {
            gsap.fromTo(elements,
              { clipPath: "inset(10% 10% 10% 10%)", scale: 1.05 },
              { 
                clipPath: "inset(0% 0% 0% 0%)", 
                scale: 1,
                duration: 1.2, 
                stagger: 0.15, 
                ease: "power3.out",
                clearProps: "clipPath"
              }
            );
          }
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        ScrollTrigger.batch(".gallery-img", {
          start: "top 85%",
          onEnter: (elements) => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.15 })
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFilter = (f) => {
    if (f === activeFilter) return;
    
    gsap.to('.gallery-img', {
      scale: 0.96,
      filter: 'blur(5px)', // Subtle blur as requested
      opacity: 0,
      duration: 0.4,
      onComplete: () => setActiveFilter(f)
    });
  };

  useEffect(() => {
    gsap.fromTo('.gallery-img',
      { scale: 1, filter: 'blur(0px)', opacity: 1 },
      { scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "all" } // Rely on component mounting for opacity/scale reset
    );
  }, [activeFilter]);

  const filteredImages = activeFilter === "ALL" 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === activeFilter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-4">SELECTED WORK</h2>
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-0 leading-tight">Stories We've Had<br/>The Privilege to Capture.</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 mb-20">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => handleFilter(f)}
            className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeFilter === f 
                ? 'text-ink border-b border-ink pb-1' 
                : 'text-secondary hover:text-ink pb-1 border-b border-transparent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      <div className="masonry-grid">
        {filteredImages.map((img, idx) => (
          <div key={idx} className={`masonry-item gallery-img w-full overflow-hidden relative cursor-pointer group rounded-sm ${img.height}`}>
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
            />
            
            <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-6">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-[0.3em] mb-3 block">
                  {img.category} · {img.year}
                </span>
                <h4 className="text-white font-serif text-3xl mb-8 uppercase">
                  {img.title}
                </h4>
                <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  VIEW PROJECT <span className="text-accent transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
