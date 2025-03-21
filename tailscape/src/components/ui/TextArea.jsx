export function TextArea({ value, row, onChange, placeholder, disabled = false }) {
  return (
    <textarea
      className={`w-[80%] px-4 py-2 text-gray-700 border rounded-sm 
          ${disabled ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
          focus:outline-none focus:ring-2 transition duration-300 resize-none`}
      rows={row}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
