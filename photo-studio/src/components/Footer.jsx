import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Large typography line-by-line reveal
        gsap.fromTo('.footer-title-line',
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 1, 
            stagger: 0.15, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: footerRef.current, 
              start: "top 90%" 
            } 
          }
        );
        
        // Meta items fade in
        gsap.fromTo('.footer-meta',
          { y: 20, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: '.footer-meta-container', 
              start: "top 95%" 
            } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set('.footer-title-line', { y: 0, opacity: 1 });
        gsap.set('.footer-meta', { y: 0, opacity: 1 });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-ink pt-32 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive final statement */}
        <div className="mb-32 overflow-hidden">
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-bold text-white leading-[1.05] tracking-tight">
            <span className="block overflow-hidden"><span className="footer-title-line inline-block">YOUR STORY</span></span>
            <span className="block overflow-hidden"><span className="footer-title-line inline-block italic text-accent">DESERVES TO BE</span></span>
            <span className="block overflow-hidden"><span className="footer-title-line inline-block">REMEMBERED.</span></span>
          </h2>
        </div>
        
        {/* Meta links */}
        <div className="footer-meta-container flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-12 gap-8">
          
          <div className="flex flex-wrap gap-8">
            <a href="#" className="footer-meta text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors">Instagram</a>
            <a href="mailto:hello@studio.com" className="footer-meta text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors">Email</a>
            <a href="#contact" className="footer-meta text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors">Contact</a>
            <a href="#" className="footer-meta text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="footer-meta">
            <p className="text-white/30 text-[10px] tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Studio. All Rights Reserved.
            </p>
          </div>
          
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
