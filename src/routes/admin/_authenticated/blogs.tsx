import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Save } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const Route = createFileRoute("/admin/_authenticated/blogs")({
  component: AdminBlogsPage,
});

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};

function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setBlogs(data as BlogPost[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = () => {
    setCurrentBlog({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "USAMedTravel Team",
      cover_image_url: "",
      published: false,
    });
    setIsEditing(true);
    setError(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleting(id);
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
    setDeleting(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Auto-generate slug if empty
    let slug = currentBlog.slug;
    if (!slug) {
      slug = (currentBlog.title || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const payload = {
      title: currentBlog.title,
      slug: slug,
      excerpt: currentBlog.excerpt,
      content: currentBlog.content,
      author: currentBlog.author,
      cover_image_url: currentBlog.cover_image_url || null,
      published: currentBlog.published,
      updated_at: new Date().toISOString(),
    };

    let resultError;

    if (currentBlog.id) {
      // Update
      const { error } = await supabaseAdmin.from("blog_posts").update(payload).eq("id", currentBlog.id);
      resultError = error;
    } else {
      // Insert
      const { error } = await supabaseAdmin.from("blog_posts").insert([payload]);
      resultError = error;
    }

    if (resultError) {
      setError(resultError.message);
      setSaving(false);
    } else {
      await fetchBlogs();
      setIsEditing(false);
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blogs</h1>
          <p className="text-sm text-white/40 mt-1">Manage articles on your blog</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-[#0a0f1e] text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-teal-500/10"
          >
            <Plus className="size-4" />
            New Post
          </button>
        </div>
      </div>

      {error && !isEditing && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="bg-[#0d1426] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.08]">
            <h2 className="text-lg font-bold text-white">{currentBlog.id ? "Edit Post" : "Create New Post"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Title *</label>
                <input required type="text" value={currentBlog.title || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Slug (Auto-generated if empty)</label>
                <input type="text" value={currentBlog.slug || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Author</label>
                <input type="text" value={currentBlog.author || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Cover Image URL (Optional)</label>
                <input type="text" value={currentBlog.cover_image_url || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, cover_image_url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Excerpt (Short summary) *</label>
              <textarea required rows={2} value={currentBlog.excerpt || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40" />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Full Content (Supports basic Markdown) *</label>
              <textarea required rows={10} value={currentBlog.content || ""} onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40 font-mono" />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="published" checked={currentBlog.published || false} onChange={(e) => setCurrentBlog({ ...currentBlog, published: e.target.checked })} className="accent-teal-400 size-4" />
              <label htmlFor="published" className="text-sm text-white/80 select-none cursor-pointer">Published (Visible to public)</label>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <div className="flex gap-3 pt-4 border-t border-white/[0.08]">
              <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-[#0a0f1e] text-sm font-semibold hover:opacity-90 transition-all shadow-lg disabled:opacity-60">
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {saving ? "Saving..." : "Save Post"}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-semibold hover:bg-white/[0.1] transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-24 text-white/30">
          <Loader2 className="size-6 animate-spin mr-3" />
          Loading blogs…
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-24 bg-[#0d1426] border border-white/[0.08] rounded-2xl">
          <div className="text-white/40 mb-4">No blog posts found.</div>
          <button onClick={handleCreate} className="px-6 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-semibold hover:bg-white/[0.1] transition-all">
            Create your first post
          </button>
        </div>
      ) : (
        <div className="bg-[#0d1426] border border-white/[0.08] rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] border-b border-white/[0.08] text-xs uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{blog.title}</div>
                    <div className="text-xs text-white/40 font-mono mt-1">/{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {blog.published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-400/10 text-teal-400 border border-teal-400/20 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="size-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
                        title="Edit"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === blog.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
