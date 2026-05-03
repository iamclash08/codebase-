import { useState, useEffect } from "react";

const Manuals = () => {
  const manuals = [
    {
      title: "CL-3",
      file: "/manuals/CI_AI&DS_Lab_Manual new 25-26 FINAL (1).pdf"
    },
    {
      title: "Deep Learning",
      file: "/manuals/Deep Learning Lab Manual (1).docx"
    },
    {
      title: "Business Intelligence",
      file: "/manuals/BI_Lab_Manual_CL-IV_BE_AI&DS[1].pdf"
    },
  ];

  // 🎵 Lyrics array
  const lyrics = [
    "♪ And we run, and we run, and we run ♪",
    "♪ Until we break through ♪",
    "♪ If I get high enough ♪",
    "♪ If I get high enough ♪",
    "♪ Will I see you again ♪",
    "♪ Will I see you again ♪",
    "♪ If I get high ♪",
    "♪ And we run, and we run, and we run♪",
    "♪ And we run, and we run, and we run ♪",
    "♪ Until we break through ♪",
    "♪ Oh, and we run, and we run, and we run♪",
    "♪ And we run, and we run, and we run ♪",
  ];

  const [currentLine, setCurrentLine] = useState(0);

  // 🔄 Change lyrics every 2.5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lyrics.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/manuals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          minHeight: "100vh",
          background: "rgba(0,0,0,0.6)",
          padding: "20px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Manuals
        </h1>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {manuals.map((m, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",

                // Glass effect
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",

                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ color: "white" }}>{m.title}</h3>

              <a href={m.file} download>
                <button
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "10px",

                    // 🟢 Green button
                    background:
                      "linear-gradient(to bottom, #5cff5c, #2ecc71)",
                    border: "2px solid #1e7e34",
                    color: "white",
                    fontWeight: "bold",

                    boxShadow:
                      "0 4px 0 #1e7e34, 0 6px 10px rgba(0,0,0,0.3)",

                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 6px 0 #1e7e34, 0 0 15px #2ecc71";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 0 #1e7e34, 0 6px 10px rgba(0,0,0,0.3)";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(2px)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* 🎵 Lyrics Section */}
        <div
          key={currentLine}
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "white",
            fontSize: "56px",
            fontWeight: "600",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          {lyrics[currentLine]}
        </div>
      </div>
    </div>
  );
};

export default Manuals;