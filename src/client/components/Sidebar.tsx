import { Link } from "../router";
import type { Page } from "../pages";

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
        {title}
      </p>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function NavLink({ to, children }: { to: Page; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="block w-full text-left px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

export function Sidebar() {
  return (
    <nav className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-6">
      <h1 className="text-lg font-bold px-2">Le Fancy Café</h1>

      <NavSection title="Sell">
        <NavLink to={{ name: "newOrder" }}>New Order</NavLink>
        <NavLink to={{ name: "orders" }}>Orders</NavLink>
      </NavSection>

      <NavSection title="Manage">
        <NavLink to={{ name: "products" }}>Products</NavLink>
      </NavSection>
    </nav>
  );
}
