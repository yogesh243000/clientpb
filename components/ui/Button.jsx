export const Button = ({ type, children }) => {
  return (
    <button
      type={type}
      className="text-white bg-blue-500 hover:bg-blue-600 w-full rounded-md p-2"
    >
      {children}
    </button>
  );
};
