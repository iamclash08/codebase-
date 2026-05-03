import ciData from "../data/ciData";
import CodeBlock from "../components/CodeBlock";

const CI = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/ci.jpg')",
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
          CI Subject
        </h1>

        {ciData.map((item, index) => (
          <CodeBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CI;