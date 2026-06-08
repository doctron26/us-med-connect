import { useEffect, useState } from "react";
import { Reveal } from "@/hooks/use-reveal";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "@tanstack/react-router";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  cover_image_url: string | null;
  created_at: string;
};

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, cover_image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) setPosts(data as BlogPost[]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Don't render section if no posts or still loading
  if (loading || posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 md:py-32 bg-secondary/40 relative overflow-hidden">
      <div className="absolute -top-32 right-1/4 size-[400px] rounded-full glow-sky opacity-20" />
      <div className="absolute -bottom-32 left-1/3 size-[400px] rounded-full glow-teal opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky">
            <BookOpen className="size-3.5" /> Insights & Updates
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-deep leading-tight mt-3">
            Latest from <span className="text-gradient">our blog</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Expert insights on medical second opinions, healthcare navigation, and connecting with America's top specialists.
          </p>
        </Reveal>

        <div className={`grid gap-6 ${posts.length === 1 ? "max-w-2xl mx-auto" : posts.length === 2 ? "sm:grid-cols-2 max-w-4xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block h-full rounded-2xl bg-card border border-border hover-lift transition-all hover:border-sky/40 overflow-hidden"
              >
                {/* Cover image */}
                {post.cover_image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="size-3" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-navy-deep text-lg leading-snug mb-3 group-hover:text-sky transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
