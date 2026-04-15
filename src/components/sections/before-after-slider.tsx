"use client";

import { MoveHorizontal } from "lucide-react";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/utils";

type SliderImageSource = {
  src: string;
  alt: string;
  backgroundPosition?: string;
  backgroundSize?: string;
};

type BeforeAfterSliderProps = {
  before: SliderImageSource;
  after: SliderImageSource;
  beforeLabel: string;
  afterLabel: string;
  ariaLabel: string;
  keyboardHint: string;
  className?: string;
  initialValue?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  ariaLabel,
  keyboardHint,
  className,
  initialValue = 52,
}: BeforeAfterSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const id = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const nextValue = ((clientX - rect.left) / rect.width) * 100;
    setValue(clamp(nextValue, 0, 100));
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    sliderRef.current?.focus();
    setIsDragging(true);
    updateFromClientX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        setValue((currentValue) => clamp(currentValue - 4, 0, 100));
        break;
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        setValue((currentValue) => clamp(currentValue + 4, 0, 100));
        break;
      case "Home":
        event.preventDefault();
        setValue(0);
        break;
      case "End":
        event.preventDefault();
        setValue(100);
        break;
      default:
        break;
    }
  };

  const splitPosition = { left: `${value}%` };

  return (
    <div
      className={cn(
        "relative aspect-[3/2] overflow-hidden rounded-[1.6rem] border border-border/80 bg-[linear-gradient(180deg,#ffffff_0%,#f4f7ff_100%)] shadow-soft",
        className,
      )}
    >
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-describedby={`${id}-hint ${id}-before ${id}-after`}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-valuetext={`${Math.round(value)}%`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={() => setIsDragging(false)}
        onKeyDown={handleKeyDown}
        className="group relative h-full w-full touch-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <p id={`${id}-hint`} className="sr-only">
          {keyboardHint}
        </p>
        <p id={`${id}-before`} className="sr-only">
          {before.alt}
        </p>
        <p id={`${id}-after`} className="sr-only">
          {after.alt}
        </p>

        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${before.src})`,
            backgroundPosition: before.backgroundPosition ?? "center",
            backgroundSize: before.backgroundSize ?? "cover",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${after.src})`,
              backgroundPosition: after.backgroundPosition ?? "center",
              backgroundSize: after.backgroundSize ?? "cover",
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/30 via-slate-950/10 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050b3c]/18 via-transparent to-transparent"
        />

        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-slate-950/64 px-3 py-1.5 backdrop-blur-sm">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white">
            {beforeLabel}
          </p>
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/94 px-3 py-1.5 backdrop-blur-sm">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
            {afterLabel}
          </p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.16)]"
          style={splitPosition}
        />

        <div
          aria-hidden
          className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={splitPosition}
        >
          <div
            className={cn(
              "flex size-12 cursor-grab items-center justify-center rounded-full border border-white/80 bg-white/92 text-primary shadow-[0_16px_36px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-transform duration-200 active:cursor-grabbing",
              isDragging ? "scale-105" : "group-hover:scale-105",
            )}
          >
            <MoveHorizontal className="size-4" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
