import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Search,
  MapPin,
  Sparkles,
  Clock,
  Compass,
  FolderOpen,
  LogOut,
  Brain,
  Zap,
  Image as ImageIcon,
  Video,
  Send,
  RefreshCw,
  Play,
  Download,
  Plus,
  X,
  ChevronRight,
  Info,
  Lock,
  Mail,
  Sun,
  Moon,
  Eye,
  EyeOff,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  Edit2,
  Trash2,
  HelpCircle,
  LayoutGrid,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  TravelPlan,
  GeneratedImage,
  GeneratedVideo,
  MediaAnalysisResult,
  ChatMessage,
  ExpenseItem,
} from "./types";

import LandingPage from "./components/LandingPage";

// Design specifications & Pre-loaded beautiful travel graphics
const TRAVEL_HERO_BG = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop";
const PRESET_DESTINATIONS = [
  {
    name: "Singapore Marina",
    tagline: "Ultra-modern skyway and drone lit harbor lanes.",
    img: "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=600&auto=format&fit=crop",
    lat: 1.287,
    lng: 103.859,
  },
  {
    name: "Kyoto Gardens",
    tagline: "Historic shrines under full cherry cherry blossom canopies.",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    lat: 35.011,
    lng: 135.768,
  },
  {
    name: "Lake Louise, Banff",
    tagline: "Glacial majestic blue waters surrounded by dense pine valleys.",
    img: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=600&auto=format&fit=crop",
    lat: 51.425,
    lng: -116.177,
  },
  {
    name: "Parisian Boulevards",
    tagline: "Warm sidewalk bistros framing the Sacré-Cœur heights.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    lat: 48.856,
    lng: 2.352,
  },
];

const DEFAULT_SAVED_PLANS: TravelPlan[] = [
  {
    id: "plan-tokyo",
    destination: "Tokyo, Japan",
    durationDays: 8,
    budgetType: "luxury",
    maxBudget: 2500,
    expenses: [
      { id: "exp-tokyo-1", description: "Royal Park Hotel Imperial", category: "accommodation", amount: 1200, date: "Day 1" },
      { id: "exp-tokyo-2", description: "JR Sanyo Train Pass", category: "transport", amount: 250, date: "Day 1" },
      { id: "exp-tokyo-3", description: "Sushi Zen-Mai Tsukiji", category: "food", amount: 180, date: "Day 2" },
      { id: "exp-tokyo-4", description: "teamLab Borderless Ticket", category: "activities", amount: 44, date: "Day 3" },
      { id: "exp-tokyo-5", description: "Akihabara Shopping", category: "shopping", amount: 350, date: "Day 4" },
      { id: "exp-tokyo-6", description: "Shibuya Sky Observation Deck", category: "activities", amount: 20, date: "Day 5" },
      { id: "exp-tokyo-7", description: "Sennichimae Izakaya Dinner", category: "food", amount: 110, date: "Day 6" },
    ],
    itinerary: [],
    notes: "Summer adventure in Tokyo, Japan. Includes high tech exploration of Shibuya, Akihabara, and Shinjuku.",
    createdAt: "06/15/2026"
  },
  {
    id: "plan-alpine",
    destination: "Swiss Alps",
    durationDays: 10,
    budgetType: "standard",
    maxBudget: 1800,
    expenses: [
      { id: "exp-alp-1", description: "Zermatt Mountain View Lodge", category: "accommodation", amount: 850, date: "Day 1" },
      { id: "exp-alp-2", description: "Swiss Interrail Scenic Pass", category: "transport", amount: 420, date: "Day 1" },
      { id: "exp-alp-3", description: "Glacier Paradise Gondola Tour", category: "activities", amount: 115, date: "Day 2" },
      { id: "exp-alp-4", description: "Mountain Cabin lunch", category: "food", amount: 45, date: "Day 3" },
      { id: "exp-alp-5", description: "Cheese Fondue traditional dining", category: "food", amount: 75, date: "Day 4" },
      { id: "exp-alp-6", description: "Alpine Trekking Gear", category: "activities", amount: 90, date: "Day 5" },
    ],
    itinerary: [],
    notes: "Alpine hiking retreats and scenic rail journey through the spectacular Swiss Alps summits.",
    createdAt: "06/18/2026"
  }
];

const DEFAULT_MEDIA_ANALYSES: MediaAnalysisResult[] = [
  {
    id: "scan-osaka-pass",
    mediaType: "image",
    mediaName: "Osaka Subway Pass (Sample Scan)",
    previewUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop",
    analysis: `### 🚇 Osaka Municipal Transportation Pass Analysis
**Document Type**: Public Transit RFID Pass (Kanjo Line & Subway Multi-day Pass)
**Route Information**: Osaka Loop Line, Midosuji Subway Line, Chuo Line.
**Validity**: 3 Calendar Days (Fully Active)

#### 🗺️ Key Highlight Coordinates:
- **Umeda Station (North Node)**: Ideal boarding platform for Kyoto excursions.
- **Namba/Shinsaibashi (South Node)**: Central exit coordinates for neon food streets & Dotonbori access.
- **Morinomiya Station (East Node)**: Direct pedestrian walkway leading to Osaka Castle Gardens.

#### 💡 Smart Recommendations:
1. **Airport Transfer Savings**: The pass covers standard subway transfers, but consider buying a separate ¥920 Nankai Rap:t Express ticket to Kansai Airport to save 45 minutes.
2. **Luggage Storage**: Large coin lockers are situated on B1 of Namba station near exit 14. Keep ¥500 coins ready as IC card terminal lanes fill up quickly by 10 AM.`,
    createdAt: "06/20/2026"
  },
  {
    id: "scan-alpine-trail",
    mediaType: "video",
    mediaName: "Switzerland Alpine Trail Drone Clip (Sample Scan)",
    previewUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    analysis: `### 🏔️ Zermatt Alpine Trekking Drone Analysis
**Content Class**: 4K Cinematic Landscape / Scenic Trail Survey
**Location Geocode**: Matterhorn Valley & Gornergrat Ridge Trail, Canton of Valais, Switzerland.
**Atmospheric Status**: Sunny with slight cloud cover, zero precipitation. Excellent Visibility.

#### 🥾 Route Profile:
- **Starting Altitude**: 1,608m (Zermatt Village)
- **Summit Target**: 3,089m (Gornergrat Peak Station)
- **Difficulty Index**: Intermediate. High slope gradient at sections, well-marked pedestrian stones.

#### 🎒 Essential Safety Dispatch:
1. **Hydration Coordinates**: Carry at least 1.5L of water. No municipal refill spigots are accessible between Riffelalp (2,211m) and Riffelberg (2,582m).
2. **Clothing Layers**: Expect a temperature drop of approximately 8.5°C between the base and the summit. A windproof shell and insulating middle layer are mandatory.
3. **Emergency Support**: In case of altitude distress, there are emergency heated shelter rooms located at all mountain rack-railway stops.`,
    createdAt: "06/21/2026"
  }
];

