"use client";

import { useState } from "react";
import Messenger, { Message } from "../components/Messenger";
import EvaluationModal, {
  EvaluationData,
} from "../components/EvaluationModal";

const MOCK_DATA: EvaluationData = {
  scores: [
    { trait: "Problem Solving", score: 85 },
    { trait: "Adaptability", score: 78 },
    { trait: "Communication", score: 92 },
    { trait: "Ambiguity Handling", score: 70 },
    { trait: "Frustration Resilience", score: 84 },
  ],
  overallFit: 82,
  strengths: ["Strong communication", "Good problem solving"],
  blindSpots: ["Handling incomplete data", "Sudden requirement changes"],
  unfilteredTruth:
    "You communicate well and adapt reasonably, but real analytics requires handling messy data and uncertainty.",
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Morning. Churn spiked 20% in Q3. What's your initial hypothesis?",
      timestamp: "10:45 AM",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text,
        timestamp: "10:46 AM",
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Why did you come to that conclusion? Back it up with evidence.",
          timestamp: "10:47 AM",
        },
      ]);
    }, 1000);
  };

  return (
    <main className="w-screen h-screen flex bg-slate-950">
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Member 1's Workspace
      </div>

      <div className="w-[420px] h-full">
        <Messenger
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSend}
          onTriggerFinish={() => setIsModalOpen(true)}
        />
      </div>

      <EvaluationModal
        isOpen={isModalOpen}
        data={MOCK_DATA}
        onReset={() => setIsModalOpen(false)}
      />
    </main>
  );
}