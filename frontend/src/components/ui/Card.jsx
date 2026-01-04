export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-card border dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
