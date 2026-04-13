import { useAuth } from "@/contexts/AuthContext";
import { useNotes } from "@/contexts/NotesContext";
import PageTransition from "@/components/PageTransition";
import { User, Mail, FileText, Calendar } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { notes } = useNotes();

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-8">
            <span className="neon-text">Profile</span>
          </h1>

          <div className="glass-card p-8 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
                <User className="w-10 h-10 text-neon-cyan" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {user?.name || "User"}
                </h2>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {user?.email || "user@example.com"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-5 text-center">
                <FileText className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{notes.length}</p>
                <p className="text-muted-foreground text-xs">Total Notes</p>
              </div>
              <div className="glass p-5 text-center">
                <Calendar className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
                <p className="text-muted-foreground text-xs">Member Since</p>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between glass p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground">Auth Provider</span>
                  <span className="text-sm text-foreground">Amazon Cognito</span>
                </div>
                <div className="flex items-center justify-between glass p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm text-foreground">DynamoDB</span>
                </div>
                <div className="flex items-center justify-between glass p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground">Region</span>
                  <span className="text-sm text-foreground">us-east-1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
