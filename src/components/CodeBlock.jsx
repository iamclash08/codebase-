import { useState } from "react";

const CodeBlock = ({ title, code, file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return; // 🛑 prevent crash

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Extract file name
  const getFileName = (path) => {
    if (!path) return "";
    return path.split("/").pop();
  };

  // Detect file type for button text
  const getFileLabel = (file) => {
    if (!file) return "Download";
    if (file.endsWith(".pbix")) return "Download Power BI";
    if (file.endsWith(".csv")) return "Download CSV";
    return "Download File";
  };

  // 🛑 Safe split (only if code exists)
  const lines = code ? code.split("\n") : [];

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
          {/* ✅ Copy button only if code exists */}
          {code && (
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
          )}

          {/* ✅ File Download */}
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
                {getFileLabel(file)}
              </button>
            </a>
          )}
        </div>
      </div>

      {/* ✅ Code Section (only if exists) */}
      {code && (
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
      )}

      {/* ✅ File Only View (BI 1–4) */}
      {!code && file && (
        <div style={{ padding: "20px", color: "#8b949e" }}>
          No code available. Please download the file to view the content.
        </div>
      )}
    </div>
  );
};

export default CodeBlock;