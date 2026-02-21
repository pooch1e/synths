import Key from "./Key"
export default function Keyboard() {
  return (
    <div className="grid grid-cols-1 gap-2 border-2 h-max p-2">
      <div className="flex flex-row justify-between p-2">
        <Key props={"key1"} />
        <Key props={"key2"} />
        <Key props={"key3"} />
        <Key props={"key4"} />
      </div>

    </div>
  )
}