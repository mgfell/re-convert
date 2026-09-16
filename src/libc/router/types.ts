export type Route =
  | { name: "landing" }
  | { name: "app" }
  | { name: "seo"; slug: string }
  | { name: "notFound"; path: string };

export type Navigate = (route: Route) => void;