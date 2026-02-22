import Pot from "../Pot";
export default function ADSR({ onChange }) {
  return (
    <div className="border p-2 flex flex-row">
      <Pot min={0} max={2} step={0.01} name="attack" onChange={(v) => onChange("attack", v)} />
      <Pot min={0} max={2} step={0.01} name="decay" onChange={(v) => onChange("decay", v)} />
      <Pot min={0} max={100} step={1} name="sustain" onChange={(v) => onChange("sustain", v)} />
      <Pot min={0} max={2} step={0.01} name="release" onChange={(v) => onChange("release", v)} />
    </div>
  )
}
