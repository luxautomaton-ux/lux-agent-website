"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  KIDS_WORKSHOPS,
  type KidsWorkshop,
  type WorkshopCategory,
} from "@/lib/luxContent";

const CATEGORIES: { key: WorkshopCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All Workshops", icon: "✦" },
  { key: "video-games", label: "Video Games", icon: "🎮" },
  { key: "robots", label: "Robots", icon: "🤖" },
  { key: "cartoons", label: "Cartoons", icon: "🎬" },
  { key: "school-projects", label: "School Projects", icon: "📚" },
  { key: "family-projects", label: "Family Projects", icon: "🏠" },
  { key: "creative-lab", label: "Creative Lab", icon: "🎨" },
];

const LEVEL_COLORS: Record<string, string> = {
  Starter: "var(--kid-green)",
  Builder: "var(--kid-blue)",
  Pro: "var(--kid-pink)",
};

export default function KidsWorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState<WorkshopCategory | "all">("all");
  const [selected, setSelected] = useState<KidsWorkshop>(KIDS_WORKSHOPS[0]);
  const [showCount, setShowCount] = useState(10);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? KIDS_WORKSHOPS
        : KIDS_WORKSHOPS.filter((w) => w.category === activeCategory),
    [activeCategory],
  );

  const visible = filtered.slice(0, showCount);

  return (
    <div className="kids-world kw-page">
      {/* ═══ HERO ═══ */}
      <section className="kw-hero">
        <div className="kw-hero-inner">
          <div className="kw-hero-badge">
            <span className="kw-badge-icon">✦</span>
            <span>Lux AI Kids Workshop</span>
          </div>
          <h1>
            Learn AI. <span>Build anything.</span>
            <br />
            Change the world.
          </h1>
          <p className="kw-hero-sub">
            Ace and Lana are your guides. Pick a workshop, follow the steps, and
            come out with something real you can show, share, or improve.
          </p>
          <div className="kw-hero-teachers">
            <div className="kw-teacher-card kw-ace">
              <div className="kw-teacher-avatar">⚡</div>
              <div>
                <h3>Ace</h3>
                <p>Your creative co-builder. Wild ideas, bold moves, and nonstop energy.</p>
              </div>
            </div>
            <div className="kw-teacher-card kw-lana">
              <div className="kw-teacher-avatar">🔮</div>
              <div>
                <h3>Lana</h3>
                <p>Your smart guide. Plans, safety, and making sure every project works right.</p>
              </div>
            </div>
          </div>
          <div className="kw-hero-trust">
            <span>✓ Age-appropriate</span>
            <span>✓ Project-based</span>
            <span>✓ Safety-first</span>
            <span>✓ Human-guided</span>
          </div>
        </div>
        <div className="kw-hero-art">
          <div className="kw-float kw-float-1">🎮</div>
          <div className="kw-float kw-float-2">🤖</div>
          <div className="kw-float kw-float-3">🎬</div>
          <div className="kw-float kw-float-4">💡</div>
          <div className="kw-float kw-float-5">🎵</div>
          <div className="kw-hero-orb" />
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="kids-ticker">
        <span>LEARN</span><b>✦</b>
        <span>BUILD</span><b>✦</b>
        <span>CREATE</span><b>✦</b>
        <span>SHARE</span><b>✦</b>
        <span>REPEAT</span>
      </div>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="kw-categories">
        <div className="kw-cat-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`kw-cat-btn ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat.key);
                setShowCount(10);
                const next = cat.key === "all"
                  ? KIDS_WORKSHOPS[0]
                  : KIDS_WORKSHOPS.find((w) => w.category === cat.key);
                if (next) setSelected(next);
              }}
            >
              <span className="kw-cat-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ WORKSHOP GRID ═══ */}
      <section className="kw-grid-section">
        <div className="kw-grid-header">
          <p>{activeCategory === "all" ? "ALL WORKSHOPS" : CATEGORIES.find((c) => c.key === activeCategory)?.label?.toUpperCase()}</p>
          <h2>
            Pick a workshop. <span>Build something real.</span>
          </h2>
          <span className="kw-grid-count">{filtered.length} workshop{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="kw-grid">
          {visible.map((w) => (
            <button
              key={w.slug}
              className={`kw-grid-card ${selected.slug === w.slug ? "active" : ""}`}
              onClick={() => setSelected(w)}
            >
              <div className="kw-grid-card-top">
                <div className="kw-grid-icon">{w.icon}</div>
                <span
                  className="kw-shelf-level"
                  style={{ background: LEVEL_COLORS[w.level] }}
                >
                  {w.level}
                </span>
              </div>
              <div className="kw-grid-card-body">
                <b>{w.title}</b>
                <p>{w.tagline}</p>
              </div>
              <div className="kw-grid-card-foot">
                <span>{w.ageRange}</span>
                <span>{w.duration}</span>
              </div>
            </button>
          ))}
        </div>
        {showCount < filtered.length && (
          <div className="kw-grid-more">
            <button onClick={() => setShowCount((c) => c + 10)}>
              Show more ({filtered.length - showCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* ═══ FEATURED WORKSHOP ═══ */}
      <section className="kw-featured">
        <div className="kw-featured-main">
          <div className="kw-featured-stage">
            <div className="kw-featured-icon">{selected.icon}</div>
            <div className="kw-featured-meta">
              <span className="kw-level-badge" style={{ background: LEVEL_COLORS[selected.level] }}>
                {selected.level}
              </span>
              <span className="kw-age-badge">{selected.ageRange}</span>
              <span className="kw-duration-badge">{selected.duration}</span>
            </div>
            <h2>{selected.title}</h2>
            <p className="kw-featured-tagline">{selected.tagline}</p>
          </div>

          <div className="kw-featured-detail">
            <p className="kw-detail-category">
              {CATEGORIES.find((c) => c.key === selected.category)?.icon}{" "}
              {CATEGORIES.find((c) => c.key === selected.category)?.label}
            </p>
            <h3>{selected.title}</h3>
            <p className="kw-detail-desc">{selected.description}</p>

            {/* What You Make */}
            <div className="kw-detail-block">
              <h4>What You Make</h4>
              <ul className="kw-make-list">
                {selected.whatYouMake.map((item) => (
                  <li key={item}>
                    <span className="kw-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lessons */}
            <div className="kw-detail-block">
              <h4>Lessons</h4>
              <ol className="kw-steps-list">
                {selected.lessons.map((lesson, i) => (
                  <li key={lesson.title}>
                    <span className="kw-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <span className="text-xs opacity-60 ml-2">({lesson.duration})</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Materials */}
            <div className="kw-detail-block">
              <h4>Materials</h4>
              <div className="kw-materials">
                {selected.materials.map((m) => (
                  <span key={m} className="kw-material-tag">{m}</span>
                ))}
              </div>
            </div>

            {/* Teacher Quotes */}
            <div className="kw-teacher-quotes">
              <div className="kw-quote kw-quote-ace">
                <span className="kw-quote-icon">⚡</span>
                <div>
                  <strong>Ace says:</strong>
                  <p>&ldquo;{selected.aceSays}&rdquo;</p>
                </div>
              </div>
              <div className="kw-quote kw-quote-lana">
                <span className="kw-quote-icon">🔮</span>
                <div>
                  <strong>Lana says:</strong>
                  <p>&ldquo;{selected.lanaSays}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="kw-how">
        <div className="kw-how-inner">
          <p>HOW IT WORKS</p>
          <h2>
            Three steps. <span>One real project.</span>
          </h2>
          <div className="kw-how-grid">
            <div className="kw-how-card">
              <div className="kw-how-num">01</div>
              <div className="kw-how-icon">🎯</div>
              <h3>Pick a Workshop</h3>
              <p>
                Choose what excites you most — games, robots, cartoons, school
                projects, or creative experiments. Every workshop has a clear goal.
              </p>
            </div>
            <div className="kw-how-card">
              <div className="kw-how-num">02</div>
              <div className="kw-how-icon">🔧</div>
              <h3>Follow the Steps</h3>
              <p>
                Ace brings the energy and ideas. Lana brings the plan and safety
                checks. You bring the creativity. Together, you build something real.
              </p>
            </div>
            <div className="kw-how-card">
              <div className="kw-how-num">03</div>
              <div className="kw-how-icon">🚀</div>
              <h3>Show What You Made</h3>
              <p>
                Every workshop ends with something you can share, present, or
                improve. Your project, your name, your achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACE & LANA TEACHER SPOTLIGHT ═══ */}
      <section className="kw-teachers">
        <div className="kw-teachers-inner">
          <div className="kw-teachers-header">
            <p>YOUR TEACHERS</p>
            <h2>
              Meet Ace <span>&</span> Lana
            </h2>
            <p className="kw-teachers-sub">
              Two guides who make learning AI fun, safe, and real. Ace is the
              co-builder with big ideas. Lana is the AI operator who keeps
              everything on track.
            </p>
          </div>
          <div className="kw-teachers-grid">
            <div className="kw-teacher-spotlight kw-spot-ace">
              <div className="kw-spot-avatar">⚡</div>
              <h3>Ace</h3>
              <span className="kw-spot-role">Creative Co-Builder</span>
              <ul>
                <li>Brings wild ideas and energy to every project</li>
                <li>Helps you brainstorm characters, stories, and designs</li>
                <li>Makes learning feel like an adventure</li>
                <li>Asks the questions nobody else thinks of</li>
                <li>Cheers you on when things get tricky</li>
              </ul>
            </div>
            <div className="kw-teacher-spotlight kw-spot-lana">
              <div className="kw-spot-avatar">🔮</div>
              <h3>Lana</h3>
              <span className="kw-spot-role">AI Operator & Guide</span>
              <ul>
                <li>Turns big ideas into clear, step-by-step plans</li>
                <li>Teaches responsible AI use and online safety</li>
                <li>Helps organize projects so they actually work</li>
                <li>Reviews safety rules and fairness in every build</li>
                <li>Makes sure your project is ready to share</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARENTS SECTION ═══ */}
      <section className="kids-grownups">
        <div>
          <p>GROWN-UPS&apos; CORNER</p>
          <h2>
            Creative confidence,
            <br />
            with guardrails.
          </h2>
        </div>
        <div>
          <p>
            Lux AI Kids workshops are designed for guided, age-appropriate
            learning. Every project emphasizes critical thinking, privacy,
            consent, source-checking, and using AI to help people — not replace
            human judgment.
          </p>
          <ul>
            <li>Clear age bands and learning goals for every workshop</li>
            <li>No unsupervised public publishing</li>
            <li>Printable activity and conversation guides</li>
            <li>School, library, and community workshop options</li>
            <li>Every project reviewed by Ace and Lana for safety</li>
          </ul>
          <Link href="/contact">Bring Lux AI Kids to your community →</Link>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="kids-letter">
        <div>
          <p>THE LUX LAB LETTER</p>
          <h2>
            Projects for curious kids,
            <br />
            notes for caring grown-ups.
          </h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input required type="email" placeholder="grownup@email.com" />
          <button>Join free →</button>
          <small>One thoughtful email each week. Unsubscribe anytime.</small>
        </form>
      </section>
    </div>
  );
}
