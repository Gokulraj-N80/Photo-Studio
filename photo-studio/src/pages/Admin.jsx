import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, LayoutDashboard, Calendar, Settings, Trash2, Mail, Phone, Clock, CheckCircle, LogOut } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to delete booking');
      
      // Update state without refetching
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmBooking = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/bookings/${id}/confirm`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to confirm booking');
      const data = await response.json();
      // Update status locally without refetching
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'confirmed' } : b));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#12100E] flex font-sans text-softWhite selection:bg-[#C5A059] selection:text-[#12100E]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1714] border-r border-white/[0.05] hidden md:flex flex-col flex-shrink-0">
        <div className="p-8 flex items-center gap-3 border-b border-white/[0.05]">
          <Camera className="w-6 h-6 text-[#C5A059]" />
          <div>
            <h1 className="font-serif font-bold tracking-wider text-sm uppercase text-[#FFFDF8]">Pixelbees</h1>
            <span className="block text-[8px] tracking-[0.3em] font-sans font-normal text-[#C5A059] -mt-1">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md bg-[#C5A059]/10 text-[#C5A059] font-medium text-xs tracking-wider uppercase">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md text-[#FFFDF8]/70 hover:text-[#FFFDF8] hover:bg-white/5 font-medium text-xs tracking-wider uppercase transition-colors">
            <Calendar className="w-4 h-4" />
            Calendar
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md text-[#FFFDF8]/70 hover:text-[#FFFDF8] hover:bg-white/5 font-medium text-xs tracking-wider uppercase transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </a>
        </nav>
        
        {/* Logout Button */}
        <div className="p-6 border-t border-white/[0.05]">
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/');
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-red-400/80 hover:text-red-400 hover:bg-red-400/10 font-medium text-xs tracking-wider uppercase transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 border-b border-white/[0.05] bg-[#1a1714]/50 flex items-center justify-between px-8">
          <h2 className="font-serif text-2xl font-bold">Booking Requests</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-[10px] text-[#C5A059] uppercase tracking-wider">Superadmin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-[#12100E] font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1a1714] p-6 rounded-lg border border-white/[0.05]">
              <h3 className="text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-2">Total Bookings</h3>
              <p className="font-serif text-4xl">{bookings.length}</p>
            </div>
            <div className="bg-[#1a1714] p-6 rounded-lg border border-white/[0.05]">
              <h3 className="text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-2">Recent Requests</h3>
              <p className="font-serif text-4xl">
                {bookings.filter(b => new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
            <div className="bg-[#1a1714] p-6 rounded-lg border border-white/[0.05]">
              <h3 className="text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-2">Status</h3>
              <p className="font-serif text-4xl text-green-400">Active</p>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-[#1a1714] rounded-lg border border-white/[0.05] overflow-hidden">
            <div className="p-6 border-b border-white/[0.05] flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold">Recent Inquiries</h3>
              <button 
                onClick={fetchBookings}
                className="text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#FFFDF8] transition-colors"
              >
                Refresh Data
              </button>
            </div>
            
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-[#FFFDF8]/50">Loading bookings...</div>
              ) : error ? (
                <div className="p-12 text-center text-red-400">Error: {error}</div>
              ) : bookings.length === 0 ? (
                <div className="p-12 text-center text-[#FFFDF8]/50">No booking requests found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-[#FFFDF8]/50">
                      <th className="p-4 font-medium">Client</th>
                      <th className="p-4 font-medium">Contact</th>
                      <th className="p-4 font-medium">Session Type</th>
                      <th className="p-4 font-medium">Requested Date</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-bold text-xs">
                              {booking.firstName[0]}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-[#FFFDF8]">{booking.firstName} {booking.lastName}</p>
                              <p className="text-[10px] text-[#FFFDF8]/50 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" /> {new Date(booking.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 space-y-1">
                          <p className="text-xs text-[#FFFDF8]/70 flex items-center gap-2">
                            <Mail className="w-3 h-3 text-[#C5A059]" /> {booking.email}
                          </p>
                          <p className="text-xs text-[#FFFDF8]/70 flex items-center gap-2">
                            <Phone className="w-3 h-3 text-[#C5A059]" /> {booking.phone}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] uppercase tracking-wider rounded-full font-bold">
                            {booking.sessionType}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        </td>
                        <td className="p-4">
                          {booking.status === 'confirmed' ? (
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider rounded-full font-bold flex items-center gap-1.5 w-fit">
                              <CheckCircle className="w-3 h-3" /> Confirmed
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] uppercase tracking-wider rounded-full font-bold w-fit block">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {booking.status !== 'confirmed' && (
                              <button
                                onClick={() => confirmBooking(booking._id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-green-400/80 hover:text-green-400 hover:bg-green-400/10 rounded-md transition-colors text-[10px] font-bold uppercase tracking-wider border border-green-400/20 hover:border-green-400/40"
                                title="Confirm Booking"
                              >
                                <CheckCircle className="w-3 h-3" /> Confirm
                              </button>
                            )}
                            <button 
                              onClick={() => deleteBooking(booking._id)}
                              className="p-2 text-[#FFFDF8]/30 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Admin;
