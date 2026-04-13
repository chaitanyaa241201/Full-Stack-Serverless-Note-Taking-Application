import { Trash2, Calendar } from "lucide-react";
import { Note, useNotes } from "@/contexts/NotesContext";

export default function NoteCard({ note }: { note: Note }) {
  const { deleteNote } = useNotes();
  const date = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="note-card-3d h-56">
      <div className="note-card-inner">
        {/* Front */}
        <div className="note-card-front glass-card p-5 flex flex-col">
          <div
            className="w-3 h-3 rounded-full mb-3"
            style={{ backgroundColor: note.color, boxShadow: `0 0 12px ${note.color}` }}
          />
          <h3 className="font-display font-semibold text-foreground text-lg mb-2 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-muted-foreground text-sm flex-1 line-clamp-3">{note.content}</p>
          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-3">
            <Calendar className="w-3 h-3" />
            {date}
          </div>
        </div>

        {/* Back */}
        <div className="note-card-back glass-card p-5 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm text-center">
            {note.content}
          </p>
          <button
            onClick={() => deleteNote(note.noteId)}
            className="btn-neon-outline flex items-center gap-2 text-sm px-4 py-2 hover:border-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}
