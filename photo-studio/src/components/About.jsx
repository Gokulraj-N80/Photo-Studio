import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const counterRef1 = useRef(null);
  const counterRef2 = useRef(null);
  const counterRef3 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop and Mobile Animation
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.about-image', 
          { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo('.about-image', { opacity: 0 }, { opacity: 1, duration: 1.2, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
      });
      
      gsap.fromTo('.about-text', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: '.about-text-container', start: "top 75%" } }
      );
      
      const animateCounter = (ref, targetValue) => {
        gsap.to(ref.current, {
          textContent: targetValue,
          duration: 1.5,
          ease: "power3.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.stat-grid',
            start: "top 85%"
          }
        });
      };

      animateCounter(counterRef1, 15);
      animateCounter(counterRef2, 1000);
      animateCounter(counterRef3, 40);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-5/12 overflow-hidden rounded-sm aspect-[4/5]">
          <img 
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop" 
            alt="The Artist" 
            className="about-image w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-7/12 about-text-container">
          <h2 className="about-text text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-6">THE ARTIST</h2>
          <h3 className="about-text text-4xl md:text-5xl font-serif font-bold text-ink mb-10 leading-tight">
            More Than Photography.<br/>A Way of Seeing.
          </h3>
          
          <div className="about-text">
            <p className="text-inkLight mb-6 leading-relaxed text-lg font-light">
              Photography isn't about simply freezing a moment.
            </p>
            <p className="text-inkLight mb-6 leading-relaxed text-lg font-light">
              It's about understanding the emotion, the light, and the story behind it.
            </p>
            <p className="text-inkLight mb-16 leading-relaxed text-lg font-light">
              For over 15 years, our studio has created photographs that remain meaningful long after the moment has passed.
            </p>
          </div>
          
          <div className="stat-grid grid grid-cols-3 gap-8 border-t border-secondary/20 pt-10">
            <div className="about-text">
              <span className="block text-accent text-4xl font-serif font-bold mb-2">
                <span ref={counterRef1}>0</span>+
              </span>
              <span className="text-[10px] text-secondary font-medium uppercase tracking-[0.2em]">YEARS</span>
            </div>
            <div className="about-text">
              <span className="block text-accent text-4xl font-serif font-bold mb-2">
                <span ref={counterRef2}>0</span>+
              </span>
              <span className="text-[10px] text-secondary font-medium uppercase tracking-[0.2em]">SESSIONS</span>
            </div>
            <div className="about-text">
              <span className="block text-accent text-4xl font-serif font-bold mb-2">
                <span ref={counterRef3}>0</span>+
              </span>
              <span className="text-[10px] text-secondary font-medium uppercase tracking-[0.2em]">AWARDS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
