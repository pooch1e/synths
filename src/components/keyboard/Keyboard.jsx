import { useAudio } from "../../providers/AudioContextProvider"
import Key from "./Key"


export default function Keyboard() {
  const { initAudio } = useAudio()

  function playFrequency(frequency) {
    const ctx = initAudio()
    const oscillator = ctx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
    oscillator.connect(ctx.destination)
    oscillator.start()
    
  }

  function stopFrequency(mouseUpEvent) {

  }

  const notes = [

    { note: "A4", frequency: 440.00 },
    { note: "A#4", frequency: 466.16 },
    { note: "B4", frequency: 493.88 },
    { note: "C5", frequency: 523.25 },
    { note: "C#5", frequency: 554.36 },
    { note: "D5", frequency: 587.32 },
    { note: "D#5", frequency: 622.25 },
    { note: "E5", frequency: 659.25 },
    { note: "F5", frequency: 698.45 },
    { note: "F#5", frequency: 739.98 },
    { note: "G5", frequency: 783.99 },
    { note: "G#5", frequency: 830.60 },
    { note: "A5", frequency: 880.00 },

  ]


  return (
    <div className="grid grid-cols-1 gap-2 border-2 p-2 w-full ">
      <div className="flex flex-row p-2 border-2 justify-center">
        {notes.map((note) => {
          return <Key key={note.note} frequency={note.frequency} onPlay={playFrequency} />

        })}
      </div>

    </div>
  )
}