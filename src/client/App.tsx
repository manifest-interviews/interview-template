import { useState } from "react";
import { RouterProvider } from "./router";
import { pages, type Page } from "./pages";
export type { Page };

// Looks up the page component from the `pages` map and renders it with the
// right props. You shouldn't need to touch this — just add pages to the map
// in pages/index.tsx.
function CurrentPage(page: Page) {
  const { name, ...props } = page;
  const Component = pages[name] as React.ComponentType<any>;
  return <Component {...props} />;
}

export function App() {
  const [page, setPage] = useState<Page>({ name: "notes" });

  return (
    <RouterProvider setPage={setPage}>
      <CurrentPage {...page} />
    </RouterProvider>
  );
}

export default App;
