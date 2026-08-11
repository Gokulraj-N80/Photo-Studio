import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    title: "Wedding Photography",
    desc: "Cinematic documentation of your most important day, capturing every vow, tear, and joyful moment.",
  },
  {
    id: "pre-wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    title: "Pre-Wedding",
    desc: "Artistic and conceptual storytelling of your journey before the big day, set in beautiful locations.",
  },
  {
    id: "portrait",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    title: "Portrait Photography",
    desc: "Editorial-style portraits that bring out your authentic self with striking lighting and composition.",
  },
  {
    id: "event",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    title: "Event Photography",
    desc: "Unobtrusive coverage of your celebrations, ensuring every important memory is preserved.",
  },
  {
    id: "candid",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    title: "Candid Photography",
    desc: "Catching those raw, unscripted emotions and fleeting interactions that define true stories.",
  },
  {
    id: "fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
    title: "Fashion Photography",
    desc: "High-end commercial and fashion shoots focused on aesthetic perfection and brand identity.",
  }
];
const ServiceCard = ({ svc, onBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const frontRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(frontRef.current, {
        rotationX: 75,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power2.inOut"
      });
    } else {
      gsap.to(frontRef.current, {
        rotationX: 0,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div 
      className="service-card relative w-full aspect-[4/5] cursor-pointer [perspective:1500px]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Back face (Text & Button) */}
      <div className="absolute inset-0 bg-[#FFFDF8] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 pt-12 flex flex-col items-center justify-start text-center rounded-sm">
        <h4 className="text-5xl font-serif font-bold text-[#12100E] mb-2">{svc.title}</h4>
        <p className="text-[#12100E]/70 text-lg leading-relaxed mb-6 font-light px-2">{svc.desc}</p>
        <a 
          href="#booking"
          onClick={() => onBook && onBook(svc.id)}
          className="bg-[#C5A059] hover:bg-[#12100E] text-[#FFFDF8] px-10 py-4 rounded-sm transition-colors duration-300 uppercase tracking-[0.2em] text-sm font-bold"
        >
          Book Session
        </a>
      </div>

      {/* Front face (Image) */}
      <div ref={frontRef} className="absolute inset-0 transform-style-3d origin-bottom z-10 bg-[#12100E] rounded-sm shadow-lg overflow-hidden">
        <img src={svc.image} className="w-full h-full object-cover opacity-80" alt={svc.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent flex items-end justify-center pb-8 pointer-events-none px-4 text-center">
          <h4 className="text-4xl font-serif text-[#FFFDF8] font-bold">{svc.title}</h4>
        </div>
      </div>
    </div>
  );
};

const Services = ({ onBook }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const serviceCards = gsap.utils.toArray('.service-card');
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate headers
        gsap.fromTo('.services-header-text', 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );

        // 3D card reveal on scroll (keep this for entry)
        gsap.fromTo(serviceCards,
          { y: 100, opacity: 0, scale: 0.9 },
          { 
            y: 0, opacity: 1, scale: 1,
            duration: 1.2, 
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(serviceCards, 
          { opacity: 0 }, 
          { opacity: 1, duration: 1, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 px-6 w-full bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="services-header-text text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-4">OUR EXPERTISE</h2>
          <h3 className="services-header-text text-4xl md:text-5xl font-serif font-bold text-[#12100E] mb-0 leading-tight">Tailored Services for<br/>Your Unique Story.</h3>
        </div>

        {/* Scaled down by 10% to reduce component footprint */}
        <div className="transform scale-90 origin-top">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((svc, idx) => (
              <ServiceCard key={idx} svc={svc} onBook={onBook} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
