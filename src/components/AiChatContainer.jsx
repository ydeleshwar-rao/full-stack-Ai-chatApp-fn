// components/AiChatContainer.jsx
import { useRef, useEffect, useState } from "react";
import { useAiStore } from "../store/useAiStore";
import { useAuthStore } from "../store/useAuthStore";
import { aiService } from "../service/aiService";
import { formatMessageTime } from "../lib/utils";
import { Bot, Send, Settings, Trash2 } from "lucide-react";

const AiChatContainer = () => {
  const {
    aiMessages,
    addAiMessage,
    isGeneratingResponse,
    setGeneratingResponse,
    openaiApiKey,
    aiPrompt,
    updateTokenUsage,
    clearAiMessages,
    toggleAiChat
  } = useAiStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (messageEndRef.current && aiMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isGeneratingResponse) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addAiMessage({
      type: 'user',
      content: userMessage,
      senderId: authUser.id
    });

    setGeneratingResponse(true);

    try {
      // Initialize AI service with API key
      aiService.initializeModel(openaiApiKey);

      // Build conversation history for context
      const conversationHistory = aiMessages
        .filter(msg => msg.type !== 'error')
        .map(msg => ({
          type: msg.type,
          content: msg.content
        }));

      // Generate AI response with custom prompt
      const response = await aiService.generateResponse(
        userMessage, 
        conversationHistory, 
        aiPrompt
      );

      // Add AI response
      addAiMessage({
        type: 'assistant',
        content: response.content,
        senderId: 'ai-assistant'
      });

      // Update token usage
      updateTokenUsage(response.usage);

    } catch (error) {
      console.error('Error generating AI response:', error);
      addAiMessage({
        type: 'error',
        content: 'Sorry, there was an error generating the response. Please check your settings.',
        senderId: 'ai-assistant'
      });
    } finally {
      setGeneratingResponse(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      
      {/* AI Chat Header */}
      <div className="w-full p-4 border-b border-base-300 bg-base-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-base-content opacity-70">
                Always online • Powered by OpenAI
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearAiMessages}
              className="btn btn-ghost btn-sm btn-circle"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleAiChat}
              className="btn btn-ghost btn-sm btn-circle"
              title="AI Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4">
        
        {/* Welcome Message */}
        {aiMessages.length === 0 && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="size-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-content" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <span className="text-sm">AI Assistant</span>
            </div>
            <div className="chat-bubble bg-base-200">
              <p>Hello! I'm your AI assistant. How can I help you today?</p>
              <p className="text-xs mt-1 opacity-70">
                💡 I follow your custom prompt: "{aiPrompt.slice(0, 50)}..."
              </p>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {aiMessages.map((message) => (
          <div
            key={message.id}
            className={`chat ${message.senderId === authUser.id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border flex items-center justify-center">
                {message.senderId === authUser.id ? (
                  <img 
                    src={authUser.profilePic || "/avatar.png"} 
                    alt="You" 
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-content" />
                  </div>
                )}
              </div>
            </div>

            <div className="chat-header mb-1">
              <span className="text-sm">
                {message.senderId === authUser.id ? "You" : "AI Assistant"}
              </span>
              <time className="text-xs opacity-50 ml-2">
                {formatMessageTime(message.timestamp)}
              </time>
            </div>

            <div className={`chat-bubble flex flex-col ${
              message.type === 'error' ? 'chat-bubble-error' : ''
            } ${message.senderId === authUser.id ? 'chat-bubble-primary' : ''}`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isGeneratingResponse && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="size-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-content animate-pulse" />
              </div>
            </div>
            <div className="chat-bubble">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message to AI..."
            className="input input-bordered flex-1"
            disabled={isGeneratingResponse}
            maxLength={500}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isGeneratingResponse}
            className="btn btn-primary"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-base-content opacity-50 mt-1">
          {input.length}/500 characters • Press Enter to send
        </div>
      </div>
    </div>
  );
};

export default AiChatContainer;