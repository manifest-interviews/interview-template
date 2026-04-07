// Minimal client-side "router". There are no URLs — navigation is just
// swapping which Page object is in state. Use <Link to={...}> to navigate
// declaratively, or call useNavigate() for imperative navigation.

import { createContext, useContext, type ReactNode } from "react";
import type { Page } from "./pages";

const RouterContext = createContext<(page: Page) => void>(() => {});

export function RouterProvider({
  setPage,
  children,
}: {
  setPage: (page: Page) => void;
  children: ReactNode;
}) {
  return (
    <RouterContext.Provider value={setPage}>{children}</RouterContext.Provider>
  );
}

export function useNavigate() {
  return useContext(RouterContext);
}

export function Link({
  to,
  children,
  className,
}: {
  to: Page;
  children: ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => navigate(to)}>
      {children}
    </button>
  );
}
