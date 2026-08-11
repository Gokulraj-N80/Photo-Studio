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
        gsap.from('.nav-item', { y: -20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.5 });
        gsap.from('.nav-logo', { opacity: 0, duration: 1, ease: "power2.out", delay: 0.2 });
      });
    }, navRef);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Works', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-[#12100e]/90 backdrop-blur-[14px] border-b border-white/[0.08]' 
          : 'py-6 bg-transparent border-b border-transparent'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#" className="nav-logo flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Pixelbees Photography Logo" 
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${isScrolled ? 'h-10' : 'h-14'}`}
          />
          <span className={`font-serif uppercase tracking-[0.15em] font-bold transition-all duration-500 hidden sm:block ${isScrolled ? 'text-[#FFFDF8] text-sm' : 'text-[#FFFDF8] text-base'}`}>
            Pixelbees
            <span className="block text-[8px] tracking-[0.3em] font-sans font-normal text-[#C5A059] -mt-1">Photography</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="nav-item text-xs font-sans font-medium uppercase tracking-[0.15em] text-softWhite hover:text-champagneGold transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagneGold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <a href="#booking" className="nav-btn hidden md:flex items-center justify-center bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-6 py-[10px] rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow-md">
          Book a Session
        </a>

        <button 
          className="md:hidden flex flex-col gap-[6px] z-50 p-2 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-8 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-champagneGold rotate-45 translate-y-[8px]' : 'bg-softWhite'}`}></span>
          <span className={`w-8 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-champagneGold opacity-0' : 'bg-softWhite'}`}></span>
          <span className={`w-8 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-champagneGold -rotate-45 -translate-y-[8px]' : 'bg-softWhite'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-espresso/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out flex flex-col justify-center items-center gap-8 ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-2xl font-serif text-softWhite hover:text-champagneGold uppercase tracking-widest transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="bg-champagneGold text-espresso px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase mt-6 text-center">
          Book a Session
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
