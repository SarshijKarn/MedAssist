"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Plus, Trash2, ChevronLeft, ChevronRight, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  preview: string;
  timestamp: number;
}

interface HistoryPanelProps {
  sessions: Session[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onClearHistory: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function HistoryPanel({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onClearHistory,
  isOpen,
  onToggle,
}: HistoryPanelProps) {
  
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
            "fixed inset-0 bg-black/20 z-20 transition-opacity md:hidden",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative top-0 left-0 h-full bg-slate-50 border-r border-slate-200 z-30 transition-all duration-300 ease-in-out flex flex-col shadow-xl md:shadow-none",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-none" 
        )}
        // Note: For collapsing on desktop we actually want width 0. 
        // Let's adjust logic: If not open, width 0.
        // The above classes are a bit complex for simple collapse.
        // Let's simplify:
        style={{ width: isOpen ? '16rem' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden' }}
      >
        <div className="p-4 flex-none border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                <History size={18} /> History
            </h2>
            <button onClick={onNewChat} className="p-1 hover:bg-slate-200 rounded-md" title="New Chat">
                <Plus size={18} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-8">
              No recent history
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-200 transition-colors truncate flex items-center gap-2",
                  currentSessionId === session.id && "bg-blue-100 text-blue-700 font-medium"
                )}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-none" />
                <span className="truncate">{session.preview || "New Chat"}</span>
              </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-200 flex-none">
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 transition-colors w-full p-2 hover:bg-red-50 rounded-md"
          >
            <Trash2 size={14} /> Clear all history
          </button>
        </div>
      </div>

       {/* Toggle Button (Visible when closed or on mobile) */}
       <div className="fixed top-4 left-4 z-40">
           <button 
             onClick={onToggle}
             className={cn(
                 "p-2 bg-white rounded-md shadow-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-transform",
                 isOpen ? "md:hidden" : "block"
             )}
           >
               {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
           </button>
       </div>
    </>
  );
}
