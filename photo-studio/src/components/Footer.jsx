import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Camera, Navigation, Compass, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [mapType, setMapType] = useState('street'); // 'street' | 'satellite'

  const handleNavClick = (e, href) => {
    if (href.includes('#')) {
      e.preventDefault();
      
      const [path, hash] = href.split('#');
      const targetPath = path || '/';

      if (location.pathname === targetPath || location.pathname === '') {
        if (!hash || hash === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '/');
          return;
        }

        const element = document.getElementById(hash);
        if (element) {
          const navHeight = 75;
          const targetY = element.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
          window.history.pushState(null, '', href);
        }
      } else {
        navigate(href);
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo('.footer-col',
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: footerRef.current, 
              start: "top 85%" 
            } 
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set('.footer-col', { y: 0, opacity: 1 });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0B0908] pt-20 md:pt-28 pb-12 px-6 lg:px-14 w-full border-t border-white/5">
      <div className="w-full max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 items-start">
          
          {/* Column 1: Brand (lg:col-span-3) */}
          <div className="footer-col opacity-0 lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3.5 mb-6 group">
              <div className="w-11 h-11 rounded-full bg-[#161412] border border-[#C5A059]/40 shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                <Camera className="w-5 h-5 text-[#C5A059]" />
              </div>
              <span className="font-serif uppercase tracking-[0.15em] font-bold text-[#FFFDF8] text-xl md:text-2xl">
                Apex Studio
                <span className="block text-[10px] tracking-[0.3em] font-sans font-normal text-[#C5A059] mt-0.5">Creative Photography</span>
              </span>
            </Link>
            <p className="text-[#FFFDF8]/60 text-sm font-light leading-relaxed mb-6 max-w-sm">
              Capturing cinematic moments and preserving your most precious memories with elegance and artistic vision.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-[#FFFDF8]/80 hover:bg-[#C5A059] hover:text-[#0B0908] hover:border-[#C5A059] transition-all duration-300 text-xs font-bold tracking-wider hover:scale-105">IG</a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-[#FFFDF8]/80 hover:bg-[#C5A059] hover:text-[#0B0908] hover:border-[#C5A059] transition-all duration-300 text-xs font-bold tracking-wider hover:scale-105">FB</a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-[#FFFDF8]/80 hover:bg-[#C5A059] hover:text-[#0B0908] hover:border-[#C5A059] transition-all duration-300 text-xs font-bold tracking-wider hover:scale-105">X</a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="footer-col opacity-0 lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.22em] text-[#C5A059] uppercase mb-6 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" /> Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li><a href="/#hero" onClick={(e) => handleNavClick(e, '/#hero')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors inline-block cursor-pointer">Home</a></li>
              <li><a href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors inline-block cursor-pointer">About Us</a></li>
              <li><a href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors inline-block cursor-pointer">Services</a></li>
              <li><a href="/#gallery" onClick={(e) => handleNavClick(e, '/#gallery')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors inline-block cursor-pointer">Our Works</a></li>
              <li><a href="/#booking" onClick={(e) => handleNavClick(e, '/#booking')} className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors inline-block cursor-pointer">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info (lg:col-span-3) */}
          <div className="footer-col opacity-0 lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.22em] text-[#C5A059] uppercase mb-6 flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-[#C5A059]" /> Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <span className="text-[#FFFDF8]/70 text-sm leading-relaxed">450 Fashion Avenue, Suite 12,<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="text-[#FFFDF8]/70 text-sm">+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:hello@apexstudio.com" className="text-[#FFFDF8]/70 hover:text-[#C5A059] text-sm transition-colors break-all">hello@apexstudio.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Elegant Studio Location Card (lg:col-span-4) */}
          <div className="footer-col opacity-0 lg:col-span-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold tracking-[0.22em] text-[#C5A059] uppercase flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> Studio Location
              </h4>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-sans font-semibold tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                OPEN TODAY
              </span>
            </div>

            {/* Premium Studio Location Card */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#161412] shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition-all duration-300">
              
              {/* Map View Mode Controls */}
              <div className="absolute top-3 right-3 z-10 flex items-center bg-[#0B0908]/90 backdrop-blur-md p-0.5 rounded-full border border-white/10 shadow-md">
                <button
                  type="button"
                  onClick={() => setMapType('street')}
                  className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    mapType === 'street'
                      ? 'bg-[#C5A059] text-[#0B0908] font-bold shadow-sm'
                      : 'text-[#FFFDF8]/70 hover:text-[#FFFDF8]'
                  }`}
                >
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapType('satellite')}
                  className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    mapType === 'satellite'
                      ? 'bg-[#C5A059] text-[#0B0908] font-bold shadow-sm'
                      : 'text-[#FFFDF8]/70 hover:text-[#FFFDF8]'
                  }`}
                >
                  Satellite
                </button>
              </div>

              {/* Privacy-friendly, AdBlock-safe Studio Map Embed */}
              <div className="w-full h-[180px] sm:h-[195px] relative overflow-hidden bg-[#161412]">
                <iframe
                  title="Apex Studio Location - 450 Fashion Ave, New York"
                  src={
                    mapType === 'street'
                      ? "https://www.openstreetmap.org/export/embed.html?bbox=-73.9935%2C40.7505%2C-73.9815%2C40.7565&layer=mapnik&marker=40.7533%2C-73.9876"
                      : "https://www.openstreetmap.org/export/embed.html?bbox=-73.9935%2C40.7505%2C-73.9815%2C40.7565&layer=hot&marker=40.7533%2C-73.9876"
                  }
                  className="w-full h-full border-0"
                  style={{
                    filter: mapType === 'street' 
                      ? 'invert(92%) hue-rotate(180deg) brightness(92%) contrast(92%)' 
                      : 'brightness(90%) contrast(105%)'
                  }}
                  loading="lazy"
                  allowFullScreen={false}
                  referrerPolicy="no-referrer"
                />

                {/* Location Beacon Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#C5A059]/30 animate-ping" />
                    <div className="w-7 h-7 rounded-full bg-[#C5A059] border-2 border-[#12100E] shadow-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#12100E]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Info & Action Footer Strip */}
              <div className="p-3.5 sm:p-4 bg-[#12100E] flex items-center justify-between border-t border-white/10 gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#C5A059]">Manhattan Fashion District</span>
                  <span className="text-xs font-serif font-bold text-[#FFFDF8] truncate">450 Fashion Ave, Suite 12, NYC</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=450+Fashion+Avenue+New+York+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B0908] text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all duration-300 shadow-sm shrink-0 hover:scale-105"
                >
                  Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col opacity-0 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFDF8]/40 text-xs text-center md:text-left tracking-wide">
            &copy; {new Date().getFullYear()} Apex Studio. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#FFFDF8]/40 hover:text-[#FFFDF8] text-xs transition-colors tracking-wide">Privacy Policy</a>
            <a href="#" className="text-[#FFFDF8]/40 hover:text-[#FFFDF8] text-xs transition-colors tracking-wide">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