export default function App() {
  // Theme & Session
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("chandergari_dark_mode");
    return saved === "true";
  });
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem("chandergari_user_email") || null;
  });
  const [authEmail, setAuthEmail] = useState<string>("alex@example.com");
  const [authPassword, setAuthPassword] = useState<string>("•••••••••••••");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);

  // App Tabs
  // 'creative' | 'planner' | 'concierge' (AI Tour Guide) | 'multimodal' | 'saved'
  const [activeTab, setActiveTab] = useState<string>("creative");

  // Local state databases persisted in localStorage
  const [savedPlans, setSavedPlans] = useState<TravelPlan[]>([]);
  const [studioImages, setStudioImages] = useState<GeneratedImage[]>([]);
  const [studioVideos, setStudioVideos] = useState<GeneratedVideo[]>([]);
  const [mediaAnalyses, setMediaAnalyses] = useState<MediaAnalysisResult[]>([]);

  // 1. Planner State
  const [planDest, setPlanDest] = useState<string>("Singapore Marina");
  const [planDays, setPlanDays] = useState<number>(3);
  const [planBudget, setPlanBudget] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [planUseSearch, setPlanUseSearch] = useState<boolean>(true);
  const [planUseMaps, setPlanUseMaps] = useState<boolean>(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [currentGeneratedPlan, setCurrentGeneratedPlan] = useState<any | null>(null);

  // 2. Tour Guide Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "gemini",
      text: "👋 Welcome to Chandergari AI Tour Guide! Ask me any travel logistics questions. Choose a mode below for tailored responses:\n\n- **Fast Assist** (Low latency, Lite model)\n- **Deep Thinking** (Detailed logic and exact calculations)\n- **Standard** (Balanced guidelines)",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [conciergeMode, setConciergeMode] = useState<'fast' | 'balanced' | 'thinking'>('balanced');
  const [isTypingChat, setIsTypingChat] = useState<boolean>(false);

  // 3. Dashboard State
  const [dashboardSearch, setDashboardSearch] = useState<string>("");
  const [dashboardCategory, setDashboardCategory] = useState<string>("All");
  
  // Expense Tracker State
  const [selectedExpensePlanId, setSelectedExpensePlanId] = useState<string>("plan-tokyo");
  const [expenseDesc, setExpenseDesc] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<"accommodation" | "transport" | "food" | "activities" | "shopping" | "other">("food");
  const [expenseDay, setExpenseDay] = useState<string>("Day 1");
  const [customMaxBudget, setCustomMaxBudget] = useState<string>("");
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);
  const [aiAdvisorAdvice, setAiAdvisorAdvice] = useState<string>("");
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState<boolean>(false);

  // 3. Creative Studio State
  const [studioPrompt, setStudioPrompt] = useState<string>("A cinematic dusk view of Kyoto golden temple with cherry blossoms, 8k");
  const [studioRatio, setStudioRatio] = useState<string>("16:9");
  const [studioSize, setStudioSize] = useState<string>("1K");
  const [studioQuality, setStudioQuality] = useState<boolean>(true); // true = 3-pro, false = 3.1-flash
  const [isGeneratingImg, setIsGeneratingImg] = useState<boolean>(false);
  const [recentlyGeneratedImg, setRecentlyGeneratedImg] = useState<string | null>(null);

  // Image editing sub-state
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [uploadedMime, setUploadedMime] = useState<string | null>(null);

  // Video generation sub-state (Veo)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [veoProgressMsg, setVeoProgressMsg] = useState<string>("");
  const [veoProgressPercent, setVeoProgressPercent] = useState<number>(0);
  const [activeVeoOp, setActiveVeoOp] = useState<string | null>(null);

  // 4. Multimodal Hub State
  const [rawAnalysisMedia, setRawAnalysisMedia] = useState<string | null>(null);
  const [analysisMime, setAnalysisMime] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'image' | 'video'>('image');
  const [analysisPrompt, setAnalysisPrompt] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastAnalysisText, setLastAnalysisText] = useState<string | null>(null);

  // Chat positioning references
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Hydrate persisted state on startup
  useEffect(() => {
    try {
      const plans = localStorage.getItem("chandergari_plans");
      const imgs = localStorage.getItem("chandergari_images");
      const vids = localStorage.getItem("chandergari_videos");
      const scans = localStorage.getItem("chandergari_analyses");

      if (plans && JSON.parse(plans).length > 0) {
        setSavedPlans(JSON.parse(plans));
      } else {
        localStorage.setItem("chandergari_plans", JSON.stringify(DEFAULT_SAVED_PLANS));
        setSavedPlans(DEFAULT_SAVED_PLANS);
      }
      if (imgs) setStudioImages(JSON.parse(imgs));
      if (vids) {
        const parsedVids = JSON.parse(vids);
        setStudioVideos(parsedVids);
        // If there's an ongoing active operation, recreate poller
        const incomplete = parsedVids.find((v: GeneratedVideo) => v.status === "pending");
        if (incomplete) {
          triggerVeoPolling(incomplete.operationName, incomplete.id);
        }
      }
      if (scans && JSON.parse(scans).length > 0) {
        setMediaAnalyses(JSON.parse(scans));
      } else {
        localStorage.setItem("chandergari_analyses", JSON.stringify(DEFAULT_MEDIA_ANALYSES));
        setMediaAnalyses(DEFAULT_MEDIA_ANALYSES);
      }
    } catch (e) {
      console.error("Hydration failed from LocalStorage schema:", e);
    }

    // Try grabbing user geolocation for Maps Grounding retrieval
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Could not acquire browser Geolocations context:", error);
        }
      );
    }
  }, []);

  // Save changes to local persistence
  const savePlansToLocal = (data: TravelPlan[]) => {
    localStorage.setItem("chandergari_plans", JSON.stringify(data));
    setSavedPlans(data);
  };

  const saveImagesToLocal = (data: GeneratedImage[]) => {
    localStorage.setItem("chandergari_images", JSON.stringify(data));
    setStudioImages(data);
  };

  const saveVideosToLocal = (data: GeneratedVideo[]) => {
    localStorage.setItem("chandergari_videos", JSON.stringify(data));
    setStudioVideos(data);
  };

  const saveAnalysesToLocal = (data: MediaAnalysisResult[]) => {
    localStorage.setItem("chandergari_analyses", JSON.stringify(data));
    setMediaAnalyses(data);
  };

  // Scroll chats 
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Darkmode CSS toggler
  useEffect(() => {
    localStorage.setItem("chandergari_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle Authentication Flow
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthError("Email coordinates are required.");
      return;
    }
    setAuthError(null);
    setIsLoadingAuth(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }
      localStorage.setItem("chandergari_user_email", data.email);
      setCurrentUser(data.email);
    } catch (err: any) {
      // In case backend fails/offline, fall back gracefully to local access
      localStorage.setItem("chandergari_user_email", authEmail);
      setCurrentUser(authEmail);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chandergari_user_email");
    setCurrentUser(null);
  };

  // Plan Creator Flow
  const triggerGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setCurrentGeneratedPlan(null);

    // Pick Preset destination coords if matching preset title
    const matchedPreset = PRESET_DESTINATIONS.find(p => p.name.toLowerCase() === planDest.toLowerCase());
    const queryLat = matchedPreset ? matchedPreset.lat : userCoords?.lat || 1.352;
    const queryLng = matchedPreset ? matchedPreset.lng : userCoords?.lng || 103.819;

    try {
      const response = await fetch("/api/plan/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: planDest,
          days: planDays,
          budget: planBudget,
          useSearch: planUseSearch,
          useMaps: planUseMaps,
          lat: queryLat,
          lng: queryLng,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Plan generator failed.");
      }
      setCurrentGeneratedPlan(data);
    } catch (error: any) {
      alert(`Itinerary compiler failed: ${error.message}`);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const saveCurrentPlanToItinerary = () => {
    if (!currentGeneratedPlan) return;
    
    // Derive a reasonable default budget limit based on duration and tier
    let derivedBudget = 1500;
    if (planBudget === "budget") {
      derivedBudget = planDays * 80;
    } else if (planBudget === "standard") {
      derivedBudget = planDays * 180;
    } else if (planBudget === "luxury") {
      derivedBudget = planDays * 350;
    }

    // Set the overall maximum budget to correspond with the sum of estimated expenses if larger, or keep derived
    const sumEstimates = (currentGeneratedPlan.estimatedExpenses || []).reduce((sum: number, item: any) => sum + item.amount, 0);
    const maxBudgetLimit = Math.max(derivedBudget, sumEstimates);

    const newPlan: TravelPlan = {
      id: `plan-${Date.now()}`,
      destination: planDest,
      durationDays: planDays,
      budgetType: planBudget,
      maxBudget: maxBudgetLimit,
      expenses: currentGeneratedPlan.estimatedExpenses || [],
      itinerary: [], // Render generated markdown details directly
      notes: currentGeneratedPlan.itineraryText,
      groundingUrls: currentGeneratedPlan.groundingUrls,
      mapsUrls: currentGeneratedPlan.mapsUrls,
      createdAt: new Date().toLocaleDateString(),
    };
    const updated = [newPlan, ...savedPlans];
    savePlansToLocal(updated);
    setSelectedExpensePlanId(newPlan.id);
    alert("✨ Successful Dispatch! This itinerary and its estimated expenses were persisted to your active tracker ledger.");
    setActiveTab("creative"); // Take them directly back to the primary Dashboard to track it!
  };

  // Expense Tracker Management Functions
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpensePlanId) return;
    if (!expenseDesc.trim() || !expenseAmount) {
      alert("Please enter a valid description and amount.");
      return;
    }
    const amt = parseFloat(expenseAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a positive numeric value for amount.");
      return;
    }

    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      description: expenseDesc.trim(),
      category: expenseCategory,
      amount: amt,
      date: expenseDay,
    };

    const updatedPlans = savedPlans.map((plan) => {
      if (plan.id === selectedExpensePlanId) {
        const currentExpenses = plan.expenses || [];
        return {
          ...plan,
          expenses: [...currentExpenses, newExpense],
        };
      }
      return plan;
    });

    savePlansToLocal(updatedPlans);
    setExpenseDesc("");
    setExpenseAmount("");
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (!selectedExpensePlanId) return;
    const updatedPlans = savedPlans.map((plan) => {
      if (plan.id === selectedExpensePlanId) {
        const currentExpenses = plan.expenses || [];
        return {
          ...plan,
          expenses: currentExpenses.filter((e) => e.id !== expenseId),
        };
      }
      return plan;
    });
    savePlansToLocal(updatedPlans);
  };

  const handleUpdateBudget = () => {
    if (!selectedExpensePlanId) return;
    const limit = parseFloat(customMaxBudget);
    if (isNaN(limit) || limit <= 0) {
      alert("Please enter a valid positive budget numeric limit.");
      return;
    }

    const updatedPlans = savedPlans.map((plan) => {
      if (plan.id === selectedExpensePlanId) {
        return {
          ...plan,
          maxBudget: limit,
        };
      }
      return plan;
    });
    savePlansToLocal(updatedPlans);
    setIsEditingBudget(false);
  };

  const getBudgetAdvice = async (plan: TravelPlan) => {
    setIsGeneratingAdvice(true);
    setAiAdvisorAdvice("");
    try {
      const response = await fetch("/api/assistant/budget-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: plan.destination,
          budgetType: plan.budgetType,
          maxBudget: plan.maxBudget || 1500,
          expenses: plan.expenses || [],
          durationDays: plan.durationDays,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAiAdvisorAdvice(data.text);
      } else {
        setAiAdvisorAdvice("Could not generate advice. Please try again.");
      }
    } catch (err: any) {
      setAiAdvisorAdvice("Error checking financial credentials: " + err.message);
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  // Chat Tour Guide Workspace
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const originalInput = chatInput;
    setChatInput("");
    setIsTypingChat(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: originalInput,
          mode: conciergeMode,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Assistant was unable to process");
      }

      const geminiMsg: ChatMessage = {
        id: `chat-gemini-${Date.now()}`,
        sender: "gemini",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        latencyMs: data.latencyMs,
      };
      setChatMessages((prev) => [...prev, geminiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `chat-err-${Date.now()}`,
        sender: "gemini",
        text: `⚠️ **Tour Guide Notice:** Failed to request response context. Please verify your GEMINI_API_KEY environment variable. Details: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTypingChat(false);
    }
  };

  // Creative Studio (Images)
  const triggerImageGenerate = async () => {
    setIsGeneratingImg(true);
    setRecentlyGeneratedImg(null);

    try {
      const payload: any = {
        prompt: studioPrompt,
        ratio: studioRatio,
        size: studioSize,
        studioQuality: studioQuality,
      };

      if (uploadedBase64 && uploadedMime) {
        payload.originalImageBase64 = uploadedBase64;
        payload.mimeType = uploadedMime;
      }

      const response = await fetch("/api/studio/image-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image assets.");
      }

      setRecentlyGeneratedImg(data.imageUrl);

      // Persist to user studio assets
      const newImg: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt: studioPrompt,
        imageUrl: data.imageUrl,
        ratio: studioRatio,
        size: studioSize,
        studioQuality: studioQuality,
        createdAt: new Date().toLocaleString(),
      };
      saveImagesToLocal([newImg, ...studioImages]);
    } catch (err: any) {
      alert(`Image Generation alert: ${err.message}`);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  // Trigger Video Generation (Veo Pattern)
  const triggerVideoGenerate = async () => {
    setIsGeneratingVideo(true);
    setVeoProgressPercent(10);
    setVeoProgressMsg("Initializing remote Veo 3 engine request...");

    try {
      const response = await fetch("/api/studio/video-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: studioPrompt,
          aspectRatio: studioRatio === "16:9" || studioRatio === "9:16" ? studioRatio : "16:9",
          startingImageBase64: uploadedBase64,
          mimeType: uploadedMime,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not trigger video compilation.");
      }

      setVeoProgressPercent(30);
      setVeoProgressMsg("Video generation task successfully registered. Initiating poller...");

      const newVid: GeneratedVideo = {
        id: `video-${Date.now()}`,
        operationName: data.operationName,
        prompt: studioPrompt,
        aspectRatio: studioRatio === "16:9" || studioRatio === "9:16" ? studioRatio : "16:9",
        status: "pending",
        createdAt: new Date().toLocaleString(),
        hasStartingImage: !!uploadedBase64,
      };

      saveVideosToLocal([newVid, ...studioVideos]);
      triggerVeoPolling(data.operationName, newVid.id);
    } catch (err: any) {
      setVeoProgressPercent(0);
      setVeoProgressMsg("");
      setIsGeneratingVideo(false);
      alert(`Video Compiler Error: ${err.message}`);
    }
  };

  // Re-poller trigger with reassuring text updates
  const triggerVeoPolling = (opName: string, localId: string) => {
    setActiveVeoOp(opName);
    let polls = 0;
    const interval = setInterval(async () => {
      polls++;
      const messages = [
        "Rendering camera motion tracks...",
        "Simulating realistic dynamic fluid velocities...",
        "Optimizing lighting shaders...",
        "Compiling frame interpolations...",
        "Wrapping up audio synchronizer and video container...",
      ];
      const nextMsg = messages[Math.min(polls, messages.length - 1)];
      setVeoProgressMsg(nextMsg);
      setVeoProgressPercent(Math.min(30 + polls * 10, 95));

      try {
        const res = await fetch("/api/studio/video-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operationName: opName }),
        });
        const data = await res.json();

        if (data.done) {
          clearInterval(interval);
          setVeoProgressPercent(100);
          setVeoProgressMsg("Video compilation finished. Finalizing payload stream!");

          // Update status
          const updated = studioVideos.map((v) => {
            if (v.id === localId) {
              return {
                ...v,
                status: "done" as const,
                videoUrl: `/api/studio/video-download?operationName=${encodeURIComponent(opName)}`,
              };
            }
            return v;
          });
          saveVideosToLocal(updated);
          setIsGeneratingVideo(false);
          setActiveVeoOp(null);
          alert("🎉 Veo compilation complete! Your travel video is ready to view in Saved Journeys.");
        }
      } catch (err) {
        console.error("Poller heartbeat issue:", err);
      }

      // Max timeout after 15 attempts (~2.5 minutes)
      if (polls > 15) {
        clearInterval(interval);
        const updated = studioVideos.map((v) => {
          if (v.id === localId) {
            return { ...v, status: "failed" as const };
          }
          return v;
        });
        saveVideosToLocal(updated);
        setIsGeneratingVideo(false);
        setActiveVeoOp(null);
        alert("Veo polling timed out. Please check back later.");
      }
    }, 10000);
  };

  // Media Analyzer
  const handleMediaAnalyze = async () => {
    if (!rawAnalysisMedia) {
      alert("Please attach or capture a media resource coordinates.");
      return;
    }
    setIsAnalyzing(true);
    setLastAnalysisText(null);

    try {
      const response = await fetch("/api/media/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaBase64: rawAnalysisMedia,
          mimeType: analysisMime,
          prompt: analysisPrompt,
          mediaType: analysisMode,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setLastAnalysisText(data.analysis);

      // Persist scan history
      const newScan: MediaAnalysisResult = {
        id: `scan-${Date.now()}`,
        mediaType: analysisMode,
        mediaName: analysisMode === "image" ? "Captured Travel Photo" : "Uploaded Log Video",
        previewUrl: rawAnalysisMedia,
        analysis: data.analysis,
        createdAt: new Date().toLocaleString(),
      };
      saveAnalysesToLocal([newScan, ...mediaAnalyses]);
    } catch (err: any) {
      alert(`Scanner exception: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper file uploader
  const processImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "studio" | "analyser") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        if (target === "studio") {
          setUploadedBase64(reader.result);
          setUploadedMime(file.type);
        } else {
          setRawAnalysisMedia(reader.result);
          setAnalysisMime(file.type);
          setAnalysisMode(file.type.startsWith("video") ? "video" : "image");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper load preset media
  const loadPresetMedia = async (url: string, mode: 'image' | 'video', mime: string, promptText: string) => {
    setIsAnalyzing(true);
    setLastAnalysisText(null);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setRawAnalysisMedia(reader.result);
          setAnalysisMime(mime);
          setAnalysisMode(mode);
          setAnalysisPrompt(promptText);
        }
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.warn("CORS or offline fallback, setting URL direct", e);
      setRawAnalysisMedia(url);
      setAnalysisMime(mime);
      setAnalysisMode(mode);
      setAnalysisPrompt(promptText);
      setIsAnalyzing(false);
    }
  };

  // Clear helper uploads
  const clearStudioUpload = () => {
    setUploadedBase64(null);
    setUploadedMime(null);
  };

  // Render Login Card
  if (!currentUser) {
    return (
      <LandingPage
        authEmail={authEmail}
        setAuthEmail={setAuthEmail}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        handleAuthSubmit={handleAuthSubmit}
        authError={authError}
        setAuthError={setAuthError}
        isLoadingAuth={isLoadingAuth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  // Render Logged In Workspace Dashboard
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] dark:bg-[#0f172a] dark:text-[#f8fafc] font-sans flex flex-col transition-colors duration-300">
      {/* Visual Top Bar Header */}
      <header className="bg-white dark:bg-[#1e293b] border-b border-rose-50/10 dark:border-slate-800 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#004ac6] flex items-center justify-center text-white shadow-md">
              <Plane size={20} className="rotate-45" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#004ac6] dark:text-[#60a5fa] block">
                Chandergari
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block -mt-1">
                COORDINATE CENTER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Offline Backup Live
            </span>

            {/* Dark/Light toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
              id="top_theme_toggle"
            >
              {darkMode ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} />}
            </button>

            {/* Profile badge with log out */}
            <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-4">
              <div className="text-right">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
                  {currentUser}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">Explorer Account</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 text-rose-600 transition"
                title="Log out of applet sandbox"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <nav className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0" id="main_navigation_rail">
          <button
            id="nav_btn_dashboard"
            onClick={() => setActiveTab("creative")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap md:w-full ${
              activeTab === "creative"
                ? "bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/50 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
            }`}
          >
            <LayoutGrid size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("planner")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap md:w-full ${
              activeTab === "planner"
                ? "bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/50 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
            }`}
          >
            <Compass size={18} />
            <span>Tour Planner</span>
          </button>

          <button
            onClick={() => setActiveTab("concierge")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap md:w-full ${
              activeTab === "concierge"
                ? "bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/50 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
            }`}
          >
            <Brain size={18} />
            <span>AI Tour Guide</span>
          </button>

          <button
            onClick={() => setActiveTab("multimodal")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap md:w-full ${
              activeTab === "multimodal"
                ? "bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/50 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
            }`}
          >
            <ImageIcon size={18} />
            <span>Media Understanding</span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap md:w-full ${
              activeTab === "saved"
                ? "bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/50 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
            }`}
          >
            <FolderOpen size={18} />
            <span>Saved Journeys ({savedPlans.length})</span>
          </button>
        </nav>

        {/* Content Workspace */}
        <main className="flex-grow min-w-0">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: ITINERARY PLANNER (Google Search and Maps Grounding) */}
            {activeTab === "planner" && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                  <h2 className="text-xl font-bold tracking-tight mb-2">Maps & Search Grounded Daily Planner</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    Formulate detailed travel programs utilizing live web verification and coordinate placement context.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Target Destination
                      </label>
                      <input
                        type="text"
                        value={planDest}
                        onChange={(e) => setPlanDest(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#004ac6]"
                        placeholder="e.g. Kyoto, Positano, Singapore"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="14"
                        value={planDays}
                        onChange={(e) => setPlanDays(Number(e.target.value))}
                        className="w-full py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#004ac6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Estimated Budget Level
                      </label>
                      <select
                        value={planBudget}
                        onChange={(e: any) => setPlanBudget(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#004ac6]"
                      >
                        <option value="budget">Value Dispatch (Thrifty)</option>
                        <option value="standard">Standard Explorer (Comfort)</option>
                        <option value="luxury">Luxury Elite (Premium)</option>
                      </select>
                    </div>
                  </div>

                  {/* Grounding and Info Switches */}
                  <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg flex flex-col md:flex-row gap-6 mb-6 justify-between border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="plan_search_check"
                        checked={planUseSearch}
                        onChange={(e) => setPlanUseSearch(e.target.checked)}
                        className="w-4 h-4 text-[#004ac6] border-slate-300 rounded focus:ring-[#004ac6]/15"
                      />
                      <div>
                        <label htmlFor="plan_search_check" className="text-sm font-bold text-slate-700 dark:text-slate-200 block">
                          Enable Search Grounding
                        </label>
                        <span className="text-xs text-slate-400 font-medium">Verify live routes, crowds, and ticket guidelines.</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="plan_maps_check"
                        checked={planUseMaps}
                        onChange={(e) => setPlanUseMaps(e.target.checked)}
                        className="w-4 h-4 text-[#004ac6] border-slate-300 rounded focus:ring-[#004ac6]/15"
                      />
                      <div>
                        <label htmlFor="plan_maps_check" className="text-sm font-bold text-slate-700 dark:text-slate-200 block">
                          Enable Maps Grounding
                        </label>
                        <span className="text-xs text-slate-400 font-medium">Secure geolocation coordinates and location references.</span>
                      </div>
                    </div>
                  </div>

                  {/* Hotlinks presets */}
                  <div className="mb-6">
                    <span className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                      Select Preset Visual Theme coordinates:
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PRESET_DESTINATIONS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setPlanDest(preset.name);
                          }}
                          className={`group text-left p-2 rounded-lg border transition-all duration-200 ${
                            planDest === preset.name
                              ? "border-[#004ac6] bg-[#004ac6]/5 font-semibold"
                              : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          <img
                            src={preset.img}
                            alt={preset.name}
                            className="w-full h-20 object-cover rounded mb-1.5 grayscale-30 group-hover:grayscale-0 transition duration-300"
                          />
                          <span className="block text-xs font-bold truncate">{preset.name}</span>
                          <span className="block text-[9px] text-slate-400 truncate">{preset.tagline}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={triggerGeneratePlan}
                    disabled={isGeneratingPlan || !planDest}
                    className="w-full py-3 bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-sm rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGeneratingPlan ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Grounding & Compiling Live Itinerary...</span>
                      </>
                    ) : (
                      <>
                        <Compass size={16} />
                        <span>Formulate Grounded Itinerary</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Grounded Plan Compilation Result */}
                {currentGeneratedPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30 shadow-md">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 rounded">
                            ✨ Gemini Grounded Result
                          </span>
                          <h3 className="text-xl font-bold mt-1">compiled Route: {planDest}</h3>
                        </div>

                        <button
                          onClick={saveCurrentPlanToItinerary}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition"
                        >
                          Save Itinerary to Local Diary
                        </button>
                      </div>

                      {/* Display Markdown parsed results */}
                      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {currentGeneratedPlan.itineraryText}
                      </div>

                      {/* ESTIMATED EXPENSES BREAKDOWN BOARD */}
                      {currentGeneratedPlan.estimatedExpenses && currentGeneratedPlan.estimatedExpenses.length > 0 && (
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="p-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                              <DollarSign size={18} />
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                              Estimated Journey Outlay Breakdown (${currentGeneratedPlan.estimatedExpenses.reduce((sum: number, item: any) => sum + item.amount, 0).toLocaleString()} USD)
                            </h4>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-405 mb-4">
                            Calculated realistic travel base costs tailored specifically for a <strong className="capitalize text-emerald-600 dark:text-emerald-450">{planBudget}</strong> tier budget.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Visual Distributions */}
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 space-y-3.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Category Portions</span>
                              {[
                                { key: 'accommodation', label: '🏨 Accommodation', color: 'bg-blue-500', barBg: 'bg-blue-50 dark:bg-blue-950/20' },
                                { key: 'transport', label: '✈️ Transportation', color: 'bg-teal-500', barBg: 'bg-teal-50 dark:bg-teal-950/20' },
                                { key: 'food', label: '🍔 Dining & Food', color: 'bg-amber-500', barBg: 'bg-amber-50 dark:bg-amber-950/20' },
                                { key: 'activities', label: '🎟️ Sightseeing & Activities', color: 'bg-purple-500', barBg: 'bg-purple-50 dark:bg-purple-950/20' },
                                { key: 'shopping', label: '🛍️ Local Shopping', color: 'bg-pink-500', barBg: 'bg-pink-50 dark:bg-pink-950/20' },
                                { key: 'other', label: '📦 Miscellaneous', color: 'bg-slate-500', barBg: 'bg-slate-100 dark:bg-slate-900/40' },
                              ].map((cat) => {
                                const catTotal = currentGeneratedPlan.estimatedExpenses
                                  .filter((e: any) => e.category === cat.key)
                                  .reduce((acc: number, cur: any) => acc + (cur.amount || 0), 0);
                                const totalSum = currentGeneratedPlan.estimatedExpenses.reduce((acc: number, cur: any) => acc + (cur.amount || 0), 0);
                                const catPercent = totalSum > 0 ? Math.round((catTotal / totalSum) * 100) : 0;
                                if (catTotal === 0) return null; // Only show active categories
                                return (
                                  <div key={cat.key} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-650 dark:text-slate-300">
                                      <span>{cat.label}</span>
                                      <span className="font-mono text-[11px]">
                                        ${catTotal.toFixed(0)} <span className="text-[10px] text-slate-400">({catPercent}%)</span>
                                      </span>
                                    </div>
                                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${cat.barBg}`}>
                                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${catPercent}%` }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Itemized Estimate List */}
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 overflow-hidden flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Itemized Budget Ledger</span>
                                <div className="space-y-2 max-h-[195px] overflow-y-auto pr-1">
                                  {currentGeneratedPlan.estimatedExpenses.map((exp: any, idx: number) => {
                                    const iconMap: Record<string, string> = {
                                      accommodation: "🏨",
                                      transport: "✈️",
                                      food: "🍔",
                                      activities: "🎟️",
                                      shopping: "🛍️",
                                      other: "📦"
                                    };
                                    return (
                                      <div key={idx} className="flex justify-between items-center text-xs p-2 bg-white dark:bg-[#1e293b]/70 border border-slate-205/40 dark:border-slate-805/40 rounded-lg shadow-2xs">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm">{iconMap[exp.category] || "📦"}</span>
                                          <div>
                                            <span className="font-semibold block text-slate-700 dark:text-slate-200">{exp.description}</span>
                                            <span className="text-[9px] text-slate-400 block font-mono">{exp.date}</span>
                                          </div>
                                        </div>
                                        <span className="font-mono font-bold text-[#004ac6] dark:text-[#60a5fa]">${exp.amount.toFixed(0)}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Grounding Source references */}
                      {(currentGeneratedPlan.groundingUrls?.length > 0 || currentGeneratedPlan.mapsUrls?.length > 0) && (
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Verification & Location Sources (Grounding)
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Web search coordinates */}
                            {currentGeneratedPlan.groundingUrls?.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-400 block mb-1">Web Search References:</span>
                                {currentGeneratedPlan.groundingUrls.map((item: any, idx: number) => (
                                  <a
                                    key={idx}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-xs text-[#004ac6] dark:text-[#60a5fa] font-semibold hover:underline bg-[#004ac6]/5 dark:bg-blue-950/20 p-2.5 rounded-lg border border-[#004ac6]/10"
                                  >
                                    <Search size={12} />
                                    <span className="truncate">{item.title}</span>
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Google map links */}
                            {currentGeneratedPlan.mapsUrls?.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-400 block mb-1">Google Maps Local Assets:</span>
                                {currentGeneratedPlan.mapsUrls.map((item: any, idx: number) => (
                                  <a
                                    key={idx}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-xs text-orange-700 dark:text-orange-400 font-semibold hover:underline bg-orange-50 dark:bg-orange-950/20 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/30"
                                  >
                                    <MapPin size={12} />
                                    <span className="truncate">{item.title}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB 2: TOUR GUIDE CHAT WORKSPACE (Streaming model selector) */}
            {activeTab === "concierge" && (
              <motion.div
                key="concierge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-[550px] bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm"
              >
                {/* Mode header selection */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <h3 className="font-bold flex items-center gap-1.5">
                      <Brain size={18} className="text-[#004ac6]" />
                      Assistant Intelligence Panel
                    </h3>
                    <p className="text-xs text-slate-400">Interact with tailored reasoning options dynamically.</p>
                  </div>

                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button
                      onClick={() => setConciergeMode("fast")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                        conciergeMode === "fast"
                          ? "bg-white dark:bg-slate-800 text-[#004ac6] dark:text-[#60a5fa] shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      ⚡ Fast Assist
                    </button>
                    <button
                      onClick={() => setConciergeMode("balanced")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                        conciergeMode === "balanced"
                          ? "bg-white dark:bg-slate-800 text-[#004ac6] dark:text-[#60a5fa] shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      ⚖️ Standard
                    </button>
                    <button
                      onClick={() => setConciergeMode("thinking")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                        conciergeMode === "thinking"
                          ? "bg-white dark:bg-slate-800 text-[#004ac6] dark:text-[#60a5fa] shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      🧠 High Thinking Mode
                    </button>
                  </div>
                </div>

                {/* Message stream */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3.5 text-sm ${
                          msg.sender === "user"
                            ? "bg-[#004ac6] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed font-sans prose prose-slate">
                          {msg.text}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 font-semibold">{msg.timestamp}</span>
                        {msg.latencyMs && (
                          <span className="text-[10px] text-[#004ac6] dark:text-[#60a5fa] font-mono font-semibold">
                            ({msg.latencyMs}ms latency)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTypingChat && (
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 max-w-[85%]">
                        <div className="flex items-center gap-3">
                          <RefreshCw size={14} className="animate-spin text-[#004ac6]" />
                          <span className="text-xs font-semibold text-slate-500 animate-pulse">
                            {conciergeMode === "thinking"
                              ? "Deep-thinking logic solver running (ThinkingLevel.HIGH)..."
                              : "Generating dispatch responses..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Ask about transit coordinates, packing indexes, budgets..."
                    className="flex-grow py-3 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-[#004ac6] text-sm text-slate-800 dark:text-slate-100"
                  />
                  <button
                    onClick={handleSendChat}
                    className="p-3 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 3: TRAVEL DASHBOARD (My Adventures, Places to Visit, Saved Places) */}
            {activeTab === "creative" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* 1. Header & My Adventures */}
                <div className="space-y-6" id="dashboard_section_adventures">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white" id="dashboard_header_my_adventures">
                        My Adventures
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Manage your upcoming and past trips.
                      </p>
                    </div>
                    <button
                      id="dashboard_btn_create_trip"
                      onClick={() => {
                        setPlanDest("");
                        setActiveTab("planner");
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition"
                    >
                      <Plus size={16} />
                      <span>Create New Trip</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Adventure 1: Plan New Adventure */}
                    <div
                      id="card_adv_new"
                      onClick={() => {
                        setPlanDest("");
                        setActiveTab("planner");
                      }}
                      className="bg-dashed-border-card border border-dashed border-slate-300 dark:border-slate-700 hover:border-[#004ac6] dark:hover:border-[#004ac6] bg-slate-50/20 hover:bg-[#004ac6]/10 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer min-h-[290px] transition group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#004ac6] flex items-center justify-center mb-4 transition border border-blue-100 dark:border-blue-900/30 group-hover:scale-110">
                        <Plus size={24} />
                      </div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-[#004ac6] transition">
                        Plan a new adventure
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-[200px]">
                        Start building your next itinerary from scratch.
                      </p>
                    </div>

                    {/* Render live plans inside Adventure grid */}
                    {savedPlans.map((plan) => {
                      const isActiveTracker = selectedExpensePlanId === plan.id;
                      
                      // Map destination names to unsplash images for Tokyo and Alpine, or default
                      let cardImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop";
                      if (plan.id === "plan-tokyo" || plan.destination.toLowerCase().includes("tokyo")) {
                        cardImg = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop";
                      } else if (plan.id === "plan-alpine" || plan.destination.toLowerCase().includes("alps") || plan.destination.toLowerCase().includes("alpine")) {
                        cardImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop";
                      } else if (plan.destination.toLowerCase().includes("singapore") || plan.destination.toLowerCase().includes("mariana")) {
                        cardImg = "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=600&auto=format&fit=crop";
                      }

                      // Sum up current logged expenses
                      const totalSpent = (plan.expenses || []).reduce((sum, item) => sum + item.amount, 0);

                      return (
                        <div
                          key={plan.id}
                          id={`live_card_${plan.id}`}
                          className={`bg-white dark:bg-[#1e293b] rounded-xl border shadow-sm transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                            isActiveTracker 
                              ? 'border-[#004ac6] ring-2 ring-[#004ac6]/10 shadow-md' 
                              : 'border-slate-200/60 dark:border-slate-800 hover:shadow-md'
                          }`}
                        >
                          <div>
                            <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <img
                                src={cardImg}
                                alt={plan.destination}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              {isActiveTracker ? (
                                <span className="absolute top-3 right-3 px-2 py-1 bg-[#004ac6] text-white text-[10px] font-bold rounded-md tracking-wider uppercase shadow-sm animate-pulse">
                                  📊 Active Tracker
                                </span>
                              ) : (
                                <span className="absolute top-3 right-3 px-2 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 text-[10px] font-bold rounded-md tracking-wider uppercase border border-purple-100 dark:border-purple-900/30">
                                  Journey Option
                                </span>
                              )}
                            </div>
                            <div className="p-5 space-y-2">
                              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate">
                                {plan.destination}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Calendar size={14} className="text-slate-400" />
                                <span>{plan.durationDays} Days • Created {plan.createdAt}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="px-5 pb-5 pt-3 flex flex-col gap-3 border-t border-slate-100/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/10">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded capitalize">
                                Budget Tier: {plan.budgetType}
                              </span>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Spent: <strong className="font-mono text-slate-700 dark:text-slate-200">${totalSpent}</strong> / ${plan.maxBudget || 1500}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1 mt-1 pt-2 border-t border-slate-100/60 dark:border-slate-800/40">
                              <button
                                onClick={() => {
                                  setSelectedExpensePlanId(plan.id);
                                  setAiAdvisorAdvice("");
                                  const element = document.getElementById("expense_tracker_section");
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                  } else {
                                    alert(`📊 Balanced tracker loaded for ${plan.destination}! Scroll down to view the control cabinet.`);
                                  }
                                }}
                                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition inline-flex items-center gap-1 cursor-pointer ${
                                  isActiveTracker 
                                    ? 'bg-[#004ac6]/10 border-[#004ac6]/20 text-[#004ac6]' 
                                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span>Track Expenses</span>
                                <DollarSign size={13} />
                              </button>

                              <div className="flex items-center gap-1.5">
                                <button
                                  id={`btn_live_open_${plan.id}`}
                                  onClick={() => {
                                    setPlanDest(plan.destination);
                                    setPlanDays(plan.durationDays);
                                    setPlanBudget(plan.budgetType);
                                    if (plan.notes) {
                                      setCurrentGeneratedPlan({
                                        itineraryText: plan.notes,
                                        groundingUrls: plan.groundingUrls,
                                        mapsUrls: plan.mapsUrls,
                                      });
                                    }
                                    setActiveTab("planner");
                                  }}
                                  className="text-xs font-bold text-[#004ac6] hover:text-[#2563eb] inline-flex items-center gap-0.5 hover:underline text-left cursor-pointer transition"
                                >
                                  <span>View Plan</span>
                                  <ChevronRight size={13} />
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this trip record and all itemized logs?")) {
                                      const remaining = savedPlans.filter((p) => p.id !== plan.id);
                                      savePlansToLocal(remaining);
                                      if (selectedExpensePlanId === plan.id && remaining.length > 0) {
                                        setSelectedExpensePlanId(remaining[0].id);
                                      }
                                    }
                                  }}
                                  className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 text-rose-500 rounded-lg transition"
                                  title="Delete Adventure"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* VISUAL EXPENSE TRACKER SECTION */}
                {(() => {
                  const activeExpensePlan = savedPlans.find((p) => p.id === selectedExpensePlanId) || savedPlans[0];
                  if (!activeExpensePlan) return null;

                  const totalExpenseSpent = (activeExpensePlan.expenses || []).reduce((acc, cur) => acc + (cur.amount || 0), 0);
                  const maxExpenseBudget = activeExpensePlan.maxBudget || 1500;
                  const remainingExpenseBudget = maxExpenseBudget - totalExpenseSpent;
                  const spendPercentage = Math.min(100, Math.round((totalExpenseSpent / maxExpenseBudget) * 100));

                  return (
                    <div id="expense_tracker_section" className="bg-slate-50 dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800 space-y-8 shadow-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/60 pb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 bg-[#004ac6]/10 text-[#004ac6] rounded-lg">
                              <DollarSign size={20} />
                            </span>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                              Trip Expense Control Center
                            </h2>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Currently managing ledger balances for: <strong className="text-slate-800 dark:text-slate-200">{activeExpensePlan.destination}</strong> ({activeExpensePlan.durationDays} Days, <span className="uppercase text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-bold">{activeExpensePlan.budgetType}</span> tier)
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Switch Adventure:</label>
                          <select
                            id="expense_plan_selector"
                            value={selectedExpensePlanId}
                            onChange={(e) => {
                              setSelectedExpensePlanId(e.target.value);
                              setAiAdvisorAdvice("");
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#004ac6]"
                          >
                            {savedPlans.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.destination} ({p.durationDays}d)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Bento Statistics Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Stat 1: Total Allocated */}
                        <div className="bg-white dark:bg-[#1e293b] border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4 shadow-xs relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Allocated Budget</span>
                            <span className="inline-flex items-center p-1 bg-blue-50 dark:bg-blue-950/30 text-[#004ac6] dark:text-blue-400 rounded-md">
                              <DollarSign size={14} />
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-baseline gap-2">
                            {isEditingBudget ? (
                              <div className="flex items-center gap-1.5 w-full">
                                <input
                                  type="number"
                                  value={customMaxBudget}
                                  onChange={(e) => setCustomMaxBudget(e.target.value)}
                                  placeholder={maxExpenseBudget.toString()}
                                  className="w-20 px-2 py-1 text-xs border rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                                />
                                <button
                                  type="button"
                                  onClick={handleUpdateBudget}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] uppercase font-bold rounded"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsEditingBudget(false)}
                                  className="px-2 py-1 bg-slate-400 text-white text-[9px] uppercase font-bold rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="text-2xl font-mono font-bold text-slate-800 dark:text-white">${maxExpenseBudget.toLocaleString()}</span>
                                <button
                                  onClick={() => {
                                    setCustomMaxBudget(maxExpenseBudget.toString());
                                    setIsEditingBudget(true);
                                  }}
                                  className="text-slate-400 hover:text-[#004ac6] p-0.5 cursor-pointer"
                                  title="Edit Budget Limit"
                                >
                                  <Edit2 size={12} />
                                </button>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1.5 font-semibold">Customizable travel capital.</span>
                        </div>

                        {/* Stat 2: Total Spent */}
                        <div className="bg-white dark:bg-[#1e293b] border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4 shadow-xs relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Output Spent</span>
                            <span className="inline-flex items-center p-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-md">
                              <DollarSign size={14} />
                            </span>
                          </div>
                          <div className="mt-2.5">
                            <span className="text-2xl font-mono font-bold text-slate-800 dark:text-white">${totalExpenseSpent.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <div className="flex-grow bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${spendPercentage >= 100 ? 'bg-red-500' : spendPercentage >= 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${spendPercentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{spendPercentage}%</span>
                          </div>
                        </div>

                        {/* Stat 3: Remaining Capital */}
                        <div className="bg-white dark:bg-[#1e293b] border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4 shadow-xs relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remaining Balance</span>
                            <span className={`inline-flex items-center p-1 rounded-md ${remainingExpenseBudget < 0 ? 'bg-red-50 dark:bg-red-950/30 text-red-600' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650'}`}>
                              <DollarSign size={14} />
                            </span>
                          </div>
                          <div className="mt-2.5">
                            <span className={`text-2xl font-mono font-bold ${remainingExpenseBudget < 0 ? 'text-red-650 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
                              ${remainingExpenseBudget.toLocaleString()}
                            </span>
                          </div>
                          <span className={`text-[10px] block mt-1.5 font-bold ${remainingExpenseBudget < 0 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {remainingExpenseBudget < 0 ? '⚠️ Budget Limit Breached!' : '🟢 Safely within limits.'}
                          </span>
                        </div>

                        {/* Stat 4: Daily Burn Estimate */}
                        <div className="bg-white dark:bg-[#1e293b] border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4 shadow-xs relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Daily Spent</span>
                            <span className="inline-flex items-center p-1 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-md">
                              <Clock size={14} />
                            </span>
                          </div>
                          <div className="mt-2.5">
                            <span className="text-2xl font-mono font-bold text-slate-800 dark:text-white">
                              ${Math.round(totalExpenseSpent / (activeExpensePlan.durationDays || 1))}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1.5 font-semibold">Paced over {activeExpensePlan.durationDays} registered days.</span>
                        </div>
                      </div>

                      {/* Section Split: quick-add on the left, visual cost categories & advice on the right */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left: Quick Form & Logs (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/50 dark:border-slate-800/80 p-5 space-y-4">
                            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <Plus size={16} className="text-[#004ac6]" />
                              Add Transaction Receipt
                            </h3>
                            <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                                <input
                                  type="text"
                                  value={expenseDesc}
                                  onChange={(e) => setExpenseDesc(e.target.value)}
                                  placeholder="e.g. Ramen Lunch / Rail Subway ticket"
                                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#004ac6]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400">Amount ($ USD)</label>
                                <input
                                  type="number"
                                  step="any"
                                  value={expenseAmount}
                                  onChange={(e) => setExpenseAmount(e.target.value)}
                                  placeholder="e.g. 15.00"
                                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#004ac6]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400">Category</label>
                                <select
                                  value={expenseCategory}
                                  onChange={(e: any) => setExpenseCategory(e.target.value)}
                                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 outline-none focus:border-[#004ac6]"
                                >
                                  <option value="accommodation">🏨 Accommodation</option>
                                  <option value="transport">✈️ Transportation</option>
                                  <option value="food">🍔 Dining & Food</option>
                                  <option value="activities">🎟️ Sightseeing & Activities</option>
                                  <option value="shopping">🛍️ Local Shopping</option>
                                  <option value="other">📦 Miscellaneous</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400">Timing</label>
                                <select
                                  value={expenseDay}
                                  onChange={(e) => setExpenseDay(e.target.value)}
                                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 outline-none focus:border-[#004ac6]"
                                >
                                  {Array.from({ length: activeExpensePlan.durationDays || 3 }).map((_, i) => (
                                    <option key={`day-${i+1}`} value={`Day ${i+1}`}>
                                      Day {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="sm:col-span-2 pt-1">
                                <button
                                  type="submit"
                                  className="w-full py-2 bg-[#004ac6] hover:bg-[#2563eb] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
                                >
                                  Register Expense Receipt
                                </button>
                              </div>
                            </form>
                          </div>

                          {/* ledger list */}
                          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/50 dark:border-slate-800/80 overflow-hidden shadow-xs">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <LayoutGrid size={16} className="text-[#004ac6]" />
                                Expense Ledger Log ({(activeExpensePlan.expenses || []).length})
                              </h3>
                            </div>
                            <div className="overflow-x-auto">
                              {(!activeExpensePlan.expenses || activeExpensePlan.expenses.length === 0) ? (
                                <div className="p-8 text-center space-y-2">
                                  <p className="text-xs text-slate-400 italic">No registered transactions for this trip ledger.</p>
                                  <p className="text-[10px] text-slate-400">Use the form above to catalog your first receipt.</p>
                                </div>
                              ) : (
                                <table className="w-full text-left border-collapse">
                                  <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
                                      <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction</th>
                                      <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Category</th>
                                      <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Timeline</th>
                                      <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Amount</th>
                                      <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {activeExpensePlan.expenses.map((exp) => {
                                      const iconMap: Record<string, string> = {
                                        accommodation: "🏨",
                                        transport: "✈️",
                                        food: "🍔",
                                        activities: "🎟️",
                                        shopping: "🛍️",
                                        other: "📦"
                                      };
                                      return (
                                        <tr key={exp.id} className="hover:bg-slate-50/55 dark:hover:bg-slate-900/40 transition">
                                          <td className="p-3">
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{exp.description}</span>
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className="inline-block text-[10px] uppercase px-2 py-0.5 font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-305">
                                              {iconMap[exp.category] || "📦"} {exp.category}
                                            </span>
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{exp.date}</span>
                                          </td>
                                          <td className="p-3 text-right">
                                            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">${exp.amount.toFixed(2)}</span>
                                          </td>
                                          <td className="p-3 text-center">
                                            <button
                                              onClick={() => handleDeleteExpense(exp.id)}
                                              className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-500 dark:text-rose-400 rounded transition cursor-pointer"
                                              title="Delete Entry"
                                            >
                                              <Trash2 size={13} />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Visual categories bar distributions and Intelligent Gemini recommendations (5 cols) */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-6 lg:mt-0">
                          {/* Category breakdown visualizer */}
                          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/50 dark:border-slate-800/80 p-5 space-y-4">
                            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <LayoutGrid size={16} className="text-[#004ac6]" />
                              Category Distributions
                            </h3>
                            <div className="space-y-3.5">
                              {[
                                { key: 'accommodation', label: '🏨 Accommodation', color: 'bg-blue-500', barBg: 'bg-blue-50 dark:bg-blue-950/20' },
                                { key: 'transport', label: '✈️ Transportation', color: 'bg-teal-500', barBg: 'bg-teal-50 dark:bg-teal-950/20' },
                                { key: 'food', label: '🍔 Dining & Food', color: 'bg-amber-500', barBg: 'bg-amber-50 dark:bg-amber-950/20' },
                                { key: 'activities', label: '🎟️ Sightseeing & Activities', color: 'bg-purple-500', barBg: 'bg-purple-50 dark:bg-purple-950/20' },
                                { key: 'shopping', label: '🛍️ Local Shopping', color: 'bg-pink-500', barBg: 'bg-pink-50 dark:bg-pink-950/20' },
                                { key: 'other', label: '📦 Miscellaneous', color: 'bg-slate-500', barBg: 'bg-slate-55 dark:bg-slate-900/40' },
                              ].map((cat) => {
                                const catTotal = (activeExpensePlan.expenses || [])
                                  .filter((e) => e.category === cat.key)
                                  .reduce((acc, cur) => acc + (cur.amount || 0), 0);
                                const catPercent = totalExpenseSpent > 0 ? Math.round((catTotal / totalExpenseSpent) * 100) : 0;
                                return (
                                  <div key={cat.key} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                                      <span>{cat.label}</span>
                                      <span className="font-mono text-[11px]">
                                        ${catTotal.toFixed(0)} <span className="text-[10px] text-slate-400">({catPercent}%)</span>
                                      </span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full overflow-hidden ${cat.barBg}`}>
                                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${catPercent}%` }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Gemini intelligent Advisor Panel */}
                          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/50 dark:border-slate-800/80 p-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5 animate-pulse">
                                <Sparkles size={16} className="text-amber-500" />
                                AI Financial Advisor
                              </h3>
                              <button
                                type="button"
                                onClick={() => getBudgetAdvice(activeExpensePlan)}
                                disabled={isGeneratingAdvice}
                                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                              >
                                {isGeneratingAdvice ? (
                                  <>
                                    <RefreshCw size={10} className="animate-spin" />
                                    <span>Analyzing...</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles size={10} />
                                    <span>Get AI Advice</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="text-xs leading-relaxed text-slate-605 dark:text-slate-300 p-4 border border-amber-205/40 dark:border-amber-955/40 bg-amber-50/20 dark:bg-amber-950/5 rounded-xl min-h-[140px] flex flex-col justify-between">
                              {isGeneratingAdvice ? (
                                <div className="flex flex-col items-center justify-center py-6 gap-2 h-full">
                                  <Sparkles className="animate-bounce text-amber-500" size={24} />
                                  <span className="animate-pulse text-[11px] font-bold text-slate-400">Calculating burn rates & regional local alternatives...</span>
                                </div>
                              ) : aiAdvisorAdvice ? (
                                <div className="markdown-body text-slate-705 dark:text-slate-200 space-y-2 whitespace-pre-line text-xs font-semibold">
                                  {aiAdvisorAdvice}
                                </div>
                              ) : (
                                <div className="text-center py-6 space-y-2">
                                  <p className="text-[11px] text-slate-400 italic">No advice compiled yet for this ledger status.</p>
                                  <p className="text-[10px] text-slate-400">Click the button above to get smart Gemini recommendations on currency conversions, local market foods, and transport pass discounts!</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. Places to Visit (Interactive Grid with Real-Time Search & Category Tags) */}
                <div className="space-y-6" id="dashboard_section_places">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white" id="dashboard_header_places_to_visit">
                      Places to Visit
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Handpicked destinations for your next journey.
                    </p>
                  </div>

                  {/* Search and Category Filter Rail */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        id="dashboard_search_places_input"
                        type="text"
                        value={dashboardSearch}
                        onChange={(e) => setDashboardSearch(e.target.value)}
                        placeholder="Search your saved places..."
                        className="w-full pl-11 pr-4 py-2.5 text-sm font-semibold rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] shadow-sm transition"
                      />
                      {dashboardSearch && (
                        <button
                          onClick={() => setDashboardSearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                      {["All", "Europe", "Asia", "North America", "Middle East"].map((cat) => (
                        <button
                          key={cat}
                          id={`btn_cat_filter_${cat.toLowerCase().replace(/\s+/g, '_')}`}
                          onClick={() => setDashboardCategory(cat)}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all border whitespace-nowrap cursor-pointer ${
                            dashboardCategory === cat
                              ? "bg-[#004ac6] text-white border-[#004ac6] shadow-sm"
                              : "bg-white dark:bg-[#1e293b] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        id: "place_santorini",
                        name: "Santorini, Greece",
                        category: "Europe",
                        description: "Iconic white buildings and blue domes overlooking the Aegean Sea.",
                        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop"
                      },
                      {
                        id: "place_kyoto",
                        name: "Kyoto, Japan",
                        category: "Asia",
                        description: "Traditional wooden temples and serene cherry blossom gardens.",
                        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop"
                      },
                      {
                        id: "place_banff",
                        name: "Banff, Canada",
                        category: "North America",
                        description: "Stunning turquoise lakes and snow-capped peaks in the Rockies.",
                        image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop"
                      },
                      {
                        id: "place_petra",
                        name: "Petra, Jordan",
                        category: "Middle East",
                        description: "Ancient rock-cut archaeological city containing majestic treasuries.",
                        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop"
                      }
                    ]
                      .filter((place) => {
                        const matchesCategory = dashboardCategory === "All" || place.category === dashboardCategory;
                        const matchesSearch = place.name.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                          place.description.toLowerCase().includes(dashboardSearch.toLowerCase());
                        return matchesCategory && matchesSearch;
                      })
                      .map((place) => (
                        <div
                          key={place.id}
                          id={`card_place_${place.id}`}
                          className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded">
                                {place.category}
                              </span>
                            </div>
                            <div className="p-5 space-y-2">
                              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                <MapPin size={16} className="text-[#004ac6] flex-shrink-0" />
                                {place.name}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                                {place.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-2 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                            <button
                              id={`btn_view_${place.id}`}
                              onClick={() => {
                                setPlanDest(place.name.split(",")[0].trim());
                                setPlanDays(5);
                                setPlanBudget("standard");
                                setActiveTab("planner");
                              }}
                              className="text-xs font-bold text-[#004ac6] hover:text-[#2563eb] inline-flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <span>View Details</span>
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 3. Saved Places (Map Interaction Cards) */}
                <div className="space-y-6" id="dashboard_section_saved_places">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white" id="dashboard_header_saved_places">
                      Saved Places
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Your personal collection of dream destinations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        id: "saved_amalfi",
                        name: "Amalfi Coast, Italy",
                        description: "Stunning coastal views and colorful villages.",
                        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop"
                      },
                      {
                        id: "saved_singapore",
                        name: "Singapore",
                        description: "A modern oasis of lights and greenery.",
                        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=600&auto=format&fit=crop"
                      },
                      {
                        id: "saved_paris",
                        name: "Paris, France",
                        description: "Charming cafes and historic architecture.",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop"
                      }
                    ].map((place) => (
                      <div
                        key={place.id}
                        id={`card_saved_${place.id}`}
                        className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-full h-full object-cover hover:scale-105 transition duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-5 space-y-2">
                            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                              {place.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                              {place.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                          <a
                            id={`btn_map_${place.id}`}
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-[#004ac6] hover:text-[#2563eb] inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                          >
                            <MapPin size={14} />
                            <span>View on Map</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: MULTIMODAL HUB (Media Analysis) */}
            {activeTab === "multimodal" && (
              <motion.div
                key="multimodal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Multimodal Asset Scanner</h3>
                      <p className="text-xs text-slate-400">
                        Analyze travel photo landmarks, ticketing codes, food images or local transit clips using Google Gemini.
                      </p>
                    </div>
                  </div>

                  {/* Sandbox Presets Selection */}
                  <div className="mb-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Select a Sandbox Travel Sample Asset to Test:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => loadPresetMedia(
                          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop",
                          "image",
                          "image/jpeg",
                          "Please translate this ticket, read the route, and extract travel coordinates."
                        )}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#004ac6] bg-white dark:bg-[#0f172a] text-left hover:shadow-sm transition cursor-pointer"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=150&auto=format&fit=crop"
                          className="w-10 h-10 object-cover rounded"
                          alt="Osaka"
                        />
                        <div>
                          <span className="block text-xs font-bold">Osaka Transit</span>
                          <span className="text-[10px] text-slate-400">Image • Subway Ticket</span>
                        </div>
                      </button>

                      <button
                        onClick={() => loadPresetMedia(
                          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
                          "image",
                          "image/jpeg",
                          "Explain this historical landmark and recommend nearby bistro coordinates."
                        )}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#004ac6] bg-white dark:bg-[#0f172a] text-left hover:shadow-sm transition cursor-pointer"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=150&auto=format&fit=crop"
                          className="w-10 h-10 object-cover rounded"
                          alt="Paris"
                        />
                        <div>
                          <span className="block text-xs font-bold">Eiffel Tower</span>
                          <span className="text-[10px] text-slate-400">Image • Landmark</span>
                        </div>
                      </button>

                      <button
                        onClick={() => loadPresetMedia(
                          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
                          "video",
                          "video/mp4",
                          "Analyze the geography of this alpine trail and suggest essential safety guidelines."
                        )}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#004ac6] bg-white dark:bg-[#0f172a] text-left hover:shadow-sm transition cursor-pointer"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=150&auto=format&fit=crop"
                          className="w-10 h-10 object-cover rounded"
                          alt="Alps"
                        />
                        <div>
                          <span className="block text-xs font-bold">Alps Ridge</span>
                          <span className="text-[10px] text-slate-400">Video • Drone Survey</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Upload media preview */}
                    <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/20 text-center min-h-[220px]">
                      {rawAnalysisMedia ? (
                        <div className="space-y-4 w-full">
                          {analysisMode === "image" ? (
                            <img
                              src={rawAnalysisMedia}
                              alt="Analysis preview target"
                              className="mx-auto max-h-48 rounded shadow object-cover"
                            />
                          ) : (
                            <div className="space-y-3">
                              {rawAnalysisMedia.startsWith("data:") ? (
                                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500 font-semibold flex items-center justify-center gap-2">
                                  <Video size={16} />
                                  Loaded custom video file
                                </div>
                              ) : (
                                <img
                                  src={rawAnalysisMedia}
                                  alt="Video placeholder poster"
                                  className="mx-auto max-h-48 rounded shadow object-cover"
                                />
                              )}
                              <div className="p-2 bg-slate-100 dark:bg-slate-800/60 rounded text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-2">
                                <Video size={12} />
                                Swiss Alps Video Clip Reference
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              setRawAnalysisMedia(null);
                              setAnalysisMime(null);
                            }}
                            className="px-3 py-1.5 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                          >
                            Remove Asset
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer space-y-2">
                          <ImageIcon size={36} className="mx-auto text-slate-400" />
                          <span className="block text-xs font-bold text-[#004ac6]">Upload travel asset (Photo or Video Clip)</span>
                          <span className="block text-[10px] text-slate-400">Supports .png, .jpg, .webm, .mp4 files</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => processImageUpload(e, "analyser")}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Scan context controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Analysis Instruction Guide (Optional)
                        </label>
                        <input
                          type="text"
                          value={analysisPrompt}
                          onChange={(e) => setAnalysisPrompt(e.target.value)}
                          className="w-full py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm font-semibold outline-none focus:border-[#004ac6]"
                          placeholder="e.g. Translate text, read boarding gates, identify local dish..."
                        />
                      </div>

                      <button
                        onClick={handleMediaAnalyze}
                        disabled={isAnalyzing || !rawAnalysisMedia}
                        className="w-full py-3 bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            <span>Scanning with Gemini (using gemini-3.5-flash)...</span>
                          </>
                        ) : (
                          <>
                            <Search size={16} />
                            <span>Scan Travel Element</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Scan outcome analysis */}
                  {lastAnalysisText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-lg space-y-3 mb-8"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#004ac6] tracking-wider uppercase px-2 py-0.5 bg-[#004ac6]/5 rounded">
                          Decryption complete (gemini-3.5-flash)
                        </span>
                      </div>
                      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {lastAnalysisText}
                      </div>
                    </motion.div>
                  )}

                  {/* Saved Scans History Log */}
                  <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                    <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Search size={16} className="text-[#004ac6]" />
                      Saved Scanned Assets Log History ({mediaAnalyses.length})
                    </h4>

                    {mediaAnalyses.length === 0 ? (
                      <div className="p-6 bg-slate-50 dark:bg-slate-900/10 rounded-xl text-center text-slate-400 text-xs border border-dashed border-slate-200">
                        No scans available in your local history logs. Choose a preset or upload an asset to initiate scanning!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                        {mediaAnalyses.map((scan) => (
                          <div
                            key={scan.id}
                            className="p-4 bg-slate-50 dark:bg-[#1a2333] border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 relative group"
                          >
                            <button
                              onClick={() => {
                                const remaining = mediaAnalyses.filter((s) => s.id !== scan.id);
                                saveAnalysesToLocal(remaining);
                              }}
                              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-150 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="flex gap-3 items-start">
                              {scan.previewUrl ? (
                                <img
                                  src={scan.previewUrl}
                                  alt={scan.mediaName}
                                  className="w-12 h-12 object-cover rounded shadow border border-slate-200 dark:border-slate-700 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400 flex-shrink-0">
                                  {scan.mediaType === "video" ? <Video size={16} /> : <ImageIcon size={16} />}
                                </div>
                              )}

                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                    scan.mediaType === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  }`}>
                                    {scan.mediaType}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-bold">{scan.createdAt}</span>
                                </div>
                                <h5 className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate pr-6">
                                  {scan.mediaName}
                                </h5>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-900/50 p-3 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans max-h-32 overflow-y-auto">
                              {scan.analysis}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 5: SAVED JOURNEYS (Lists plans, image archives, video downloads) */}
            {activeTab === "saved" && (
              <motion.div
                key="saved"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* 1. Saved Daily plans */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Compass className="text-[#004ac6]" size={18} />
                    Active Travel Diaries ({savedPlans.length})
                  </h3>

                  {savedPlans.length === 0 ? (
                    <div className="p-8 bg-white dark:bg-[#1e293b] rounded-xl text-center text-slate-400 text-sm border border-slate-200/50">
                      You haven&apos;t compiling any custom plan diaries yet. Construct one under Daily Planner.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="bg-white dark:bg-[#1e293b] rounded-xl p-5 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-4 relative"
                        >
                          <button
                            onClick={() => {
                              const remaining = savedPlans.filter((p) => p.id !== plan.id);
                              savePlansToLocal(remaining);
                            }}
                            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 size={16} />
                          </button>

                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                              Saved on {plan.createdAt}
                            </span>
                            <h4 className="font-bold text-base mt-0.5 text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                              <MapPin size={16} className="text-[#004ac6]" />
                              {plan.destination}
                            </h4>
                            <span className="block text-xs font-semibold text-[#004ac6] mt-1">
                              Duration: {plan.durationDays} Days • Class: {plan.budgetType}
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded text-xs text-slate-500 font-sans max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                            {plan.notes}
                          </div>

                          {/* Grounding references inside index cards */}
                          {(plan.groundingUrls || plan.mapsUrls) && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {plan.groundingUrls?.map((item: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-[#004ac6] font-semibold bg-[#004ac6]/5 px-2.5 py-1 rounded hover:underline inline-flex items-center gap-1"
                                >
                                  <Search size={10} />
                                  <span className="max-w-[100px] truncate">{item.title}</span>
                                </a>
                              ))}
                              {plan.mapsUrls?.map((item: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-orange-700 bg-orange-50 px-2.5 py-1 rounded hover:underline inline-flex items-center gap-1"
                                >
                                  <MapPin size={10} />
                                  <span className="max-w-[100px] truncate">{item.title}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Saved Media Galleries (Images and Videos) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Posters */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                      <ImageIcon size={18} className="text-[#004ac6]" />
                      HQ Travel Posters ({studioImages.length})
                    </h4>

                    {studioImages.length === 0 ? (
                      <div className="p-6 bg-white dark:bg-[#1e293b] rounded-xl text-center text-slate-400 text-xs border border-slate-200/50">
                        No custom image posters created yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {studioImages.map((img) => (
                          <div
                            key={img.id}
                            className="bg-white dark:bg-[#1e293b] rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm relative group"
                          >
                            <img
                              src={img.imageUrl}
                              alt={img.prompt}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-2 space-y-1">
                              <span className="block text-[8px] font-bold text-slate-400 uppercase truncate">
                                {img.prompt}
                              </span>
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] text-slate-500 font-semibold">
                                  {img.ratio} ({img.size})
                                </span>
                                <a
                                  href={img.imageUrl}
                                  download="poster.png"
                                  className="text-[10px] text-[#004ac6] font-bold hover:underline"
                                >
                                  Get HQ
                                </a>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                const remaining = studioImages.filter((i) => i.id !== img.id);
                                saveImagesToLocal(remaining);
                              }}
                              className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Veo video assets with download links */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                      <Video size={18} className="text-[#004ac6]" />
                      Veo Cinema Clips ({studioVideos.length})
                    </h4>

                    {studioVideos.length === 0 ? (
                      <div className="p-6 bg-white dark:bg-[#1e293b] rounded-xl text-center text-slate-400 text-xs border border-slate-200/50">
                        No customized video animations produced yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {studioVideos.map((vid) => (
                          <div
                            key={vid.id}
                            className="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-slate-200/60 dark:border-slate-800 shadow-sm relative group"
                          >
                            <button
                              onClick={() => {
                                const remaining = studioVideos.filter((v) => v.id !== vid.id);
                                saveVideosToLocal(remaining);
                              }}
                              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-100 transition duration-150"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="space-y-2">
                              <div>
                                <span className="text-[9px] text-slate-400 font-bold block">{vid.createdAt}</span>
                                <h5 className="font-semibold text-xs text-slate-700 dark:text-slate-300 truncate max-w-[85%]">
                                  {vid.prompt}
                                </h5>
                                <span className="block text-[10px] text-[#004ac6] font-semibold mt-0.5">
                                  Aspect Frame: {vid.aspectRatio}
                                </span>
                              </div>

                              {vid.status === "pending" ? (
                                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-100 dark:border-orange-900/30">
                                  <div className="flex items-center gap-2 text-xs text-orange-700 dark:text-orange-400 font-bold animate-pulse">
                                    <RefreshCw className="animate-spin" size={12} />
                                    <span>Rendering inside Veo...</span>
                                  </div>
                                </div>
                              ) : vid.status === "failed" ? (
                                <div className="p-3 bg-red-50 text-red-700 rounded text-xs font-semibold">
                                  ⚠️ Veo compiling failed. Please trigger another job.
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {/* Render HTML Video linking to our proxy download stream */}
                                  <video
                                    src={vid.videoUrl}
                                    controls
                                    className="w-full rounded bg-black max-h-40"
                                  />

                                  <div className="flex justify-end">
                                    <a
                                      href={vid.videoUrl}
                                      download="veo-video.mp4"
                                      className="text-xs font-bold text-orange-700 hover:underline flex items-center gap-1"
                                    >
                                      <Download size={12} />
                                      Download Video
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* Humble Footer footer branding line */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <span>&copy; {new Date().getFullYear()} Chandergari. All travel variables securely backed up.</span>
        </div>
      </footer>
    </div>
  );
}
