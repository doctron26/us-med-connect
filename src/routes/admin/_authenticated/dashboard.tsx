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

type SortKey = keyof Pick<Inquiry, "created_at" | "full_name" | "country" | "specialty">;

function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filtered, setFiltered] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInquiries(data as Inquiry[]);
      setFiltered(data as Inquiry[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    const result = inquiries.filter(
      (i) =>
        i.full_name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.country.toLowerCase().includes(q) ||
        i.specialty.toLowerCase().includes(q)
    );
    setFiltered(result);
  }, [search, inquiries]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortAsc ? (
        <ChevronUp className="size-3.5 text-teal-400" />
      ) : (
        <ChevronDown className="size-3.5 text-teal-400" />
      )
    ) : (
      <ChevronDown className="size-3.5 text-white/20" />
    );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-sm text-white/40 mt-1">
            {inquiries.length} total submissions
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/30" />
        <input
          id="inquiry-search"
          type="text"
          placeholder="Search by name, email, country…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-400/40 transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0d1426]">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/30">
            <Loader2 className="size-6 animate-spin mr-3" />
            Loading inquiries…
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/20">
            <Inbox className="size-10 mb-3" />
            <p className="text-sm">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {(
                    [
                      { key: "created_at", label: "Date" },
                      { key: "full_name", label: "Name" },
                      { key: "country", label: "Country" },
                      { key: "specialty", label: "Specialty" },
                    ] as { key: SortKey; label: string }[]
                  ).map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30 hover:text-white/60 cursor-pointer transition-colors select-none"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {label} <SortIcon col={key} />
                      </span>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    Contact
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    Report
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {sorted.map((inq) => (
                  <>
                    <tr
                      key={inq.id}
                      className="hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="px-5 py-4 text-white/50 whitespace-nowrap">
                        {format(new Date(inq.created_at), "dd MMM yyyy")}
                        <div className="text-[11px] text-white/25">
                          {format(new Date(inq.created_at), "HH:mm")}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium text-white whitespace-nowrap">
                        {inq.full_name}
                      </td>
                      <td className="px-5 py-4 text-white/60">{inq.country}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-teal-400/10 text-teal-400 text-xs font-medium">
                          {inq.specialty}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/50">
                        <div className="text-xs">{inq.email}</div>
                        <div className="text-xs text-white/30">{inq.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        {inq.file_url ? (
                          <a
                            href={inq.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                          >
                            <ExternalLink className="size-3.5" />
                            View
                          </a>
                        ) : (
                          <span className="text-xs text-white/20">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            setExpanded(expanded === inq.id ? null : inq.id)
                          }
                          className="text-xs text-white/40 hover:text-white transition-colors underline underline-offset-2"
                        >
                          {expanded === inq.id ? "Hide" : "Show"}
                        </button>
                      </td>
                    </tr>
                    {/* Expanded description */}
                    {expanded === inq.id && (
                      <tr key={`${inq.id}-expand`} className="bg-white/[0.02]">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-semibold">
                            Case Description
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed max-w-3xl whitespace-pre-wrap">
                            {inq.description}
                          </p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export hint */}
      {sorted.length > 0 && (
        <p className="text-xs text-white/20 mt-4 flex items-center gap-1.5">
          <Download className="size-3.5" />
          You can export data directly from your Supabase dashboard as CSV.
        </p>
      )}
    </div>
  );
}
