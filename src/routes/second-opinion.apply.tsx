import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/hooks/use-reveal";
import { supabase } from "@/lib/supabase";
import {
  User,
  Stethoscope,
  FileText,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Upload,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/second-opinion/apply")({
  head: () => ({
    meta: [
      { title: "Request Second Opinion — USAMedTravel" },
      {
        name: "description",
        content:
          "Submit your Patient Second Opinion Request. Our specialists will review your case and provide a detailed written medical opinion.",
      },
    ],
  }),
  component: SecondOpinionApplyPage,
});

const seekingOptions = [
  "Diagnosis Confirmation",
  "Treatment Review",
  "Surgical Opinion",
  "Alternative Treatment Options",
  "Transplant Evaluation",
  "Cancer Expert Review",
  "Rare Disease Review",
  "Other",
];

const specialtiesList = [
  "Oncology",
  "Cardiology",
  "Neurology / Neurosurgery",
  "Orthopedics",
  "Transplant",
  "Radiology / Imaging Review",
  "Rare Diseases",
  "Pediatrics",
  "Gastroenterology",
  "Pulmonology",
  "Endocrinology",
  "Urology",
  "Gynecology / Obstetrics",
  "Hematology",
  "General Medicine",
  "Other",
];

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

const docTypes = [
  "MRI / CT Scans",
  "Lab Reports",
  "Biopsy Reports",
  "Discharge Summary",
  "Current Treatment Plan",
];

function SecondOpinionApplyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    country: "",
    age: "",
    gender: "",
    email: "",
    whatsapp: "",
    primary_diagnosis: "",
    hospital_treating: "",
    treating_doctor: "",
    preferred_specialty: "",
    additional_questions: "",
  });

  const [selectedSeeking, setSelectedSeeking] = useState<string[]>([]);
  const [consentShare, setConsentShare] = useState(false);
  const [consentPlatform, setConsentPlatform] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleTextChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSeeking = (item: string) => {
    setSelectedSeeking((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentShare || !consentPlatform) {
      alert("Please confirm both consent declarations before submitting.");
      return;
    }
    if (selectedSeeking.length === 0) {
      alert("Please select at least one option in 'What Are You Seeking?'.");
      return;
    }

    setSubmitting(true);
    try {
      let fileUrl = null;
      if (file) {
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
      }

      const payload = {
        ...formData,
        seeking: selectedSeeking,
        consent_share: consentShare,
        consent_platform: consentPlatform,
        file_url: fileUrl,
      };

      const { error } = await supabase
        .from("second_opinion_requests")
        .insert([payload]);

      if (error) throw error;
      setSuccess(true);
      setFile(null);
      setFileName(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Second opinion submission error:", err);
      alert(
        `Submission failed: ${err.message || "An unexpected error occurred."}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/second-opinion"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-teal transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to Second Opinion info
            </Link>
          </div>

          {success ? (
            <Reveal className="glass-premium rounded-3xl p-10 border border-white/10 text-center space-y-6 shadow-glow">
              <div className="size-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto shadow-elegant">
                <CheckCircle2 className="size-8" />
              </div>
              <h1 className="font-display text-3xl font-bold">
                Request Received!
              </h1>
              <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
                Thank you for submitting your Second Opinion Request. Our team
                will review your case details and reach out to you via email or
                WhatsApp within{" "}
                <strong className="text-white">1–2 business days</strong> with
                next steps and instructions for sending your medical documents.
              </p>
              <div className="glass rounded-2xl p-5 border border-white/10 text-left space-y-3 max-w-lg mx-auto">
                <div className="text-xs font-semibold text-teal uppercase tracking-widest mb-2">
                  What's Next?
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  If you haven't uploaded all your medical documents, you can send the remaining documents via WhatsApp
                  to{" "}
                  <a
                    href="https://wa.me/919821629786"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal underline underline-offset-2"
                  >
                    +91 98216 29786
                  </a>{" "}
                  or wait for our team to contact you.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/second-opinion"
                  className="px-6 py-3 rounded-full bg-white text-navy-deep font-bold text-sm hover-lift inline-block"
                >
                  Back to Second Opinion
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-10">
              {/* Page Header */}
              <Reveal className="text-center space-y-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-teal font-mono">
                  Patient Request Form
                </span>
                <h1 className="font-display text-3xl md:text-5xl font-bold">
                  Second Opinion Request
                </h1>
                <p className="text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
                  This is the most important step. Complete the form below and
                  our team will match you with the right U.S. specialist for
                  your case.
                </p>
              </Reveal>

              <Reveal>
                <form
                  onSubmit={handleSubmit}
                  className="glass-premium rounded-3xl p-8 border border-white/10 shadow-elegant space-y-10"
                  autoComplete="off"
                >
                  {/* ── Section 1: Patient Information ── */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <User className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">
                        Patient Information
                      </h3>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        required
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleTextChange}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                      />
                    </div>

                    {/* Country + Age */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          Country *
                        </label>
                        <input
                          required
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleTextChange}
                          placeholder="e.g. India"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          Age *
                        </label>
                        <input
                          required
                          name="age"
                          type="text"
                          value={formData.age}
                          onChange={handleTextChange}
                          placeholder="e.g. 45"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-2.5 uppercase tracking-wider">
                        Gender *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {genderOptions.map((g) => (
                          <label
                            key={g}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 cursor-pointer text-xs transition-all"
                          >
                            <input
                              type="radio"
                              name="gender"
                              required
                              checked={formData.gender === g}
                              onChange={() =>
                                setFormData((p) => ({ ...p, gender: g }))
                              }
                              className="accent-teal size-4"
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Email + WhatsApp */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleTextChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          WhatsApp Number *
                        </label>
                        <input
                          required
                          name="whatsapp"
                          type="text"
                          value={formData.whatsapp}
                          onChange={handleTextChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Section 2: Medical Information ── */}
                  <div className="space-y-5 pt-2">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <Stethoscope className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">
                        Medical Information
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                        Primary Diagnosis *
                      </label>
                      <input
                        required
                        name="primary_diagnosis"
                        type="text"
                        value={formData.primary_diagnosis}
                        onChange={handleTextChange}
                        placeholder="e.g. Stage II Breast Cancer, Herniated Disc L4-L5..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          Hospital Currently Treating You *
                        </label>
                        <input
                          required
                          name="hospital_treating"
                          type="text"
                          value={formData.hospital_treating}
                          onChange={handleTextChange}
                          placeholder="e.g. Apollo Hospitals, Mumbai"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">
                          Treating Doctor *
                        </label>
                        <input
                          required
                          name="treating_doctor"
                          type="text"
                          value={formData.treating_doctor}
                          onChange={handleTextChange}
                          placeholder="Dr. Full Name"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Section 3: What Are You Seeking? ── */}
                  <div className="space-y-5 pt-2">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <MessageSquare className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">
                        What Are You Seeking?
                      </h3>
                    </div>
                    <p className="text-xs text-white/40">
                      Select all that apply.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {seekingOptions.map((opt) => {
                        const checked = selectedSeeking.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer text-sm transition-all ${
                              checked
                                ? "bg-teal/10 border-teal/40 text-teal"
                                : "bg-white/[0.04] border-white/[0.06] hover:border-white/15 text-white/80"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSeeking(opt)}
                              className="accent-teal size-4 rounded shrink-0"
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Section 4: Preferred Specialty ── */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-medium text-white/55 uppercase tracking-wider">
                      Preferred Specialty *
                    </label>
                    <select
                      required
                      name="preferred_specialty"
                      value={formData.preferred_specialty}
                      onChange={handleTextChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all"
                    >
                      <option value="" disabled className="text-navy-deep bg-navy-deep">
                        Select the specialty you'd like reviewed
                      </option>
                      {specialtiesList.map((s) => (
                        <option key={s} value={s} className="text-navy-deep bg-navy-deep">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ── Section 5: Upload Document ── */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <Upload className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">
                        Medical Document
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-teal/5 border border-teal/15 p-5 space-y-4">
                      <p className="text-sm text-white/70 leading-relaxed">
                        Please upload your primary medical report or scan (Max 5MB).
                      </p>
                      
                      <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover-lift cursor-pointer w-fit border border-white/20">
                        <Upload className="size-4 shrink-0" />
                        <span className="truncate max-w-[200px]">{fileName ?? "Select File to Upload"}</span>
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
                  </div>

                  {/* ── Section 6: Additional Questions ── */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-medium text-white/55 uppercase tracking-wider">
                      Additional Questions / Details
                    </label>
                    <textarea
                      name="additional_questions"
                      rows={5}
                      value={formData.additional_questions}
                      onChange={handleTextChange}
                      placeholder="Share any additional context, questions for the specialist, or specific concerns you'd like addressed in the second opinion..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all placeholder-white/25"
                    />
                  </div>

                  {/* ── Section 7: Consent ── */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 pb-1">
                      <ShieldCheck className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-base">
                        Consent
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={consentShare}
                          onChange={(e) => setConsentShare(e.target.checked)}
                          className="accent-teal size-4 mt-0.5 rounded shrink-0"
                        />
                        <span>
                          I authorize USAMedTravel to securely share my medical
                          records with partner hospitals and specialists for the
                          purpose of obtaining medical opinions and treatment
                          recommendations. *
                        </span>
                      </label>
                      <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={consentPlatform}
                          onChange={(e) =>
                            setConsentPlatform(e.target.checked)
                          }
                          className="accent-teal size-4 mt-0.5 rounded shrink-0"
                        />
                        <span>
                          I understand that USAMedTravel does not provide
                          medical advice and acts solely as a healthcare
                          coordination platform. *
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal to-sky text-white font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none shadow-glow"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Submitting Request…
                        </>
                      ) : (
                        "Request Second Opinion"
                      )}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
