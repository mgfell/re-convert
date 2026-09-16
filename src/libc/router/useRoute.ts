import { useCallback, useEffect, useState } from "react";
import type { Route } from "./types";

function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "").trim();

  if (!clean || clean === "") return { name: "landing" };
  if (clean === "app") return { name: "app" };

  if (/^[a-z0-9-]+$/.test(clean)) {
    return { name: "seo", slug: clean };
  }

  return { name: "notFound", path: clean };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case "landing":
      return "";
    case "app":
      return "app";
    case "seo":
      return route.slug;
    case "notFound":
      return route.path;
  }
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const handler = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((next: Route) => {
    const hash = routeToHash(next);
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}