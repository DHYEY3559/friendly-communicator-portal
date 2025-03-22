
import React from 'react';
import { X, Home, Mic, MessageSquare, HandMetal, Settings, User, HelpCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  openAuthModal: (mode: 'signin' | 'signup') => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, openAuthModal }) => {
  const { isAuthenticated, user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Mic, label: 'Speech to Text', href: '/speech-to-text' },
    { icon: MessageSquare, label: 'Text to Speech', href: '/text-to-speech' },
    { icon: HandMetal, label: 'Sign Language', href: '/sign-language' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Side Panel */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-semibold tracking-tight">
              <span className="text-gradient">Speak<span className="font-bold">Sign</span></span>
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary transition-all duration-200 md:hidden"
              aria-label="Close side panel"
            >
              <X size={20} />
            </button>
          </div>
          
          {isAuthenticated && user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                {user.avatar ? (
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
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sticky bottom-0 w-full bg-sidebar p-4 border-t border-border z-10">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Close panel"
            >
              <X size={16} />
              Close Panel
            </button>
          </div>
          
          {!isAuthenticated && (
            <div className="p-4 border-t border-border mt-auto">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => openAuthModal('signin')}
                  className="w-full text-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="w-full text-center px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidePanel;
