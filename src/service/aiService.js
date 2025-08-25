// services/aiService.js
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

class AIService {
  constructor() {
    this.chatModel = null;
    this.parser = new StringOutputParser();
  }

  initializeModel(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.chatModel = new ChatOpenAI({
      apiKey: apiKey,
      model: "gpt-3.5-turbo", // Cost effective model
      temperature: 0.7,
      maxTokens: 150, // Limit tokens for cost efficiency
      streaming: false,
    });
  }

  async generateResponse(prompt, conversationHistory = [], customPrompt = '') {
    if (!this.chatModel) {
      throw new Error('AI model not initialized. Please provide API key.');
    }

    try {
      // Use custom prompt or default
      const systemPromptText = customPrompt || 
        "You are a helpful AI assistant in a messaging app. Keep responses concise (max 500 tokens). Be friendly and helpful.";
      
      const systemMessage = new SystemMessage(systemPromptText);

      // Build conversation context (limit to last 6 messages for token efficiency)
      const contextMessages = conversationHistory
        .slice(-6)
        .map(msg => 
          msg.type === 'user' 
            ? new HumanMessage(msg.content)
            : new SystemMessage(msg.content)
        );

      // Current user prompt
      const userMessage = new HumanMessage(prompt);

      // Combine all messages
      const messages = [systemMessage, ...contextMessages, userMessage];

      // Generate response
      const response = await this.chatModel.invoke(messages);
      const content = await this.parser.invoke(response);

      // Return response with token usage
      return {
        content,
        usage: response.response_metadata?.token_usage || {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`AI response failed: ${error.message}`);
    }
  }

  async validateApiKey(apiKey) {
    try {
      const tempModel = new ChatOpenAI({
        apiKey: apiKey,
        model: "gpt-3.5-turbo",
        maxTokens: 5,
      });

      await tempModel.invoke([new HumanMessage("Hi")]);
      return true;
    } catch (error) {
      console.error('API Key validation failed:', error);
      return false;
    }
  }
}

export const aiService = new AIService();