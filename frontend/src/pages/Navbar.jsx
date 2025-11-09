import React, { useState, useEffect, useRef } from 'react';
import { Heart, Menu, X, User, Loader2 } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    setShowDropdown(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 250);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowDropdown(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MediConnect
              </span>
            </div>
           
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-slate-700 hover:text-blue-600 transition font-medium">Home</a>
              <a href="/about" className="text-slate-700 hover:text-blue-600 transition font-medium">About</a>
              <a href="/donate" className="text-slate-700 hover:text-blue-600 transition font-medium">Donate</a>
              <a href="/medicines" className="text-slate-700 hover:text-blue-600 transition font-medium">Medicines</a>
              <a href="/partner" className="text-slate-700 hover:text-blue-600 transition font-medium">Partner</a>
              <a href="/contact" className="text-slate-700 hover:text-blue-600 transition font-medium">Contact</a>
              {isLoggedIn ? (
                <div 
                  className="relative"  
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition text-slate-700"
                    title="Profile"
                  >
                    <User className="w-6 h-6" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                      <a href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile</a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/signup">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold">
                    Get Started
                  </button>
                </a>
              )}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="/about" className="block py-2 text-slate-700 hover:text-blue-600">About</a>
              <a href="/donate" className="block py-2 text-slate-700 hover:text-blue-600">Donate</a>
              <a href="/medicines" className="block py-2 text-slate-700 hover:text-blue-600">Search Medicine</a>
              <a href="/medicines" className="block py-2 text-slate-700 hover:text-blue-600">Partner</a>
              <a href="/contact" className="block py-2 text-slate-700 hover:text-blue-600">Contact</a>
              {isLoggedIn ? (
                <>
                  <a href="/profile" className="block py-2 text-slate-700 hover:text-blue-600 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a href="/signup">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold">
                    Get Started
                  </button>
                </a>
              )}
            </div>
          </div>
        )}
      </nav>

      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-center mt-2 text-slate-700">Logging out...</p>
          </div>
        </div>
      )}
    </>
  );
}