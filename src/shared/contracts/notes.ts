import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const NoteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;

export const notesContract = c.router({
  list: {
    method: "GET",
    path: "/api/notes",
    responses: {
      200: z.array(NoteSchema),
    },
  },
  create: {
    method: "POST",
    path: "/api/notes",
    body: z.object({
      title: z.string(),
      content: z.string().optional().default(""),
    }),
    responses: {
      201: NoteSchema,
    },
  },
  get: {
    method: "GET",
    path: "/api/notes/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: NoteSchema,
      404: z.object({ message: z.string() }),
    },
  },
  delete: {
    method: "DELETE",
    path: "/api/notes/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: c.noBody(),
    responses: {
      204: c.noBody(),
    },
  },
});
