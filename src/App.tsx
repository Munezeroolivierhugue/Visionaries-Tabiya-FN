import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import { Skills } from "./Components/Skills";
import { Learning } from "./Components/Learning";
import { Career } from "./Components/Career";
import NavBar from "./Components/NavBar";
function App() {
  return (
    <Router>
      <div className="min-h-screen max-w-[95%] mx-auto ">
        <NavBar />
        <main className="flex-grow p-8 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/career" element={<Career />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
