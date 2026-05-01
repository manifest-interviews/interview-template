import { useState } from "react";
import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";
import { formatPrice } from "../helpers";
import { ProductForm } from "../components/ProductForm";

export function ProductsPage() {
  const [adding, setAdding] = useState(false);

  const query = tsr.products.list.useQuery({ queryKey: ["products"] });
  const tsrQueryClient = tsr.useQueryClient();

  const { mutate: createProduct } = tsr.products.create.useMutation({
    onSuccess: () => {
      tsrQueryClient.invalidateQueries({ queryKey: ["products"] });
      setAdding(false);
    },
  });

  const { mutate: deleteProduct } = tsr.products.delete.useMutation({
    onSuccess: () => {
      tsrQueryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="mb-8">
        {adding ? (
          <ProductForm
            submitLabel="Add"
            onSubmit={(body) => createProduct({ body })}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            + Add product
          </button>
        )}
      </div>

      <Wait for={query}>
        {(data) => (
          <ul className="space-y-2">
            {data.body.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-800"
              >
                <Link
                  to={{ name: "product", productId: product.id }}
                  className="text-left flex-1"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="text-zinc-500 text-sm ml-3">
                    {product.sku}
                  </span>
                </Link>
                <span className="text-zinc-400 mr-4">
                  {formatPrice(product.price_cents)}
                </span>
                <button
                  onClick={() =>
                    deleteProduct({ params: { id: product.id } })
                  }
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
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
