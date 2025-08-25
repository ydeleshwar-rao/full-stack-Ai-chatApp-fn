// components/FloatingAiButton.jsx
import { Bot } from 'lucide-react';
import { useAiStore } from '../store/useAiStore';

const FloatingAiButton = () => {
  const { toggleAiChat, openaiApiKey } = useAiStore();

  return (
    <button
      onClick={toggleAiChat}
      className="w-14 h-14 bg-primary hover:bg-primary-focus rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-40 group"
      title="AI Chat Assistant"
    >
      <Bot className="w-6 h-6 text-primary-content group-hover:scale-110 transition-transform" />
      
      {/* Notification dot for no API key */}
      {!openaiApiKey && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse"></div>
      )}
      
      {/* Floating tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-base-content text-base-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        AI Chat Assistant
      </div>
    </button>
  );
};

export default FloatingAiButton;

