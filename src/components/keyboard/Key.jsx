


export default function Key({ frequency, onPlay, onStop }) {



  return (
    <button onMouseDown={() => onPlay(frequency)} onMouseUp={() => onStop()} className="p-2 w-8 m-0.5 h-46 border-2 hover:bg-gray-50 rounded-b-lg">
      
    </button>
  )
}