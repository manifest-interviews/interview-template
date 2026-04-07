import { tsr } from "../tsr";
import { Wait } from "../components/Wait";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function ProductsPage() {
  const query = tsr.products.list.useQuery({ queryKey: ["products"] });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Menu</h1>

      <Wait for={query}>
        {(data) => (
          <ul className="space-y-2">
            {data.body.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-800"
              >
                <span className="font-medium">{product.name}</span>
                <span className="text-zinc-400">
                  {formatPrice(product.price_cents)}
                </span>
              </li>
            ))}
            {data.body.length === 0 && (
              <p className="text-zinc-500 text-center py-8">
                No products found.
              </p>
            )}
          </ul>
        )}
      </Wait>
    </div>
  );
}
