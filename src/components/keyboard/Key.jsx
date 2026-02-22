


export default function Key({ note, frequency, onPlay, onStop }) {
  const isBlackKey = note.includes("#") || note.includes("b");
  
  const keyStyles = isBlackKey
    ? "p-2 w-8 m-0.5 h-32 border-2 bg-black text-white hover:bg-gray-800 rounded-b-lg"
    : "p-2 w-8 m-0.5 h-46 border-2 bg-white hover:bg-gray-50 rounded-b-lg";

  return (
    <button 
      onMouseDown={() => onPlay(frequency)} 
      onMouseUp={() => onStop()} 
      className={keyStyles}
    >
    </button>
  );
}
