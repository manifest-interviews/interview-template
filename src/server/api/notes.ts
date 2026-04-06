import { tsr } from "@ts-rest/serverless/fetch";
import { notesContract } from "../../shared/contracts/notes";
import type { Note } from "../../shared/contracts/notes";
import db from "../db";

export const notesRouter = tsr.router(notesContract, {
  list: async () => {
    const notes = db
      .query("SELECT * FROM notes ORDER BY created_at DESC")
      .all() as Note[];
    return { status: 200 as const, body: notes };
  },

  create: async ({ body }) => {
    const note = db
      .query("INSERT INTO notes (title, content) VALUES (?, ?) RETURNING *")
      .get(body.title, body.content) as Note;
    return { status: 201 as const, body: note };
  },

  get: async ({ params }) => {
    const note = db
      .query("SELECT * FROM notes WHERE id = ?")
      .get(params.id) as Note | null;
    if (!note)
      return { status: 404 as const, body: { message: "Note not found" } };
    return { status: 200 as const, body: note };
  },

  delete: async ({ params }) => {
    db.run("DELETE FROM notes WHERE id = ?", [params.id]);
    return { status: 204 as const, body: undefined };
  },
});
