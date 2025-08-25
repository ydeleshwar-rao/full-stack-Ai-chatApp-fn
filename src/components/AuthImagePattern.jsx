import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Zap, Shield, Brain, Users } from 'lucide-react';

const AuthImagePattern = ({ title, subtitle }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart AI Responses",
      description: "Get intelligent answers to any question"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Instant responses powered by advanced AI"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "Your conversations are private and protected"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Contexts",
      description: "Chat about anything - work, learning, creativity"
    }
  ];

const promptExamples = [
  "• Chat with AI Assistant about any topic",
  "• Summarize long text or articles",
  "• Write a creative short story",
  "• Plan my weekend trip with suggestions",
  "• Translate and simplify complex text",
  "• Create a study guide from my notes"
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12">
      <div className="max-w-lg text-center space-y-8">
        
        {/* Animated Chat Bubbles */}
        <div className="relative h-48 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 opacity-10">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-2xl bg-primary/30 ${
                    i % 2 === 0 ? "animate-pulse" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Floating Chat Elements */}
          <div className="absolute top-4 left-8 bg-primary text-primary-content p-3 rounded-2xl rounded-bl-sm shadow-lg animate-bounce">
            <MessageSquare className="w-5 h-5" />
          </div>
          
          <div className="absolute top-16 right-12 bg-secondary text-secondary-content p-4 rounded-2xl rounded-br-sm shadow-lg animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          
          <div className="absolute bottom-8 left-16 bg-accent text-accent-content px-4 py-2 rounded-full text-sm shadow-lg">
            AI Chat
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-base-content/60 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="bg-base-100 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {features[currentFeature].icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-base-content">
                {features[currentFeature].title}
              </h3>
              <p className="text-sm text-base-content/60">
                {features[currentFeature].description}
              </p>
            </div>
          </div>
          
          {/* Feature Indicators */}
          <div className="flex justify-center gap-2">
            {features.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentFeature ? 'bg-primary w-6' : 'bg-base-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Example Prompts */}
        <div className="space-y-3">
          <h3 className="font-semibold text-base-content/80 text-sm uppercase tracking-wide">
            Try asking:
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {promptExamples.map((prompt, i) => (
              <div
                key={i}
                className="bg-base-100/50 hover:bg-base-100 transition-all cursor-pointer rounded-lg px-3 py-2 text-xs text-base-content/70 hover:text-base-content border border-base-300/50 hover:border-primary/30"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-base-content/50">Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">∞</div>
            <div className="text-xs text-base-content/50">Topics</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">⚡</div>
            <div className="text-xs text-base-content/50">Fast</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthImagePattern;