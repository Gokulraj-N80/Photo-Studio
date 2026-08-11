import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Create a breathing/spinning animation for the aperture icon
      gsap.to(iconRef.current, {
        rotation: 90,
        scale: 1.1,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Simple elegant exit sequence after 2 seconds
      gsap.delayedCall(2, () => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });

        // Fade elements out gently
        tl.to([iconRef.current, textRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1
        });

        // Fade out the entire black background
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.2");

        // Hide entirely
        tl.set(containerRef.current, { display: "none" });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#12100E] flex flex-col items-center justify-center pointer-events-none"
    >
      <div ref={iconRef} className="w-12 h-12 mb-6 text-[#C5A059]">
        {/* Minimal elegant aperture SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
          <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
          <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
          <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
        </svg>
      </div>
      <h2 ref={textRef} className="text-[#FFFDF8] font-serif text-xl tracking-[0.3em] uppercase opacity-80">
        Pixelbees
      </h2>
    </div>
  );
};

export default Preloader;
