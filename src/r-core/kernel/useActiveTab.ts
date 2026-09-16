import { useCallback, useState } from "react";
import type { TabId } from "@/abi";

export function useActiveTab(initial: TabId = "images") {
  const [tab, setTab] = useState<TabId>(initial);
  const [locked, setLocked] = useState(false);

  const select = useCallback((next: TabId) => {
    setTab(next);
    setLocked(true);
  }, []);

  const auto = useCallback(
    (next: TabId) => {
      setTab((prev) => (locked ? prev : next));
    },
    [locked]
  );

  const unlock = useCallback(() => {
    setLocked(false);
  }, []);

  return { tab, select, auto, unlock, locked };
}