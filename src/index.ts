import { createFetchHandler } from "@ts-rest/serverless/fetch";
import { contract } from "./shared/contract";
import { router } from "./server/api";
import index from "./index.html";

// Validate all responses against the contract's Zod schemas at runtime,
// so raw SQL results are checked even though handlers use casts.
const apiHandler = createFetchHandler(contract, router, {
  responseValidation: true,
});

const server = Bun.serve({
  port: 3001,
  routes: {
    "/api/*": (req) => apiHandler(req),
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
