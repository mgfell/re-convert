import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  label: string;
  className?: string;
};

export default function StatBadge({ value, label, className = "" }: Props) {
  const [displayValue, setDisplayValue] = useState(value);
  const [key, setKey] = useState(0);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setDisplayValue(value);
      setKey((k) => k + 1);
      prevRef.current = value;
    }
  }, [value]);

  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <span
        key={key}
        className="tabular-nums animate-count-in inline-block"
      >
        {displayValue}
      </span>
      <span>{label}</span>
    </span>
  );
}