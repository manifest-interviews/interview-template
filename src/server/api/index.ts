import { tsr } from "@ts-rest/serverless/fetch";
import { contract } from "../../shared/contract";
import { notesRouter } from "./notes";

export const router = tsr.router(contract, {
  notes: notesRouter,
});
