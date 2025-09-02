import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dahboard } from './Components/Dahboard';
import { Skills } from './Components/Skills';
import { Learning } from './Components/Learning';
import { Career } from './Components/Career';
import NavBar from './Components/NavBar';
function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow p-8 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dahboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/career" element={<Career/>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
