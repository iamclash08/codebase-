import biData from "../data/biData";
import CodeBlock from "../components/CodeBlock";

const BI = () => {
  return (
    <div>
      <h1>BI Subject</h1>
      {biData.map((item, index) => (
        <CodeBlock key={index} {...item} />
      ))}
    </div>
  );
};

export default BI;