import { useAudio } from "../../providers/AudioContextProvider"
import Key from "./Key"
import { startOsc, stopOsc } from "../../utils/startOsc"
import { useRef, useState } from "react"

export default function Keyboard() {
  const { initAudio } = useAudio()
  const activeNoteRef = useRef(null)
  const [octaveShift, setOctaveShift] = useState(0)

  function playFrequency(frequency) {
    const ctx = initAudio()
    const { osc, gainNode } = startOsc(ctx, frequency)
    activeNoteRef.current = { osc, gainNode, ctx }
  }

  function stopFrequency() {
    if (activeNoteRef.current) {
      const { osc, gainNode, ctx } = activeNoteRef.current
      stopOsc(gainNode, ctx, osc)
      activeNoteRef.current = null
    }
  }

  const baseNotes = [
    { note: "A", frequency: 440.00, octave: 4 },
    { note: "A#", frequency: 466.16, octave: 4 },
    { note: "B", frequency: 493.88, octave: 4 },
    { note: "C", frequency: 523.25, octave: 5 },
    { note: "C#", frequency: 554.36, octave: 5 },
    { note: "D", frequency: 587.32, octave: 5 },
    { note: "D#", frequency: 622.25, octave: 5 },
    { note: "E", frequency: 659.25, octave: 5 },
    { note: "F", frequency: 698.45, octave: 5 },
    { note: "F#", frequency: 739.98, octave: 5 },
    { note: "G", frequency: 783.99, octave: 5 },
    { note: "G#", frequency: 830.60, octave: 5 },
    { note: "A", frequency: 880.00, octave: 5 },
  ]

  const octaveMultiplier = Math.pow(2, octaveShift)

  const notes = baseNotes.map(n => ({
    note: `${n.note}${n.octave + octaveShift}`,
    frequency: n.frequency * octaveMultiplier
  }))



  return (
    <div className="grid grid-cols-1 gap-2 border-2 p-2 w-full ">
      <div className="flex items-center gap-2 p-2">
        <span className="font-semibold">Octaves: {4 + octaveShift}-{5 + octaveShift}</span>
        <button
          className="px-4 py-2 border-2 bg-white rounded-lg hover:bg-gray-50"
          onClick={() => setOctaveShift(prev => prev + 1)}
        >
          Up
        </button>
        <button
          className="px-4 py-2 border-2 bg-white rounded-lg hover:bg-gray-50"
          onClick={() => setOctaveShift(prev => prev - 1)}
        >
          Down
        </button>
      </div>
      <div className="flex flex-row p-2 border-2 justify-center">
        {notes.map((note) => {
          return <Key key={note.note} note={note.note} frequency={note.frequency} onPlay={playFrequency} onStop={stopFrequency} />
        })}
      </div>

    </div>
  )
}