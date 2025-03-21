export function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 max-w-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
      {children}
    </div>
  );
}
