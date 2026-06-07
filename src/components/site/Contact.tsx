import { useRef, useState } from "react";
import { Mail, MessageCircle, Globe, Clock, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    country: "",
    phone: "",
    specialty: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a medical report or document before submitting your inquiry.");
      return;
    }

    setIsSubmitting(true);
    let fileUrl = "";

    try {
      const fileExt = file.name.split(".").pop();
      const uploadName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("medical_files")
        .upload(`uploads/${uploadName}`, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("medical_files")
        .getPublicUrl(`uploads/${uploadName}`);

      fileUrl = publicUrl;

      const { error } = await supabase.from("inquiries").insert([{
        ...formData,
        file_url: fileUrl || null,
      }]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ full_name: "", email: "", country: "", phone: "", specialty: "", description: "" });
      setFile(null);
      setFileName(null);
      setTimeout(() => setIsSuccess(false), 6000);

    } catch (err: any) {
      console.error("Form submission error:", err);
      alert(`Submission failed: ${err?.message || "Unknown error. Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute -top-32 left-1/3 size-[420px] rounded-full glow-teal" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <div className="space-y-7">
          <span className="text-xs font-semibold tracking-widest uppercase text-teal">Contact</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Start your case <span className="text-teal">in minutes</span>.
          </h2>
          <p className="text-white/80 text-lg max-w-lg">
            Our concierge team is available across global time zones. Share your case securely —
            we'll route it to the right U.S. specialist.
          </p>

          <div className="space-y-4 pt-2">
            <a href="https://wa.me/919821629786" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 glass-dark p-4 rounded-2xl hover-lift border border-white/10">
              <div className="size-11 rounded-xl bg-teal text-navy-deep flex items-center justify-center">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">WhatsApp</div>
                <div className="font-display font-semibold">+91 98216 29786</div>
              </div>
            </a>
            <a href="mailto:travel@usamedtravel.com"
              className="flex items-center gap-4 glass-dark p-4 rounded-2xl hover-lift border border-white/10">
              <div className="size-11 rounded-xl gradient-sky flex items-center justify-center">
                <Mail className="size-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Email</div>
                <div className="font-display font-semibold">travel@usamedtravel.com</div>
              </div>
            </a>
            <div className="flex items-center gap-4 glass-dark p-4 rounded-2xl border border-white/10">
              <div className="size-11 rounded-xl gradient-sky flex items-center justify-center">
                <Globe className="size-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Website</div>
                <div className="font-display font-semibold">www.usamedtravel.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 glass-dark p-4 rounded-2xl border border-white/10">
              <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Clock className="size-5" />
              </div>
              <div className="text-sm">
                <div className="text-white/70">Initial response: <span className="text-white font-semibold">1–3 hours</span></div>
                <div className="text-white/70">Case review: <span className="text-white font-semibold">12–24 hours</span></div>
                <div className="text-white/70">Opinion delivery: <span className="text-white font-semibold">24–72 hours</span></div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-8 border border-white/10 shadow-elegant space-y-4"
          autoComplete="off"
        >
          <h3 className="font-display text-2xl font-bold">International Inquiry</h3>
          <p className="text-white/70 text-sm">Share basic details — we respond within hours.</p>

          <div className="grid sm:grid-cols-2 gap-3">
            <input required name="full_name" placeholder="Full name" value={formData.full_name} onChange={handleChange}
              data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck="false"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:border-teal" />
            <input required name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
              data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck="false"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:border-teal" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input required name="country" placeholder="Country" value={formData.country} onChange={handleChange}
              data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck="false"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:border-teal" />
            <input required name="phone" placeholder="WhatsApp / Phone" value={formData.phone} onChange={handleChange}
              data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck="false"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:border-teal" />
          </div>
          <select required name="specialty" value={formData.specialty} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-teal">
            <option value="" disabled>Select specialty</option>
            <option className="text-navy-deep" value="Oncology">Oncology</option>
            <option className="text-navy-deep" value="Neurology / Neurosurgery">Neurology / Neurosurgery</option>
            <option className="text-navy-deep" value="Cardiology">Cardiology</option>
            <option className="text-navy-deep" value="Pediatrics">Pediatrics</option>
            <option className="text-navy-deep" value="Other">Other / Not sure</option>
          </select>
          <textarea required name="description" rows={4} placeholder="Briefly describe the medical case…" value={formData.description} onChange={handleChange}
            data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck="false"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:border-teal" />

          <label className="flex items-start gap-2 text-xs text-white/70">
            <input type="checkbox" required className="mt-1" />
            I consent to securely sharing my information for medical review.
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-navy-deep font-semibold hover-lift disabled:opacity-70 disabled:pointer-events-none">
              {isSubmitting ? (
                <><Loader2 className="size-4 animate-spin" /> Submitting…</>
              ) : isSuccess ? (
                <><CheckCircle2 className="size-4 text-green-500" /> Received!</>
              ) : (
                "Submit Inquiry"
              )}
            </button>
            <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-sky text-white font-semibold hover-lift cursor-pointer max-w-[220px]">
              <Upload className="size-4 shrink-0" />
              <span className="truncate">{fileName ?? "Secure Upload"}</span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (!selected) return;
                  if (selected.size > 5 * 1024 * 1024) {
                    alert("File size must be under 5MB");
                    e.target.value = "";
                    return;
                  }
                  setFile(selected);
                  setFileName(selected.name);
                }}
              />
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
