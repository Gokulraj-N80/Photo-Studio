import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: "01",
    title: "WEDDING PHOTOGRAPHY",
    desc: "For the moments you'll remember forever.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "EDITORIAL PORTRAITS",
    desc: "Portraits with character, emotion and intention.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "COMMERCIAL & FASHION",
    desc: "Elevating brands through striking visual identity.",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
  }
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const serviceBlocks = gsap.utils.toArray('.service-mag-block');
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        serviceBlocks.forEach((block) => {
          const num = block.querySelector('.mag-num');
          const img = block.querySelector('.mag-img');
          const textElements = block.querySelectorAll('.mag-text');
          
          gsap.fromTo(img,
            { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.05 },
            { 
              clipPath: 'inset(0% 0% 0% 0%)', 
              scale: 1,
              duration: 1.2, 
              ease: "power3.out",
              scrollTrigger: { trigger: block, start: "top 75%" } 
            }
          );

          gsap.fromTo([num, ...textElements],
            { y: 40, opacity: 0 },
            { 
              y: 0, opacity: 1, 
              duration: 0.9, 
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: block, start: "top 75%" } 
            }
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        serviceBlocks.forEach((block) => {
          const img = block.querySelector('.mag-img');
          const elements = block.querySelectorAll('.mag-num, .mag-text');
          gsap.fromTo([img, ...elements], 
            { opacity: 0 }, 
            { opacity: 1, duration: 1.2, stagger: 0.1, scrollTrigger: { trigger: block, start: "top 75%" } }
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col gap-32">
        {servicesData.map((svc, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`service-mag-block flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="mag-num text-accent text-6xl md:text-8xl font-serif font-bold opacity-30 mb-8 block">{svc.num}</span>
                <h4 className="mag-text text-3xl md:text-5xl font-serif font-bold text-ink mb-6 tracking-wide leading-tight break-words pr-4">{svc.title}</h4>
                <p className="mag-text text-inkLight text-xl leading-relaxed mb-10 font-light max-w-md">
                  {svc.desc}
                </p>
                <div className="mag-text">
                  <a href="#contact" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors group">
                    Explore Service 
                    <span className="w-8 h-[1px] bg-ink group-hover:bg-accent group-hover:w-12 transition-all duration-300"></span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="overflow-hidden rounded-sm aspect-[3/4] shadow-xl group cursor-pointer">
                  <img 
                    src={svc.img} 
                    alt={svc.title} 
                    className="mag-img w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
