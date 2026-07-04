import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, Sparkles } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

interface Message {
  role: "user" | "bot";
  content: string;
}

const portfolioInfo = {
  name: "Mohit Sinha",
  email: "sinhamohit9870@gmail.com",
  skills: ["Python", "Machine Learning", "Data Science", "AI", "Tableau", "SQL"],
  about: "AI & Data Science professional specializing in transforming complex datasets into actionable insights."
};

const getResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("skill") || q.includes("expertise")) {
    return `My key skills: ${portfolioInfo.skills.join(", ")}`;
  }
  if (q.includes("contact") || q.includes("email")) {
    return `You can reach me at ${portfolioInfo.email}`;
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! 👋 I'm happy to chat. Ask me about my skills, projects, or how to get in touch!";
  }
  if (q.includes("project")) {
    return "I work on AI/ML projects including predictive analytics, data visualization, and machine learning models. Check out the Projects section for more!";
  }
  return `Thanks for reaching out! Feel free to ask about my skills, projects, or contact info. You can also email me at ${portfolioInfo.email}`;
};

// Floating chat bubble 3D element
const ChatBubble3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#2563eb" />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[0.8, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
        <Torus args={[1.2, 0.08, 12, 48]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.3}
            metalness={0.7}
          />
        </Torus>
      </Float>
    </>
  );
};

const LiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! 👋 I'm Mohit's AI assistant. Ask me anything about skills, projects, or how to connect!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = { role: "bot", content: getResponse(input) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?"
  ];

  return (
    <section id="live-chat" className="py-20 relative overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Live Discussion</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            Let's Have a Chat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask me anything about my work, skills, or projects. I'm here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* 3D Animation */}
          <div className="hidden lg:block h-[400px] relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent rounded-3xl" />
            <Canvas
              camera={{ position: [0, 0, 4], fov: 50 }}
              style={{ background: "transparent" }}
              dpr={[1, 1.5]}
            >
              <ChatBubble3D />
            </Canvas>
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-primary/40 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 left-5 w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Chat Interface */}
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Chat with Mohit</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/80">Online • Ready to chat</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[280px] overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  {msg.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
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
              {isTyping && (
                <div className="flex gap-2 justify-start animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto bg-muted/30">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-3 py-1.5 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors whitespace-nowrap border border-primary/20"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveChat;
