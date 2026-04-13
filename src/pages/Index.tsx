import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import PageTransition from "@/components/PageTransition";

const features = [
  {
    icon: Shield,
    title: "Secure by Design",
    desc: "AWS Cognito authentication with DynamoDB encryption at rest.",
  },
  {
    icon: Zap,
    title: "Serverless Scale",
    desc: "Lambda functions auto-scale from zero to millions of requests.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    desc: "CloudFront-powered delivery with sub-100ms latency worldwide.",
  },
];

export default function Index() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="neon-text">Cloud</span>
            <span className="text-foreground">Notes</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            A serverless note-taking experience powered by AWS, with stunning 3D
            visuals and glassmorphism design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-neon text-background flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-neon-outline">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 neon-text">
            Built for the Cloud
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-8 text-center group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:neon-glow transition-shadow duration-300">
                  <f.icon className="w-7 h-7 text-neon-cyan" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
