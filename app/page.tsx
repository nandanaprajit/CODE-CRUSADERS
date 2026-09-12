"use client";

import React, { useState } from 'react';
import Workspace from '../components/Workspace';               // MEMBER 1's component
import Messenger, { Message } from '../components/Messenger';  // MEMBER 2's component
import EvaluationModal, { EvaluationData } from '../components/EvaluationModal'; // MEMBER 2's scorecard

export default function App() {
  // Shared State: Connecting Member 1, 2, and 3
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Morning. Churn spiked 20% in Q3. Look at churn_data_raw.csv on your left. What's your initial hypothesis?",
      timestamp: '10:45 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evalData, setEvalData] = useState<EvaluationData | null>(null);

  // 1. MEMBER 2: User types a message to Sam
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsTyping(true);

    // Call MEMBER 3's chat API (or simulated fallback)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: updatedHistory }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch {
      // Offline fallback if Member 3 is still working on endpoint
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Understood. The Enterprise cohort loss ($10.3K) is critical. What's your immediate recommendation?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  // 2. MEMBER 1 -> MEMBER 2: When "Trigger Mid-Sprint Pivot" is clicked in Workspace
  const handlePivotTriggered = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: "🚨 URGENT: Marketing just changed attribution definitions. Column 'customer_type' is deprecated. Re-evaluate your baseline right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // 3. MEMBER 2 -> MEMBER 3: When "Finish Triage" is clicked
  const handleFinishTriage = async () => {
    setIsTyping(true);
    try {
      // Fetch dynamic evaluation from Member 3's backend
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: messages }),
      });
      const data = await res.json();
      setEvalData(data);
    } catch {
      // Fallback mock if Member 3 API isn't deployed yet
      setEvalData({
        scores: [
          { trait: 'Problem Solving', score: 88 },
          { trait: 'Adaptability', score: 82 },
          { trait: 'Communication', score: 91 },
          { trait: 'Ambiguity Handling', score: 75 },
          { trait: 'Frustration Resilience', score: 85 },
        ],
        overallFit: 84,
        strengths: ['Promptly defended triage hypotheses', 'Adapted calmly to mid-sprint schema deprecation'],
        blindSpots: ['Initial hesitation on edge-case cleaning before imputation'],
        unfilteredTruth: 'Strong analytical instincts and communication under pressure. High fit for fast-paced Operations.',
      });
    } finally {
      setIsTyping(false);
      setIsModalOpen(true);
    }
  };

  return (
    <main className="w-screen h-screen flex bg-slate-950 font-sans overflow-hidden">
      {/* Member 1's Workspace (Left) */}
      <div className="flex-1 h-full border-r border-slate-800 overflow-hidden">
        <Workspace onTriggerPivotAlert={handlePivotTriggered} />
      </div>

      {/* Member 2's Messenger (Right) */}
      <div className="w-[420px] h-full flex-shrink-0">
        <Messenger
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onTriggerFinish={handleFinishTriage}
        />
      </div>

      {/* Member 2's Radar Chart Modal with Member 3's Scores */}
      {evalData && (
        <EvaluationModal
          isOpen={isModalOpen}
          data={evalData}
          onReset={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}