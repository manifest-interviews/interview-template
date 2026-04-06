import { initContract } from "@ts-rest/core";
import { notesContract } from "./contracts/notes";

const c = initContract();

export const contract = c.router({
  notes: notesContract,
});

export { type Note, NoteSchema } from "./contracts/notes";
