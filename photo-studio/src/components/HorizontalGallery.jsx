import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Only enable pinned horizontal scroll on large screens and if reduced motion is off
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        gsap.to(scrollContainerRef.current, {
          x: -(scrollWidth - viewportWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true
          }
        });
      });

      // On mobile or reduced motion, we do nothing in GSAP. 
      // Tailwind classes handle the native overflow-x-auto scroll behavior.

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1200&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554048662-7f30df935d25?q=80&w=1200&auto=format&fit=crop"
  ];

  return (
    <section ref={sectionRef} className="h-screen flex flex-col justify-center overflow-hidden py-20">
      
      <div className="text-center mb-16 px-8">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">A COLLECTION OF MOMENTS</h2>
        <h3 className="text-2xl md:text-4xl font-serif font-light text-ink leading-tight italic">
          Some stories are better experienced than explained.
        </h3>
      </div>

      {/* Uses native flex overflow on mobile, and GSAP pin on desktop */}
      <div className="w-full overflow-x-auto md:overflow-x-visible hide-scrollbar">
        <div ref={scrollContainerRef} className="flex gap-10 px-8 md:px-[10vw] min-w-max">
          {images.map((img, idx) => (
            <div key={idx} className="w-[85vw] md:w-[50vw] lg:w-[40vw] h-[50vh] md:h-[60vh] flex-shrink-0 relative group overflow-hidden rounded-sm cursor-pointer">
              <img 
                src={img} 
                alt={`Cinematic Moment ${idx + 1}`} 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
