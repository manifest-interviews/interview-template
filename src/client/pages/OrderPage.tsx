import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";
import { formatPrice } from "../helpers";

export function OrderPage({ orderId }: { orderId: number }) {
  const query = tsr.orders.get.useQuery({
    queryKey: ["orders", orderId],
    queryData: { params: { id: orderId } },
  });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to={{ name: "orders" }}
        className="text-zinc-400 hover:text-white transition-colors mb-6 inline-block"
      >
        &larr; Back to orders
      </Link>

      <Wait for={query}>
        {(data) => {
          const order = data.body;
          const total = order.items.reduce(
            (sum, item) => sum + item.unit_price_cents * item.quantity,
            0
          );

          return (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">
                  {order.status}
                </span>
              </div>

              <p className="text-zinc-500 text-sm mb-6">
                {new Date(order.created_at).toLocaleString()}
              </p>

              <table className="w-full mb-6">
                <thead>
                  <tr className="text-left text-zinc-500 text-sm border-b border-zinc-800">
                    <th className="pb-2">Item</th>
                    <th className="pb-2 text-right">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-800/50"
                    >
                      <td className="py-3">{item.product_name}</td>
                      <td className="py-3 text-right text-zinc-400">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-right text-zinc-400">
                        {formatPrice(item.unit_price_cents)}
                      </td>
                      <td className="py-3 text-right">
                        {formatPrice(item.unit_price_cents * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end text-lg font-semibold">
                Total: {formatPrice(total)}
              </div>
            </div>
          );
        }}
      </Wait>
    </div>
  );
}
