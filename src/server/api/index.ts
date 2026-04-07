// Root router — wires each resource's handlers to the contract.
// To add a new resource, import its router and register it below.

import { tsr } from "@ts-rest/serverless/fetch";
import { contract } from "../../shared/contract";
import { notesRouter } from "./notes";
import { productsRouter } from "./products";

export const router = tsr.router(contract, {
  // Register additional routers here:
  notes: notesRouter,
  products: productsRouter,
});
