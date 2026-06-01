import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/hooks/use-reveal";
import { supabase } from "@/lib/supabase";
import { 
  Building, 
  User, 
  Briefcase, 
  HelpCircle, 
  DollarSign, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/partnerships/apply")({
  head: () => ({
    meta: [
      { title: "Hospital Partnership Application — USAMedTravel" },
      { name: "description", content: "Submit a partnership application to join USAMedTravel's global network of centers of excellence." },
    ],
  }),
  component: PartnershipApplyPage,
});

const hospitalTypes = ["Academic Medical Center", "Multi-Specialty Hospital", "Specialty Hospital", "Physician Group", "Center of Excellence"];
const turnaroundTimes = ["24 Hours", "48 Hours", "72 Hours", "5-7 Days", "Custom"];
const commercialModels = ["Per Case", "Revenue Sharing", "Annual Agreement", "To Be Discussed"];

const availableServices = [
  "Medical Second Opinions",
  "Telemedicine Consultations",
  "International Patient Referrals",
  "Treatment Packages",
  "Executive Health Programs",
  "Clinical Trials",
  "Organ Transplant Services",
  "Robotic Surgery"
];

const specialtiesList = ["Oncology", "Cardiology", "Neurosurgery", "Orthopedics", "Transplant", "IVF", "Pediatrics", "Rare Diseases", "Others"];

function PartnershipApplyPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    hospital_name: "",
    hospital_website: "",
    country: "",
    city: "",
    hospital_type: "",
    contact_name: "",
    contact_designation: "",
    contact_email: "",
    contact_phone: "",
    contact_linkedin: "",
    has_intl_dept: "",
    intl_email: "",
    intl_phone: "",
    has_paid_second_opinion: "",
    turnaround_time: "",
    preferred_model: "",
    notes: ""
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [complianceA, setComplianceA] = useState(false);
  const [complianceB, setComplianceB] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(x => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complianceA || !complianceB) {
      alert("Please confirm both compliance declarations before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        services_available: selectedServices,
        specialties_offered: selectedSpecialties,
        compliance_confirmed: true
      };

      const { error } = await supabase
        .from("partnership_applications")
        .insert([payload]);

      if (error) throw error;
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Partnership application submission error:", err);
      alert(`Submission failed: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          
          <div className="mb-8">
            <Link to="/partnerships" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-teal transition-colors">
              <ArrowLeft className="size-3.5" /> Back to Partnership details
            </Link>
          </div>

          {success ? (
            <Reveal className="glass-premium rounded-3xl p-10 border border-white/10 text-center space-y-6 shadow-glow">
              <div className="size-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto shadow-elegant">
                <CheckCircle2 className="size-8" />
              </div>
              <h1 className="font-display text-3xl font-bold">Application Received!</h1>
              <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
                Thank you for submitting your Hospital Partnership Application. Our international care relations team will review your institution's profile and contact your primary coordinator within 2–3 business days.
              </p>
              <div className="pt-4">
                <Link to="/partnerships" className="px-6 py-3 rounded-full bg-white text-navy-deep font-bold text-sm hover-lift inline-block">
                  Back to Partnerships
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-10">
              {/* Header Titles */}
              <Reveal className="text-center space-y-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-teal font-mono">Hospital Partnership</span>
                <h1 className="font-display text-3xl md:text-5xl font-bold">Partnership Application Form</h1>
                <p className="text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
                  Establish a secure connection with our platform. Please provide detailed institutional and capability parameters below.
                </p>
              </Reveal>

              <Reveal>
                <form onSubmit={handleSubmit} className="glass-premium rounded-3xl p-8 border border-white/10 shadow-elegant space-y-8" autoComplete="off">
                  
                  {/* Category 1: Organization Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2">
                      <Building className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">Organization Details</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Hospital Name *</label>
                        <input required name="hospital_name" type="text" value={formData.hospital_name} onChange={handleTextChange} placeholder="e.g. Mayo Clinic"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Hospital Website *</label>
                        <input required name="hospital_website" type="url" value={formData.hospital_website} onChange={handleTextChange} placeholder="https://..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Country *</label>
                        <input required name="country" type="text" value={formData.country} onChange={handleTextChange} placeholder="e.g. United States"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">City *</label>
                        <input required name="city" type="text" value={formData.city} onChange={handleTextChange} placeholder="e.g. Rochester, MN"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-2.5 uppercase tracking-wider">Hospital Type *</label>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {hospitalTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 cursor-pointer text-xs transition-all">
                            <input required type="radio" name="hospital_type" checked={formData.hospital_type === type} onChange={() => handleRadioChange("hospital_type", type)} className="accent-teal size-4" />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Primary Contact */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2">
                      <User className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">Primary Contact Coordinator</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Full Name *</label>
                        <input required name="contact_name" type="text" value={formData.contact_name} onChange={handleTextChange} placeholder="Contact person name"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Designation *</label>
                        <input required name="contact_designation" type="text" value={formData.contact_designation} onChange={handleTextChange} placeholder="e.g. Director, International Relations"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Email Address *</label>
                        <input required name="contact_email" type="email" value={formData.contact_email} onChange={handleTextChange} placeholder="colleague@hospital.org"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Phone / WhatsApp *</label>
                        <input required name="contact_phone" type="text" value={formData.contact_phone} onChange={handleTextChange} placeholder="+1-xxx-xxx-xxxx"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">LinkedIn Profile URL</label>
                      <input name="contact_linkedin" type="url" value={formData.contact_linkedin} onChange={handleTextChange} placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                    </div>
                  </div>

                  {/* Category 3: International Patient Department */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2">
                      <Briefcase className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">International Patient Department</h3>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Dedicated Intl. Team? *</label>
                        <div className="flex gap-3">
                          {["Yes", "No"].map((option) => (
                            <label key={option} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 cursor-pointer text-xs transition-all">
                              <input required type="radio" name="has_intl_dept" checked={formData.has_intl_dept === option} onChange={() => handleRadioChange("has_intl_dept", option)} className="accent-teal size-4" />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                      {formData.has_intl_dept === "Yes" && (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Dept. Contact Email</label>
                            <input name="intl_email" type="email" value={formData.intl_email} onChange={handleTextChange} placeholder="intl.office@hospital.org"
                              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Dept. Contact Phone</label>
                            <input name="intl_phone" type="text" value={formData.intl_phone} onChange={handleTextChange} placeholder="Direct line phone"
                              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category 4: Services and Specialties */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2">
                      <HelpCircle className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">Services & Specialties Offered</h3>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-2.5 uppercase tracking-wider">Services Available (Select all that apply)</label>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {availableServices.map((service) => {
                          const checked = selectedServices.includes(service);
                          return (
                            <label key={service} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer text-xs transition-all ${
                              checked ? "bg-teal/10 border-teal/40 text-teal" : "bg-white/[0.04] border-white/[0.06] hover:border-white/15"
                            }`}>
                              <input type="checkbox" checked={checked} onChange={() => handleCheckboxToggle(selectedServices, setSelectedServices, service)} className="accent-teal size-4 rounded shrink-0" />
                              {service}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pt-2">
                      <label className="block text-xs font-medium text-white/55 mb-2.5 uppercase tracking-wider">Specialties Offered (Select all that apply)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {specialtiesList.map((specialty) => {
                          const checked = selectedSpecialties.includes(specialty);
                          return (
                            <label key={specialty} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer text-xs transition-all ${
                              checked ? "bg-teal/10 border-teal/40 text-teal" : "bg-white/[0.04] border-white/[0.06] hover:border-white/15"
                            }`}>
                              <input type="checkbox" checked={checked} onChange={() => handleCheckboxToggle(selectedSpecialties, setSelectedSpecialties, specialty)} className="accent-teal size-4 rounded shrink-0" />
                              {specialty}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Category 5: program parameters */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2">
                      <DollarSign className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-lg">Second Opinion & Commercial Structure</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-2 uppercase tracking-wider">Do you currently offer paid second opinions? *</label>
                        <div className="flex gap-3">
                          {["Yes", "No"].map((option) => (
                            <label key={option} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 cursor-pointer text-xs transition-all">
                              <input required type="radio" name="has_paid_second_opinion" checked={formData.has_paid_second_opinion === option} onChange={() => handleRadioChange("has_paid_second_opinion", option)} className="accent-teal size-4" />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/55 mb-2 uppercase tracking-wider">Typical Turnaround Time? *</label>
                        <select required name="turnaround_time" value={formData.turnaround_time} onChange={handleTextChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all">
                          <option value="" disabled className="text-navy-deep">Select turnaround</option>
                          {turnaroundTimes.map(t => (
                            <option key={t} value={t} className="text-navy-deep">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/55 mb-2.5 uppercase tracking-wider">Preferred Partnership Model *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {commercialModels.map((model) => (
                          <label key={model} className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 cursor-pointer text-[11px] transition-all">
                            <input required type="radio" name="preferred_model" checked={formData.preferred_model === model} onChange={() => handleRadioChange("preferred_model", model)} className="accent-teal size-3.5" />
                            {model}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-medium text-white/55 mb-1.5 uppercase tracking-wider">Additional Information / Message / Notes</label>
                    <textarea name="notes" rows={4} value={formData.notes} onChange={handleTextChange} placeholder="Please tell us about your available packages, international support teams, or other commercial preferences..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal transition-all" />
                  </div>

                  {/* Category 6: Compliance Declarations */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 pb-1">
                      <ShieldCheck className="size-4.5 text-teal" />
                      <h3 className="font-display font-semibold text-base">Compliance Declaration</h3>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 text-xs text-white/70 cursor-pointer select-none">
                        <input type="checkbox" required checked={complianceA} onChange={(e) => setComplianceA(e.target.checked)} className="accent-teal size-4 mt-0.5 rounded shrink-0" />
                        <span>We confirm that all clinical opinions shall be provided solely by licensed healthcare professionals affiliated with our institution. *</span>
                      </label>
                      <label className="flex items-start gap-3 text-xs text-white/70 cursor-pointer select-none">
                        <input type="checkbox" required checked={complianceB} onChange={(e) => setComplianceB(e.target.checked)} className="accent-teal size-4 mt-0.5 rounded shrink-0" />
                        <span>We agree to discuss partnership terms in accordance with applicable healthcare regulations and privacy requirements. *</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button type="submit" disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal to-sky text-white font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none shadow-glow">
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Submitting Application…
                        </>
                      ) : (
                        "Submit Partnership Application"
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
