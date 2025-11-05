import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ChatState {
  isOpen: boolean;
  step: 'initial' | 'guestCount' | 'timeline' | 'budget' | 'email' | 'complete';
  eventType: string;
  guestCount: string;
  timeline: string;
  budget: string;
  email: string;
}

interface Message {
  content: string;
  isBot: boolean;
  showOptions?: boolean;
}

export const ConversionChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    step: 'initial',
    eventType: '',
    guestCount: '',
    timeline: '',
    budget: '',
    email: '',
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (chatState.isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("👋 Welcome to Jungle Flavorz! I'm here to help you get a personalized catering quote for your event. What type of event are you planning?", true);
      }, 500);
    }
  }, [chatState.isOpen]);

  const addBotMessage = (content: string, showOptions: boolean = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { content, isBot: true, showOptions }]);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { content, isBot: false }]);
  };

  const handleEventType = (type: string) => {
    const types: Record<string, string> = {
      'corporate': '🏢 Corporate Event',
      'wedding': '💒 Wedding/Private Party',
      'cultural': '🎭 Cultural Event',
      'chef': '👨‍🍳 Chef\'s Table Experience'
    };

    addUserMessage(types[type]);
    setChatState(prev => ({ ...prev, eventType: type, step: 'guestCount' }));
    
    setTimeout(() => {
      addBotMessage("Perfect! How many guests are you expecting?", true);
    }, 1500);
  };

  const handleGuestCount = (count: string) => {
    addUserMessage(count + ' guests');
    setChatState(prev => ({ ...prev, guestCount: count, step: 'timeline' }));
    
    setTimeout(() => {
      addBotMessage("Great! When are you planning this event?", true);
    }, 1500);
  };

  const handleTimeline = (timeline: string) => {
    const timelines: Record<string, string> = {
      'week': '📅 Within a week',
      'month': '📅 Within a month',
      'months': '📅 1-3 months',
      'flexible': '📅 Flexible/Planning ahead'
    };

    addUserMessage(timelines[timeline]);
    setChatState(prev => ({ ...prev, timeline, step: 'budget' }));
    
    setTimeout(() => {
      addBotMessage("What's your estimated budget per person?", true);
    }, 1500);
  };

  const handleBudget = (budget: string) => {
    addUserMessage(budget);
    setChatState(prev => ({ ...prev, budget, step: 'email' }));
    
    setTimeout(() => {
      addBotMessage("Almost done! What's the best email to send your personalized quote?");
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    addUserMessage(emailInput);
    setChatState(prev => ({ ...prev, email: emailInput, step: 'complete' }));
    
    setTimeout(() => {
      generateQuote();
    }, 1500);
  };

  const generateQuote = () => {
    const estimates: Record<string, [number, string, string]> = {
      '10-25': [18, '$40-60', '$720-1500'],
      '26-50': [38, '$45-70', '$1700-3800'],
      '51-100': [75, '$50-80', '$3750-8000'],
      '100+': [150, '$45-75', '$6750-11250']
    };

    const [, , total] = estimates[chatState.guestCount] || [0, '$40-100', 'Custom'];

    addBotMessage("🎉 Thank you! Here's your personalized quote summary:");

    setTimeout(() => {
      const quoteMessage = `
        <div class="space-y-3">
          <div class="font-bold text-base">📊 YOUR EVENT DETAILS</div>
          <div class="space-y-1 text-sm">
            <div>• Event Type: <strong>${chatState.eventType}</strong></div>
            <div>• Guest Count: <strong>${chatState.guestCount}</strong></div>
            <div>• Timeline: <strong>${chatState.timeline}</strong></div>
            <div>• Budget: <strong>${chatState.budget}</strong></div>
            <div>• Estimated Total: <strong>${total}</strong></div>
          </div>
          
          <div class="font-bold text-base mt-4">🚀 NEXT STEPS:</div>
          <div class="space-y-1 text-sm">
            <div>1. Detailed quote sent to ${chatState.email}</div>
            <div>2. Schedule consultation call</div>
            <div>3. Menu customization & tasting</div>
            <div>4. Event coordination</div>
          </div>
          
          <div class="text-xs mt-4 text-muted-foreground">
            We'll respond within 2 hours during business hours (9AM-7PM)!
          </div>
        </div>
      `;
      setMessages(prev => [...prev, { content: quoteMessage, isBot: true }]);
    }, 1000);

    setTimeout(() => {
      addBotMessage("🌟 Thank you for choosing Jungle Flavorz! We're excited to create an unforgettable East African experience for your event.");
    }, 2500);
  };

  const renderOptions = () => {
    switch (chatState.step) {
      case 'initial':
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => handleEventType('corporate')} className="quick-option">
              🏢 Corporate
            </button>
            <button onClick={() => handleEventType('wedding')} className="quick-option">
              💒 Wedding
            </button>
            <button onClick={() => handleEventType('cultural')} className="quick-option">
              🎭 Cultural
            </button>
            <button onClick={() => handleEventType('chef')} className="quick-option">
              👨‍🍳 Chef's Table
            </button>
          </div>
        );

      case 'guestCount':
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => handleGuestCount('10-25')} className="quick-option">
              10-25 guests
            </button>
            <button onClick={() => handleGuestCount('26-50')} className="quick-option">
              26-50 guests
            </button>
            <button onClick={() => handleGuestCount('51-100')} className="quick-option">
              51-100 guests
            </button>
            <button onClick={() => handleGuestCount('100+')} className="quick-option">
              100+ guests
            </button>
          </div>
        );

      case 'timeline':
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => handleTimeline('week')} className="quick-option">
              Within a week
            </button>
            <button onClick={() => handleTimeline('month')} className="quick-option">
              Within a month
            </button>
            <button onClick={() => handleTimeline('months')} className="quick-option">
              1-3 months
            </button>
            <button onClick={() => handleTimeline('flexible')} className="quick-option">
              Flexible
            </button>
          </div>
        );

      case 'budget':
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => handleBudget('$25-40 per person')} className="quick-option">
              $25-40 /person
            </button>
            <button onClick={() => handleBudget('$40-60 per person')} className="quick-option">
              $40-60 /person
            </button>
            <button onClick={() => handleBudget('$60-80 per person')} className="quick-option">
              $60-80 /person
            </button>
            <button onClick={() => handleBudget('$80+ per person')} className="quick-option">
              $80+ /person
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setChatState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-large flex items-center justify-center transition-all duration-300 hover:scale-110 floating-cta"
        aria-label="Open chat"
      >
        {chatState.isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Popup */}
      {chatState.isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-card border-2 border-border rounded-2xl shadow-large flex flex-col animate-scale-in overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-charcoal">
                JF
              </div>
              <div>
                <div className="font-semibold">Jungle Flavorz</div>
                <div className="text-xs text-primary-foreground/80">Usually replies in minutes</div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-muted/20"
          >
            {messages.map((message, index) => (
              <div key={index}>
                {message.isBot ? (
                  <div className="flex gap-2 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                      JF
                    </div>
                    <div 
                      className="bg-card border border-border rounded-2xl rounded-tl-sm p-3 max-w-[80%] text-sm"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[80%] text-sm">
                      {message.content}
                    </div>
                  </div>
                )}
                
                {message.showOptions && index === messages.length - 1 && renderOptions()}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  JF
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-3 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input (for email step) */}
          {chatState.step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  required
                />
                <Button 
                  type="submit"
                  size="icon"
                  className="rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      <style>{`
        .quick-option {
          padding: 0.75rem 1rem;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          text-align: left;
        }
        
        .quick-option:hover {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }
      `}</style>
    </>
  );
};
