import Key from "./Key"
export default function Keyboard() {
  return (
    <div className="grid grid-cols-1 gap-2 border-2 p-2 w-full ">
      <div className="flex flex-row p-2 border-2 justify-center">
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
        <Key  />
      </div>

    </div>
  )
}