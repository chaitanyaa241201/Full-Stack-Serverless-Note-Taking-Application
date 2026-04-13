import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import NoteCard from "@/components/NoteCard";
import PageTransition from "@/components/PageTransition";

export default function Dashboard() {
  const { notes } = useNotes();

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                My <span className="neon-text">Notes</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {notes.length} note{notes.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link to="/create" className="btn-neon text-background flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Note
            </Link>
          </div>

          {notes.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <p className="text-muted-foreground mb-4">No notes yet. Create your first one!</p>
              <Link to="/create" className="btn-neon text-background inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Note
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {notes.map((note) => (
                <NoteCard key={note.noteId} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
