import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '/#hero', id: 'hero' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Services', href: '/#services', id: 'services' },
    { name: 'Our Works', href: '/#gallery', id: 'gallery' },
    { name: 'Blog', href: '/#blog', id: 'blog' },
    { name: 'Contact', href: '/#booking', id: 'booking' },
  ];

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from('.nav-item', { y: -20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.5 });
        gsap.from('.nav-logo', { opacity: 0, duration: 1, ease: "power2.out", delay: 0.2 });
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '') return;

    const sectionIds = ['hero', 'gallery', 'about', 'services', 'booking', 'blog'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      
      if (window.scrollY < 200) {
        setActiveSection('hero');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToTarget = (id) => {
    if (!id || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.pushState(null, '', '/');
      }
      setActiveSection('hero');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = 75;
      const targetY = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `/#${id}`);
      setActiveSection(id);
    }
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/' || location.pathname === '') {
      scrollToTarget(link.id);
    } else {
      navigate(link.href);
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 py-3.5 sm:py-4 bg-[#12100E]/95 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="/#hero" 
          onClick={(e) => handleNavClick(e, { id: 'hero', href: '/#hero' })} 
          className="nav-logo flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#12100E] border border-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-[#C5A059] group-hover:scale-105">
            <Camera className="w-5 h-5 text-[#C5A059]" />
          </div>
          <span className="font-serif uppercase tracking-[0.15em] font-bold text-[#FFFDF8] text-base hidden sm:block">
            Apex Studio
            <span className="block text-[8px] tracking-[0.3em] font-sans font-normal text-[#C5A059] -mt-1">Creative Photography</span>
          </span>
        </a>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isHighlighted = activeSection === link.id;
            
            return (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`nav-item text-xs font-sans font-medium uppercase tracking-[0.15em] hover:text-[#C5A059] transition-colors relative group py-2 cursor-pointer ${
                  isHighlighted ? 'text-[#C5A059]' : 'text-[#FFFDF8]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                  isHighlighted ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            );
          })}
        </div>
        
        {/* Book a Session CTA */}
        <a 
          href="/#booking" 
          onClick={(e) => handleNavClick(e, { id: 'booking', href: '/#booking' })} 
          className="nav-btn hidden md:flex items-center justify-center bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-6 py-[10px] rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow-md cursor-pointer"
        >
          Book a Session
        </a>

        {/* Mobile Navbar Controls */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <a 
            href="/#hero" 
            onClick={(e) => handleNavClick(e, { id: 'hero', href: '/#hero' })} 
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#FFFDF8]/20 bg-[#FFFDF8]/5 text-[#FFFDF8] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#12100E] transition-all duration-300"
          >
            <Home className="w-4 h-4" />
          </a>
          
          <button 
            type="button"
            aria-label="Toggle navigation menu"
            className="flex flex-col justify-center items-center w-10 h-10 rounded-full border border-[#FFFDF8]/20 bg-[#FFFDF8]/5 hover:bg-[#C5A059] hover:border-[#C5A059] transition-all duration-300 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] rotate-45' : 'bg-[#FFFDF8] -translate-y-[5px]'}`}></span>
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] opacity-0' : 'bg-[#FFFDF8]'}`}></span>
            <span className={`w-4 h-[1.5px] transition-all duration-300 absolute ${isMobileMenuOpen ? 'bg-[#FFFDF8] -rotate-45' : 'bg-[#FFFDF8] translate-y-[5px]'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed top-0 left-0 w-screen h-[100dvh] bg-[#12100E] z-40 transition-transform duration-700 ease-in-out flex flex-col pt-24 pb-10 px-8 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-y-6 w-full relative z-10">
            {navLinks.map((link, idx) => {
              const delay = isMobileMenuOpen ? `${0.2 + idx * 0.05}s` : '0s';
              const isHighlighted = activeSection === link.id;

              return (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link)} 
                  className={`text-3xl font-serif transition-all duration-500 ease-out cursor-pointer ${
                    isHighlighted ? 'text-[#C5A059]' : 'text-[#FFFDF8] hover:text-[#C5A059]'
                  } ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: delay }}
                >
                  <span className="text-[#C5A059] text-xs font-sans mr-4 opacity-50">0{idx + 1}</span>
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>

        <div className={`mt-auto relative z-10 transition-all duration-700 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isMobileMenuOpen ? '0.6s' : '0s' }}>
          <a 
            href="/#booking" 
            onClick={(e) => handleNavClick(e, { id: 'booking', href: '/#booking' })} 
            className="block w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] px-8 py-4 rounded-sm text-xs font-bold tracking-[0.2em] uppercase text-center transition-colors cursor-pointer"
          >
            Book a Session
          </a>
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#FFFDF8]/10">
            <a href="mailto:hello@apexstudio.com" className="text-[10px] uppercase tracking-widest text-[#FFFDF8]/60 hover:text-[#C5A059]">hello@apexstudio.com</a>
            <span className="text-[10px] uppercase tracking-widest text-[#FFFDF8]/60">New York, NY</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
