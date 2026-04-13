import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import OrbitLoader from "@/components/OrbitLoader";
import PageTransition from "@/components/PageTransition";
import { Mail, Lock, User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(email, password, name);
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <OrbitLoader text="Creating account..." />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="glass-card w-full max-w-md p-8">
          <h1 className="font-display text-3xl font-bold neon-text text-center mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            Join CloudNotes and start organizing
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-glass pl-10"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-neon w-full text-background">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-neon-cyan hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
