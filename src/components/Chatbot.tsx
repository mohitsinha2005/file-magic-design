import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Download, Linkedin, Github, Mail } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const portfolioInfo = {
  name: "Mohit Sinha",
  email: "sinhamohit9870@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohit-sinha-5b5472255",
  github: "https://github.com/mohitsinha2005",
  education: "Pursuing BCA and BS in Data Science from IIT Madras",
  skills: ["Python", "Machine Learning", "Data Science", "AI", "Tableau", "SQL", "Data Visualization", "Business Analysis"],
  certifications: [
    "Scratch Hackathon - DataConnectDelhi (IIT Madras BS Program)",
    "AI Course - Teachnook & Cognizance'24 IIT Roorkee",
    "CyberSecurity Workshop - Cyndia & Cognizance 2025 IIT Roorkee",
    "Tableau Course - TNX & Cognizance'24 IIT Roorkee",
    "Business Analysis & Process Management - Coursera"
  ],
  about: "A dedicated Data Science professional specializing in transforming complex datasets into actionable business insights. Proficient in Machine Learning, predictive analytics, and data-driven decision making."
};

const getResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("name") || q.includes("who are you") || q.includes("who is")) {
    return `I'm the portfolio assistant for ${portfolioInfo.name}. He is an AI & Data Science professional pursuing BCA and BS in Data Science from IIT Madras.`;
  }
  
  if (q.includes("email") || q.includes("contact") || q.includes("reach")) {
    return `You can reach Mohit at:\n📧 Email: ${portfolioInfo.email}\n🔗 LinkedIn: ${portfolioInfo.linkedin}\n💻 GitHub: ${portfolioInfo.github}`;
  }
  
  if (q.includes("skill") || q.includes("expertise") || q.includes("know")) {
    return `Mohit's key skills include:\n${portfolioInfo.skills.map(s => `• ${s}`).join('\n')}`;
  }
  
  if (q.includes("certif") || q.includes("credential") || q.includes("course")) {
    return `Mohit's certifications:\n${portfolioInfo.certifications.map(c => `• ${c}`).join('\n')}`;
  }
  
  if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college")) {
    return `${portfolioInfo.name} is currently ${portfolioInfo.education}. He is focused on building expertise in AI and Data Science.`;
  }
  
  if (q.includes("linkedin")) {
    return `Mohit's LinkedIn: ${portfolioInfo.linkedin}`;
  }
  
  if (q.includes("github")) {
    return `Mohit's GitHub: ${portfolioInfo.github}`;
  }
  
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return `You can download Mohit's resume from the website. Click the "Download Resume" button in the hero section or visit /resume/Mohit_Sinha_Resume.pdf`;
  }
  
  if (q.includes("about") || q.includes("tell me about")) {
    return portfolioInfo.about;
  }
  
  if (q.includes("project")) {
    return "Mohit is working on exciting projects in AI and Data Science. The projects section will be updated soon with detailed case studies. Stay tuned!";
  }
  
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hello! 👋 I'm Mohit's portfolio assistant. I can help you learn about his skills, certifications, education, and how to contact him. What would you like to know?`;
  }
  
  if (q.includes("help")) {
    return `I can help you with:\n• Contact information\n• Skills & expertise\n• Certifications\n• Education background\n• Resume download\n• LinkedIn & GitHub profiles\n\nJust ask me anything!`;
  }
  
  return `Thanks for your question! For more specific information about Mohit, you can ask about his skills, certifications, education, or contact details. You can also reach him directly at ${portfolioInfo.email}`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! 👋 I'm Mohit's portfolio assistant. How can I help you today? You can ask about skills, certifications, education, or contact information." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = { role: "bot", content: getResponse(input) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "Skills", query: "What are your skills?" },
    { label: "Contact", query: "How can I contact you?" },
    { label: "Certifications", query: "Show certifications" },
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-bounce-in"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in-3d">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Portfolio Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Ask me anything about Mohit</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-4 py-2 border-b border-border flex gap-2 overflow-x-auto">
            <a href={portfolioInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Linkedin size={16} className="text-primary" />
            </a>
            <a href={portfolioInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Github size={16} className="text-primary" />
            </a>
            <a href={`mailto:${portfolioInfo.email}`} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Mail size={16} className="text-primary" />
            </a>
            <a href="/resume/Mohit_Sinha_Resume.pdf" download className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Download size={16} className="text-primary" />
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(action.query);
                  handleSend();
                }}
                className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-muted border border-border focus:border-primary focus:outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
