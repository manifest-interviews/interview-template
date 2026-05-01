import { useState } from "react";
import { Button } from "./Button";
import { parsePriceToCents } from "../helpers";

export interface ProductFormValues {
  name: string;
  sku: string;
  price_cents: number;
}

export function ProductForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialValues?: Partial<ProductFormValues>;
  submitLabel: string;
  onSubmit: (values: ProductFormValues) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [sku, setSku] = useState(initialValues?.sku ?? "");
  const [price, setPrice] = useState(
    initialValues?.price_cents !== undefined
      ? (initialValues.price_cents / 100).toFixed(2)
      : ""
  );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const cents = parsePriceToCents(price);
        if (!name.trim() || !sku.trim() || isNaN(cents)) return;
        onSubmit({ name: name.trim(), sku: sku.trim(), price_cents: cents });
      }}
    >
      <Field label="Name" value={name} onChange={setName} />
      <Field label="SKU" value={sku} onChange={setSku} />
      <Field label="Price" value={price} onChange={setPrice} />
      <div className="flex gap-2">
        <Button type="submit">{submitLabel}</Button>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-zinc-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
      />
    </div>
  );
}
