import dcData from "../data/dcData";
import CodeBlock from "../components/CodeBlock";

const DC = () => {
  return (
    <div>
      <h1>DC Subject</h1>
      {dcData.map((item, index) => (
        <CodeBlock key={index} {...item} />
      ))}
    </div>
  );
};

export default DC;