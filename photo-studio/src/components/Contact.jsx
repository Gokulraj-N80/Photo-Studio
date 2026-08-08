import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.form-element',
          { y: 20, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: '.contact-form-container', 
              start: "top 80%" 
            } 
          }
        );
        
        gsap.fromTo('.sidebar-info',
          { x: 30, opacity: 0 },
          { 
            x: 0, opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: '.sidebar-container', 
              start: "top 80%" 
            } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo('.form-element, .sidebar-info', 
          { opacity: 0 }, 
          { opacity: 1, duration: 1.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto border-t border-secondary/10">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* Form Area */}
        <div className="w-full lg:w-7/12 contact-form-container">
          <div className="form-element mb-12">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-4">LET'S CREATE</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-ink leading-tight">
              Something Worth<br/>Remembering.
            </h3>
            <p className="text-inkLight text-lg font-light mt-6 max-w-md">
              Tell us about your story, your vision, and the moments you want us to capture.
            </p>
          </div>
          
          <form className="flex flex-col gap-8">
            <div className="form-element border-b border-inkLight/30 pb-4">
              <input type="text" placeholder="Name" className="w-full bg-transparent text-ink placeholder-inkLight focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-inkLight/30 pb-4">
              <input type="email" placeholder="Email" className="w-full bg-transparent text-ink placeholder-inkLight focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-inkLight/30 pb-4">
              <input type="tel" placeholder="Phone" className="w-full bg-transparent text-ink placeholder-inkLight focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-inkLight/30 pb-4">
              <select className="w-full bg-transparent text-ink focus:outline-none text-sm tracking-wide appearance-none cursor-pointer">
                <option value="" disabled selected className="text-inkLight">Photography Type</option>
                <option value="wedding">Wedding</option>
                <option value="portrait">Portrait</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="form-element border-b border-inkLight/30 pb-4">
              <input type="text" placeholder="Preferred Date" className="w-full bg-transparent text-ink placeholder-inkLight focus:outline-none text-sm tracking-wide" />
            </div>
            <div className="form-element border-b border-inkLight/30 pb-4">
              <textarea placeholder="Message" rows="4" className="w-full bg-transparent text-ink placeholder-inkLight focus:outline-none text-sm tracking-wide resize-none"></textarea>
            </div>
            
            <div className="form-element mt-4">
              <button type="submit" className="bg-ink hover:bg-accent text-white px-10 py-4 font-bold tracking-[0.2em] uppercase text-xs transition-colors duration-300 flex items-center justify-between w-max gap-8 group">
                SEND INQUIRY <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-5/12 sidebar-container lg:border-l border-secondary/10 lg:pl-20 pt-4 flex flex-col gap-12">
          
          <div className="sidebar-info">
            <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">STUDIO</h4>
            <p className="text-ink font-serif text-2xl mb-2">Salem · Tamil Nadu</p>
            <p className="text-inkLight font-light italic">Available Worldwide</p>
          </div>
          
          <div className="sidebar-info">
            <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">EMAIL</h4>
            <a href="mailto:hello@studio.com" className="text-ink font-serif text-2xl hover:text-accent transition-colors">hello@studio.com</a>
          </div>
          
          <div className="sidebar-info">
            <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">PHONE</h4>
            <p className="text-ink font-serif text-2xl">+91 XXXXX XXXXX</p>
          </div>
          
          <div className="sidebar-info">
            <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">SOCIAL</h4>
            <a href="#" className="text-ink font-serif text-2xl hover:text-accent transition-colors">Instagram</a>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
