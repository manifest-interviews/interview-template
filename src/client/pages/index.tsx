import type { ComponentProps } from "react";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";
import { OrdersPage } from "./OrdersPage";
import { OrderPage } from "./OrderPage";
import { NewOrderPage } from "./NewOrderPage";

// To add a new page:
//   1. Create a component in this directory (e.g. SettingsPage.tsx)
//   2. Add it to this map: `settings: SettingsPage`
//
// The Page type is inferred automatically from this map. Each page's props
// become the navigation params — e.g. OrderPage has `{ orderId: number }`, so
// navigating to it looks like: <Link to={{ name: "order", orderId: 1 }}>
export const pages = {
  products: ProductsPage,
  product: ProductPage,
  newOrder: NewOrderPage,
  orders: OrdersPage,
  order: OrderPage,
} as const;

type Pages = typeof pages;

// Derived union: { name: "products" } | { name: "order"; orderId: number } | ...
export type Page = {
  [K in keyof Pages]: { name: K } & ComponentProps<Pages[K]>;
}[keyof Pages];
