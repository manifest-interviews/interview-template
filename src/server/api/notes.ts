import { tsr } from "@ts-rest/serverless/fetch";
import { notesContract } from "../../shared/contracts/notes";
import type { Note } from "../../shared/contracts/notes";
import { sql } from "../db";

export const notesRouter = tsr.router(notesContract, {
  list: async () => {
    const notes = await sql<Note[]>`
      SELECT * FROM notes ORDER BY created_at DESC
    `;

    return { status: 200, body: notes };
  },

  create: async ({ body }) => {
    const [note] = await sql<Note[]>`
      INSERT INTO notes (title, content) VALUES (${body.title}, ${body.content}) RETURNING *
    `;

    return { status: 201, body: note! };
  },

  get: async ({ params }) => {
    const [note] = await sql<Note[]>`
      SELECT * FROM notes WHERE id = ${params.id}
    `;

    if (!note) return { status: 404, body: { message: "Note not found" } };

    return { status: 200, body: note };
  },

  delete: async ({ params }) => {
    await sql`
      DELETE FROM notes WHERE id = ${params.id}
    `;

    return { status: 204, body: undefined };
  },
});
