import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const filters = ["ALL", "WEDDINGS", "PORTRAITS", "EVENTS", "PRE-WEDDING", "CANDID", "FASHION"];

const works = [
  // Row 1 — 2x2 hero + 1x1 + 1x1
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1800&auto=format&fit=crop", category: "WEDDINGS",    title: "The Vows",         subtitle: "Sacred moments, eternal bonds",          span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",  category: "PORTRAITS",   title: "Luminous",         subtitle: "Light carved from within",               span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",  category: "FASHION",     title: "Editorial",        subtitle: "Bold. Expressive. Fearless.",            span: "col-span-1 row-span-1" },
  // Row 2 — 1x2 tall + 1x1 + 1x1
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop",  category: "PRE-WEDDING", title: "Love Story",       subtitle: "Before the forever begins",              span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop",  category: "EVENTS",      title: "Celebration",      subtitle: "Every detail remembered",                span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",  category: "CANDID",      title: "Unscripted Joy",   subtitle: "Real moments, real feelings",            span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop",  category: "WEDDINGS",    title: "First Look",       subtitle: "The breath before forever",              span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?q=80&w=900&auto=format&fit=crop",  category: "PORTRAITS",   title: "Solitude",         subtitle: "A quiet conversation with light",        span: "col-span-1 row-span-1" }
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

      /* Image Parallax */
      gsap.utils.toArray('.work-card').forEach(card => {
        const wrapper = card.querySelector('.parallax-wrapper');
        if (wrapper) {
          gsap.fromTo(wrapper,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 px-6 w-full bg-[#12100E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="works-header flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">OUR WORKS</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#FFFDF8] leading-tight">
              Stories We've<br className="hidden md:block" /> Had the Honor to Tell.
            </h3>
          </div>
          <p className="text-[#FFFDF8]/50 text-sm font-light max-w-xs leading-relaxed text-right hidden md:block">
            Every image is a chapter.<br />Every session, a complete story.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filters-row flex flex-wrap gap-3 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`works-filter text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#C5A059] text-[#12100E] border-[#C5A059]'
                  : 'bg-transparent text-[#FFFDF8]/50 border-white/10 hover:text-[#FFFDF8] hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[280px] gap-4">
          {filteredWorks.map((work, idx) => (
            <div
              key={`${work.title}-${activeFilter}`}
              className={`work-card group relative overflow-hidden rounded-sm cursor-pointer ${work.span}`}
            >
              {/* Image with Parallax Wrapper */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="parallax-wrapper absolute w-full h-[130%] -top-[15%]">
                  <img
                    src={work.src}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.15]"
                    style={{ willChange: 'transform' }}
                  />
                </div>
              </div>

              {/* Gradient overlay always-on */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/10 to-transparent" />

              {/* Bottom text — visible always, enhanced on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-8 h-[1.5px] bg-[#C5A059] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <span className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.3em] block mb-1">
                  {work.category}
                </span>
                <h4 className="text-[#FFFDF8] font-serif text-xl md:text-2xl font-bold">{work.title}</h4>
                <p className="text-[#FFFDF8]/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
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
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-transparent text-[#FFFDF8] hover:text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#FFFDF8]/20 hover:border-[#C5A059] px-10 py-4 rounded-full transition-all duration-300"
          >
            Book Your Session <span className="text-base">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default OurWorks;
