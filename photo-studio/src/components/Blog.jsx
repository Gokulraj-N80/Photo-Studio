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
    img: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "28 APR 2026",
    category: "PORTRAITS",
    title: "LIGHT, SHADOW & PORTRAIT",
    excerpt: "How natural light can transform a simple portrait.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
  },
  {
    date: "09 APR 2026",
    category: "STUDIO",
    title: "BEHIND THE FRAME",
    excerpt: "A look inside our creative process and visual language.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
  }
];

const Blog = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const cards = gsap.utils.toArray('.journal-card');

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          const img = card.querySelector('.journal-img');
          const text = card.querySelector('.journal-text');
          
          gsap.fromTo(img,
            { clipPath: 'inset(10% 10% 10% 10%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
          );
          
          gsap.fromTo(text,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((card) => {
          const img = card.querySelector('.journal-img');
          const text = card.querySelector('.journal-text');
          gsap.fromTo([img, text], { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: card, start: "top 85%" } });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-4">JOURNAL</h2>
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-0 leading-tight">Stories, Ideas &<br/>Behind the Lens</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="journal-card group cursor-pointer flex flex-col h-full">
            <div className="aspect-[4/5] overflow-hidden mb-8 rounded-sm">
              <img 
                src={post.img} 
                alt={post.title} 
                className="journal-img w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
              />
            </div>
            <div className="journal-text flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] text-ink font-bold uppercase tracking-widest">{post.date}</span>
                <span className="text-secondary/50">•</span>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{post.category}</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-ink mb-4 leading-snug group-hover:text-accent transition-colors">{post.title}</h4>
              <p className="text-inkLight text-sm font-light leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink group-hover:text-accent transition-colors mt-auto">
                Read Story <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
