import dlData from "../data/dlData";
import CodeBlock from "../components/CodeBlock";

const DL = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/dl.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          minHeight: "100vh",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Deep Learning(DL)
        </h1>

        {dlData.map((item, index) => (
          <CodeBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DL;