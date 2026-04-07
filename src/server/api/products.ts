import { tsr } from "@ts-rest/serverless/fetch";
import { productsContract } from "../../shared/contracts/products";
import type { Product } from "../../shared/contracts/products";
import { sql } from "../db";

export const productsRouter = tsr.router(productsContract, {
  list: async () => {
    const products = await sql<Product[]>`
      SELECT * FROM products ORDER BY name
    `;

    return { status: 200, body: products };
  },

  get: async ({ params }) => {
    const [product] = await sql<Product[]>`
      SELECT * FROM products WHERE id = ${params.id}
    `;

    if (!product)
      return { status: 404, body: { message: "Product not found" } };

    return { status: 200, body: product };
  },
});
