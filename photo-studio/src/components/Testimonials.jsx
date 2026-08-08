import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah & John",
    role: "Wedding Clients",
    text: "She was invisible all day and somehow got every single moment. My grandmother's face during the vows — I didn't even see it happen. The photos are a true treasure."
  },
  {
    name: "Emma Watson",
    role: "Fashion Editorial",
    text: "Working with this studio was a revelation. The direction was incredibly precise but completely natural, resulting in the most authentic editorial spread I've ever had."
  },
  {
    name: "David Chen",
    role: "Portrait Client",
    text: "I usually hate having my photo taken, but the session felt like a conversation. The final portraits captured exactly who I am without feeling staged or stiff."
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-block',
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.9, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 75%" 
          } 
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-secondary mb-3">Testimonials</h2>
        <h3 className="section-title mb-0">Kind Words</h3>
      </div>
      
      <div className="flex flex-col gap-16">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="testimonial-block text-center border-b border-secondary/10 pb-16 last:border-0 last:pb-0">
            <p className="text-2xl md:text-3xl font-serif text-ink italic mb-8 leading-relaxed font-light">
              "{testimonial.text}"
            </p>
            <div>
              <h4 className="font-bold text-ink tracking-wide uppercase text-sm mb-1">{testimonial.name}</h4>
              <span className="text-secondary text-sm italic">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
