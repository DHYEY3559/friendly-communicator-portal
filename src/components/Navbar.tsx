
import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from './Button';

interface NavbarProps {
  toggleSidePanel: () => void;
  openAuthModal: (mode: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidePanel, openAuthModal }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidePanel}
              className="p-2 mr-4 rounded-full hover:bg-secondary transition-all duration-200"
              aria-label="Toggle side panel"
            >
              <Menu size={24} />
            </button>
            <a href="/" className="text-2xl font-semibold tracking-tight">
              <span className="text-gradient">Speak<span className="font-bold">Sign</span></span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#about" className="nav-link">About</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => openAuthModal('signin')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => openAuthModal('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-all duration-200"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="glass mt-2 rounded-lg mx-4 py-4 px-2 animate-scale-in">
            <div className="flex flex-col space-y-2">
              <a href="#features" className="nav-link py-3" onClick={toggleMobileMenu}>Features</a>
              <a href="#how-it-works" className="nav-link py-3" onClick={toggleMobileMenu}>How It Works</a>
              <a href="#about" className="nav-link py-3" onClick={toggleMobileMenu}>About</a>
              
              <div className="pt-2 border-t border-border mt-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3 p-2">
                    <div className="flex items-center space-x-2">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full border-2 border-primary"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                      )}
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 p-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        openAuthModal('signin');
                        toggleMobileMenu();
                      }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        openAuthModal('signup');
                        toggleMobileMenu();
                      }}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
