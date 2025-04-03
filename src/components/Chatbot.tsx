'use client';

import { useState, useRef, useEffect } from 'react';
import { enhancedFetch } from '@/lib/fetch';
import config from '@/lib/config';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; id: string }>;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: config.chat.welcomeMessage,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  // Handle pressing Enter to submit (but Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    try {
      // Call the chat API
      const response = await enhancedFetch('/api/chat', {
        method: 'POST',
        body: { query: userMessage.content },
      });
      
      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer || 'Sorry, I couldn\'t find an answer to that question.',
        timestamp: new Date(),
        sources: response.documents,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-xs border rounded-lg shadow-md dark:bg-card dark:border-border dark:shadow-md">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-neutral-200 bg-gradient-to-r from-primary/5 to-transparent dark:border-border dark:bg-gradient-to-r dark:from-primary/20 dark:to-transparent">
        <h3 className="text-lg font-semibold text-primary flex items-center dark:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-secondary dark:text-secondary">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Your Assistant
        </h3>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-neutral-50/80 dark:bg-background/90 dark:text-foreground">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-6 ${message.role !== 'user' ? 'flex' : 'flex justify-end'}`}
          >
            {/* Avatar for assistant/system */}
            {message.role !== 'user' && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center mr-3 flex-shrink-0 text-xs shadow-md dark:shadow-md">
                {config.chat.brandName}
              </div>
            )}
            
            <div className={`max-w-[90%] shadow-bubble ${
              message.role === 'user' 
                ? 'bg-primary/10 text-neutral-800 rounded-lg rounded-tr-sm px-4 py-3 border border-primary/10 dark:bg-primary/30 dark:text-foreground dark:border-primary/40' 
                : message.role === 'system'
                  ? 'bg-white/90 backdrop-blur-xs text-neutral-800 border border-neutral-200/60 rounded-lg rounded-tl-sm px-4 py-3 dark:bg-card/90 dark:text-foreground dark:border-border'
                  : 'bg-white/90 backdrop-blur-xs text-neutral-800 border border-neutral-200/60 rounded-lg rounded-tl-sm px-4 py-3 dark:bg-card/90 dark:text-foreground dark:border-border/80'
            }`}>
              <div className="prose prose-sm dark:prose-invert">
                <p className="whitespace-pre-wrap mb-2 leading-relaxed dark:text-foreground">{message.content}</p>
              </div>
              
              {/* Show sources if available */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-primary/20">
                  <p className="text-xs font-semibold text-primary mb-1 flex items-center dark:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-secondary dark:text-secondary">
                      <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a9.06 9.06 0 00-5.94 2.17c-.2.136-.458.205-.717.205h-.133A9.06 9.06 0 002.27 3a.75.75 0 00-.692.516.75.75 0 01-1.455-.364C.141 2.602.499 2.09.97 1.77A10.583 10.583 0 012.27 1.5a10.56 10.56 0 016.709 2.378h.782c.19 0 .372-.03.55-.084l.159-.054a10.56 10.56 0 016.53-2.24c.93 0 1.83.116 2.692.322.95.228 1.608 1.092 1.608 2.058v11.08c0 1.214-1.171 2.066-2.345 1.726a6.003 6.003 0 00-1.655-.22 6.487 6.487 0 00-4.5 1.798c-.4.35-.954.403-1.4.125a6.487 6.487 0 00-4.5-1.798 6.003 6.003 0 00-1.655.22A1.875 1.875 0 014 15.062V4.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v10.312a.75.75 0 00.546.721c.65.184 1.337.282 2.046.282a7.462 7.462 0 014.25 1.326l.087.07a.75.75 0 00.915-.072 7.462 7.462 0 014.25-1.326c.71 0 1.396.098 2.046.282A.75.75 0 0020 15.06v.938a.75.75 0 01-.546.721 7.493 7.493 0 01-4.454 0 .75.75 0 00-.546-.721 9.006 9.006 0 00-2.454-.334 9.06 9.06 0 00-5.94 2.17.75.75 0 00-.251.514c0 .202.076.395.214.544A.75.75 0 005.25 19a.75.75 0 00.544-.283 10.56 10.56 0 016.709-2.378 10.615 10.615 0 016.709 2.378.75.75 0 001.088-1.069 12.059 12.059 0 00-5.213-2.791 7.493 7.493 0 01-4.338 1.852z" />
                    </svg>
                    Sources:
                  </p>
                  <ul className="list-disc list-inside text-xs text-neutral-600 leading-relaxed dark:text-foreground/70">
                    {message.sources.map((source, i) => (
                      <li key={i}>{source.title}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <p className="text-xs mt-2 text-neutral-500 dark:text-foreground/50">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Avatar for user */}
            {message.role === 'user' && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center ml-3 flex-shrink-0 shadow-sm ring-1 ring-primary/20 dark:from-primary/40 dark:to-primary/30 dark:text-foreground dark:ring-primary/40">
                U
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* Thinking indicator */}
        {isLoading && (
          <div className="flex items-center mb-6">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center mr-3 flex-shrink-0 text-xs shadow-md dark:shadow-md">
              {config.chat.brandName}
            </div>
            <div className="bg-white/90 backdrop-blur-xs px-4 py-3 rounded-lg rounded-tl-sm shadow-bubble border border-neutral-200/60 dark:bg-card/90 dark:border-border/80">
              <div className="flex space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse dark:bg-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150 dark:bg-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300 dark:bg-secondary"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Form */}
      <div className="border-t border-neutral-200 p-4 bg-white/90 dark:bg-card dark:border-border">
        <form onSubmit={handleSubmit} className="relative flex items-end bg-neutral-50/90 rounded-lg border border-neutral-200 focus-within:border-primary/60 focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary/30 transition-all dark:bg-border/30 dark:border-border dark:focus-within:border-primary dark:focus-within:ring-primary/50">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${config.appName}...`}
            disabled={isLoading}
            rows={1}
            className="flex-1 py-2.5 px-3 pr-11 max-h-[120px] resize-none border-0 bg-transparent focus:ring-0 focus:outline-none text-neutral-800 placeholder-neutral-500 dark:text-foreground dark:placeholder-foreground/50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 dark:text-primary dark:hover:bg-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-neutral-600 mt-2 px-2 leading-relaxed flex items-center dark:text-foreground/70">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1.5 text-secondary dark:text-secondary">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {config.chat.docTrainingNotice} Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>
    </div>
  );
}