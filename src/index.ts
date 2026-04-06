import { createFetchHandler } from "@ts-rest/serverless/fetch";
import { contract } from "./shared/contract";
import { router } from "./server/api";
import index from "./index.html";

const apiHandler = createFetchHandler(contract, router);

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
