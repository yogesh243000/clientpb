export const Error = ({ error, message }) => {
  if (!error) return null; // Prevent rendering when there's no error

  return <div className="text-red-500">{message || error}</div>;
};
