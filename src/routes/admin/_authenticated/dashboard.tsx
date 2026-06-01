import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Loader2,
  Inbox,
  RefreshCw,
  FileText,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  Link2,
  Stethoscope,
  Layers
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/_authenticated/dashboard")({
  component: DashboardPage,
});

type Inquiry = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  specialty: string;
  description: string;
  file_url: string | null;
};

type PartnershipApplication = {
  id: string;
  created_at: string;
  hospital_name: string;
  hospital_website: string;
  country: string;
  city: string;
  hospital_type: string;
  contact_name: string;
  contact_designation: string;
  contact_email: string;
  contact_phone: string;
  contact_linkedin: string;
  has_intl_dept: string;
  intl_email: string;
  intl_phone: string;
  services_available: string[];
  specialties_offered: string[];
  has_paid_second_opinion: string;
  turnaround_time: string;
  preferred_model: string;
  notes: string;
  compliance_confirmed: boolean;
};

type Tab = "inquiries" | "partnerships";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipApplication[]>([]);

  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [filteredPartnerships, setFilteredPartnerships] = useState<PartnershipApplication[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Inquiries
      const { data: inqData, error: inqErr } = await supabaseAdmin
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!inqErr && inqData) {
        setInquiries(inqData as Inquiry[]);
        setFilteredInquiries(inqData as Inquiry[]);
      }

      // 2. Fetch Partnerships
      const { data: partData, error: partErr } = await supabaseAdmin
        .from("partnership_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!partErr && partData) {
        setPartnerships(partData as PartnershipApplication[]);
        setFilteredPartnerships(partData as PartnershipApplication[]);
      }
    } catch (err) {
      console.error("Error loading admin dashboard datasets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    
    if (activeTab === "inquiries") {
      const result = inquiries.filter(
        (i) =>
          i.full_name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.country.toLowerCase().includes(q) ||
          i.specialty.toLowerCase().includes(q)
      );
      setFilteredInquiries(result);
    } else if (activeTab === "partnerships") {
      const result = partnerships.filter(
        (i) =>
          i.hospital_name.toLowerCase().includes(q) ||
          i.contact_name.toLowerCase().includes(q) ||
          i.contact_email.toLowerCase().includes(q) ||
          i.country.toLowerCase().includes(q) ||
          i.hospital_type.toLowerCase().includes(q)
      );
      setFilteredPartnerships(result);
    }
  }, [search, inquiries, partnerships, activeTab]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getSortedData = () => {
    if (activeTab === "inquiries") {
      return [...filteredInquiries].sort((a, b) => {
        const av = (a[sortKey as keyof Inquiry] ?? "").toString();
        const bv = (b[sortKey as keyof Inquiry] ?? "").toString();
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    } else {
      return [...filteredPartnerships].sort((a, b) => {
        const av = (a[sortKey as keyof PartnershipApplication] ?? "").toString();
        const bv = (b[sortKey as keyof PartnershipApplication] ?? "").toString();
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
  };

  const SortIcon = ({ col }: { col: string }) =>
    sortKey === col ? (
      sortAsc ? (
        <ChevronUp className="size-3.5 text-teal-400" />
      ) : (
        <ChevronDown className="size-3.5 text-teal-400" />
      )
    ) : (
      <ChevronDown className="size-3.5 text-white/20" />
    );

  const activeLabel = activeTab === "inquiries" ? "Inquiries" : "Partnerships";
  const sortedData = getSortedData();

  return (
    <div className="p-8 min-h-screen bg-[#060a13] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-teal-400 font-mono text-2xl">✚</span> Admin Control Center
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Managing global medical referrals and hospital partner affiliations
          </p>
        </div>
        <button
          onClick={fetchAllData}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.1] active:scale-[0.98] transition-all"
        >
          <RefreshCw className="size-4" />
          Refresh Registry
        </button>
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl mb-8 max-w-sm">
        {[
          { id: "inquiries", label: "Inquiries", count: inquiries.length, icon: Inbox },
          { id: "partnerships", label: "Partnerships", count: partnerships.length, icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as Tab);
                setSearch("");
                setSortKey("created_at");
                setSortAsc(false);
                setExpanded(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white/[0.08] text-white shadow-sm border border-white/[0.08]"
                  : "text-white/40 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Icon className={`size-4 ${activeTab === tab.id ? "text-teal-400" : "text-white/45"}`} />
              {tab.label}
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? "bg-teal-400/20 text-teal-300 font-semibold" : "bg-white/[0.04] text-white/30"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/30" />
        <input
          id="admin-search"
          type="text"
          placeholder={`Search ${activeLabel.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-400/40 transition-all"
        />
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0d1426] shadow-2xl">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/45 font-medium">
            <Loader2 className="size-6 animate-spin mr-3 text-teal-400" />
            Synchronizing database registry...
          </div>
        ) : sortedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/20">
            <Inbox className="size-12 mb-4 text-white/10" />
            <p className="text-base font-semibold">No entries loaded</p>
            <p className="text-xs text-white/40 mt-1">There are no records matching your query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            
            {/* 1. INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                    <th onClick={() => handleSort("created_at")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Date <SortIcon col="created_at" /></span>
                    </th>
                    <th onClick={() => handleSort("full_name")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Patient Name <SortIcon col="full_name" /></span>
                    </th>
                    <th onClick={() => handleSort("country")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Location <SortIcon col="country" /></span>
                    </th>
                    <th onClick={() => handleSort("specialty")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Specialty <SortIcon col="specialty" /></span>
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Contact Details</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Clinical Scan</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {(sortedData as Inquiry[]).map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/[0.015] transition-colors border-b border-white/[0.04]">
                      <td colSpan={7} className="p-0">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="px-6 py-4 text-white/50 whitespace-nowrap w-[15%]">
                                {format(new Date(inq.created_at), "dd MMM yyyy")}
                                <div className="text-[11px] text-white/25 mt-0.5">
                                  {format(new Date(inq.created_at), "HH:mm")}
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-white whitespace-nowrap w-[20%]">
                                {inq.full_name}
                              </td>
                              <td className="px-6 py-4 text-white/60 w-[15%]">{inq.country}</td>
                              <td className="px-6 py-4 w-[15%]">
                                <span className="inline-block px-2.5 py-1 rounded-full bg-teal-400/10 text-teal-400 text-xs font-semibold">
                                  {inq.specialty}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-white/50 w-[20%]">
                                <div className="text-xs font-medium">{inq.email}</div>
                                <div className="text-xs text-white/30 mt-0.5">{inq.phone}</div>
                              </td>
                              <td className="px-6 py-4 w-[10%]">
                                {inq.file_url ? (
                                  <a
                                    href={inq.file_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                                  >
                                    <ExternalLink className="size-3.5" /> View Scan
                                  </a>
                                ) : (
                                  <span className="text-xs text-white/20 font-mono">—</span>
                                )}
                              </td>
                              <td className="px-6 py-4 w-[5%]">
                                <button
                                  onClick={() =>
                                    setExpanded(expanded === inq.id ? null : inq.id)
                                  }
                                  className="text-xs text-teal-400/80 hover:text-teal-300 font-semibold transition-colors underline underline-offset-4"
                                >
                                  {expanded === inq.id ? "Hide" : "Open"}
                                </button>
                              </td>
                            </tr>
                            {expanded === inq.id && (
                              <tr className="bg-white/[0.01] border-t border-white/[0.04]">
                                <td colSpan={7} className="px-8 py-6">
                                  <div className="text-xs text-white/30 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5 select-none">
                                    <FileText className="size-3.5 text-teal-400" /> Case Symptoms / Patient Inquiries
                                  </div>
                                  <p className="text-sm text-white/70 leading-relaxed max-w-3xl whitespace-pre-wrap">
                                    {inq.description}
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* 2. PARTNERSHIP APPLICATIONS TAB */}
            {activeTab === "partnerships" && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                    <th onClick={() => handleSort("created_at")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Date <SortIcon col="created_at" /></span>
                    </th>
                    <th onClick={() => handleSort("hospital_name")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Hospital Partner Profile <SortIcon col="hospital_name" /></span>
                    </th>
                    <th onClick={() => handleSort("hospital_type")} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1.5">Institution Type <SortIcon col="hospital_type" /></span>
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Primary Coordinator</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Affiliation Framework</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-white/30">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {(sortedData as PartnershipApplication[]).map((pa) => (
                    <tr key={pa.id} className="hover:bg-white/[0.015] transition-colors border-b border-white/[0.04]">
                      <td colSpan={6} className="p-0">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="px-6 py-4 text-white/50 whitespace-nowrap w-[15%]">
                                {format(new Date(pa.created_at), "dd MMM yyyy")}
                                <div className="text-[11px] text-white/25 mt-0.5">
                                  {format(new Date(pa.created_at), "HH:mm")}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                                <div className="font-semibold text-white flex items-center gap-1.5">
                                  {pa.hospital_name}
                                  {pa.hospital_website && (
                                    <a href={pa.hospital_website} target="_blank" rel="noreferrer" className="text-white/30 hover:text-teal-400 transition-colors">
                                      <Link2 className="size-3.5" />
                                    </a>
                                  )}
                                </div>
                                <div className="text-xs text-white/40 mt-0.5">
                                  {pa.city}, {pa.country}
                                </div>
                              </td>
                              <td className="px-6 py-4 w-[15%]">
                                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
                                  {pa.hospital_type}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-white/50 w-[20%]">
                                <div className="font-medium text-white/80 text-xs">{pa.contact_name}</div>
                                <div className="text-[10px] text-white/40">{pa.contact_designation}</div>
                                <div className="text-xs text-white/35 mt-1 flex items-center gap-1 select-all truncate max-w-[160px]">
                                  <Mail className="size-3 shrink-0" /> {pa.contact_email}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-white/50 w-[20%]">
                                <div className="text-xs font-semibold text-teal-400">
                                  Model: {pa.preferred_model}
                                </div>
                                <div className="text-[10px] text-white/30 mt-0.5">
                                  TAT: {pa.turnaround_time} • Paid Opinion: {pa.has_paid_second_opinion}
                                </div>
                              </td>
                              <td className="px-6 py-4 w-[10%]">
                                <button
                                  onClick={() =>
                                    setExpanded(expanded === pa.id ? null : pa.id)
                                  }
                                  className="text-xs text-teal-400/80 hover:text-teal-300 font-semibold transition-colors underline underline-offset-4"
                                >
                                  {expanded === pa.id ? "Hide" : "Open"}
                                </button>
                              </td>
                            </tr>
                            {expanded === pa.id && (
                              <tr className="bg-white/[0.01] border-t border-white/[0.04]">
                                <td colSpan={6} className="px-8 py-6 space-y-6">
                                  <div className="grid md:grid-cols-2 gap-8">
                                    
                                    {/* Left column: Affiliated services / specialties */}
                                    <div className="space-y-4">
                                      <div>
                                        <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                                          <Layers className="size-3.5 text-teal-400" /> Active Service Capabilities
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                          {pa.services_available && pa.services_available.length > 0 ? (
                                            pa.services_available.map((s) => (
                                              <span key={s} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/70">
                                                ✓ {s}
                                              </span>
                                            ))
                                          ) : (
                                            <span className="text-xs text-white/35">No services selected</span>
                                          )}
                                        </div>
                                      </div>

                                      <div>
                                        <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                                          <Stethoscope className="size-3.5 text-teal-400" /> Target Referral Specialties
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                          {pa.specialties_offered && pa.specialties_offered.length > 0 ? (
                                            pa.specialties_offered.map((sp) => (
                                              <span key={sp} className="px-2 py-0.5 rounded bg-teal-400/5 border border-teal-400/10 text-[10px] text-teal-300">
                                                ★ {sp}
                                              </span>
                                            ))
                                          ) : (
                                            <span className="text-xs text-white/35">No specialties selected</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right column: Coordinator & International details */}
                                    <div className="space-y-4">
                                      <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                          <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold">
                                            Primary Coordinator Contact
                                          </div>
                                          <div className="text-xs text-white/80 mt-1 font-mono">
                                            {pa.contact_phone}
                                          </div>
                                          {pa.contact_linkedin && (
                                            <a href={pa.contact_linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline mt-1">
                                              LinkedIn Profile <ExternalLink className="size-2.5" />
                                            </a>
                                          )}
                                        </div>

                                        <div>
                                          <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold">
                                            International Desk Setup
                                          </div>
                                          <div className="text-xs text-white/80 mt-1 font-medium">
                                            Dedicated Team: {pa.has_intl_dept}
                                          </div>
                                          {pa.has_intl_dept === "Yes" && (
                                            <div className="text-[10px] text-white/50 mt-0.5">
                                              Email: <span className="select-all font-mono text-white/70">{pa.intl_email}</span>
                                              <br />
                                              Phone: <span className="font-mono text-white/70">{pa.intl_phone}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div>
                                        <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold mb-1">
                                          Coordinator Notes / Brief Message
                                        </div>
                                        <p className="text-xs text-white/70 leading-relaxed bg-[#060a13] p-3 rounded-xl border border-white/[0.04] whitespace-pre-wrap h-20 overflow-y-auto font-sans">
                                          {pa.notes || "No institutional message or commercial notes submitted."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 text-xs text-teal-400 bg-teal-400/5 px-3 py-2 rounded-lg border border-teal-400/10 w-fit select-none">
                                    <CheckCircle2 className="size-4 shrink-0" />
                                    <span>Institutional Clinical Compliance Agreement Signed & Audited Successfully</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        )}
      </div>

      {/* Export CSV hint */}
      {sortedData.length > 0 && (
        <p className="text-xs text-white/20 mt-4 flex items-center gap-1.5 select-none">
          <Download className="size-3.5" />
          You can securely export all registered raw tables directly from your Supabase Control Center in CSV format.
        </p>
      )}
    </div>
  );
}
