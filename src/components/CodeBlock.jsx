import { useState } from "react";

const CodeBlock = ({ title, code, file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Extract file name dynamically (important upgrade)
  const getFileName = (path) => {
    if (!path) return "";
    return path.split("/").pop();
  };

  const lines = code.split("\n");

  return (
    <div
      style={{
        marginBottom: "30px",
        border: "1px solid #30363d",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#0d1117",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 15px",
          background: "#161b22",
          color: "white",
          borderBottom: "1px solid #30363d",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              background: copied ? "#238636" : "#00ff88",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "500",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Download Button */}
          {file && (
            <a href={file} download={getFileName(file)}>
              <button
                style={{
                  background: "#1f6feb",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Download CSV
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Code */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "14px",
          overflowX: "auto",
        }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "2px 10px",
            }}
          >
            {/* Line Numbers */}
            <span
              style={{
                width: "40px",
                color: "#6e7681",
                userSelect: "none",
              }}
            >
              {index + 1}
            </span>

            {/* Code Line */}
            <span
              style={{
                whiteSpace: "pre",
                color: "#c9d1d9",
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlock;