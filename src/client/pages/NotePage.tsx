import { tsr } from "../tsr";
import { Link } from "../router";
import { Wait } from "../components/Wait";

export function NotePage({ noteId }: { noteId: number }) {
  const query = tsr.notes.get.useQuery({
    queryKey: ["notes", noteId],
    queryData: { params: { id: String(noteId) } },
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link
        to={{ name: "notes" }}
        className="text-zinc-400 hover:text-white transition-colors mb-6 inline-block"
      >
        &larr; Back to notes
      </Link>

      <Wait for={query}>
        {(data) => {
          const note = data.body;
          return note ? (
            <div>
              <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
              <p className="text-zinc-500 text-sm mb-6">
                {new Date(note.created_at).toLocaleDateString()}
              </p>
              <p className="text-zinc-300">
                {note.content || "No content yet."}
              </p>
            </div>
          ) : (
            <p className="text-zinc-500">Note not found.</p>
          );
        }}
      </Wait>
    </div>
  );
}
