import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/hooks/use-reveal";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Blog — USAMedTravel" },
    ],
  }),
  component: BlogPostPage,
});

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  cover_image_url: string | null;
  created_at: string;
};

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        setError(true);
      } else {
        setPost(data as BlogPost);
        document.title = `${data.title} — USAMedTravel`;
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-20">
          <Loader2 className="size-8 animate-spin text-teal" />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-24 px-6 text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-bold text-navy-deep mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-deep text-white font-semibold hover-lift">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </Reveal>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <article className="mx-auto max-w-4xl px-6">
          <div className="mb-8 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-sky transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>

          <Reveal className="space-y-6 text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-navy-deep leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-teal" />
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-teal" />
                {post.author}
              </span>
            </div>
          </Reveal>

          {post.cover_image_url && (
            <Reveal delay={100} className="mb-12 rounded-3xl overflow-hidden shadow-elegant border border-border">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full aspect-[2/1] md:aspect-[21/9] object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={200} className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-deep prose-a:text-sky hover:prose-a:text-teal prose-a:transition-colors prose-img:rounded-xl">
            {/* Simple split by newline and render paragraphs/headings for basic formatting */}
            {post.content.split('\n').map((paragraph, index) => {
              if (!paragraph.trim()) return <br key={index} />;
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl mt-10 mb-5">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
              }
              // Handle basic bolding and links if needed, but a standard dangerouslySetInnerHTML might be better if admin supports HTML.
              // We'll stick to a simple mapping for now to match the seeded plain-text style with some basic markdown.
              
              // Basic markdown parser for bold and links
              const renderText = (text: string) => {
                const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                    const label = part.slice(1, part.indexOf(']'));
                    const url = part.slice(part.indexOf('(') + 1, -1);
                    return <a key={i} href={url}>{label}</a>;
                  }
                  return part;
                });
              };

              return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{renderText(paragraph)}</p>;
            })}
          </Reveal>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
