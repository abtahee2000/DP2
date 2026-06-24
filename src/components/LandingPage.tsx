import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plane, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Calendar, 
  Shield, 
  ChevronRight, 
  ArrowRight, 
  Sun, 
  Moon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Heart,
  ExternalLink,
  Users,
  Compass,
  TrendingUp,
  Sliders,
  X
} from "lucide-react";

interface LandingPageProps {
  authEmail: string;
  setAuthEmail: (v: string) => void;
  authPassword: string;
  setAuthPassword: (v: string) => void;
  handleAuthSubmit: (e: React.FormEvent) => void;
  authError: string | null;
  setAuthError: (v: string | null) => void;
  isLoadingAuth: boolean;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

// ==========================================
// 3D DYNAMIC BACKGROUND CANVAS COMPONENT
// ==========================================
function Background3D({ darkMode }: { darkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse gestures
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.15;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.15;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Wireframe 3D Globe Data ---
    const globeNodes: { x: number; y: number; z: number }[] = [];
    const latLines = 8;
    const lngLines = 14;
    const radius = Math.min(width, height) * 0.28; // Adaptive radius

    // Create a 3D points mesh for a globe
    for (let i = 0; i < latLines; i++) {
      const lat = (Math.PI * i) / (latLines - 1) - Math.PI / 2;
      for (let j = 0; j < lngLines; j++) {
        const lng = (2 * Math.PI * j) / lngLines;
        // Sphere equations
        const x = radius * Math.cos(lat) * Math.sin(lng);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.cos(lng);
        globeNodes.push({ x, y, z });
      }
    }

    // Flight route arcs in 3D
    const flightRoutes: { points: { x: number; y: number; z: number }[]; progress: number; speed: number }[] = [];
    for (let r = 0; r < 5; r++) {
      // Create random start & end vertices on sphere
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI - Math.PI / 2;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI - Math.PI / 2;

      const pStart = {
        x: radius * Math.cos(phi1) * Math.sin(theta1),
        y: radius * Math.sin(phi1),
        z: radius * Math.cos(phi1) * Math.cos(theta1),
      };
      const pEnd = {
        x: radius * Math.cos(phi2) * Math.sin(theta2),
        y: radius * Math.sin(phi2),
        z: radius * Math.cos(phi2) * Math.cos(theta2),
      };

      // Calculate path arc with elevation
      const pathPoints = [];
      const steps = 30;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        // Interpolate flat
        const ix = pStart.x + (pEnd.x - pStart.x) * t;
        const iy = pStart.y + (pEnd.y - pStart.y) * t;
        const iz = pStart.z + (pEnd.z - pStart.z) * t;
        // Elevate center point
        const dist = Math.sqrt(ix * ix + iy * iy + iz * iz);
        const elevationMultiplier = 1.0 + Math.sin(t * Math.PI) * 0.35;
        pathPoints.push({
          x: (ix / dist) * radius * elevationMultiplier,
          y: (iy / dist) * radius * elevationMultiplier,
          z: (iz / dist) * radius * elevationMultiplier,
        });
      }
      flightRoutes.push({
        points: pathPoints,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    // Dynamic floating constellation particles
    const floatingNodes: { x: number; y: number; z: number; size: number; speed: number; rotOffset: number }[] = [];
    for (let p = 0; p < 45; p++) {
      floatingNodes.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 800,
        size: Math.random() * 2.5 + 0.5,
        speed: 0.0005 + Math.random() * 0.001,
        rotOffset: Math.random() * Math.PI * 2,
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;

    // --- Animation loop ---
    const drawAnimation = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse smoothly for parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const baseCenterY = height * 0.5;
      const baseCenterX = width * 0.75; // Shift to the right for gorgeous hero side layout

      // Adaptive center based on width: Center it on mobile screens
      const centerX = width < 1024 ? width * 0.5 : baseCenterX + mouseRef.current.x;
      const centerY = baseCenterY + mouseRef.current.y;

      // Slowly increment overall rotation angles
      angleX += 0.0008;
      angleY += 0.0012;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // --- Draw Floating Background Parallax Particles ---
      ctx.fillStyle = darkMode ? "rgba(96, 165, 250, 0.25)" : "rgba(0, 74, 198, 0.12)";
      floatingNodes.forEach((node) => {
        // Orbit rotating around center
        const rotRadius = Math.sqrt(node.x * node.x + node.y * node.y);
        const curAngle = Math.atan2(node.y, node.x) + node.speed;
        node.x = rotRadius * Math.cos(curAngle);
        node.y = rotRadius * Math.sin(curAngle);

        // Perspective projection
        const pScale = 500 / (500 + node.z);
        const px = baseCenterX + node.x * pScale + mouseRef.current.x * 0.5;
        const py = baseCenterY + node.y * pScale + mouseRef.current.y * 0.5;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, node.size * pScale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // --- Project 3D nodes of Globe to 2D ---
      const projectedNodes: { px: number; py: number; depth: number }[] = [];
      globeNodes.forEach((node) => {
        // 3D rotation math (Y-axis then X-axis)
        // Y orbit
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;
        // X orbit
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspectivize
        const perspective = 700 / (700 + z2);
        const px = centerX + x1 * perspective;
        const py = centerY + y2 * perspective;

        projectedNodes.push({ px, py, depth: z2 });
      });

      // Draw Globe Connections (Lattice grid lines)
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 0;

      for (let i = 0; i < latLines; i++) {
        for (let j = 0; j < lngLines; j++) {
          const currentIdx = i * lngLines + j;
          const rightIdx = i * lngLines + ((j + 1) % lngLines);
          const bottomIdx = ((i + 1) % latLines) * lngLines + j;

          const n1 = projectedNodes[currentIdx];
          const nR = projectedNodes[rightIdx];
          const nB = projectedNodes[bottomIdx];

          // Set transparent alpha based on depth to create extreme depth and volume
          const avgDepth = (n1.depth + nR.depth) / 2;
          const alpha = Math.max(0.04, Math.min(0.45, 1 - (avgDepth + radius) / (2 * radius)));

          // Horizontal lines
          ctx.strokeStyle = darkMode 
            ? `rgba(96, 165, 250, ${alpha * 0.7})` 
            : `rgba(0, 74, 198, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(n1.px, n1.py);
          ctx.lineTo(nR.px, nR.py);
          ctx.stroke();

          // Vertical lines (omit last lat connects for clean poles)
          if (i < latLines - 1) {
            const avgDepthB = (n1.depth + nB.depth) / 2;
            const alphaB = Math.max(0.04, Math.min(0.45, 1 - (avgDepthB + radius) / (2 * radius)));
            ctx.strokeStyle = darkMode 
              ? `rgba(96, 165, 250, ${alphaB * 0.7})` 
              : `rgba(0, 74, 198, ${alphaB * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(nB.px, nB.py);
            ctx.stroke();
          }
        }
      }

      // --- Draw Dynamic 3D Flight Arcs ---
      flightRoutes.forEach((route) => {
        route.progress += route.speed;
        if (route.progress > 1) {
          route.progress = 0;
        }

        ctx.beginPath();
        route.points.forEach((pt, idx) => {
          // Rotate path point
          let x1 = pt.x * cosY - pt.z * sinY;
          let z1 = pt.z * cosY + pt.x * sinY;
          let y2 = pt.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + pt.y * sinX;

          const perspective = 700 / (700 + z2);
          const px = centerX + x1 * perspective;
          const py = centerY + y2 * perspective;

          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });

        const midDepth = route.points[Math.floor(route.points.length / 2)].z;
        const lineAlpha = Math.max(0.1, Math.min(0.6, 1 - (midDepth + radius) / (2 * radius)));
        ctx.strokeStyle = darkMode ? `rgba(251, 191, 36, ${lineAlpha})` : `rgba(245, 158, 11, ${lineAlpha * 0.85})`;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // Flying Coordinate Node Bubble traveling along route
        const currentIdx = Math.floor(route.progress * (route.points.length - 1));
        const activePt = route.points[currentIdx];
        if (activePt) {
          let rx = activePt.x * cosY - activePt.z * sinY;
          let rz = activePt.z * cosY + activePt.z * sinY;
          let ry = activePt.y * cosX - rz * sinX;
          let rzFinal = rz * cosX + activePt.y * sinX;

          const pScale = 700 / (700 + rzFinal);
          const px = centerX + rx * pScale;
          const py = centerY + ry * pScale;

          // Glowing node ring
          ctx.beginPath();
          ctx.arc(px, py, 6 * pScale, 0, Math.PI * 2);
          ctx.fillStyle = darkMode ? "rgba(251, 191, 36, 0.45)" : "rgba(245, 158, 11, 0.35)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 3 * pScale, 0, Math.PI * 2);
          ctx.fillStyle = darkMode ? "#fbbf24" : "#f59e0b";
          ctx.fill();
        }
      });

      // --- Interactive Orbiting Floating Vector Aircraft ---
      // Plane design parameters
      const planeRadius = radius * 1.25;
      const tPlaneAngle = angleY * 0.8;
      const plane3D = {
        x: planeRadius * Math.sin(tPlaneAngle),
        y: Math.sin(tPlaneAngle * 2) * 50,
        z: planeRadius * Math.cos(tPlaneAngle)
      };
      
      // Project plane
      let pxRotateY = plane3D.x * cosY - plane3D.z * sinY;
      let pzRotateY = plane3D.z * cosY + plane3D.x * sinY;
      let pyRotateX = plane3D.y * cosX - pzRotateY * sinX;
      let pzFinal = pzRotateY * cosX + plane3D.y * sinX;

      const scalePlane = 700 / (700 + pzFinal);
      const prx = centerX + pxRotateY * scalePlane;
      const pry = centerY + pyRotateX * scalePlane;

      // Draw stylized wireframe abstract 3D plane
      ctx.fillStyle = darkMode ? "#fbbf24" : "#004ac6";
      ctx.strokeStyle = darkMode ? "#ffffff" : "#004ac6";
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      // Nose
      ctx.moveTo(prx, pry - 12 * scalePlane);
      // Left Wing end
      ctx.lineTo(prx - 14 * scalePlane, pry + 8 * scalePlane);
      // Back center notch
      ctx.lineTo(prx, pry + 4 * scalePlane);
      // Right Wing end
      ctx.lineTo(prx + 14 * scalePlane, pry + 8 * scalePlane);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      animationId = requestAnimationFrame(drawAnimation);
    };

    drawAnimation();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [darkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-hidden" />;
}

export default function LandingPage({
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  handleAuthSubmit,
  authError,
  setAuthError,
  isLoadingAuth,
  darkMode,
  setDarkMode,
}: LandingPageProps) {
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Mock statistical indices to create dynamic counter feel
  const [explorerCount, setExplorerCount] = useState<number>(43810);
  useEffect(() => {
    const timer = setInterval(() => {
      setExplorerCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-300 ${
      darkMode ? "bg-[#0b0f19] text-[#f8fafc]" : "bg-[#fcfcff] text-[#1e293b]"
    }`}>
      
      {/* 3D background rendering strictly */}
      <Background3D darkMode={darkMode} />

      {/* Decorative Aurora Backdrop mesh */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400 dark:bg-[#004ac6] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-300 dark:bg-purple-900 blur-[130px]" />
      </div>

      {/* ==========================================
          HEADER TOP-NAVIGATION BAR
         ========================================== */}
      <header className="sticky top-0 z-40 bg-transparent backdrop-blur-md border-b border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Title BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004ac6] flex items-center justify-center text-white shadow-lg shadow-[#004ac6]/20">
              <Plane size={22} className="rotate-45" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#004ac6] dark:text-[#60a5fa] block">
                Chandergari
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest block -mt-1 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}>
                Chandergari Systems
              </span>
            </div>
          </div>

          {/* Nav Links - Desktop only */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-xs font-bold uppercase tracking-wider transition ${
              darkMode ? "text-slate-404 hover:text-[#60a5fa]" : "text-slate-600 hover:text-[#004ac6]"
            }`}>
              Capabilities
            </a>
            <a href="#preview" className={`text-xs font-bold uppercase tracking-wider transition ${
              darkMode ? "text-slate-404 hover:text-[#60a5fa]" : "text-slate-600 hover:text-[#004ac6]"
            }`}>
              Interactive Mockup
            </a>
            <a href="#testimonials" className={`text-xs font-bold uppercase tracking-wider transition ${
              darkMode ? "text-slate-404 hover:text-[#60a5fa]" : "text-slate-600 hover:text-[#004ac6]"
            }`}>
              Aviation Feed
            </a>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-4">
            {/* Theme switcher */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem("chandergari_dark_mode", String(!darkMode));
              }}
              className={`p-2.5 rounded-lg border transition ${
                darkMode 
                  ? "bg-slate-900/60 border-slate-800 text-orange-400 hover:bg-slate-800" 
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
              id="top_theme_toggle"
              title="Toggle theme mode"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* LOGIN BUTTON (Top-Right requirement strictly) */}
            <button
              id="btn_top_login"
              onClick={() => {
                setAuthError(null);
                setShowAuthOverlay(true);
              }}
              className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] active:scale-95 text-white text-xs uppercase font-extrabold tracking-wider rounded-lg transition shadow-md shadow-[#004ac6]/15 hover:shadow-[#004ac6]/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Login</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          HERO CENTRAL SECTION
         ========================================== */}
      <section className="relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Promotional Content Description */}
          <div className="space-y-8 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#004ac6]/10 text-[#004ac6] dark:text-[#60a5fa] text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-[#004ac6]/10">
              <Sparkles size={11} className="text-amber-500 animate-pulse" />
              INTELLIGENT TRAVEL ARCHITECT v4.2
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Design Your Journeys with <span className="text-[#004ac6] dark:text-[#60a5fa] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400">Infinite Precision</span>
            </h1>

            <p className={`text-base leading-relaxed ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}>
              Meet <strong>Chandergari</strong> — the next generation of coordinate routing. We orchestrate grounded itineraries, synchronize itemized ledger outputs, and forecast budget boundaries to structure your travels cleanly.
            </p>

            {/* Live Count Stat bubble */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
              <div className={`p-4 rounded-xl border ${
                darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-100"
              } shadow-sm`}>
                <div className="text-xl font-mono font-extrabold text-[#004ac6] dark:text-[#60a5fa]">
                  {explorerCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Active Explorers</div>
              </div>

              <div className={`p-4 rounded-xl border ${
                darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-100"
              } shadow-sm`}>
                <div className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  99.8%
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Location Grounding</div>
              </div>
            </div>

            {/* Main Interactive CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="btn_hero_cta"
                onClick={() => {
                  setAuthError(null);
                  setShowAuthOverlay(true);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#004ac6] hover:bg-[#2563eb] active:scale-98 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#004ac6]/15 hover:shadow-xl hover:shadow-[#004ac6]/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Unlock Flight Control Room</span>
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>

              <a
                href="#features"
                className={`w-full sm:w-auto px-6 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-center border transition ${
                  darkMode 
                    ? "bg-slate-900/20 border-slate-800 text-slate-300 hover:bg-slate-800/40" 
                    : "bg-transparent border-slate-250 text-slate-700 hover:bg-slate-50"
                }`}
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Right side graphics: Simulated Interactive Floating device frame of Chandergari tracker */}
          <div className="relative w-full h-[400px] lg:h-[480px] hidden sm:flex items-center justify-center">
            
            {/* Main Mockup Container Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`absolute w-11/12 max-w-sm rounded-2xl border p-6 z-20 backdrop-blur-md shadow-2xl ${
                darkMode 
                  ? "bg-[#11192e]/90 border-slate-800/80 shadow-black/40" 
                  : "bg-white/95 border-slate-200 shadow-slate-300/40"
              }`}
            >
              {/* Header profile info inside Card mock */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Compass size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold block">Tokyo Exploration</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">ACTIVE LEDGER</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] uppercase font-bold rounded">
                  9 Days
                </span>
              </div>

              {/* Graphical budget indicator rings */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>CAPITAL PACING</span>
                    <span className="text-slate-700 dark:text-slate-200">$1,850Spent / $3,000</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 w-[61%]" />
                  </div>
                </div>

                {/* Simulated Ledger listings */}
                <div className="space-y-2 pt-2">
                  <div className={`p-2.5 rounded-lg flex items-center justify-between text-xs border ${
                    darkMode ? "bg-slate-900/50 border-slate-800/80" : "bg-slate-50 border-slate-150"
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>🏨</span>
                      <div>
                        <span className="font-bold block">Imperial Palace Ryokan</span>
                        <span className="text-[9px] text-slate-400 block">Day 1 • Lodging</span>
                      </div>
                    </div>
                    <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400">$320.00</span>
                  </div>

                  <div className={`p-2.5 rounded-lg flex items-center justify-between text-xs border ${
                    darkMode ? "bg-slate-900/50 border-slate-800/80" : "bg-slate-50 border-slate-150"
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>🍔</span>
                      <div>
                        <span className="font-bold block">Shibuya Ramen Tasting</span>
                        <span className="text-[9px] text-slate-400 block">Day 1 • Dining</span>
                      </div>
                    </div>
                    <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400">$45.00</span>
                  </div>
                </div>

                {/* Gemini Recommendation Advisor Mock */}
                <div className="mt-4 p-3 bg-amber-550/5 dark:bg-amber-500/5 rounded-xl border border-amber-500/20 text-[11px] leading-relaxed relative overflow-hidden">
                  <p className="font-bold text-amber-500 flex items-center gap-1 mb-1">
                    <Sparkles size={11} /> AI Finance Advisor
                  </p>
                  <p className={darkMode ? "text-slate-300" : "text-slate-600"}>
                    You are dining <span className="font-bold">15% below</span> the typical Tokyo luxury profile. Consider allocating excess capital to the Hakone bullet train extension.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating auxiliary badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className={`absolute top-10 left-4 p-3.5 rounded-xl shadow-lg border z-10 hidden lg:flex items-center gap-3 ${
                darkMode ? "bg-[#11192e] border-slate-800" : "bg-white border-slate-100"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Sliders size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">TIER TUNING</span>
                <span className="text-xs font-bold block">Luxury & Budget Modes</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className={`absolute bottom-6 right-2 p-3.5 rounded-xl shadow-lg border z-10 hidden lg:flex items-center gap-3 ${
                darkMode ? "bg-[#11192e] border-slate-800" : "bg-white border-slate-100"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TrendingUp size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">PRECISION DATA</span>
                <span className="text-xs font-bold block">Search Grounded Links</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================
          CAPABILITIES & FEATURES BENTO GRID
         ========================================== */}
      <section id="features" className="py-24 relative z-15 bg-slate-900/5 dark:bg-black/20 border-y border-slate-100 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#004ac6] dark:text-[#60a5fa]">
              SYSTEM MODULARS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Four Dimensions of Seamless Coordinates Mapping
            </h2>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Unlock premium capabilities designed for contemporary travelers who refuse to compile spreadsheets or guess coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Grounded Search */}
            <div className={`p-6 rounded-2xl border transition hover:shadow-lg ${
              darkMode ? "bg-[#11192e]/60 border-slate-800/80 hover:bg-[#11192e]" : "bg-white border-slate-200/60 hover:bg-white"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5">
                <Compass size={20} />
              </div>
              <h3 className="font-extrabold text-base mb-2">Search Grounding</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Anchors your travel searches against real-time information. Directly validates restaurant locations and subway lines with live search feeds.
              </p>
            </div>

            {/* Card 2: Interactive Ledger */}
            <div className={`p-6 rounded-2xl border transition hover:shadow-lg ${
              darkMode ? "bg-[#11192e]/60 border-slate-800/80 hover:bg-[#11192e]" : "bg-white border-slate-200/60 hover:bg-white"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5">
                <DollarSign size={20} />
              </div>
              <h3 className="font-extrabold text-base mb-2">Visual Expense ledger</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Maintains balance pacing thresholds. Register individual grocery or commute tickets and watch the dynamic category breakdown pivot.
              </p>
            </div>

            {/* Card 3: Intelligent Advisor */}
            <div className={`p-6 rounded-2xl border transition hover:shadow-lg ${
              darkMode ? "bg-[#11192e]/60 border-slate-800/80 hover:bg-[#11192e]" : "bg-white border-slate-200/60 hover:bg-white"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5">
                <Sparkles size={20} />
              </div>
              <h3 className="font-extrabold text-base mb-2">AI financial Advisor</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Analyzes burn rates dynamically based on the current country coordinates log. Hands over high-value alternatives for local purchases.
              </p>
            </div>

            {/* Card 4: Postcard Studio */}
            <div className={`p-6 rounded-2xl border transition hover:shadow-lg ${
              darkMode ? "bg-[#11192e]/60 border-slate-800/80 hover:bg-[#11192e]" : "bg-white border-slate-200/60 hover:bg-white"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5">
                <Calendar size={20} />
              </div>
              <h3 className="font-extrabold text-base mb-2">Postcard Studio</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Creates synthetic scenic postcards of plan endpoints using prompt coordinates so you can preview the ambient energy before embarking.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE TEST SECTION (Interactive Preview mockup)
         ========================================== */}
      <section id="preview" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl border p-8 md:p-12 ${
          darkMode ? "bg-slate-900/30 border-slate-800" : "bg-gradient-to-br from-blue-50/20 to-indigo-50/20 border-slate-200"
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#004ac6] dark:text-[#60a5fa] block">
                INTERACTIVE SANDBOX PREVIEW
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight">Explore the Modular Interface</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Chandergari maps real-world coordinates and translates raw estimates into actionable, beautiful itineraries. Watch how the layout transitions seamlessly when coordinating itineraries.
              </p>

              <div className="space-y-3.5">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-500 text-xs font-bold mt-0.5">✓</div>
                  <span className="text-xs font-semibold">Offline SQLite/LocalStorage Vault Persistence</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-500 text-xs font-bold mt-0.5">✓</div>
                  <span className="text-xs font-semibold">Fully integrated with Gemini 3.5 grounders</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-500 text-xs font-bold mt-0.5">✓</div>
                  <span className="text-xs font-semibold">Custom budget ratios adjustable by sliders</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn_sandbox_unlock"
                  onClick={() => {
                    setAuthError(null);
                    setShowAuthOverlay(true);
                  }}
                  className="px-6 py-3 bg-[#004ac6] hover:bg-[#2563eb] text-white text-xs uppercase font-extrabold tracking-widest rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#004ac6]/10"
                >
                  <span>Build A Real Route Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Visual preview screen mockup */}
            <div className="lg:col-span-7 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-205 dark:border-slate-805/85 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-450" />
                  <div className="w-3 h-3 rounded-full bg-yellow-450" />
                  <div className="w-3 h-3 rounded-full bg-green-450" />
                  <span className="text-[10px] font-bold text-slate-400 font-mono ml-2">CHANDERGARI_SIMULATION.OUT</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#004ac6] bg-blue-500/10 px-2.5 py-1 rounded">
                  Status: Simulated Sandbox
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3.5 rounded-xl border text-center ${darkMode ? "bg-[#18223d] border-slate-800" : "bg-slate-50 border-slate-150"}`}>
                    <span className="text-[9px] font-bold block text-slate-400 uppercase tracking-wide">DESTINATION</span>
                    <span className="text-xs font-bold block mt-0.5">Singapore / Alpine</span>
                  </div>

                  <div className={`p-3.5 rounded-xl border text-center ${darkMode ? "bg-[#18223d] border-slate-800" : "bg-slate-50 border-slate-150"}`}>
                    <span className="text-[9px] font-bold block text-slate-400 uppercase tracking-wide">BUDGET RATIO</span>
                    <span className="text-xs font-bold block mt-0.5">Luxurious ($500/d)</span>
                  </div>

                  <div className={`p-3.5 rounded-xl border text-center ${darkMode ? "bg-[#18223d] border-slate-800" : "bg-slate-50 border-slate-150"}`}>
                    <span className="text-[9px] font-bold block text-slate-400 uppercase tracking-wide">CONFIRMATION</span>
                    <span className="text-xs font-bold block mt-0.5 text-emerald-500">Grounded Map</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border font-mono text-[11px] leading-relaxed space-y-2 ${
                  darkMode ? "bg-slate-900/60 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-150 text-slate-600"
                }`}>
                  <p className="text-[#004ac6] dark:text-[#60a5fa] font-bold"># Day 1: Flight Landing & Ground coordinates</p>
                  <p>1. Check into hotel at 14:00. Verify booking confirmation node.</p>
                  <p>2. Transit towards Marina Scenic Waterfront with Subway pass.</p>
                  <p>3. Dynamic meal: Dine at recommended street food stall (-$15.00 logged).</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          AVIATION FEED / TESTIMONIALS SECTION
         ========================================== */}
      <section id="testimonials" className="py-24 relative z-10 border-t border-slate-150 dark:border-slate-800/80 bg-slate-900/5 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#004ac6] dark:text-[#60a5fa]">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Verified Flight Logs & Reviews</h2>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Listen to the community of explorers navigating real-world routes with Chandergari balance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The visual ledger is incredibly rewarding. I input a single transit coupon in Osaka and the dashboard immediately re-routed the dining allocation to standard mode.",
                author: "Sarah Jenkins",
                role: "Product Lead at FlightTrack",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              },
              {
                quote: "The LLM Grounding functionality successfully mapped out authentic, verified links for regional eateries in Zurich. Outlay estimation was extremely accurate compared to my credit cards.",
                author: "Marcus Chen",
                role: "Platform Engineer / Tech Nomad",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              },
              {
                quote: "I saved over 30 hours of travel planning formatting this year. Being able to directly view 3D elements in local pacing models gives unmatched financial control.",
                author: "Elena Petrova",
                role: "Executive Travel Orchestrator",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between ${
                darkMode ? "bg-[#11192e]/40 border-slate-800" : "bg-white border-slate-150"
              } shadow-xs`}>
                <p className={`text-xs italic leading-relaxed mb-6 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.author} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <span className="text-xs font-bold block">{item.author}</span>
                    <span className="text-[10px] text-slate-400 block">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER CREDIT BOUNDS
         ========================================== */}
      <footer className="relative z-10 border-t border-slate-150 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#004ac6] flex items-center justify-center text-white">
              <Plane size={15} className="rotate-45" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-[#004ac6] dark:text-[#60a5fa]">
              Chandergari Systems
            </span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            © 2026 Chandergari, Inc. • Persistent Sandbox Authentication Enabled
          </p>
        </div>
      </footer>

      {/* =======================================================
          STUNNING LOGIN OVERLAY DRAWER MODAL
         ======================================================= */}
      <AnimatePresence>
        {showAuthOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthOverlay(false)}
              className="absolute inset-0 bg-[#060810]/70 backdrop-blur-md"
            />

            {/* Login Interactive Card Frame */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`w-full max-w-md rounded-2xl shadow-2xl relative z-10 p-8 border ${
                darkMode 
                  ? "bg-[#11192e] border-slate-800/90 text-white" 
                  : "bg-white border-slate-200 text-[#1e293b]"
              }`}
              id="login_main_card"
            >
              {/* Close Button button */}
              <button
                onClick={() => setShowAuthOverlay(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg border transition ${
                  darkMode 
                    ? "border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white" 
                    : "border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                }`}
                title="Dismiss auth"
              >
                <X size={15} />
              </button>

              {/* Header Title branding */}
              <div className="text-center mb-6">
                <div className="mx-auto w-11 h-11 rounded-xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] mb-3">
                  <Plane size={24} className="rotate-45" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">Access Flight Control Room</h3>
                <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Authentication unlocks flight logs, active track ledgers, and Gemini advice.
                </p>
              </div>

              {/* Existing form elements */}
              <form onSubmit={handleAuthSubmit} className="space-y-5">
                {authError && (
                  <div className="bg-red-500/10 text-rose-500 text-xs font-semibold p-3.5 rounded-xl border border-red-500/15 flex items-center gap-2">
                    <AlertTriangle size={14} className="flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>
                  <div className="relative rounded-md shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={15} />
                    </div>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 rounded-xl border outline-none text-xs sm:text-sm font-medium transition duration-250 ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-[#004ac6]" 
                          : "bg-slate-50/50 border-slate-200 text-slate-850 placeholder-slate-400 focus:border-[#004ac6]"
                      }`}
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                    <button type="button" className="text-[10px] text-[#004ac6] font-bold hover:underline">
                      Forgotten key?
                    </button>
                  </div>
                  <div className="relative rounded-md shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={15} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className={`block w-full pl-10 pr-10 py-3 rounded-xl border outline-none text-xs sm:text-sm font-medium transition duration-250 ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-[#004ac6]" 
                          : "bg-slate-50/50 border-slate-200 text-slate-850 placeholder-slate-400 focus:border-[#004ac6]"
                      }`}
                      placeholder="•••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoadingAuth}
                  className="w-full bg-[#004ac6] hover:bg-[#2563eb] active:scale-98 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isLoadingAuth ? "Compiling Flight Credentials..." : "Authenticate Session"}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-150 dark:border-slate-800/80 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Protected Sandbox Client Console
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
