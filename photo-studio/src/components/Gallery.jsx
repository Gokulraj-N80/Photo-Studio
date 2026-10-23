import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const filters = ["DISCOVER", "WEDDINGS", "PORTRAITS", "EVENTS", "PRE-WEDDING", "CANDID", "FASHION"];

import PixelTransition from './PixelTransition';

const works = [
  // WEDDINGS
  { src: "/images/wedding/wedding-1.webp", fallback: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "The Union", subtitle: "Sacred vows, eternal bonds" },
  { src: "/images/wedding/wedding-2.webp", fallback: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "Sunset Vows", subtitle: "Chasing the golden horizon" },
  { src: "/images/wedding/wedding-3.webp", fallback: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "The Bridal Veil", subtitle: "Delicate lace and morning light" },
  { src: "/images/wedding/wedding-4.webp", fallback: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "Golden Embrace", subtitle: "Warm reflections of two souls" },
  { src: "/images/wedding/wedding-5.webp", fallback: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "The First Dance", subtitle: "Suspended in a timeless ballroom" },
  { src: "/images/wedding/wedding-6.webp", fallback: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80", category: "WEDDINGS", title: "Starlight Banquet", subtitle: "Intimate celebrations under the canopy" },

  // PORTRAITS
  { src: "/images/portraits/portraits-1.webp", fallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "Sculpted In Light", subtitle: "Studio contrast & inner depth" },
  { src: "/images/portraits/portraits-2.webp", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "The Monolith", subtitle: "Classic editorial poise" },
  { src: "/images/portraits/portraits-3.webp", fallback: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "Ethereal Glance", subtitle: "Natural window light & soft tones" },
  { src: "/images/portraits/portraits-4.webp", fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "Grace & Solitude", subtitle: "High-contrast editorial mood" },
  { src: "/images/portraits/portraits-5.webp", fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "Character Study", subtitle: "Authentic cinematic portraiture" },
  { src: "/images/portraits/portraits-6.webp", fallback: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", category: "PORTRAITS", title: "Luminous Glow", subtitle: "Warm beauty & radiant warmth" },

  // FASHION
  { src: "/images/others/others-2.webp", fallback: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80", category: "FASHION", title: "Haute Couture", subtitle: "Architectural form & runway elegance" },
  { src: "/images/others/others-3.webp", fallback: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80", category: "FASHION", title: "Color Theory", subtitle: "Vibrant palettes & editorial styling" },
  { src: "/images/others/others-4.webp", fallback: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80", category: "FASHION", title: "Milan Editorial", subtitle: "Urban luxury & movement" },
  { src: "/images/others/others-5.webp", fallback: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80", category: "FASHION", title: "Bohemian Velvet", subtitle: "Sun-drenched couture aesthetics" },
  { src: "/images/others/others-6.webp", fallback: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80", category: "FASHION", title: "Modern Noir", subtitle: "Shadow play and geometric attire" },

  // PRE-WEDDING
  { src: "/images/wedding/wedding-7.webp", fallback: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80", category: "PRE-WEDDING", title: "Dusk Whispers", subtitle: "Romantic wanderlust before the wedding" },
  { src: "/images/wedding/wedding-8.webp", fallback: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80", category: "PRE-WEDDING", title: "Wanderlust Romance", subtitle: "Escaping together into nature" },
  { src: "/images/wedding/wedding-9.webp", fallback: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80", category: "PRE-WEDDING", title: "Whispering Pines", subtitle: "Cinematic pre-wedding visual story" },
  { src: "/images/wedding/wedding-10.webp", fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80", category: "PRE-WEDDING", title: "Coastal Breeze", subtitle: "Intimate glances by the tide" },

  // CANDID
  { src: "/images/wedding/wedding-11.webp", fallback: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80", category: "CANDID", title: "Unscripted Joy", subtitle: "Genuine laughter & shared glances" },
  { src: "/images/wedding/wedding-12.webp", fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80", category: "CANDID", title: "Best Friends Forever", subtitle: "Candid smiles between ceremonies" },
  { src: "/images/wedding/wedding-13.webp", fallback: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80", category: "CANDID", title: "The Sudden Laugh", subtitle: "Moments caught without anticipation" },
  { src: "/images/wedding/wedding-14.webp", fallback: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80", category: "CANDID", title: "Subtle Affection", subtitle: "Fleeting touch of hands" },

  // EVENTS
  { src: "/images/events/events-1.webp", fallback: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80", category: "EVENTS", title: "Gala Grandeur", subtitle: "Black-tie elegance & keynote spotlights" },
  { src: "/images/events/events-2.webp", fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80", category: "EVENTS", title: "Summit Keynote", subtitle: "Inspiring talks and focused audiences" },
  { src: "/images/events/events-3.webp", fallback: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80", category: "EVENTS", title: "The Midnight Gala", subtitle: "Sparklers, champagne, and celebrations" },
  { src: "/images/events/events-4.webp", fallback: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80", category: "EVENTS", title: "Grand Symphony", subtitle: "Living music and live crowd energy" }
];

const OurWorks = () => {
  const [activeFilter, setActiveFilter] = useState("DISCOVER");
  const sectionRef = useRef(null);

  // Stable memoized discover pool so items don't re-shuffle on re-renders
  const discoverWorks = useMemo(() => {
    return [...works].sort(() => 0.5 - Math.random()).slice(0, 20);
  }, []);

  const filteredWorks = useMemo(() => {
    return activeFilter === "DISCOVER" 
      ? discoverWorks 
      : works.filter(w => w.category === activeFilter);
  }, [activeFilter, discoverWorks]);

  const handleFilter = (f) => {
    if (f === activeFilter) return;
    gsap.to('.work-card', {
      scale: 0.96, opacity: 0, duration: 0.25,
      onComplete: () => setActiveFilter(f)
    });
  };

  useEffect(() => {
    // This context runs only once on mount for static elements (Header, Filters)
    const ctx = gsap.context(() => {
      /* Section header reveal on scroll and descroll */
      gsap.fromTo('.works-header',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 85%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'
          } 
        }
      );
      /* Filters slide in on scroll and descroll */
      gsap.fromTo('.works-filter',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.03, ease: 'power2.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 85%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'
          } 
        }
      );
      /* Featured Spotlight reveal on scroll and descroll */
      gsap.fromTo('.featured-story-section',
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.featured-story-section',
            start: 'top 88%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }, sectionRef);

    let timeoutId;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Runs when filter changes and animates all cards on scroll and descroll with full completion
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-card').forEach((card, idx) => {
        const rotDir = idx % 2 === 0 ? -2 : 2;

        gsap.fromTo(card,
          { 
            y: 55, 
            scale: 0.92, 
            opacity: 0, 
            rotationZ: rotDir
          },
          { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            rotationZ: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }, sectionRef);

    // Refresh ScrollTrigger calculations after DOM settlement
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activeFilter, filteredWorks]);

  return (
    <section id="gallery" ref={sectionRef} className="py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-14 w-full bg-[#FFFDF8]">
      <div className="w-full max-w-[1700px] mx-auto">

        {/* Header */}
        <div className="works-header flex flex-col items-center text-center justify-center mb-14 gap-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">OUR WORKS</h2>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#12100E] leading-tight">
            Stories We've Had the Honor to Tell.
          </h3>
          <p className="text-[#12100E]/70 text-sm font-light max-w-md leading-relaxed text-center hidden md:block">
            Every image is a chapter. Every session, a complete story.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filters-row flex flex-wrap items-center justify-center gap-1.5 sm:gap-3.5 mb-8 md:mb-14 px-2 max-w-4xl mx-auto">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`works-filter whitespace-nowrap text-[10px] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#C5A059] text-[#12100E] border-[#C5A059] shadow-[0_4px_16px_rgba(197,160,89,0.35)] font-bold scale-[1.03]'
                  : 'bg-white text-[#12100E]/75 border-[#12100E]/15 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-[#FAF7F0] shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Spotlight Section with Pixel Transition */}
        {activeFilter === "DISCOVER" && (
          <div className="featured-story-section mb-12 md:mb-16 w-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <PixelTransition
                firstContent={
                  <div className="w-full h-full bg-[#12100E] flex items-center justify-center overflow-hidden">
                    <img
                      src="/featured-bridal-party.webp"
                      alt="Featured Story: The Bridal Party"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                }
                secondContent={
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1714] border border-[#C5A059]/20 p-4 sm:p-6 text-center">
                    <p className="text-[9px] sm:text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.3em] mb-2 sm:mb-4">Behind the Lens</p>
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFFDF8] mb-2 sm:mb-3">Pure Joy</p>
                    <p className="text-[11px] sm:text-xs text-[#FFFDF8]/60 max-w-xs leading-relaxed">We captured the raw emotion of their special day. Real smiles, unscripted joy, and the priceless reactions of best friends.</p>
                  </div>
                }
                gridSize={12}
                pixelColor='#1a1714'
                animationStepDuration={0.4}
                className="w-full max-w-[550px] h-auto border-2 border-[#C5A059] shadow-2xl rounded-lg"
                aspectRatio="56.25%"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-8">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#12100E] mb-2 sm:mb-4">Featured Story: The Bridal Party</h4>
              <p className="text-xs sm:text-sm text-[#12100E]/70 leading-relaxed max-w-md mx-auto md:mx-0">
                Hover over (or tap) the image to reveal the story behind this unscripted moment. The best photos aren't posed; they are the genuine reactions, the inside jokes, and the shared laughter between friends.
              </p>
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredWorks.map((work, idx) => (
            <div
              key={`${work.title}-${activeFilter}-${idx}`}
              className={`work-card group relative overflow-hidden rounded-sm cursor-pointer masonry-item`}
            >
              {/* Uncropped Image */}
              <img
                src={work.src}
                alt={work.title}
                referrerPolicy="no-referrer"
                loading={idx < 6 ? "eager" : "lazy"}
                fetchPriority={idx < 3 ? "high" : "auto"}
                decoding={idx < 6 ? "sync" : "async"}
                onError={(e) => {
                  if (work.fallback && e.currentTarget.src !== work.fallback) {
                    e.currentTarget.src = work.fallback;
                  }
                }}
                className="w-full h-auto min-h-[160px] sm:min-h-[220px] object-cover block bg-[#1C1A17] transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
                style={{ willChange: 'transform' }}
              />

              {/* Gradient overlay always-on */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/85 via-[#12100E]/20 to-transparent" />

              {/* Bottom text — visible always on mobile, enhanced on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 md:p-6 transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-5 sm:w-8 h-[1.5px] bg-[#C5A059] mb-1 sm:mb-2 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <span className="text-[7px] sm:text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-0.5 sm:mb-1">
                  {work.category}
                </span>
                <h4 className="text-[#FFFDF8] font-serif text-sm sm:text-lg md:text-2xl font-bold leading-tight">{work.title}</h4>
                <p className="text-[#FFFDF8]/70 text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-150 line-clamp-1 sm:line-clamp-none">
                  {work.subtitle}
                </p>
              </div>

              {/* Corner accent */}
              <div className="hidden sm:block absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C5A059]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/#booking"
            className="inline-flex items-center gap-3 bg-transparent text-[#12100E] hover:text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#12100E]/20 hover:border-[#C5A059] px-10 py-4 rounded-full transition-all duration-300 shadow-sm"
          >
            Book Your Session <span className="text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OurWorks;
