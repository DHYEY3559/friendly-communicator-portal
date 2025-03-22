
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SidePanel from '@/components/SidePanel';
import FeatureCard from '@/components/FeatureCard';
import AuthModal from '@/components/AuthModal';
import Button from '@/components/Button';
import { Mic, MessageSquare, HandMetal, ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidePanel={toggleSidePanel} openAuthModal={openAuthModal} />
      
      <SidePanel 
        isOpen={sidePanelOpen} 
        onClose={() => setSidePanelOpen(false)} 
        openAuthModal={openAuthModal}
      />
      
      <AuthModal 
        isOpen={authModalOpen} 
        mode={authMode} 
        onClose={closeAuthModal} 
        onToggleMode={toggleAuthMode}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Breaking <span className="text-gradient">Communication</span> Barriers
            </h1>
            <p className={`text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Experience seamless translation between speech, text, and sign language with our advanced AI-powered platform.
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" 
                onClick={() => !isAuthenticated && openAuthModal('signup')}
                rightIcon={<ArrowRight size={18} />}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '#features'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-float"></div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform offers seamless translation between different communication modes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<Mic size={36} />}
              title="Speech to Text"
              description="Instantly convert spoken words into accurate text with our advanced speech recognition technology."
              delay={1}
            />
            <FeatureCard 
              icon={<MessageSquare size={36} />}
              title="Text to Speech"
              description="Transform written text into natural-sounding speech with customizable voices and languages."
              delay={2}
            />
            <FeatureCard 
              icon={<HandMetal size={36} />}
              title="Sign Language Translation"
              description="Bridge the gap with real-time sign language translation to and from text or speech."
              delay={3}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our advanced AI technologies work seamlessly together to enable fluid communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 text-primary">
                <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-bold">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Your Content</h3>
              <p className="text-muted-foreground">Speak, type, or use sign language to input your message through our intuitive interface.</p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 text-primary">
                <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-bold">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Translation</h3>
              <p className="text-muted-foreground">Our advanced neural networks process and translate your content with high accuracy.</p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 text-primary">
                <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-bold">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Translation</h3>
              <p className="text-muted-foreground">Get instant translation in your preferred format - text, speech, or visual sign language.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">SpeakSign</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform offers unique advantages that set us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<Globe size={36} />}
              title="Universal Accessibility"
              description="Make communication accessible to everyone regardless of speech, hearing, or language abilities."
            />
            <FeatureCard 
              icon={<ShieldCheck size={36} />}
              title="Privacy Focused"
              description="Your data is secure with our encrypted processing and strict privacy policies."
            />
            <FeatureCard 
              icon={<Zap size={36} />}
              title="Real-time Performance"
              description="Experience lightning-fast translations with minimal latency for smooth conversations."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Break Communication Barriers?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already experiencing seamless communication across different modalities.
            </p>
            <Button 
              size="lg" 
              onClick={() => !isAuthenticated && openAuthModal('signup')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full filter blur-3xl"></div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                <span className="text-gradient">Speak<span className="font-bold">Sign</span></span>
              </h3>
              <p className="text-muted-foreground">
                Breaking communication barriers with advanced AI technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Speech to Text</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Text to Speech</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sign Language Translation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SpeakSign. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
