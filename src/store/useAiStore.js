// store/useAiStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAiStore = create(
  persist(
    (set) => ({
      // API Key management
      openaiApiKey: '',
      isApiKeyValid: false,
      
      // AI Chat state
      aiMessages: [],
      isAiChatOpen: false,
      isGeneratingResponse: false,
      aiPrompt: '',
      isAiUserSelected: false,
      
      // Token usage tracking
      tokenUsage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },

      // Actions
      setOpenaiApiKey: (key) => {
        set({ openaiApiKey: key, isApiKeyValid: !!key });
      },

      setAiPrompt: (prompt) => {
        set({ aiPrompt: prompt });
      },

      setAiUserSelected: (selected) => {
        set({ isAiUserSelected: selected });
      },

      toggleAiChat: () => {
        set((state) => ({ isAiChatOpen: !state.isAiChatOpen }));
      },

      addAiMessage: (message) => {
        set((state) => ({
          aiMessages: [...state.aiMessages, {
            id: Date.now().toString(),
            ...message,
            timestamp: new Date()
          }]
        }));
      },

      setGeneratingResponse: (isGenerating) => {
        set({ isGeneratingResponse: isGenerating });
      },

      updateTokenUsage: (usage) => {
        set((state) => ({
          tokenUsage: {
            promptTokens: state.tokenUsage.promptTokens + usage.prompt_tokens,
            completionTokens: state.tokenUsage.completionTokens + usage.completion_tokens,
            totalTokens: state.tokenUsage.totalTokens + usage.total_tokens,
          }
        }));
      },

      clearAiMessages: () => {
        set({ aiMessages: [] });
      },

      clearTokenUsage: () => {
        set({
          tokenUsage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
          }
        });
      },
    }),
    {
      name: 'ai-chat-storage',
      partialize: (state) => ({
        openaiApiKey: state.openaiApiKey,
        isApiKeyValid: state.isApiKeyValid,
        tokenUsage: state.tokenUsage,
        aiPrompt: state.aiPrompt,
      }),
    }
  )
);