"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES, type Audience, type BlogArticle } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";

const filters: Array<"All" | Audience> = ["All", "Lux Automaton", "Lux AI Kids"];

function StoryMedia({ article, sizes }: { article: BlogArticle; sizes: string }) {
  return article.video ? (
    <video
      src={prefixPath(article.video)}
      poster={prefixPath(article.image)}
      autoPlay
      loop
      muted
      playsInline
      aria-label={`${article.title} preview`}
    />
  ) : (
    <Image src={prefixPath(article.image)} alt={article.title} fill sizes={sizes} />
  );
}

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | Audience>("All");
  const [selected, setSelected] = useState<BlogArticle>(BLOG_ARTICLES[0]);
  const articleRef = useRef<HTMLElement>(null);

  const articles = useMemo(
    () => activeFilter === "All" ? BLOG_ARTICLES : BLOG_ARTICLES.filter((article) => article.audience === activeFilter),
    [activeFilter],
  );

  const topStories = articles.filter((article) => article.slug !== selected.slug).slice(0, 4);

  const chooseStory = (article: BlogArticle, scroll = false) => {
    setSelected(article);
    if (scroll) {
      window.setTimeout(() => articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  return (
    <main className="editorial-world">
      <section className="editorial-hero">
        <Image src={prefixPath("/images/blog-hero-backdrop.jpg")} alt="Lux Automaton Editorial & Team" fill priority sizes="100vw" />
        <div className="editorial-hero-shade" />
        <div className="editorial-hero-copy">
          <p>LUX AUTOMATON // DISPATCH &amp; ALPHA</p>
          <h1>Where Creators &amp; Builders Come to Get the Alpha.</h1>
          <span>Field notes, architectural blueprints, and creative intelligence for founders, makers, and young builders pushing the edge of AI.</span>
          <div>
            <a href="#alpha-dispatch" onClick={(e) => { e.preventDefault(); articleRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>Read Latest Alpha <span aria-hidden="true">↓</span></a>
            <Link href="/lux-tv">Watch Lux TV <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section id="alpha-dispatch" className="lux-newsroom" aria-label="Lux Automaton newsroom">
        <div className="news-ticker" aria-label="Latest Lux update">
          <b>ALPHA TICKER</b>
          <span>ASA + LANA: The Story Remembers — Episode 1 explores why every AI production needs memory.</span>
          <Link href="/lux-tv">Watch on Lux TV <span aria-hidden="true">→</span></Link>
        </div>

        <header className="newsroom-header">
          <div>
            <p className="news-kicker">THE ALPHA DISPATCH</p>
            <h2>News, Field Notes &amp; High-Signal Intelligence</h2>
          </div>
          <p>Raw insights, production breakthroughs, and practical guides directly from the builders behind Lux Automaton, Lux Codex, and LANA.</p>
        </header>

        <div className="news-filter-row" aria-label="Filter articles by audience">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "active" : ""}
              onClick={() => {
                setActiveFilter(filter);
                const next = filter === "All" ? BLOG_ARTICLES[0] : BLOG_ARTICLES.find((article) => article.audience === filter);
                if (next) setSelected(next);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="news-lead-grid">
          <article className="news-lead-story">
            <button type="button" className="news-lead-media" onClick={() => chooseStory(selected, true)} aria-label={`Read ${selected.title}`}>
              <StoryMedia article={selected} sizes="(max-width: 980px) 100vw, 70vw" />
              <span className="news-media-label">{selected.video ? "Watch + read" : "Featured story"}</span>
            </button>
            <div className="news-lead-copy">
              <div className="news-story-meta">
                <span>{selected.category}</span>
                <time>{selected.date}</time>
                <span>{selected.readTime}</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.deck}</p>
              <button type="button" className="news-read-button" onClick={() => chooseStory(selected, true)}>
                Read the full story <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>

          <aside className="news-top-stories" aria-label="Top stories">
            <div className="news-section-heading">
              <span>Top stories</span>
              <small>Updated weekly</small>
            </div>
            {topStories.map((article, index) => (
              <button key={article.slug} type="button" onClick={() => chooseStory(article, true)}>
                <span className="news-rank">{String(index + 1).padStart(2, "0")}</span>
                <span className="news-top-story-copy">
                  <small>{article.category} · {article.readTime}</small>
                  <strong>{article.title}</strong>
                </span>
              </button>
            ))}
          </aside>
        </div>

        <section className="news-latest" aria-labelledby="latest-stories-title">
          <div className="news-section-heading">
            <h2 id="latest-stories-title">Latest stories</h2>
            <span>{articles.length} articles</span>
          </div>
          <div className="news-modern-grid">
            {articles.map((article) => (
              <article key={article.slug} className={selected.slug === article.slug ? "active" : ""}>
                <button type="button" className="news-modern-image" onClick={() => chooseStory(article, true)} aria-label={`Read ${article.title}`}>
                  <StoryMedia article={article} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  {article.video && <span className="news-play-badge" aria-hidden="true">▶</span>}
                </button>
                <div className="news-modern-copy">
                  <div className="news-story-meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.deck}</p>
                  <button type="button" onClick={() => chooseStory(article, true)}>Continue reading <span aria-hidden="true">→</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={articleRef} className="news-reading-room" aria-labelledby="selected-article-title">
          <div className="news-reading-header">
            <p>{selected.audience} / {selected.category}</p>
            <h2 id="selected-article-title">{selected.title}</h2>
            <strong>{selected.deck}</strong>
            <div className="news-reading-byline">
              <span>Lux Automaton Editorial</span>
              <time>{selected.date}</time>
              <span>{selected.readTime}</span>
            </div>
          </div>

          <div className="news-reading-layout">
            <aside>
              <span>In this story</span>
              {selected.takeaways.map((takeaway, index) => (
                <p key={takeaway}><b>{String(index + 1).padStart(2, "0")}</b>{takeaway}</p>
              ))}
              <Link href="/community">Discuss in the community <span aria-hidden="true">→</span></Link>
            </aside>

            <article className="editorial-article news-full-article">
              <div className="editorial-image">
                <StoryMedia article={selected} sizes="(max-width: 980px) 100vw, 800px" />
              </div>
              {selected.body.map((paragraph, index) => {
                const formattedHtml = paragraph
                  .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
                  .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
                  .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`);
                return <div key={index} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
              })}
            </article>
          </div>
        </section>

        <section className="news-newsletter">
          <div>
            <p>Briefed by LANA</p>
            <h2>One smart dispatch. Every week.</h2>
            <span>Founder notes, practical AI lessons, new workshops, Lux TV releases, and ideas worth building.</span>
          </div>
          <Link href="/community">Join the Lux community <span aria-hidden="true">→</span></Link>
        </section>
      </section>
    </main>
  );
}
