import { useState } from "react";

const CodeBlock = ({ title, code, file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div style={{
      marginBottom: "30px",
      border: "1px solid #333",
      borderRadius: "10px",
      overflow: "hidden"
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        background: "#1e1e1e",
        color: "white"
      }}>
        <h3 style={{ margin: 0 }}>{title}</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          
          {/* Copy Button */}
          <button onClick={handleCopy} style={{
            background: "#00ff88",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: "5px"
          }}>
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Download CSV Button (ONLY if file exists) */}
          {file && (
            <a href={file} download>
              <button style={{
                background: "#007bff",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "5px",
                color: "white"
              }}>
                Download CSV
              </button>
            </a>
          )}

        </div>
      </div>

      {/* Code */}
      <div style={{
        background: "#0d1117",
        color: "#c9d1d9",
        fontFamily: "monospace",
        fontSize: "14px",
        overflowX: "auto"
      }}>
        {lines.map((line, index) => (
          <div key={index} style={{ display: "flex", padding: "2px 10px" }}>
            <span style={{
              width: "40px",
              color: "#6e7681",
              userSelect: "none"
            }}>
              {index + 1}
            </span>

            <span style={{ whiteSpace: "pre" }}>
              {line}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CodeBlock;