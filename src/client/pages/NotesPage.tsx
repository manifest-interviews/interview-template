import { useState } from "react";
import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";
import type { Note } from "../../shared/contracts/notes";

export function NotesPage() {
  const [title, setTitle] = useState("");

  const query = tsr.notes.list.useQuery({ queryKey: ["notes"] });
  const tsrQueryClient = tsr.useQueryClient();

  const { mutate: createNote } = tsr.notes.create.useMutation({
    onSuccess: () => {
      tsrQueryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
    },
  });

  const { mutate: deleteNote } = tsr.notes.delete.useMutation({
    onSuccess: () => {
      tsrQueryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Notes</h1>

      <form
        className="flex gap-2 mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          createNote({ body: { title: title.trim() } });
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New note..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          Add
        </button>
      </form>

      <Wait for={query}>
        {(data) => (
          <ul className="space-y-2">
            {data.body.map((note: Note) => (
              <li
                key={note.id}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-800"
              >
                <Link
                  to={{ name: "note", noteId: note.id }}
                  className="text-left flex-1"
                >
                  <span className="font-medium">{note.title}</span>
                  <span className="text-zinc-500 text-sm ml-3">
                    {new Date(note.created_at).toLocaleDateString()}
                  </span>
                </Link>
                <button
                  onClick={() =>
                    deleteNote({ params: { id: String(note.id) } })
                  }
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
            {data.body.length === 0 && (
              <p className="text-zinc-500 text-center py-8">
                No notes yet. Add one above!
              </p>
            )}
          </ul>
        )}
      </Wait>
    </div>
  );
}
