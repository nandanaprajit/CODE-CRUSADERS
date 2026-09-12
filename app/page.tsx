"use client";

import React, { useState } from 'react';
import Messenger, { Message } from '../components/Messenger';
import EvaluationModal, { EvaluationData } from '../components/EvaluationModal';
import Workspace from '../components/Workspace';

const MOCK_DATA: EvaluationData = {
  scores: [
    { trait: 'Problem Solving', score: 85 },
    { trait: 'Adaptability', score: 78 },
    { trait: 'Communication', score: 92 },
    { trait: 'Ambiguity Handling', score: 70 },
    { trait: 'Frustration Resilience', score: 84 },
  ],
  overallFit: 82,
  strengths: [
    'Quickly defended data decisions using business justification.',
    'Maintained composure when attribution windows were changed mid-sprint.',
  ],
  blindSpots: [
    'Removed rows instead of imputing missing values.',
    'Hesitated when contradictory metrics appeared.',
  ],
  unfilteredTruth:
    'You handle corporate communication and pivoting well, but 80% of real analytics is cleaning broken schemas rather than making strategic calls.',
};

export default function Home() {
  const [step, setStep] = useState(0);
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

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";

      if (step === 0) {
        replyText = "Good spot on the duplicate tag. But what about CUST-8824 with NULL MRR? Did you impute the missing tier value or drop it completely?";
        setStep(1);
      } else if (step === 1) {
        replyText = "Understood. The Enterprise cohort loss ($10.3K) is critical. If we lose CUST-8825 before Friday, retention dips another 4%. What's your immediate mitigation recommendation?";
        setStep(2);
      } else {
        replyText = "Clear rationale and solid defense under pressure. Hit 'Finish Triage' at the top right to generate your workplace behavioral profile.";
      }

      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  return (
    <main className="w-screen h-screen flex bg-slate-950 font-sans overflow-hidden">
      {/* Left: Member 1 Workspace */}
      <div className="flex-1 h-full border-r border-slate-800 overflow-hidden">
        <Workspace />
      </div>

      {/* Right: Member 2 Messenger */}
      <div className="w-[420px] h-full flex-shrink-0">
        <Messenger
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSend}
          onTriggerFinish={() => setIsModalOpen(true)}
        />
      </div>

      {/* Evaluation Modal */}
      <EvaluationModal
        isOpen={isModalOpen}
        data={MOCK_DATA}
        onReset={() => {
          setIsModalOpen(false);
          setStep(0);
        }}
      />
    </main>
  );
}