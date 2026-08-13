import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import SEOServicePage from './pages/SEOServicePage';

// Simple protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 10);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* SEO Landing Pages */}
          <Route path="/wedding-photography-salem" element={<SEOServicePage 
            serviceName="Wedding Photography" 
            path="/wedding-photography-salem"
            heroImage="/images/wedding/wedding-32.webp"
            description="Premium Wedding Photography in Salem, Tamil Nadu. We capture your special day with elegance and authenticity."
            features={["Candid Moments", "Traditional Ceremonies", "Pre & Post Wedding Shoots", "Premium Albums"]}
          />} />
          <Route path="/pre-wedding-photography-salem" element={<SEOServicePage 
            serviceName="Pre-Wedding Photography" 
            path="/pre-wedding-photography-salem"
            heroImage="/images/pre-wedding/pre-1.webp"
            description="Romantic and cinematic Pre-Wedding Photography in Salem. Tell your love story before the big day."
            features={["Outdoor Locations", "Concept Based Shoots", "Cinematic Videography", "Save the Date Reels"]}
          />} />
          <Route path="/candid-photography-salem" element={<SEOServicePage 
            serviceName="Candid Photography" 
            path="/candid-photography-salem"
            heroImage="/images/candid/candid-1.webp"
            description="Professional Candid Photography in Salem. We catch the raw, unscripted emotions of your events."
            features={["Unobtrusive Approach", "Natural Lighting", "Emotionally Driven", "Storytelling Focus"]}
          />} />
          <Route path="/portrait-photography-salem" element={<SEOServicePage 
            serviceName="Portrait Photography" 
            path="/portrait-photography-salem"
            heroImage="/images/portraits/portrait-1.webp"
            description="Stunning Portrait Photography in Salem. Perfect for fashion, editorials, and personal branding."
            features={["Studio & Outdoor Setup", "Professional Lighting", "Editorial Styling", "High-End Retouching"]}
          />} />
          <Route path="/event-photography-salem" element={<SEOServicePage 
            serviceName="Event Photography" 
            path="/event-photography-salem"
            heroImage="/images/wedding/wedding-2.webp"
            description="Comprehensive Event Photography in Salem for corporate, birthday, and special gatherings."
            features={["Full Coverage", "Quick Turnaround", "Group & Solo Shots", "Professional Editing"]}
          />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
