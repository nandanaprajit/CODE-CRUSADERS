import React, { useState, useRef, useEffect } from 'react';
import { Send, UserCheck } from 'lucide-react';

const AGENT_NAME = "Sam";
const AGENT_SHORT_NAME = "Sam";
const AGENT_INITIALS = "SM";
const AGENT_ROLE = "Lead Data Strategist";

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface MessengerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onTriggerFinish: () => void;
}

export default function Messenger({ messages, isTyping, onSendMessage, onTriggerFinish }: MessengerProps) {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100">
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
              {AGENT_INITIALS}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
              {AGENT_NAME}
              <span className="text-xs px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded font-normal">{AGENT_ROLE}</span>
            </h3>
            <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              Active in #incident-churn-triage
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerFinish}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded transition flex items-center gap-1"
        >
          <UserCheck size={14} /> Finish Triage
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs font-medium text-slate-400">
                {m.sender === 'user' ? 'You (Junior Analyst)' : AGENT_SHORT_NAME}
              </span>
              <span className="text-[10px] text-slate-500">{m.timestamp}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed shadow-sm ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium text-slate-400 mb-1">{AGENT_SHORT_NAME}</span>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 rounded-bl-none flex items-center gap-1.5">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Defend your decision or propose a fix..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
