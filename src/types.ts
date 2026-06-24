export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}

export interface ExpenseItem {
  id: string;
  description: string;
  category: 'accommodation' | 'transport' | 'food' | 'activities' | 'shopping' | 'other';
  amount: number;
  date: string;
}

export interface TravelDestination {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  activities: string[];
}

export interface TravelPlan {
  id: string;
  destination: string;
  durationDays: number;
  budgetType: 'budget' | 'standard' | 'luxury';
  maxBudget?: number;
  expenses?: ExpenseItem[];
  itinerary: ItineraryItem[];
  notes?: string;
  groundingUrls?: { title: string; url: string }[];
  mapsUrls?: { title: string; url: string }[];
  createdAt: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  ratio: string;
  size: string;
  studioQuality: boolean;
  createdAt: string;
}

export interface GeneratedVideo {
  id: string;
  operationName: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  videoUrl?: string; // Loaded via proxy download
  status: 'pending' | 'done' | 'failed';
  createdAt: string;
  hasStartingImage: boolean;
}

export interface MediaAnalysisResult {
  id: string;
  mediaType: 'image' | 'video';
  mediaName: string;
  previewUrl: string;
  analysis: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  thinking?: string;
  latencyMs?: number;
  groundingUrls?: { title: string; url: string }[];
}
