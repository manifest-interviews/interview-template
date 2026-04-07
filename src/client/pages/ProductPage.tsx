import { useState } from "react";
import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";
import { formatPrice, parsePriceToCents } from "../helpers";
import { Button } from "../components/Button";

export function ProductPage({ productId }: { productId: number }) {
  const query = tsr.products.get.useQuery({
    queryKey: ["products", productId],
    queryData: { params: { id: String(productId) } },
  });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to={{ name: "products" }}
        className="text-zinc-400 hover:text-white transition-colors mb-6 inline-block"
      >
        &larr; Back to products
      </Link>

      <Wait for={query}>
        {(data) => (
          <ProductDetail
            product={data.body}
            productId={productId}
          />
        )}
      </Wait>
    </div>
  );
}

function ProductDetail({
  product,
  productId,
}: {
  product: { name: string; sku: string; price_cents: number; created_at: string };
  productId: number;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  const [price, setPrice] = useState((product.price_cents / 100).toFixed(2));

  const tsrQueryClient = tsr.useQueryClient();

  const { mutate: updateProduct } = tsr.products.update.useMutation({
    onSuccess: () => {
      tsrQueryClient.invalidateQueries({ queryKey: ["products"] });
      setEditing(false);
    },
  });

  if (!editing) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-zinc-500 text-sm mb-1">SKU: {product.sku}</p>
        <p className="text-zinc-400 text-lg mb-4">
          {formatPrice(product.price_cents)}
        </p>
        <p className="text-zinc-500 text-sm mb-6">
          Added {new Date(product.created_at).toLocaleDateString()}
        </p>
        <Button variant="secondary" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const cents = parsePriceToCents(price);
        if (!name.trim() || !sku.trim() || isNaN(cents)) return;
        updateProduct({
          params: { id: String(productId) },
          body: { name: name.trim(), sku: sku.trim(), price_cents: cents },
        });
      }}
    >
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">SKU</label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setName(product.name);
            setSku(product.sku);
            setPrice((product.price_cents / 100).toFixed(2));
            setEditing(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
