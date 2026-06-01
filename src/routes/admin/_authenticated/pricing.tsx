import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const Route = createFileRoute("/admin/_authenticated/pricing")({
  component: PricingPage,
});

type Plan = {
  id: string;
  name: string;
  price: string;
  unit: string;
  tagline: string;
  featured: boolean;
  sort_order: number;
};

function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from("pricing_plans")
      .select("*")
      .order("sort_order");

    if (!error && data) setPlans(data as Plan[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const updateField = (id: string, field: keyof Plan, value: string | boolean) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const savePlan = async (plan: Plan) => {
    setSaving(plan.id);
    setError(null);

    const { error } = await supabaseAdmin
      .from("pricing_plans")
      .update({
        price: plan.price,
        unit: plan.unit,
        tagline: plan.tagline,
        featured: plan.featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", plan.id);

    setSaving(null);

    if (error) {
      setError(`Failed to save "${plan.name}": ${error.message}`);
    } else {
      setSaved(plan.id);
      setTimeout(() => setSaved(null), 2500);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Pricing</h1>
          <p className="text-sm text-white/40 mt-1">
            Edit prices shown on the public website
          </p>
        </div>
        <button
          onClick={fetchPlans}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-white/30">
          <Loader2 className="size-6 animate-spin mr-3" />
          Loading pricing plans…
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 transition-all ${
                plan.featured
                  ? "border-teal-400/30 bg-teal-400/[0.04]"
                  : "border-white/[0.08] bg-[#0d1426]"
              }`}
            >
              {/* Plan name + featured badge */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-white text-base">{plan.name}</h3>
                  <div className="text-xs text-white/30 mt-0.5 font-mono">id: {plan.id}</div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-xs text-white/40">Featured</span>
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      plan.featured ? "bg-teal-400" : "bg-white/10"
                    }`}
                    onClick={() => updateField(plan.id, "featured", !plan.featured)}
                  >
                    <div
                      className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${
                        plan.featured ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                {/* Price */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                    Price
                  </label>
                  <input
                    id={`price-${plan.id}`}
                    type="text"
                    value={plan.price}
                    onChange={(e) => updateField(plan.id, "price", e.target.value)}
                    placeholder="e.g. $299"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40 transition-all"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                    Unit
                  </label>
                  <input
                    id={`unit-${plan.id}`}
                    type="text"
                    value={plan.unit}
                    onChange={(e) => updateField(plan.id, "unit", e.target.value)}
                    placeholder="e.g. one-time"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40 transition-all"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                    Tagline
                  </label>
                  <input
                    id={`tagline-${plan.id}`}
                    type="text"
                    value={plan.tagline}
                    onChange={(e) => updateField(plan.id, "tagline", e.target.value)}
                    placeholder="Short description"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-teal-400/40 transition-all"
                  />
                </div>
              </div>

              {/* Save button */}
              <button
                id={`save-${plan.id}`}
                onClick={() => savePlan(plan)}
                disabled={saving === plan.id}
                className={`mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  saved === plan.id
                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-gradient-to-r from-teal-400 to-cyan-500 text-[#0a0f1e] hover:opacity-90 active:scale-[0.98] shadow-lg shadow-teal-500/10"
                } disabled:opacity-60 disabled:pointer-events-none`}
              >
                {saving === plan.id ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving…
                  </>
                ) : saved === plan.id ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-white/20 mt-6">
        Changes are saved immediately to the database and reflect on the public website within seconds.
      </p>
    </div>
  );
}
