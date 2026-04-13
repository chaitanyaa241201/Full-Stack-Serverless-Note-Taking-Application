import { Link, useLocation } from "react-router-dom";
import { Cloud, LogOut, User, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-primary/20 text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-glass-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Cloud className="w-6 h-6 text-neon-cyan group-hover:text-neon-purple transition-colors" />
          <span className="font-display font-bold text-xl neon-text">CloudNotes</span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/create" className={navLinkClass("/create")}>
                <Plus className="w-4 h-4 inline mr-1" />
                New Note
              </Link>
              <Link to="/profile" className={navLinkClass("/profile")}>
                <User className="w-4 h-4 inline mr-1" />
                Profile
              </Link>
              <button
                onClick={logout}
                className="ml-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass("/login")}>
                Login
              </Link>
              <Link to="/signup" className="btn-neon text-sm text-background">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
