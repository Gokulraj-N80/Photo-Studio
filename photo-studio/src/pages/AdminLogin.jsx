import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12100E] flex flex-col items-center justify-center font-sans p-6 text-softWhite selection:bg-[#C5A059] selection:text-[#12100E]">
      
      {/* Branding */}
      <div className="flex flex-col items-center mb-10">
        <Camera className="w-12 h-12 text-[#C5A059] mb-4" />
        <h1 className="font-serif text-3xl font-bold tracking-widest uppercase text-[#FFFDF8]">Pixelbees</h1>
        <span className="block text-xs tracking-[0.4em] font-sans font-medium text-[#C5A059] mt-2">SECURE ADMIN</span>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-sm bg-[#1a1714] p-8 rounded-lg border border-white/[0.05] shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] flex items-center gap-2">
              <Lock className="w-3 h-3" /> Admin Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-transparent border-b border-[#12100E]/20 border-white/[0.1] py-3 text-[#FFFDF8] focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#FFFDF8]/20"
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center p-2 bg-red-400/10 rounded-sm">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12100E] font-bold uppercase tracking-[0.2em] py-3 rounded-sm transition-colors mt-4 text-xs ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>

      {/* Back to Site */}
      <button 
        onClick={() => navigate('/')}
        className="mt-8 text-[10px] uppercase tracking-[0.1em] text-[#FFFDF8]/40 hover:text-[#C5A059] transition-colors"
      >
        &larr; Back to Public Site
      </button>
    </div>
  );
};

export default AdminLogin;
