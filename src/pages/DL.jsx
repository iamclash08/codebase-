import dlData from "../data/dlData";
import CodeBlock from "../components/CodeBlock";

const DL = () => {
  return (
    <div>
      <h1>DL Subject</h1>
      {dlData.map((item, index) => (
        <CodeBlock key={index} {...item} />
      ))}
    </div>
  );
};

export default DL;