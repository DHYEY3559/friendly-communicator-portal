
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const delayClass = delay ? `animate-delay-${delay}` : '';
  
  return (
    <div className={`feature-card group animate-fade-in ${delayClass}`}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
