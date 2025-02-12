export const Input = ({ type, placeholder, onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-yellow-600 rounded-md box-border p-2 "
      required
      autoComplete="off"
    />
  );
};
