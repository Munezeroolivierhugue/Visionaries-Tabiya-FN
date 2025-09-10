import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Skills } from "./pages/Skills";
import { Learning } from "./pages/Learning";
import CareerPathways from "./pages/CareerPathways";

import Layout from "./Components/Layout";
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/career" element={<CareerPathways />} />
            </Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
