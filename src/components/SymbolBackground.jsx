import { useId, useMemo } from "react";

const DEFAULT_SYMBOLS = ["π", "e⁻", "⇌", "Ψ", "∑", "S/", "≠", "E=mc²", "∴", "λ", "x²","Δt"];

const DIRECTIONS = {
  "down-right": [1, 3], "down-left": [-1, 1],
  "up-right": [1, -1],  "up-left": [-1, -1],
  right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1],
};

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function SymbolBackground({
  symbols = DEFAULT_SYMBOLS,
  tile = 200,
  cols = 3,
  opacity = 0.15,
  seed = 20,
  duration = 5,
  direction = "down-right",
  minSize = 10,
  maxSize = 18,
  maxRotation = 5,
}) {
  const id = "sym-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [dx, dy] = DIRECTIONS[direction] ?? DIRECTIONS["down-right"];

  const items = useMemo(() => {
    const rand = seeded(seed);
    const rows = Math.ceil(symbols.length / cols);
    const cw = tile / cols;
    const ch = tile / rows;
    return symbols.map((char, i) => ({
      char,
      x: (i % cols) * cw + cw * (0.1 + rand() * 0.3),
      y: Math.floor(i / cols) * ch + ch * (0.5 + rand() * 0.3),
      size: minSize + rand() * (maxSize - minSize),
      rotate: (rand() * 2 - 1) * maxRotation,
    }));
  }, [symbols, tile, cols, seed, minSize, maxSize, maxRotation]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute motion-safe:animate-drift"
        style={{
          top: -tile,
          left: -tile,
          width: `calc(100% + ${tile * 2}px)`,
          height: `calc(100% + ${tile * 2}px)`,
          "--tile": `${tile}px`,
          "--dx": dx,
          "--dy": dy,
          animationDuration: `${duration}s`,
        }}
      >
        <defs>
          <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
            {items.map((it, i) => (
              <text
                key={i}
                x={it.x}
                y={it.y}
                fontSize={it.size}
                fillOpacity={opacity}
                transform={`rotate(${it.rotate} ${it.x} ${it.y})`}
                className="fill-text font-serif"
              >
                {it.char}
              </text>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}