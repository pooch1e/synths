


export default function Key({ frequency, onPlay, onStop }) {



  return (
    <button onClick={() => onPlay(frequency)} onMouseUp={} className="p-2 w-8 m-0.5 h-46 border-2 hover:bg-gray-50 rounded-b-lg">
      
    </button>
  )
}