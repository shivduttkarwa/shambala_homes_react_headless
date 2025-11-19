import "./styles/App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import HomePage from "./pages/HomePage";
import HouseDesignsRoute from "./pages/HouseDesignsRoute";
import About from "./pages/About";
import { useSiteSettings } from "./hooks/useSiteSettings";
import Preloader from "./components/UI/Preloader";

function App() {
  const { settings } = useSiteSettings();
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloadComplete} />}
      <Router basename="/shambala_homes_react_headless">
        <div className="App">
          <Header settings={settings} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage settings={settings} />} />
              <Route path="/house-designs" element={<HouseDesignsRoute />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer settings={settings} />
        </div>
      </Router>
    </>
  );
}

export default App;
