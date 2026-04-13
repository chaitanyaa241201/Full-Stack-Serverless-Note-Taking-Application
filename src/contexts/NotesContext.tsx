import { createContext, useContext, useState, ReactNode } from "react";

export interface Note {
  noteId: string;
  title: string;
  content: string;
  createdAt: string;
  color: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  deleteNote: (noteId: string) => void;
}

const NotesContext = createContext<NotesContextType | null>(null);

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}

const COLORS = ["#bc13fe", "#05ffa1", "#00d4ff", "#ff6b6b", "#ffd93d"];

const SAMPLE_NOTES: Note[] = [
  {
    noteId: "1",
    title: "Welcome to CloudNotes",
    content: "Your serverless note-taking app with a stunning 3D interface. Start creating notes to see them here!",
    createdAt: new Date().toISOString(),
    color: "#bc13fe",
  },
  {
    noteId: "2",
    title: "AWS Architecture",
    content: "This app uses Cognito for auth, DynamoDB for storage, Lambda for compute, and S3 for hosting.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    color: "#05ffa1",
  },
  {
    noteId: "3",
    title: "3D Animations",
    content: "Hover over note cards to see the flip animation. The hero uses Three.js with floating geometries.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    color: "#00d4ff",
  },
];

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);

  const addNote = (title: string, content: string) => {
    setNotes((prev) => [
      {
        noteId: crypto.randomUUID(),
        title,
        content,
        createdAt: new Date().toISOString(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      ...prev,
    ]);
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.noteId !== noteId));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
