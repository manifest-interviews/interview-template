import { useState } from "react";
import { RouterProvider, Link } from "./router";
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

function Sidebar() {
  return (
    <nav className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-6">
      <h1 className="text-lg font-bold px-2">Cafe POS</h1>

      <div>
        <Link
          to={{ name: "products" }} // TODO: point to orders page once built
          className="block w-full text-left px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors font-medium"
        >
          Sell
        </Link>
      </div>

      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
          Manage
        </p>
        <ul className="space-y-1">
          <li>
            <Link
              to={{ name: "products" }}
              className="block w-full text-left px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export function App() {
  const [page, setPage] = useState<Page>({ name: "products" });

  return (
    <RouterProvider setPage={setPage}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <CurrentPage {...page} />
        </main>
      </div>
    </RouterProvider>
  );
}

export default App;
