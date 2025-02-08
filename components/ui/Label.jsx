export const Label = ({ text, id, name }) => {
  return (
    <label
      text={text}
      id={id}
      name={name}
      className="font-semibold text-gray-500"
    >
      {text}
    </label>
  );
};
