import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem("hasLoaded");

    if (!hasLoadedBefore) {
      setShowLoading(true);
      setTimeout(() => {
        localStorage.setItem("hasLoaded", "true");
        setShowLoading(false);
      }, 5000);
    }
  }, []);

  return (
    <BrowserRouter>
      {showLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
