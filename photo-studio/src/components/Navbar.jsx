import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from('.nav-item', { y: -20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 2.2 });
        gsap.from('.nav-logo', { opacity: 0, duration: 1, ease: "power2.out", delay: 2 });
      });
    }, navRef);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Toggle compact state
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Toggle hide/show on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true); // Scrolling down
      } else {
        setIsHidden(false); // Scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          className="md:hidden flex flex-col gap-[6px] z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-8 h-[1px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-ink rotate-45 translate-y-[7px]' : (isScrolled ? 'bg-ink' : 'bg-white')}`}></span>
          <span className={`w-8 h-[1px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-ink opacity-0' : (isScrolled ? 'bg-ink' : 'bg-white')}`}></span>
          <span className={`w-8 h-[1px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-ink -rotate-45 -translate-y-[7px]' : (isScrolled ? 'bg-ink' : 'bg-white')}`}></span>
        </button>

        <a href="#" className={`nav-logo text-2xl font-serif font-bold tracking-widest uppercase transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}>
          Studio
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className={`nav-item text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled ? 'text-inkLight hover:text-ink' : 'text-white/70 hover:text-white'}`}>ABOUT</a>
          <a href="#services" className={`nav-item text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled ? 'text-inkLight hover:text-ink' : 'text-white/70 hover:text-white'}`}>SERVICES</a>
          <a href="#portfolio" className={`nav-item text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled ? 'text-inkLight hover:text-ink' : 'text-white/70 hover:text-white'}`}>PORTFOLIO</a>
          <a href="#blog" className={`nav-item text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled ? 'text-inkLight hover:text-ink' : 'text-white/70 hover:text-white'}`}>JOURNAL</a>
          <a href="#contact" className={`nav-item text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled ? 'text-inkLight hover:text-ink' : 'text-white/70 hover:text-white'}`}>CONTACT</a>
        </div>
        
        <button className={`nav-item hidden md:block px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${isScrolled ? 'bg-ink text-white hover:bg-accent' : 'bg-white text-ink hover:bg-accent hover:text-white'}`}>
          Book a Session
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-base z-30 transition-all duration-500 ease-in-out flex flex-col justify-center items-center gap-8 ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-ink uppercase tracking-widest">About</a>
        <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-ink uppercase tracking-widest">Services</a>
        <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-ink uppercase tracking-widest">Portfolio</a>
        <a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-ink uppercase tracking-widest">Journal</a>
        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif text-ink uppercase tracking-widest">Contact</a>
        <button className="bg-ink text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase mt-4">
          Book a Session
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
