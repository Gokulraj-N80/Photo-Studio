import React, { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';

// A curated pool of local, 100% clean studio WebP imagery
const imagePool = [
  "/hero.webp",
  "/images/wedding/wedding-1.webp",
  "/images/wedding/wedding-2.webp",
  "/images/wedding/wedding-3.webp",
  "/images/wedding/wedding-4.webp",
  "/images/portraits/portraits-1.webp",
  "/images/portraits/portraits-2.webp",
  "/images/events/events-1.webp",
  "/images/others/others-2.webp"
];

const getRandomImages = (count) => {
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const imageBoxRef = useRef(null);
  const imageRefs = useRef([]);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const overlayRef = useRef(null);
  const [imagesReady, setImagesReady] = useState(false);
  
  // Pick 5 random clean images only once when the component mounts
  const randomImages = useMemo(() => getRandomImages(5), []);

  // Pre-decode preloader flash images + prefetch top landing assets in background
  useEffect(() => {
    let isCancelled = false;

    // 1. Decode critical images before starting animation to prevent blank flashes
    const decodePromises = randomImages.concat(["/hero.webp"]).map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        if (img.decode) {
          img.decode().then(resolve).catch(resolve);
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

    // Max 1.2s safety failsafe timeout so on slow cellular it never hangs
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1200));

    Promise.race([Promise.all(decodePromises), timeoutPromise]).then(() => {
      if (!isCancelled) setImagesReady(true);
    });

    // 2. Background prefetch remaining gallery images for instant viewing after preloader
    const landingAssets = [
      "/featured-bridal-party.webp",
      "/images/wedding/wedding-9.webp",
      "/images/wedding/wedding-18.webp",
      "/images/wedding/wedding-19.webp",
      "/images/wedding/wedding-20.webp",
      "/images/wedding/wedding-21.webp",
      "/images/kids/kids-1.webp"
    ];
    landingAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      isCancelled = true;
    };
  }, [randomImages]);

  useEffect(() => {
    if (!imagesReady) return;

    document.body.style.overflow = 'hidden';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // Initial state
      gsap.set(imageRefs.current, { opacity: 0, scale: 1.15 });
      if (imageBoxRef.current) gsap.set(imageBoxRef.current, { opacity: 1, scale: 1, display: 'flex' });
      gsap.set(textRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(subTextRef.current, { opacity: 0, y: 15 });
      gsap.set(overlayRef.current, { yPercent: 0 });

      // Create a rapid sequence for the images
      const imageDuration = 0.16; // smooth flash
      
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const isLast = i === imageRefs.current.length - 1;
        
        // Show image
        tl.to(img, {
          opacity: 1,
          scale: 1,
          duration: isLast ? 0.38 : imageDuration,
          ease: "power2.out"
        });
        
        // Hide image (unless it's the last one)
        if (!isLast) {
          tl.to(img, {
            opacity: 0,
            duration: 0.04, // instant cut
          });
        }
      });

      // The last image and its container scale up and fade out before the text stamps in
      const lastImg = imageRefs.current[imageRefs.current.length - 1];
      if (lastImg) {
        tl.to([lastImg, imageBoxRef.current], {
          scale: 1.5,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in"
        }, "+=0.15")
        .set(imageBoxRef.current, { display: 'none' });
      }

      // Brand Name Reveal
      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: "back.out(1.5)"
      }, "<0.15")
      .to(subTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.35")
      // Slide everything up
      .to([textRef.current, subTextRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        delay: 0.15
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut"
      }, "-=0.15");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [imagesReady, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Background Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#0a0908] z-10 origin-top"
      />
      
      {/* Decorative noise */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none z-20"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Image Sequence Container - Perfectly proportioned for mobile & desktop */}
      <div 
        ref={imageBoxRef}
        className="absolute z-30 w-52 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[28rem] overflow-hidden rounded-sm flex items-center justify-center pointer-events-none"
      >
        {randomImages.map((src, index) => (
          <img 
            key={index}
            ref={el => imageRefs.current[index] = el}
            src={src}
            alt={`Preloader ${index}`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover shadow-2xl"
          />
        ))}
      </div>

      {/* Brand Text - Responsive, never overflowing on small mobile screens */}
      <div className="relative z-40 flex flex-col items-center justify-center px-4 text-center">
        <h1 
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-serif text-[#FFFDF8] tracking-[0.1em] sm:tracking-[0.15em] uppercase drop-shadow-2xl whitespace-nowrap"
        >
          Apex Studio
        </h1>
        <p 
          ref={subTextRef}
          className="mt-3 sm:mt-4 text-[10px] sm:text-xs md:text-sm font-sans text-[#C5A059] tracking-[0.25em] sm:tracking-[0.4em] uppercase"
        >
          Creative Photography
        </p>
      </div>
    </div>
  );
};

export default Preloader;
