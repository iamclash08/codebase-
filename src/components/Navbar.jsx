import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "15px",
      background: "#222",
      color: "white"
    }}>
      <Link to="/dc" style={{ color: "white" }}>DC</Link>
      <Link to="/dl" style={{ color: "white" }}>DL</Link>
      <Link to="/bi" style={{ color: "white" }}>BI</Link>
      <Link to="/ci" style={{ color: "white" }}>CI</Link>
    </nav>
  );
};

export default Navbar;