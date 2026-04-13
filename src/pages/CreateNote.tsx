import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "@/contexts/NotesContext";
import PageTransition from "@/components/PageTransition";
import { FileText, AlignLeft } from "lucide-react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNote(title, content);
    navigate("/dashboard");
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-8">
            <span className="neon-text">Create</span> Note
          </h1>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Title</label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-glass pl-10"
                  placeholder="Note title"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Content</label>
              <div className="relative">
                <AlignLeft className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input-glass pl-10 min-h-[200px] resize-y"
                  placeholder="Write your note..."
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="btn-neon text-background flex-1">
                Save Note
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="btn-neon-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
