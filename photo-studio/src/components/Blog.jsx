import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    date: "12 MAY 2026",
    category: "WEDDINGS",
    title: "THE ART OF UNSCRIPTED MOMENTS",
    excerpt: "Why the photographs we don't plan are often the ones we treasure most.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "28 APR 2026",
    category: "PORTRAITS",
    title: "LIGHT, SHADOW & PORTRAIT",
    excerpt: "How natural light can transform a simple portrait.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "09 APR 2026",
    category: "STUDIO",
    title: "BEHIND THE FRAME",
    excerpt: "A look inside our creative process and visual language.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "21 MAR 2026",
    category: "EVENTS",
    title: "CAPTURING THE ENERGY",
    excerpt: "Tips on freezing the perfect high-energy moments in corporate and private events.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "14 FEB 2026",
    category: "PRE-WEDDING",
    title: "CHOOSING THE RIGHT LOCATION",
    excerpt: "How the environment you select shapes the entire narrative of your pre-wedding shoot.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "05 JAN 2026",
    category: "EQUIPMENT",
    title: "LENSES THAT TELL STORIES",
    excerpt: "A breakdown of our favorite lenses and why we choose them for specific shots.",
    img: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop"
  }
];

const Blog = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const cards = gsap.utils.toArray('.journal-card');

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate section header
        gsap.fromTo('.journal-header',
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true
            }
          }
        );

        // 3D Stagger Reveal for the Cards
        gsap.fromTo(cards,
          { 
            y: 50, 
            opacity: 0, 
            rotationY: 10, 
            scale: 0.95,
            transformPerspective: 1200,
            transformOrigin: "bottom center"
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { 
              trigger: '.journal-grid', 
              start: "top 88%",
              once: true
            }
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((card) => {
          gsap.fromTo(card, { opacity: 0 }, { 
            opacity: 1, duration: 0.8, stagger: 0.1, 
            scrollTrigger: { 
              trigger: card, 
              start: "top 88%",
              once: true
            } 
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 w-full bg-[#FFFDF8] border-t border-[#12100E]/5">
      <div className="max-w-7xl mx-auto">
        <div className="journal-header text-center mb-12 md:mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-4">JOURNAL</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#12100E] mb-0 leading-tight">Stories, Ideas &<br/>Behind the Lens</h3>
        </div>
        
        <div className="journal-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="journal-card group cursor-pointer flex flex-col h-full">
              <div className="aspect-square md:aspect-[4/5] overflow-hidden mb-4 md:mb-8 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="journal-img w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                />
              </div>
              <div className="journal-text flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <span className="text-[9px] md:text-[10px] text-[#12100E]/70 font-bold uppercase tracking-widest">{post.date}</span>
                  <span className="text-[#C5A059]/50">•</span>
                  <span className="text-[9px] md:text-[10px] text-[#C5A059] font-bold uppercase tracking-widest">{post.category}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-[#12100E] mb-2 md:mb-4 leading-snug group-hover:text-[#C5A059] transition-colors">{post.title}</h4>
                <p className="text-[#12100E]/70 text-xs md:text-sm font-light leading-relaxed mb-4 md:mb-6 flex-grow">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#12100E] group-hover:text-[#C5A059] transition-colors mt-auto">
                  Read Story <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
