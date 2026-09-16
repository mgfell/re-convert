import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  getInitialTheme,
  saveTheme,
  type Theme,
} from "../lib/theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggle };
}