import ciData from "../data/ciData";
import CodeBlock from "../components/CodeBlock";

const CI = () => {
  return (
    <div>
      <h1>CI Subject</h1>
      {ciData.map((item, index) => (
        <CodeBlock key={index} {...item} />
      ))}
    </div>
  );
};

export default CI;