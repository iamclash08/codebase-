import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DC from "./pages/DC";
import DL from "./pages/DL";
import BI from "./pages/BI";
import CI from "./pages/CI";

function App() {
  return (
    <BrowserRouter>
      <Navbar />   {/* 👈 Appears on all pages */}

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dc" element={<DC />} />
          <Route path="/dl" element={<DL />} />
          <Route path="/bi" element={<BI />} />
          <Route path="/ci" element={<CI />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;