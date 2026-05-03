import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DC from "./pages/DC";
import DL from "./pages/DL";
import BI from "./pages/BI";
import CI from "./pages/CI";
import Manuals from "./pages/Manuals";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/images/global.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Routes>
          {/*  Default redirect */}
          <Route path="/" element={<Navigate to="/ci" />} />

          {/* Subject routes */}
          <Route path="/dc" element={<DC />} />
          <Route path="/dl" element={<DL />} />
          <Route path="/bi" element={<BI />} />
          <Route path="/ci" element={<CI />} />
          <Route path="/manuals" element={<Manuals />} />

          {/* Optional: fallback (if wrong URL entered) */}
          <Route path="*" element={<Navigate to="/ci" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;