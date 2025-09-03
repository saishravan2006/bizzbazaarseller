import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Language } from "./pages/Language";
import { StoreName } from "./pages/StoreName";
import { StoreType } from "./pages/StoreType";
import { Confirm } from "./pages/Confirm";
import { Success } from "./pages/Success";
import StartupLoader from "./components/StartupLoader";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/language" element={<Language />} />
        <Route path="/store-name" element={<StoreName />} />
        <Route path="/store-type" element={<StoreType />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/success" element={<Success />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // You can add actual initialization logic here
      // For now, we'll just wait for the minimum loading time
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsAppLoaded(true);
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StartupLoader 
            onLoadingComplete={handleLoadingComplete}
            minLoadingTime={2500}
            showProgress={true}
          />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
