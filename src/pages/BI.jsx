import biData from "../data/biData";
import CodeBlock from "../components/CodeBlock";

const BI = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/bi.jpg')",
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
         Buisness Intelligence(BI)
        </h1>

        {biData.map((item, index) => (
          <CodeBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BI;