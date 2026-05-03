import dcData from "../data/dcData";
import CodeBlock from "../components/CodeBlock";

const DC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/dc.jpg')",
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
         Distributed Computing(DC)
        </h1>

        {dcData.map((item, index) => (
          <CodeBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DC;