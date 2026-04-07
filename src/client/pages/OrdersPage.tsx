import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";

export function OrdersPage() {
  const query = tsr.orders.list.useQuery({ queryKey: ["orders"] });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <Wait for={query}>
        {(data) => (
          <ul className="space-y-2">
            {data.body.map((order) => (
              <li key={order.id}>
                <Link
                  to={{ name: "order", orderId: order.id }}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-800 hover:bg-zinc-800 transition-colors w-full text-left"
                >
                  <span className="font-medium">Order #{order.id}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-500">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">
                      {order.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            {data.body.length === 0 && (
              <p className="text-zinc-500 text-center py-8">
                No orders yet.
              </p>
            )}
          </ul>
        )}
      </Wait>
    </div>
  );
}
