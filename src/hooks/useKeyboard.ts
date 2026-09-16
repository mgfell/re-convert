import { useEffect } from "react";

export type ShortcutMap = Record<string, (e: KeyboardEvent) => void>;

function matches(e: KeyboardEvent, spec: string): boolean {
  const parts = spec.toLowerCase().split("+");
  const key = parts[parts.length - 1];
  const needCtrl = parts.includes("ctrl") || parts.includes("cmd");
  const needShift = parts.includes("shift");
  const needAlt = parts.includes("alt");

  const ctrl = e.ctrlKey || e.metaKey;

  if (needCtrl !== ctrl) return false;
  if (needShift !== e.shiftKey) return false;
  if (needAlt !== e.altKey) return false;

  const eventKey = e.key.toLowerCase();
  if (key === "enter") return eventKey === "enter";
  if (key === "esc" || key === "escape") return eventKey === "escape";
  return eventKey === key;
}

export function useKeyboard(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || target?.isContentEditable;

      for (const [spec, fn] of Object.entries(shortcuts)) {
        if (matches(e, spec)) {
          if (isTyping) return;
          e.preventDefault();
          fn(e);
          return;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}