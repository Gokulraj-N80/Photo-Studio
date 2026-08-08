import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Responsive GSAP
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Parallax and full scale
        gsap.fromTo(bgRef.current, 
          { scale: 1.10 },
          { scale: 1, duration: 2.5, ease: "power2.out", delay: 1.8 }
        );

        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: No parallax, simple scale
        gsap.fromTo(bgRef.current, 
          { scale: 1.05 },
          { scale: 1, duration: 2, ease: "power2.out", delay: 1.8 }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Accessibility: Fade only
        gsap.set(bgRef.current, { scale: 1, yPercent: 0 });
        gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 2, delay: 1.8 });
      });

      // Text Sequence (Applies to all)
      const tl = gsap.timeline({ delay: 2.5 });
      
      tl.fromTo('.hero-label', 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo('.hero-word', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo('.hero-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col justify-center text-center overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Photography Studio" 
          className="w-full h-full object-cover origin-center opacity-80"
        />
        <div className="absolute inset-0 bg-[#1C1917] opacity-50 mix-blend-multiply"></div>
      </div>
      
      <div ref={contentRef} className="relative z-10 px-4 max-w-4xl mx-auto pt-20">
        <p className="hero-label text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-8">
          EST. 2012 · FINE ART PHOTOGRAPHY
        </p>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight font-serif leading-[1.1] overflow-hidden">
          <span className="block overflow-hidden pb-2">
            <span className="hero-word inline-block">Timeless</span> <span className="hero-word inline-block italic text-accent">Moments.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-word inline-block">Beautifully</span> <span className="hero-word inline-block">Told.</span>
          </span>
        </h1>
        
        <p className="hero-desc text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light tracking-[0.2em] uppercase text-sm">
          Wedding · Portrait · Fashion · Commercial
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="hero-cta bg-accent hover:bg-white hover:text-ink text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-500 w-full sm:w-auto">
            Explore Our Work
          </button>
          <button className="hero-cta bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-500 w-full sm:w-auto">
            Book a Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
