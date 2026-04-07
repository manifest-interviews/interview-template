import { Link } from "../router";

export function Sidebar() {
  return (
    <nav className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-6">
      <h1 className="text-lg font-bold px-2">Le Fancy Café</h1>

      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
          Sell
        </p>
        <ul className="space-y-1">
          <li>
            <Link
              to={{ name: "newOrder" }}
              className="block w-full text-left px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              New Order
            </Link>
          </li>
          <li>
            <Link
              to={{ name: "orders" }}
              className="block w-full text-left px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              Orders
            </Link>
          </li>
        </ul>
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
