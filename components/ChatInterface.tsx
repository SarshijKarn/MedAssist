"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MessageComposer from "./MessageComposer";
import HistoryPanel from "./HistoryPanel";
import { User, Bot, Volume2, VolumeX, Menu, Plus, Activity, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import FirstAidModal from "./FirstAidModal";
import BodyMapModal from "./BodyMapModal";
import HealthPostFinder from "./HealthPostFinder";

// --- Types ---
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  structured?: any; // The full JSON response
}

interface Session {
  id: string;
  preview: string;
  timestamp: number;
  messages: Message[];
}

// --- Quick Actions ---
const QUICK_ACTIONS = [
  "I have a fever",
  "Severe Headache",
  "Chest Pain",
  "Stomach Pain",
  "Cold & Cough",
  "Period Issues",
];

export default function ChatInterface() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Rural Tools State
  const [isFirstAidOpen, setIsFirstAidOpen] = useState(false);
  const [isBodyMapOpen, setIsBodyMapOpen] = useState(false);
  const [isHealthFinderOpen, setIsHealthFinderOpen] = useState(false);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputLang, setInputLang] = useState<'en-US' | 'ne-NP'>('en-US');

  // --- Initialization & LocalStorage ---
  useEffect(() => {
    // Load sessions from localStorage
    const stored = localStorage.getItem("medassist_sessions");
    if (stored) {
      try {
        const parsed: Session[] = JSON.parse(stored);
        // Load all sessions (Removed 24h limit to mimic ChatGPT persistance)
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    // Sync to localStorage
    if (sessions.length > 0) {
        localStorage.setItem("medassist_sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Load current session
  useEffect(() => {
    if (currentSessionId) {
      const sess = sessions.find(s => s.id === currentSessionId);
      if (sess) setMessages(sess.messages);
    } else {
      setMessages([]);
    }
  }, [currentSessionId, sessions]);

  // --- Voice Logic (Web Speech API) ---
  useEffect(() => {
    if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = inputLang;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
            handleSend(transcript, true);
        }
      };
      
      recognitionRef.current = recognition;
    }
  }, [inputLang]);

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) recognitionRef.current.lang = inputLang;
      recognitionRef.current?.start();
    }
  };

  const stopSpeaking = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
  };

  const speak = (text: string, lang = 'en') => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel(); // Stop previous
      
      const utterance = new SpeechSynthesisUtterance(text);
      const isNepaliOrHindi = lang === 'ne' || /[\u0900-\u097F]/.test(text);
      
      // Speed Control: Fast for English (1.4), Normal for Nepali (1.0)
      utterance.rate = isNepaliOrHindi ? 1.3 : 1.6; //nepali then english
      utterance.pitch = 1.0;
      
      // Language selection logic
      if (isNepaliOrHindi) {
          utterance.lang = 'ne-NP';
          // Try to find a voice that supports Hindi/Nepali if specific Nepali not found
          const voices = window.speechSynthesis.getVoices();
          const nepaliVoice = voices.find(v => v.lang.includes('ne'));
          const hindiVoice = voices.find(v => v.lang.includes('hi')); // Fallback for similar accent
          if (nepaliVoice) utterance.voice = nepaliVoice;
          else if (hindiVoice) utterance.voice = hindiVoice;
      } else {
          utterance.lang = 'en-US';
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
  };

  // --- Messaging Logic ---
  const handleSend = async (text: string, isVoice: boolean, attachment?: string) => {
    // Stop any current speech when user sends new message
    stopSpeaking();
    
    setIsProcessing(true);
    
    // Create User Message
    const contentWithAttachment = attachment ? text + (text ? "\n" : "") + "[Attached Medical Report]" : text;
    const userMsg: Message = { role: "user", content: contentWithAttachment, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Update Session
    if (!currentSessionId) {
        const newId = Date.now().toString();
        const newSession: Session = {
            id: newId,
            preview: text.slice(0, 30) + "...",
            timestamp: Date.now(),
            messages: updatedMessages
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newId);
    } else {
         setSessions(prev => prev.map(s => 
             s.id === currentSessionId 
             ? { ...s, messages: updatedMessages, timestamp: Date.now() } 
             : s
         ));
    }

    try {
      // Prepare history for API
      const historyToSend = updatedMessages.map(m => ({
          role: m.role,
          content: m.content
      }));

      const response = await fetch("/api/medassist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: text, 
            voice_mode: isVoice, 
            image: attachment,
            history: historyToSend 
        }),
      });

      const data = await response.json();
      
      if (!data.error) {
        // AI Message
        const botMsg: Message = {
            role: "assistant",
            content: data.text || "I am thinking...",
            timestamp: Date.now(),
            structured: data
        };

        // Update Messages
        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);
        
        // Update Session History
        setSessions(prev => {
             if (prev.length === 0) return prev; // Safety
             return prev.map(s => 
                 (s.id === currentSessionId || (!currentSessionId && prev.length > 0 && s.id === prev[0].id))
                 ? { ...s, messages: finalMessages, timestamp: Date.now() } 
                 : s
            );
        });

        // Handle Speak
        if (isVoice && data.speak && data.text) {
            speak(data.text, data.language);
        }
      }
      
    } catch (err) {
      console.error("API Error", err);
      // Add error message to chat?
    } finally {
      setIsProcessing(false);
    }
  };

  const createNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setIsSidebarOpen(false); // On mobile, close sidebar
    window.speechSynthesis.cancel();
  };

  const clearHistory = () => {
      setSessions([]);
      setMessages([]);
      setCurrentSessionId(null);
      localStorage.removeItem("medassist_sessions");
  };

  // --- Render ---
  return (
    <div className="flex h-screen bg-sky-50">
      <FirstAidModal isOpen={isFirstAidOpen} onClose={() => setIsFirstAidOpen(false)} />
      <BodyMapModal 
        isOpen={isBodyMapOpen} 
        onClose={() => setIsBodyMapOpen(false)} 
        lang={inputLang}
        onSelectPart={(text) => handleSend(text, false)} 
      />
      <HealthPostFinder isOpen={isHealthFinderOpen} onClose={() => setIsHealthFinderOpen(false)} />

      <HistoryPanel 
        sessions={sessions}
        currentSessionId={currentSessionId}
       onSelectSession={(id) => { setCurrentSessionId(id); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
        onNewChat={createNewChat}
        onClearHistory={clearHistory}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full relative">
        {/* Header Wrapper / Preface */}
        <div className="flex-none p-3 md:p-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm border border-white/40 shadow-md rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                {!isSidebarOpen && (
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                        <Menu size={20}/>
                    </button>
                )}
                
                {/* Logo & Title */}
                <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5">
                         <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                            <Image src="/logo.png" alt="MedAssist Logo" width={40} height={40} className="object-contain" />
                         </div>
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
                            MedAssist
                        </h1>
                        <p className="text-[9px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">
                            AI Triage Assistant
                        </p>
                    </div>
                </div>
              </div>
              
               {/* Rural Tools Menu */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
                <button 
                    onClick={() => setIsFirstAidOpen(true)}
                    className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full transition-all border border-rose-100 hover:border-rose-200 hover:shadow-sm group"
                    title="First Aid (Offline)"
                >
                    <Activity size={15} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] md:text-xs font-bold">First Aid</span>
                </button>
                <button 
                    onClick={() => setIsBodyMapOpen(true)}
                    className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-full transition-all border border-sky-100 hover:border-sky-200 hover:shadow-sm group"
                    title="Visual Body Map"
                >
                    <User size={15} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] md:text-xs font-bold">Body Map</span>
                </button>
                <button 
                    onClick={() => setIsHealthFinderOpen(true)}
                    className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-full transition-all border border-emerald-100 hover:border-emerald-200 hover:shadow-sm group"
                    title="Nearby Health Posts"
                >
                    <MapPin size={15} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] md:text-xs font-bold">Centers</span>
                </button>
              </div>
            
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-sm animate-bounce [animation-duration:3s]">
                    <Plus size={32} />
                </div>
                <div className="text-center space-y-2 max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Hello, I am MedAssist
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base px-6">
                        I am here to assist you with health guidance and preliminary triage. Please describe your symptoms to start.
                    </p>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                    {QUICK_ACTIONS.map(action => (
                        <button
                            key={action}
                            onClick={() => handleSend(action, false)}
                            className="px-4 py-2 bg-white/80 hover:bg-white hover:shadow-md border border-slate-200 rounded-full text-sm text-slate-600 transition-all"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto pb-32">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex gap-4 animate-in slide-in-from-bottom-2 fade-in", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-none">
                        <Bot size={16} className="text-blue-600" />
                    </div>
                  )}
                  
                  <div className={cn(
                      "p-4 rounded-2xl max-w-[85%] text-base leading-relaxed shadow-sm",
                      msg.role === "user" 
                        ? "bg-white text-slate-800 rounded-tr-sm" 
                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-sm"
                  )}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      
                      {/* Interactive Elements for AI */}
                      {msg.structured?.ui?.choices && (
                           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                               {msg.structured.ui.choices.map((choice: string) => (
                                   <button
                                     key={choice}
                                     onClick={() => handleSend(choice, false)}
                                     className="text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors border border-blue-100"
                                   >
                                       {choice}
                                   </button>
                               ))}
                           </div>
                      )}

                      {/* Urgency Badge */}
                      {msg.structured?.diagnostic?.urgency && msg.structured.diagnostic.urgency !== "low" && (
                          <div className={cn(
                              "mt-3 inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
                              msg.structured.diagnostic.urgency === "emergency" || msg.structured.diagnostic.urgency === "high" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                          )}>
                              Urgency: {msg.structured.diagnostic.urgency}
                          </div>
                      )}
                  </div>

                  {msg.role === "user" && (
                     <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-none">
                        <User size={16} className="text-slate-500" />
                    </div>
                  )}
                </div>
              ))}
              
              {isProcessing && (
                  <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-none">
                        <Bot size={16} className="text-blue-600" />
                      </div>
                      <div className="p-4 bg-white rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                      </div>
                  </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-none p-4 md:pb-8 bg-gradient-to-t from-sky-50 via-sky-50 to-transparent z-10">
           <MessageComposer 
             onSend={handleSend} 
             isListening={isListening} 
             isProcessing={isProcessing}
             onToggleVoice={toggleVoice}
             isSpeaking={isSpeaking}
             onStopSpeaking={stopSpeaking}
             inputLang={inputLang}
             onLangChange={setInputLang}
           />
        </div>

      </div>
    </div>
  );
}
