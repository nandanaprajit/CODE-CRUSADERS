export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  isCrisis: boolean;
}

export interface ChurnRecord {
  customerId: string;
  tenureMonths: number | null;
  contractType: string;
  monthlyCharges: number | null;
  churn: boolean;
  customerType: string;
}

export interface DataResponse {
  totalRows: number;
  dataset: ChurnRecord[];
}

export interface EvaluationScores {
  dataRigor: number;
  crisisResilience: number;
  businessCommunication: number;
  overall: number;
}

export interface EvaluationRequest {
  messages: ChatMessage[];
  finalReport: string;
}

export interface EvaluationResponse {
  scores: EvaluationScores;
  feedback: string;
  verdict: "Strong Hire" | "Hire" | "Needs Development";
}