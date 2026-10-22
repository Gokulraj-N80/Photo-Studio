import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingCalendar from './BookingCalendar';
import './BookingCalendar.css';

gsap.registerPlugin(ScrollTrigger);

const BookingSection = ({ selectedCategory = 'wedding', onCategoryChange }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Split Full Name into firstName and lastName for the backend schema
    if (data.firstName) {
      const nameParts = data.firstName.trim().split(' ');
      data.firstName = nameParts[0];
      data.lastName = nameParts.slice(1).join(' ') || ' '; // fallback if no last name
    }

    // Add selected category and date explicitly if not part of form data
    data.sessionType = selectedCategory;
    if (selectedDate) {
      data.date = selectedDate.toISOString();
    } else {
      setError('Please select a date from the calendar.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://photo-studio-1nvn.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setSuccess(true);
      e.target.reset(); // Clear the form
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" ref={sectionRef} className="py-12 md:py-16 px-4 sm:px-6 md:px-8 w-full bg-[#12100E]">
      <div ref={cardRef} className="w-full max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-12 bg-[#FFFDF8] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#C5A059]/25">
        
        {/* Left Side - Image with balanced portrait proportions */}
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
          <img 
            src="/images/wedding/wedding-4.webp" 
            alt="Apex Studio Session" 
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80') {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80';
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/75 via-[#12100E]/15 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-[#FFFDF8]">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-1 drop-shadow-md">Let's Create Magic.</h3>
            <p className="text-[10px] md:text-xs font-light tracking-widest uppercase opacity-90 drop-shadow-md">Apex Studio</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#12100E] mb-1">Book a Session</h2>
          <p className="text-[#12100E]/60 text-xs md:text-sm mb-5 font-light">Tell us a bit about your vision, and we'll get back to you to finalize the details.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1 - Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Full Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-1.5 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="Julian Vance"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-1.5 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="julian@example.com"
                />
              </div>
            </div>

            {/* Row 2 - Phone, Session & Package */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-1.5 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30"
                  placeholder="+1 (212) 555-0198"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Session Type</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-1.5 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <option value="wedding">Wedding Photography</option>
                  <option value="pre-wedding">Pre-Wedding Shoot</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="event">Event Coverage</option>
                  <option value="candid">Candid Photography</option>
                  <option value="fashion">Fashion / Editorial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Package (Optional)</label>
                <select 
                  name="package"
                  defaultValue=""
                  className="w-full bg-transparent border-b border-[#12100E]/20 py-1.5 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select a package</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
            </div>

            {/* Row 3 - Calendar & Notes side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-1">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Preferred Date</label>
                <div className="w-full">
                  <BookingCalendar 
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A059] block">Your Vision</label>
                <textarea 
                  name="notes"
                  className="w-full h-[250px] bg-transparent border border-[#12100E]/20 p-3 text-xs text-[#12100E] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#12100E]/30 resize-none rounded-md"
                  placeholder="Tell us what you're dreaming of... How do you envision your shoot? Any specific locations or styles?"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] font-bold uppercase tracking-[0.18em] py-3 rounded-md transition-all duration-300 text-xs shadow-md mt-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              {isSubmitting ? 'Processing...' : 'Request Booking'}
            </button>
              
              {success && (
                <div className="mt-4 p-6 bg-[#12100E]/5 border border-[#C5A059]/20 rounded-sm text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-serif text-lg font-bold text-[#12100E] mb-1">Request Received!</p>
                  <p className="text-[#12100E]/60 text-xs leading-relaxed">Our team will contact you soon to finalize the details of your session.</p>
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-600 text-sm rounded-sm text-center">
                  {error}
                </div>
              )}
            </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
