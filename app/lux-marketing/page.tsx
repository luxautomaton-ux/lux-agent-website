"use client";

/* eslint-disable @next/next/no-img-element */
import { forwardRef, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ClipboardCopy,
  Download,
  ImageIcon,
  LayoutTemplate,
  Mail,
  Megaphone,
  Plus,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import { toPng } from "html-to-image";

const asset = (path: string) => (process.env.NODE_ENV === "production" ? "/Lux-Automaton-Website" : "") + path;

type Category = "photo" | "social" | "promotion" | "newsletter" | "workshop" | "thumbnail";
type Ratio = "16:9" | "1:1" | "4:5" | "9:16";
type Layout = "campaign" | "quote" | "newsletter" | "workshop" | "photo" | "background";
type Backdrop = "eclipse" | "circuit" | "prism" | "void";

type Template = {
  id: string;
  name: string;
  category: Category;
  format: string;
  headline: string;
  description: string;
  cta: string;
  tag: string;
  image?: string;
  layout: Layout;
  ratio: Ratio;
  accent: string;
  backdrop: Backdrop;
};

const BRAND = {
  logo: asset("/lux-marketing/lux-logo-wide.png"),
  icon: asset("/lux-marketing/lux-logo-icon.png"),
};

const templates: Template[] = [
  {
    id: "private-ai",
    name: "Private AI Campaign",
    category: "promotion",
    format: "Website / 16:9",
    headline: "Private AI systems for builders",
    description: "We build the AI operating systems that run your business, automate your workflow, and help you scale.",
    cta: "Start Here",
    tag: "Lux Automaton",
    image: asset("/lux-marketing/asa-close.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "founder-quote",
    name: "Founder Insight",
    category: "social",
    format: "Instagram / 4:5",
    headline: "Automate the repeatable. Focus on the irreplaceable.",
    description: "A founder principle for building a business that scales without losing the human edge.",
    cta: "Read the Insight",
    tag: "Asa Pritchard",
    image: asset("/lux-marketing/asa-black.png"),
    layout: "quote",
    ratio: "4:5",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "lana-tip",
    name: "LANA Business Tip",
    category: "social",
    format: "Instagram / 4:5",
    headline: "Your AI agent can run the business while you build the future.",
    description: "LANA turns daily operations into clear, repeatable systems.",
    cta: "Meet LANA",
    tag: "LANA Tip",
    image: asset("/lux-marketing/lana-seated.png"),
    layout: "quote",
    ratio: "4:5",
    accent: "#00ffa3",
    backdrop: "circuit",
  },
  {
    id: "launch",
    name: "Product Launch",
    category: "promotion",
    format: "Campaign / 1:1",
    headline: "Build. Automate. Grow.",
    description: "One private AI operating system for the work that matters most.",
    cta: "Explore Lux",
    tag: "New Release",
    image: asset("/lux-marketing/asa-white.png"),
    layout: "campaign",
    ratio: "1:1",
    accent: "#7c4dff",
    backdrop: "prism",
  },
  {
    id: "weekly",
    name: "LANA Weekly Intelligence",
    category: "newsletter",
    format: "Email / 16:9",
    headline: "This week in AI that impacts your business.",
    description: "Useful model updates, business insights, and automation ideas researched and explained by LANA.",
    cta: "Read Full Breakdown",
    tag: "Issue 042",
    image: asset("/lux-marketing/lana-bw.png"),
    layout: "newsletter",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "ai-foundations",
    name: "AI Foundations Workshop",
    category: "workshop",
    format: "Workshop / 1:1",
    headline: "AI Foundations Masterclass",
    description: "Learn the core concepts of AI and how to use them in your business.",
    cta: "View Workshop",
    tag: "Beginner · 7 Modules",
    image: asset("/lux-marketing/asa-office.png"),
    layout: "workshop",
    ratio: "1:1",
    accent: "#00ffa3",
    backdrop: "void",
  },
  {
    id: "builder-workshop",
    name: "AI Business Workshop",
    category: "workshop",
    format: "Workshop / 4:5",
    headline: "Build Your First AI Business",
    description: "A step-by-step system to launch and automate an AI-powered business.",
    cta: "Reserve Your Seat",
    tag: "Popular · 11 Modules",
    image: asset("/lux-marketing/asa-full.png"),
    layout: "workshop",
    ratio: "4:5",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "build-apps-thumb",
    name: "Build AI Apps Thumbnail",
    category: "thumbnail",
    format: "YouTube / 16:9",
    headline: "Build AI apps without coding",
    description: "The Lux Way",
    cta: "Watch Now",
    tag: "Founder Build",
    image: asset("/lux-marketing/asa-tie.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "ai-news-thumb",
    name: "AI News Thumbnail",
    category: "thumbnail",
    format: "YouTube / 16:9",
    headline: "AI news you need to know",
    description: "LANA Reports",
    cta: "Watch Now",
    tag: "AI News",
    image: asset("/lux-marketing/lana-standing.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "prism",
  },
  {
    id: "office-photo",
    name: "LANA Office Portrait",
    category: "photo",
    format: "Portrait / 4:5",
    headline: "Meet LANA",
    description: "Your private AI partner for work, growth, and clear decisions.",
    cta: "Meet Your AI Partner",
    tag: "Brand Photography",
    image: asset("/lux-marketing/lana-office.png"),
    layout: "photo",
    ratio: "4:5",
    accent: "#00d4ff",
    backdrop: "void",
  },
  {
    id: "asa-photo",
    name: "Founder Office Portrait",
    category: "photo",
    format: "Portrait / 4:5",
    headline: "Systems create freedom.",
    description: "Founder photography for campaigns, articles, and speaking engagements.",
    cta: "About Asa",
    tag: "Founder Photography",
    image: asset("/lux-marketing/asa-office.png"),
    layout: "photo",
    ratio: "4:5",
    accent: "#00ffa3",
    backdrop: "void",
  },
  {
    id: "circuit-bg",
    name: "Neon Circuit Background",
    category: "photo",
    format: "Background / 16:9",
    headline: "Automate. Innovate. Accelerate.",
    description: "Signature Lux circuit field for slides, video calls, campaigns, and event screens.",
    cta: "Lux Automaton",
    tag: "Background",
    layout: "background",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "eclipse-bg",
    name: "Violet Eclipse Background",
    category: "photo",
    format: "Background / 16:9",
    headline: "The future is private.",
    description: "A dramatic stage and keynote background in the Lux visual system.",
    cta: "Lux Automaton",
    tag: "Background",
    layout: "background",
    ratio: "16:9",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
];

const categories: Array<{ id: Category; label: string; icon: React.ReactNode }> = [
  { id: "photo", label: "Backgrounds & Photos", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "social", label: "Social Media", icon: <Share2 className="h-4 w-4" /> },
  { id: "promotion", label: "Promotions", icon: <Megaphone className="h-4 w-4" /> },
  { id: "newsletter", label: "Newsletters", icon: <Mail className="h-4 w-4" /> },
  { id: "workshop", label: "Workshops", icon: <BookOpen className="h-4 w-4" /> },
  { id: "thumbnail", label: "Thumbnails", icon: <LayoutTemplate className="h-4 w-4" /> },
];

const backdrops: Record<Backdrop, string> = {
  eclipse: "radial-gradient(circle at 72% 48%, rgba(124,77,255,.5), transparent 24%), radial-gradient(circle at 80% 52%, transparent 0 22%, rgba(0,212,255,.5) 22.5% 23%, transparent 24%), #05070d",
  circuit: "radial-gradient(circle at 82% 48%, rgba(0,212,255,.26), transparent 28%), radial-gradient(circle at 72% 62%, rgba(124,77,255,.22), transparent 36%), #05070d",
  prism: "radial-gradient(circle at 85% 20%, rgba(0,255,163,.24), transparent 28%), radial-gradient(circle at 20% 80%, rgba(124,77,255,.32), transparent 34%), #05070d",
  void: "linear-gradient(145deg, #0b1020 0%, #05070d 58%, #020307 100%)",
};

const ratioStyle: Record<Ratio, string> = {
  "16:9": "16 / 9",
  "1:1": "1 / 1",
  "4:5": "4 / 5",
  "9:16": "9 / 16",
};

function gptPrompt(template: Template) {
  const host =
    template.id.includes("lana") || template.name.toLowerCase().includes("lana")
      ? "LANA as the polished AI business host, wearing a lavender button-down and holding a tablet"
      : template.id.includes("workshop")
        ? "Asa and LANA together as premium workshop hosts, Asa in a black suit and LANA in a lavender button-down"
        : "Asa Pritchard as the founder host, wearing a black suit, glasses, confident executive presence";

  return `Create a 16:9 cinematic Lux Automaton marketing thumbnail in the exact uniform brand style of the supplied references.

Brand lockup: Lux Automaton logo in the top-left, text "LUX AUTOMATON", tagline "AUTOMATE | INNOVATE | ACCELERATE".
Main headline, huge bold uppercase on the left: "${template.headline}".
Small label/subtitle under the headline: "${template.tag}".
Scene: dark futuristic glass office at night with city lights, neon cyan and violet ceiling lights, transparent holographic AI workflow screens, circuit-line overlays, glowing cyan/violet arcs, premium SaaS/founder energy.
Hero figure: ${host}.
Visual rules: ultra sharp commercial render, high contrast, black background, white headline with cyan/violet gradient emphasis on the most important words, clean spacing, no clutter, no random extra words, no misspelled logo text, no warped faces or hands.
Optional bottom strip: four simple icon callouts matching the topic: ${template.cta}, automate smarter, launch faster, scale with confidence.
Use the Lux colors only: cyan #00D4FF, violet #7C4DFF, emerald #00FFA3, white, near-black.`;
}

export default function LuxMarketingPage() {
  const [items, setItems] = useState(templates);
  const [activeId, setActiveId] = useState(templates[0].id);
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<"edit" | "style" | "prompt">("edit");
  const [exporting, setExporting] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const active = items.find((item) => item.id === activeId) ?? items[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) =>
      (category === "all" || item.category === category) &&
      (!needle || `${item.name} ${item.headline} ${item.tag}`.toLowerCase().includes(needle)),
    );
  }, [category, items, query]);

  function update(patch: Partial<Template>) {
    setItems((current) => current.map((item) => item.id === active.id ? { ...item, ...patch } : item));
  }

  function duplicate() {
    const copy = { ...active, id: crypto.randomUUID(), name: `${active.name} Copy` };
    setItems((current) => [copy, ...current]);
    setActiveId(copy.id);
    setCategory("all");
  }

  function selectCategory(next: Category | "all") {
    setCategory(next);
    const first = next === "all" ? items[0] : items.find((item) => item.category === next);
    if (first) setActiveId(first.id);
  }

  async function exportPng() {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const url = await toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: "#05070d" });
      const link = document.createElement("a");
      link.download = `${active.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      link.href = url;
      link.click();
    } finally {
      setExporting(false);
    }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(gptPrompt(active));
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 1400);
  }

  function makeAllUniform() {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        accent: item.id.includes("lana") ? "#00d4ff" : item.id.includes("workshop") ? "#7c4dff" : item.accent,
        backdrop: "circuit",
        layout: item.layout === "background" ? "background" : "campaign",
        ratio: "16:9",
      })),
    );
  }

  return (
    <main className="fixed inset-0 z-[200] overflow-auto bg-[#05070d] text-white">
      <div className="min-h-screen xl:grid xl:grid-cols-[240px_minmax(0,1fr)_310px]">
        <aside className="border-b border-white/10 bg-[#070a11] xl:sticky xl:top-0 xl:h-screen xl:border-b-0 xl:border-r">
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <BrandIcon className="h-12 w-12" />
              <div>
                <p className="font-black tracking-[.08em]">LUX MARKETING</p>
                <p className="mt-1 text-xs font-medium"><span className="text-violet-400">Create.</span> <span className="text-cyan-300">Brand.</span> <span className="text-emerald-300">Publish.</span></p>
              </div>
            </div>
            <div className="relative mt-5">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates..." className="w-full rounded-lg border border-white/10 bg-white/[.035] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-violet-400" />
            </div>
          </div>

          <nav aria-label="Template categories" className="flex gap-1 overflow-x-auto p-3 xl:block xl:overflow-visible">
            <CategoryButton active={category === "all"} label="All Templates" count={items.length} icon={<LayoutTemplate className="h-4 w-4" />} onClick={() => selectCategory("all")} />
            {categories.map((item) => (
              <CategoryButton key={item.id} active={category === item.id} label={item.label} count={items.filter((template) => template.category === item.id).length} icon={item.icon} onClick={() => selectCategory(item.id)} />
            ))}
          </nav>

          <div className="m-4 hidden rounded-xl border border-white/10 bg-white/[.035] p-3 xl:absolute xl:bottom-0 xl:block xl:w-[208px]">
            <div className="flex items-center gap-3">
              <BrandIcon className="h-9 w-9" />
              <div className="min-w-0"><p className="truncate text-sm font-bold">Lux Automaton</p><p className="truncate text-[11px] text-slate-500">Brand system active</p></div>
              <Check className="ml-auto h-4 w-4 text-emerald-300" />
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#05070d]/95 px-5 py-4 backdrop-blur">
            <div><p className="text-xs uppercase tracking-[.16em] text-slate-500">Campaign</p><h1 className="mt-1 text-lg font-bold">{active.name}</h1></div>
            <div className="flex items-center gap-3 text-xs text-slate-400"><span>{active.format}</span><button onClick={duplicate} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-semibold text-white hover:border-cyan-300/50"><Plus className="h-4 w-4" /> Duplicate</button></div>
          </header>

          <div className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[205px_minmax(0,1fr)]">
            <aside className="border-b border-white/10 bg-[#080b13] p-3 lg:border-b-0 lg:border-r">
              <div className="mb-3 flex items-center justify-between px-1"><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">{category === "all" ? "All Templates" : categories.find((item) => item.id === category)?.label}</p><span className="text-xs text-slate-600">{filtered.length}</span></div>
              <div className="flex gap-3 overflow-x-auto pb-1 lg:block lg:max-h-[calc(100vh-132px)] lg:space-y-3 lg:overflow-y-auto lg:pr-1">
                {filtered.map((item) => <TemplateCard key={item.id} item={item} active={item.id === active.id} onClick={() => setActiveId(item.id)} />)}
                {!filtered.length && <p className="p-4 text-sm text-slate-500">No matching templates.</p>}
              </div>
            </aside>

            <div className="relative flex min-h-[640px] items-start justify-center overflow-hidden p-5 lg:p-8">
              <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.05) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
              <div className={`relative flex w-full items-center justify-center ${active.ratio === "9:16" ? "max-w-[360px]" : active.ratio === "4:5" ? "max-w-[560px]" : active.ratio === "1:1" ? "max-w-[650px]" : "max-w-[880px]"}`}>
                <CreativeCanvas ref={canvasRef} template={active} />
              </div>
            </div>
          </div>
        </section>

        <aside className="border-t border-white/10 bg-[#070a11] p-5 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto xl:border-l xl:border-t-0">
          <div className="grid grid-cols-3 border-b border-white/10">
            {(["edit", "style", "prompt"] as const).map((tab) => <button key={tab} onClick={() => setPanel(tab)} className={`border-b-2 py-3 text-sm font-bold capitalize ${panel === tab ? "border-violet-500 text-white" : "border-transparent text-slate-500"}`}>{tab}</button>)}
          </div>

          {panel === "edit" ? (
            <div className="mt-5 space-y-4">
              <Field label="Headline" value={active.headline} multiline onChange={(headline) => update({ headline })} />
              <Field label="Description" value={active.description} multiline onChange={(description) => update({ description })} />
              <Field label="Call to action" value={active.cta} onChange={(cta) => update({ cta })} />
              <Field label="Label" value={active.tag} onChange={(tag) => update({ tag })} />
            </div>
          ) : panel === "style" ? (
            <div className="mt-5 space-y-6">
              <ControlGroup label="Color style">
                <div className="flex gap-3">{["#7c4dff", "#00d4ff", "#00ffa3", "#f8fafc"].map((color) => <button key={color} aria-label={`Use ${color}`} onClick={() => update({ accent: color })} className={`h-10 w-10 rounded-full border-2 p-1 ${active.accent === color ? "border-white" : "border-transparent"}`}><span className="block h-full w-full rounded-full" style={{ background: color }} /></button>)}</div>
              </ControlGroup>
              <ControlGroup label="Background">
                <div className="grid grid-cols-2 gap-2">{(["eclipse", "circuit", "prism", "void"] as Backdrop[]).map((name) => <button key={name} onClick={() => update({ backdrop: name })} className={`rounded-lg border p-2 text-left text-xs capitalize ${active.backdrop === name ? "border-violet-400" : "border-white/10"}`}><span className="mb-2 block h-12 rounded-md" style={{ background: backdrops[name] }} />{name}</button>)}</div>
              </ControlGroup>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <textarea readOnly value={gptPrompt(active)} className="h-80 w-full resize-none rounded-lg border border-white/10 bg-white/[.035] px-3 py-2.5 text-xs leading-5 text-slate-200 outline-none focus:border-violet-400" />
              <button onClick={copyPrompt} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/40 px-4 py-3 text-sm font-black text-white hover:bg-cyan-300/10"><ClipboardCopy className="h-4 w-4" /> {copiedPrompt ? "Copied" : "Copy GPT Prompt"}</button>
              <button onClick={makeAllUniform} className="w-full rounded-lg border border-violet-400/40 px-4 py-3 text-sm font-black text-violet-100 hover:bg-violet-500/10">Make All Options Uniform</button>
            </div>
          )}

          <ControlGroup label="Aspect ratio" className="mt-6">
            <div className="grid grid-cols-4 gap-2">{(["16:9", "1:1", "4:5", "9:16"] as Ratio[]).map((ratio) => <button key={ratio} onClick={() => update({ ratio })} className={`rounded-lg border px-2 py-3 text-xs font-bold ${active.ratio === ratio ? "border-violet-400 bg-violet-500/10" : "border-white/10 text-slate-400"}`}>{ratio}</button>)}</div>
          </ControlGroup>

          <button onClick={exportPng} disabled={exporting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-black shadow-[0_0_28px_rgba(0,212,255,.18)] disabled:opacity-50"><Download className="h-4 w-4" /> {exporting ? "Exporting..." : "Export PNG"}</button>
          <p className="mt-3 text-center text-[11px] text-slate-600">Exports the current design at 2× resolution</p>
        </aside>
      </div>
    </main>
  );
}

function CategoryButton({ active, label, count, icon, onClick }: { active: boolean; label: string; count: number; icon: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`mb-1 flex shrink-0 items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-left text-sm transition xl:w-full ${active ? "border-violet-500 bg-white/[.06] text-white" : "border-transparent text-slate-400 hover:bg-white/[.035] hover:text-white"}`}>{icon}<span className="whitespace-nowrap">{label}</span><span className="ml-auto hidden text-[10px] text-slate-600 xl:inline">{count}</span></button>;
}

function TemplateCard({ item, active, onClick }: { item: Template; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`relative h-32 w-44 shrink-0 overflow-hidden rounded-lg border text-left transition lg:h-auto lg:w-full lg:aspect-[4/3] ${active ? "border-violet-400 shadow-[0_0_20px_rgba(124,77,255,.2)]" : "border-white/10 hover:border-white/30"}`} style={{ background: backdrops[item.backdrop] }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
    {item.image && <img src={item.image} alt="" className="absolute bottom-0 right-0 h-[88%] w-[64%] object-cover object-top opacity-80 grayscale brightness-75 contrast-125" />}
    <div className="absolute inset-x-0 bottom-0 p-3"><p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: item.accent }}>{item.tag}</p><p className="mt-1 line-clamp-2 text-xs font-black leading-tight">{item.headline}</p></div>
    {active && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-violet-500"><Check className="h-3 w-3" /></span>}
  </button>;
}

const CreativeCanvas = forwardRef<HTMLDivElement, { template: Template }>(function CreativeCanvas({ template }, ref) {
  return (
  <div ref={ref} className="relative w-full overflow-hidden bg-[#05070d] shadow-[0_28px_90px_rgba(0,0,0,.55)]" style={{ aspectRatio: ratioStyle[template.ratio], background: backdrops[template.backdrop] }}>
    <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.09) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(90deg, transparent 36%, black)" }} />
    {template.layout === "photo" && template.image && <img src={template.image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />}
    {template.image && template.layout !== "photo" && template.layout !== "background" && <img src={template.image} alt="" className={`absolute bottom-0 right-0 object-cover object-top ${template.layout === "newsletter" ? "h-[78%] w-[44%] opacity-95" : template.layout === "quote" ? "h-[62%] w-[58%] opacity-90" : template.layout === "workshop" ? "h-[58%] w-[48%] opacity-75" : "h-[94%] w-[52%] grayscale brightness-75 contrast-125"}`} style={template.layout === "campaign" ? { maskImage: "linear-gradient(90deg, transparent, black 24%)" } : undefined} />}
    <div className={`absolute inset-0 ${template.layout === "photo" ? "bg-gradient-to-t from-black via-black/20 to-transparent" : "bg-gradient-to-r from-[#05070d] via-[#05070d]/80 to-transparent"}`} />
    <div className="relative z-10 flex h-full flex-col p-[5%]">
      <div className="flex items-start justify-between gap-4">
        <img src={BRAND.logo} alt="Lux Automaton" className="h-auto w-[34%] max-w-[270px] object-contain object-left" />
        <span className="text-[clamp(8px,1.05vw,12px)] font-bold uppercase tracking-[.16em]" style={{ color: template.accent }}>{template.tag}</span>
      </div>
      {template.layout === "background" ? (
        <div className="grid flex-1 place-items-center text-center"><div><BrandIcon className="mx-auto mb-5 h-20 w-20" /><h2 className="text-[clamp(25px,5vw,62px)] font-black uppercase leading-[.98]">{template.headline}</h2><p className="mx-auto mt-5 max-w-xl text-[clamp(11px,1.5vw,18px)] leading-relaxed text-slate-300">{template.description}</p></div></div>
      ) : template.layout === "newsletter" ? (
        <div className="mt-[8%] w-[58%]"><h2 className="text-[clamp(24px,4.2vw,52px)] font-black leading-[1.02]">{template.headline}</h2><p className="mt-[5%] text-[clamp(10px,1.35vw,16px)] leading-relaxed text-slate-300">{template.description}</p><div className="mt-[6%] space-y-2 border-t border-white/15 pt-[4%] text-[clamp(9px,1.1vw,13px)]"><p><span style={{ color: template.accent }}>01</span> New AI model releases</p><p><span style={{ color: template.accent }}>02</span> Small-business automation</p><p><span style={{ color: template.accent }}>03</span> Founder intelligence</p></div></div>
      ) : template.layout === "workshop" ? (
        <div className="mt-auto w-[64%] pb-[3%]"><Sparkles className="mb-[5%] h-[10%] w-[10%]" style={{ color: template.accent }} /><h2 className="text-[clamp(26px,4.8vw,60px)] font-black leading-[1.02]">{template.headline}</h2><p className="mt-[4%] text-[clamp(10px,1.3vw,16px)] leading-relaxed text-slate-300">{template.description}</p><CanvasButton label={template.cta} accent={template.accent} /></div>
      ) : template.layout === "quote" ? (
        <div className="mt-[9%] w-[72%]"><span className="text-[clamp(34px,7vw,90px)] font-black leading-none" style={{ color: template.accent }}>“</span><h2 className="-mt-[3%] text-[clamp(24px,4.6vw,58px)] font-black uppercase leading-[1.02]">{template.headline}</h2><p className="mt-[5%] text-[clamp(10px,1.3vw,16px)] text-slate-300">— {template.tag}</p></div>
      ) : template.layout === "photo" ? (
        <div className="mt-auto max-w-[78%]"><h2 className="text-[clamp(28px,5.5vw,68px)] font-black leading-none">{template.headline}</h2><p className="mt-[4%] text-[clamp(10px,1.4vw,17px)] leading-relaxed text-slate-200">{template.description}</p></div>
      ) : (
        <div className="mt-auto w-[62%] pb-[4%]"><h2 className="text-[clamp(28px,5.4vw,68px)] font-black uppercase leading-[.96]">{template.headline.split(" ").map((word, index) => <span key={`${word}-${index}`} className="mr-[.18em] inline-block" style={index >= Math.max(1, template.headline.split(" ").length - 2) ? { color: template.accent } : undefined}>{word}</span>)}</h2><div className="my-[5%] h-1 w-[22%] rounded-full" style={{ background: `linear-gradient(90deg,#7c4dff,${template.accent})` }} /><p className="max-w-lg text-[clamp(10px,1.35vw,16px)] leading-relaxed text-slate-300">{template.description}</p><CanvasButton label={template.cta} accent={template.accent} /></div>
      )}
    </div>
  </div>
  );
});

function CanvasButton({ label, accent }: { label: string; accent: string }) {
  return <span className="mt-[6%] inline-block rounded-md px-[5%] py-[2.5%] text-[clamp(9px,1.1vw,14px)] font-black text-black" style={{ background: `linear-gradient(120deg,#7c4dff,${accent})`, color: accent === "#f8fafc" ? "#05070d" : "white" }}>{label}</span>;
}

function BrandIcon({ className }: { className: string }) {
  return <span role="img" aria-label="Lux Automaton" className={`relative block shrink-0 overflow-hidden rounded-xl ${className}`}><img src={BRAND.icon} alt="" className="absolute max-w-none" style={{ width: "171%", left: "-37%", top: "-17%" }} /></span>;
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const className = "w-full rounded-lg border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-violet-400";
  return <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-400">{label}</span>{multiline ? <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} className={`${className} resize-none`} /> : <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />}</label>;
}

function ControlGroup({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return <section className={className}><h2 className="mb-3 text-xs font-semibold text-slate-400">{label}</h2>{children}</section>;
}
