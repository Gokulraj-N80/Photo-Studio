import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DepthCarousel from './DepthCarousel';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const sectionRef = useRef(null);

  const images = [
    { image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", alt: "The Vows" },
    { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80", alt: "Stunning Portraits" },
    { image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80", alt: "Pure Joy" },
    { image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80", alt: "Pre-Wedding Romance" },
    { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80", alt: "Fashion & Vogue" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.depth-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
      gsap.fromTo('.depth-wrapper',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFDF8] pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden">
      <div className="depth-header text-center pb-10 md:pb-14 px-6">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-4">
          A COLLECTION OF MOMENTS
        </h2>
        <h3 className="text-2xl md:text-4xl font-serif font-light text-[#12100E] leading-tight italic">
          Some stories are better experienced than explained.
        </h3>
      </div>

      <div className="depth-wrapper" style={{ height: '500px', position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <DepthCarousel
          items={images}
          cardWidth={500}
          cardHeight={500}
          depth={220}
          spread={120}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={6}
          autoplay
          loop
        />
      </div>
    </section>
  );
};

export default HorizontalGallery;
