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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manuals</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {manuals.map((m, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <h3>{m.title}</h3>

            <a href={m.file} download>
              <button style={{
                marginTop: "10px",
                padding: "8px 12px",
                cursor: "pointer"
              }}>
                Download
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manuals;