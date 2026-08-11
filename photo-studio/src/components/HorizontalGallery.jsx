import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const sectionRef      = useRef(null);
  const pinWrapRef      = useRef(null);
  const scrollTrackRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // Wait one tick so layout is stable
        const setup = () => {
          const track    = scrollTrackRef.current;
          const pinWrap  = pinWrapRef.current;
          if (!track || !pinWrap) return;

          const totalScroll = track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger:            pinWrap,
              pin:                true,
              scrub:              1.2,
              start:              'top top',
              end:                () => `+=${totalScroll}`,
              invalidateOnRefresh: true,
              anticipatePin:      1,
            }
          });
        };

        // Small delay ensures images have affected layout
        const id = setTimeout(setup, 100);
        return () => clearTimeout(id);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1400&auto=format&fit=crop", label: "The Vows" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop", label: "Golden Moment" },
    { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1400&auto=format&fit=crop", label: "Love Story" },
    { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1400&auto=format&fit=crop", label: "First Dance" },
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1400&auto=format&fit=crop", label: "Candid Joy" },
    { src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1400&auto=format&fit=crop", label: "Editorial" },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1400&auto=format&fit=crop", label: "Forever Begins" },
  ];

  return (
    /* Outer section — NOT overflow-hidden so pin works correctly */
    <div ref={sectionRef}>
      <section
        ref={pinWrapRef}
        className="w-full bg-[#FFFDF8] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Header — sits inside the pin wrapper so it's always visible */}
        <div className="text-center pt-20 pb-12 px-8">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A059] mb-4">
            A COLLECTION OF MOMENTS
          </h2>
          <h3 className="text-2xl md:text-4xl font-serif font-light text-[#12100E] leading-tight italic">
            Some stories are better experienced than explained.
          </h3>
        </div>

        {/* Scroll track */}
        <div className="w-full overflow-x-auto md:overflow-x-visible hide-scrollbar pb-20">
          <div
            ref={scrollTrackRef}
            className="flex gap-6 px-8 md:px-[8vw] min-w-max"
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-[80vw] md:w-[42vw] lg:w-[36vw] h-[55vh] flex-shrink-0 relative group overflow-hidden rounded-sm cursor-pointer shadow-xl"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  style={{ willChange: 'transform' }}
                />
                {/* Overlay label */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-[#FFFDF8] font-serif text-xl tracking-wide">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HorizontalGallery;
