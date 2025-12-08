"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, Square, AudioWaveform, VolumeX, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageComposerProps {
  onSend: (message: string, isVoice: boolean, attachment?: string) => void;
  isListening: boolean;
  isProcessing: boolean;
  onToggleVoice: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  inputLang: 'en-US' | 'ne-NP';
  onLangChange: (lang: 'en-US' | 'ne-NP') => void;
}

export default function MessageComposer({
  onSend,
  isListening,
  isProcessing,
  onToggleVoice,
  isSpeaking,
  onStopSpeaking,
  inputLang,
  onLangChange
}: MessageComposerProps) {
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((input.trim() || attachment) && !isProcessing) {
        handleSend();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if ((input.trim() || attachment) && !isProcessing) {
        onSend(input.trim(), false, attachment || undefined);
        setInput("");
        setAttachment(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 overflow-hidden",
          isListening && "ring-2 ring-red-100 border-red-200"
        )}
      >
        {/* Attachment Preview */}
        {attachment && (
            <div className="px-4 pt-4 pb-0 flex items-center gap-2">
                <div className="relative group">
                    <img src={attachment} alt="Attachment" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
                    <button 
                        onClick={() => setAttachment(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-md"
                    >
                        <X size={12} />
                    </button>
                </div>
                <div className="text-xs text-slate-400 font-medium">Medical Report Attached</div>
            </div>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={inputLang === 'ne-NP' ? "तपाईंको लक्षण यहाँ लेख्नुहोस्..." : "Describe symptoms or upload report..."}
          className="w-full p-4 pr-32 min-h-[60px] max-h-[200px] resize-none outline-none text-slate-800 placeholder:text-slate-400 bg-transparent text-lg"
          disabled={isProcessing || isListening}
          rows={1}
        />
        
        <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileSelect}
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-2">
           
           {/* Language Toggle */}
           <button
             onClick={() => onLangChange(inputLang === 'en-US' ? 'ne-NP' : 'en-US')}
             className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors uppercase border border-slate-200"
             title="Switch Language"
           >
             {inputLang === 'en-US' ? 'EN' : 'NE'}
           </button>
           
           {/* Attachment Button */}
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Upload Medical Report"
            >
                <Paperclip size={20} />
            </button>

           {isSpeaking && (
              <button
                onClick={onStopSpeaking}
                className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center gap-1.5 px-3 transition-colors mr-1"
                title="Stop Speaking"
              >
                  <VolumeX size={18} />
                  <span className="text-xs font-medium">Stop</span>
              </button>
           )}

          <button
            onClick={onToggleVoice}
            disabled={isProcessing}
            className={cn(
              "p-2 rounded-full transition-colors",
              isListening
                ? "bg-red-50 text-red-500 hover:bg-red-100 animate-pulse"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            )}
            title="Toggle Voice Input"
          >
             {isListening ? <Square size={20} fill="currentColor" /> : <Mic size={20} />}
          </button>

          <button
            onClick={handleSend}
            disabled={(!input.trim() && !attachment) || isProcessing || isListening}
            className={cn(
              "p-2 rounded-lg transition-colors",
              (input.trim() || attachment)
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </button>
        </div>
        
        {isListening && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-pulse" />
        )}
      </div>
      <div className="text-center mt-2 text-xs text-slate-400 font-medium">
        MedAssist can make mistakes. For emergencies, call 100/102.
      </div>
    </div>
  );
}
