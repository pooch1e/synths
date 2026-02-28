
export default function Selector({ label, options, value, onChange }) {
  return (
    <div className="border rounded-2xl bg-gray-200 w-1/4 flex flex-row">
      <label className="p-2">{label}</label>
      <div className="selector-options">
        {options.map((option) => (
          <button
            key={option}
            className="borde flex gap-2 hover:bg-gray-400"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}