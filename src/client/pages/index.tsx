import type { ComponentProps } from "react";
import { NotesPage } from "./NotesPage";
import { NotePage } from "./NotePage";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";

// To add a new page:
//   1. Create a component in this directory (e.g. SettingsPage.tsx)
//   2. Add it to this map: `settings: SettingsPage`
//
// The Page type is inferred automatically from this map. Each page's props
// become the navigation params — e.g. NotePage has `{ noteId: number }`, so
// navigating to it looks like: <Link to={{ name: "note", noteId: 1 }}>
export const pages = {
  products: ProductsPage,
  product: ProductPage,
  notes: NotesPage,
  note: NotePage,
} as const;

type Pages = typeof pages;

// Derived union: { name: "notes" } | { name: "note"; noteId: number } | ...
export type Page = {
  [K in keyof Pages]: { name: K } & ComponentProps<Pages[K]>;
}[keyof Pages];
