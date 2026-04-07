import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  price_cents: z.number(),
  created_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const productsContract = c.router({
  list: {
    method: "GET",
    path: "/api/products",
    responses: {
      200: z.array(ProductSchema),
    },
  },
  get: {
    method: "GET",
    path: "/api/products/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ProductSchema,
      404: z.object({ message: z.string() }),
    },
  },
  create: {
    method: "POST",
    path: "/api/products",
    body: z.object({
      name: z.string(),
      sku: z.string(),
      price_cents: z.number(),
    }),
    responses: {
      201: ProductSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/api/products/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: z.object({
      name: z.string().optional(),
      sku: z.string().optional(),
      price_cents: z.number().optional(),
    }),
    responses: {
      200: ProductSchema,
      404: z.object({ message: z.string() }),
    },
  },
  delete: {
    method: "DELETE",
    path: "/api/products/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: c.noBody(),
    responses: {
      204: c.noBody(),
    },
  },
});
