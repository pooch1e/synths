import { useState, useCallback, useRef } from 'react'

const MIN_ANGLE = -135
const MAX_ANGLE = 135
const SVG_SIZE = 100
const CENTER = SVG_SIZE / 2
const RADIUS = 38
const ARC_RADIUS = 44

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export default function Pot({ min = 0, max = 100, step = 1, params = {}, name, onChange }) {
  const [value, setValue] = useState(params.value ?? min)
  const knobRef = useRef(null)
  const dragging = useRef(false)
  const lastY = useRef(0)

  const fraction = (value - min) / (max - min)
  const angle = MIN_ANGLE + fraction * (MAX_ANGLE - MIN_ANGLE)
  const valueArc = describeArc(CENTER, CENTER, ARC_RADIUS, MIN_ANGLE, angle)
  const trackArc = describeArc(CENTER, CENTER, ARC_RADIUS, MIN_ANGLE, MAX_ANGLE)

  const indicator = polarToCartesian(CENTER, CENTER, RADIUS - 8, angle)
  const indicatorInner = polarToCartesian(CENTER, CENTER, RADIUS - 18, angle)

  const updateValue = useCallback(
    (deltaY) => {
      setValue((prev) => {
        const range = max - min
        const sensitivity = range / 200
        const next = Math.min(max, Math.max(min, prev - deltaY * sensitivity))
        const stepped = Math.round(next / step) * step
        onChange?.(stepped)
        return stepped
      })
    },
    [min, max, step, onChange]
  )

  const handlePointerDown = (e) => {
    dragging.current = true
    lastY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragging.current) return
    const deltaY = e.clientY - lastY.current
    lastY.current = e.clientY
    updateValue(deltaY)
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {name && (
        <span className="text-[10px] uppercase tracking-wider text-zinc-400">
          {name}
        </span>
      )}

      <div
        ref={knobRef}
        className="relative w-16 h-16 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="w-full h-full">
          {/* Track arc */}
          <path
            d={trackArc}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Value arc */}
          {fraction > 0 && (
            <path
              d={valueArc}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          {/* Knob body */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            className="fill-zinc-800 stroke-zinc-600"
            strokeWidth="1.5"
          />
          {/* Inner shadow ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS - 4}
            className="fill-zinc-900/50"
            stroke="none"
          />
          {/* Indicator line */}
          <line
            x1={indicatorInner.x}
            y1={indicatorInner.y}
            x2={indicator.x}
            y2={indicator.y}
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className="text-[10px] tabular-nums text-zinc-500">
        {Number(value).toFixed(step < 1 ? 1 : 0)}
      </span>

      <input
        type="hidden"
        name={name}
        value={value}
      />
    </div>
  )
}
