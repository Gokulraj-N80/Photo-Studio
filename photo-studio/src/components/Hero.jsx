import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const parallaxWrapper = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Entrance Sequence
      const tl = gsap.timeline();
      
      // Image Entrance - Snaps down from 1.08 simulating the camera focal settle
      tl.fromTo(bgRef.current,
        { opacity: 1, scale: 1.04 },
        { scale: 1, duration: 1, ease: "power2.out" }
      )
      // Eyebrow
      .fromTo('.hero-eyebrow',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )
      // Heading lines
      .fromTo('.hero-line-inner',
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      )
      // Description
      .fromTo('.hero-desc',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      )
      // CTAs
      .fromTo('.hero-cta',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      )
      // Scroll indicator
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.7 },
        "-=0.4"
      );

      // Scroll Indicator Bounce
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });

      // Scroll Transition
      mm.add("(min-width: 768px)", () => {
        gsap.to(contentRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-[100svh] min-h-[650px] w-full flex flex-col justify-center overflow-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      {/* Background Wrapper */}
      <div ref={parallaxWrapper} className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Main Image - Brightened & saturated for luminous golden warmth */}
        <img 
          ref={bgRef}
          src="/hero.webp" 
          alt="Luxury Editorial Photography" 
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] md:object-[72%_center] brightness-[1.08] contrast-[1.04] saturate-[1.06]"
          style={{ opacity: 1, scale: 1.02 }}
        />
        
        {/* Soft, focused text-side shadow gradient leaving the couple luminous */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/85 via-[#12100E]/40 to-transparent w-full md:w-[62%]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/20 to-transparent pointer-events-none" />
        
        {/* Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* Content - Simple, elegant & clearly visible editorial typography */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 md:pt-28 pb-8 md:pb-12">
        <div ref={contentRef} className="max-w-[780px] text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start" style={{ opacity: 1 }}>
          
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-4 mb-3 opacity-0">
            <div className="hidden lg:block w-10 h-[1px] bg-[#C5A059]/60"></div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#C9C3B5] font-medium">
              Apex Studio · Creative Photography
            </p>
          </div>
          
          {/* Main Heading - Simple, calm, elegant warm ivory tone: visible without harsh glare */}
          <h1 className="font-serif text-[clamp(2.1rem,5.4vw,4.5rem)] font-normal leading-[1.0] tracking-[-0.015em] text-[#E4DFD5] mb-3 md:mb-4 max-w-[820px]">
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">Every <span className="italic font-light text-[#E4DFD5]">Moment</span></span></span>
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">Deserves</span></span>
            <span className="block overflow-hidden"><span className="hero-line-inner block opacity-0">To Be Remembered.</span></span>
          </h1>
          
          {/* Description */}
          <p className="hero-desc opacity-0 font-sans text-[#BDB7A9] text-sm md:text-base leading-relaxed mb-6 max-w-[480px] font-normal">
            Stories captured with emotion, elegance, and cinematic beauty.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link to="/portfolio" className="hero-cta opacity-0 bg-[#BA9B58] hover:bg-[#C8A865] text-[#12100E] px-8 py-3.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto hover:-translate-y-0.5 flex items-center justify-center gap-3">
              Explore Our Work <span className="text-lg leading-none">&rarr;</span>
            </Link>
            <a href="#booking" className="hero-cta opacity-0 group bg-[#12100E]/50 text-[#DDD8CE] hover:bg-[#12100E]/80 hover:text-[#BA9B58] text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 border border-white/15 hover:border-[#BA9B58]/60 px-8 py-3.5 rounded-full backdrop-blur-sm">
              Book a Session <span className="text-lg leading-none transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 drop-shadow-sm">
        <span className="text-[#FFFDF8]/70 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">Scroll</span>
        <span className="text-[#C5A059] text-xs">&darr;</span>
      </div>
    </section>
  );
};

export default Hero;
