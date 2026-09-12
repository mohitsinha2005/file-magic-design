import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import AutoReveal from "./components/AutoReveal";
import Depth3D from "./components/Depth3D";
import CodeStrip from "./components/CodeStrip";
import RouteSweep from "./components/RouteSweep";

import Index from "./pages/Index";


const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Background3D = lazy(() => import("./components/Background3D"));
const JarvisAI = lazy(() => import("./components/JarvisAI"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const showBackground3D = location.pathname !== "/";

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <AutoReveal />
      <Depth3D />
      <CodeStrip />
      <RouteSweep />

      {showBackground3D && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/certifications" element={<PageTransition><CertificationsPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/chat" element={<PageTransition><ChatPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>

      <Suspense fallback={null}>
        <JarvisAI />
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
