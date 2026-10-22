import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DepthCarousel from './DepthCarousel';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const sectionRef = useRef(null);

  const images = [
    { image: "/images/wedding/wedding-1.webp", alt: "The Vows" },
    { image: "/images/portraits/portraits-1.webp", alt: "Stunning Portraits" },
    { image: "/images/wedding/wedding-11.webp", alt: "Pure Joy" },
    { image: "/images/wedding/wedding-7.webp", alt: "Pre-Wedding Romance" },
    { image: "/images/others/others-2.webp", alt: "Fashion & Vogue" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.depth-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true
          }
        }
      );
      gsap.fromTo('.depth-wrapper',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#12100E] pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden border-t border-white/5">
      <div className="depth-header text-center pb-10 md:pb-14 px-6">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-4">
          A COLLECTION OF MOMENTS
        </h2>
        <h3 className="text-2xl md:text-4xl font-serif font-light text-[#FFFDF8] leading-tight italic">
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
