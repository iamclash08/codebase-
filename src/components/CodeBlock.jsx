import { useState } from "react";

const CodeBlock = ({ title, code, file }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const getFileName = (path) => {
    if (!path) return "";
    return path.split("/").pop();
  };

  const getFileLabel = (file) => {
    if (!file) return "Download";
    if (file.endsWith(".pbix")) return "Download Power BI";
    if (file.endsWith(".csv")) return "Download CSV";
    return "Download File";
  };

  const lines = code ? code.split("\n") : [];

  return (
    <div
      style={{
        marginBottom: "30px",
        borderRadius: "12px",
        overflow: "hidden",

        // 🔥 GLASS EFFECT
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(8px)",

        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",

        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.01)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 15px",

          background: "rgba(0,0,0,0.4)", // transparent header
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          {code && (
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#238636" : "#00ff88",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "6px",
                fontWeight: "500",
                transition: "0.2s",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}

          {file && (
            <a href={file} download={getFileName(file)}>
              <button
                style={{
                  background: "#1f6feb",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "6px",
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

      {/* Code Section */}
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
                  color: "#e6edf3",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* File Only View */}
      {!code && file && (
        <div
          style={{
            padding: "20px",
            color: "#c9d1d9",
          }}
        >
          No code available. Please download the file to view the content.
        </div>
      )}
    </div>
  );
};

export default CodeBlock;4