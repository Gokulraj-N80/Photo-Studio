import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const flashRef = useRef(null);
  
  // Viewfinder corners
  const cornerTL = useRef(null);
  const cornerTR = useRef(null);
  const cornerBL = useRef(null);
  const cornerBR = useRef(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dummyObj = { val: 0 };
    
    // Initial focus animation (corners breathing)
    gsap.to([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current], {
      scale: 1.05,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Kill breathing animation
        gsap.killTweensOf([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current]);

        // Camera Shutter Snap Animation
        const snapTl = gsap.timeline({ onComplete: onComplete });
        
        // Quick "focus lock" pull inwards
        snapTl.to([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current], {
          scale: 0.9,
          borderColor: "#B08544", // Turns gold on focus lock
          duration: 0.2,
          ease: "power4.in"
        })
        // The FLASH (simulating camera shutter/flash)
        .to(flashRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "power4.out"
        })
        // Hide the preloader instantly while screen is fully white
        .set(containerRef.current, { opacity: 0 })
        // Fade the flash away to reveal the site
        .to(flashRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

    // Animate progress
    tl.to(dummyObj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(dummyObj.val))
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current]);
    };
  }, [onComplete]);

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 z-50 bg-ink flex flex-col items-center justify-center text-white pointer-events-none overflow-hidden"
      >
        <div className="relative w-full max-w-4xl h-3/4 flex flex-col items-center justify-center px-8">
          
          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[1px] bg-white/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-white/30"></div>
          
          {/* Viewfinder Corners */}
          <div ref={cornerTL} className="absolute top-10 left-10 md:top-20 md:left-20 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-white/40 transform origin-top-left"></div>
          <div ref={cornerTR} className="absolute top-10 right-10 md:top-20 md:right-20 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-white/40 transform origin-top-right"></div>
          <div ref={cornerBL} className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-white/40 transform origin-bottom-left"></div>
          <div ref={cornerBR} className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-white/40 transform origin-bottom-right"></div>

          {/* Camera Info HUD */}
          <div className="absolute top-12 left-12 md:top-24 md:left-24 flex items-center gap-3 text-[10px] md:text-xs tracking-widest font-bold uppercase text-white/70">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
            AF-S
          </div>

          <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 flex items-center gap-4 md:gap-6 text-[10px] md:text-xs tracking-widest font-mono text-white/70 uppercase">
            <span>F/1.4</span>
            <span>1/250</span>
            <span>ISO 100</span>
          </div>

          <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 text-[10px] md:text-xs tracking-widest font-bold text-accent uppercase">
            Focusing...
          </div>

          {/* Progress Number */}
          <div className="text-5xl md:text-7xl font-mono text-white/90 tracking-widest z-10 flex items-center justify-center">
            {progress.toString().padStart(3, '0')}
          </div>
          
        </div>
      </div>
      
      {/* Full Screen Flash for Shutter Snap */}
      <div 
        ref={flashRef} 
        className="fixed inset-0 z-[60] bg-white opacity-0 pointer-events-none"
      ></div>
    </>
  );
};

export default Preloader;
