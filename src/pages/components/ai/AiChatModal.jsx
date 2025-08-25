// components/AiChatModal.jsx
import { useState } from 'react';
import { useAiStore } from '../../../store/useAiStore';
import { aiService } from '../../../service/aiService';
import { X, Bot, Settings, Save } from 'lucide-react';

const AiChatModal = () => {
  const {
    isAiChatOpen,
    toggleAiChat,
    openaiApiKey,
    setOpenaiApiKey,
    aiPrompt,
    setAiPrompt,
    tokenUsage,
    clearTokenUsage
  } = useAiStore();

  const [tempApiKey, setTempApiKey] = useState(openaiApiKey);
  const [tempPrompt, setTempPrompt] = useState(aiPrompt);
  const [setShowSettings] = useState(!openaiApiKey);

  const handleSaveApiKey = async () => {
    if (!tempApiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }

    // Validate API key
    const isValid = await aiService.validateApiKey(tempApiKey);
    
    if (isValid) {
      setOpenaiApiKey(tempApiKey);
      alert('API key saved successfully!');
    } else {
      alert('Invalid API key. Please check and try again.');
    }
  };

  const handleSavePrompt = () => {
    if (!tempPrompt.trim()) {
      alert('Please enter a prompt for AI behavior');
      return;
    }

    setAiPrompt(tempPrompt);
    alert('AI prompt saved successfully!');
  };

  const handleSaveAll = async () => {
    if (!tempApiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }

    if (!tempPrompt.trim()) {
      alert('Please enter a prompt for AI behavior');
      return;
    }

    // Validate API key first
    const isValid = await aiService.validateApiKey(tempApiKey);
    
    if (isValid) {
      setOpenaiApiKey(tempApiKey);
      setAiPrompt(tempPrompt);
      setShowSettings(false);
      toggleAiChat(); // Close modal after saving
      alert('AI settings saved! You can now chat with AI in the sidebar.');
    } else {
      alert('Invalid API key. Please check and try again.');
    }
  };

  if (!isAiChatOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg w-full max-w-lg flex flex-col shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">AI Chat Setup</h3>
          </div>
          <button 
            onClick={toggleAiChat}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="p-6 space-y-6">
          
          {/* API Key Section */}
          <div>
            <label className="label">
              <span className="label-text font-medium">OpenAI API Key</span>
              <span className="label-text-alt text-error">Required</span>
            </label>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="sk-..."
              className="input input-bordered w-full"
            />
            <div className="label">
              <span className="label-text-alt">
                Get your API key from OpenAI Dashboard
              </span>
            </div>
          </div>

          {/* AI Prompt Section */}
          <div>
            <label className="label">
              <span className="label-text font-medium">AI Behavior Prompt</span>
              <span className="label-text-alt text-error">Required</span>
            </label>
            <textarea
              value={tempPrompt}
              onChange={(e) => setTempPrompt(e.target.value)}
              placeholder="Example: You are a helpful assistant in a messaging app. Keep responses brief and friendly..."
              className="textarea textarea-bordered w-full h-24 resize-none"
              maxLength={1000}
            />
            <div className="label">
              <span className="label-text-alt">
                {tempPrompt.length}/1000 characters - Define how AI should behave
              </span>
            </div>
          </div>

          {/* Token Usage Info */}
          <div className="bg-base-200 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Token Usage</span>
              <button 
                onClick={clearTokenUsage}
                className="btn btn-ghost btn-xs"
              >
                Reset
              </button>
            </div>
            <div className="text-xs space-y-1">
              <div>Prompt tokens: {tokenUsage.promptTokens}</div>
              <div>Response tokens: {tokenUsage.completionTokens}</div>
              <div className="font-medium">Total: {tokenUsage.totalTokens}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSaveAll}
              className="btn btn-primary w-full"
              disabled={!tempApiKey.trim() || !tempPrompt.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              Save & Start AI Chat
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={handleSaveApiKey}
                className="btn btn-outline flex-1"
                disabled={!tempApiKey.trim()}
              >
                Save API Key Only
              </button>
              <button
                onClick={handleSavePrompt}
                className="btn btn-outline flex-1"
                disabled={!tempPrompt.trim()}
              >
                Save Prompt Only
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="alert alert-info">
            <Bot className="w-5 h-5" />
            <div className="text-sm">
              <div className="font-medium">How it works:</div>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Set your OpenAI API key</li>
                <li>Define AI behavior with a prompt</li>
                <li>AI Chat will appear in sidebar</li>
                <li>Click AI user to start chatting</li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AiChatModal;