"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LUX_TV_KIDS_EPISODES, type TvEpisode } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import NetflixVideoPlayerModal from "@/components/NetflixVideoPlayerModal";

const kidsRows = [
  { title: "Parent Guides & AI Safety", tag: "AI Safety" },
  { title: "Creative Video Projects", tag: "Projects" },
  { title: "Future Explorers & Builders", tag: "AI Basics" },
];

export default function LuxTvKidsPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<TvEpisode | null>(null);
  const featured = LUX_TV_KIDS_EPISODES[0];

  return (
    <main className="tv-world kids-tv">
      {/* HERO SECTION */}
      <section className="tv-hero kids-tv-hero">
        <video
          className="world-hero-video"
          src={prefixPath(featured.video)}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="world-hero-shade" />
        <div className="tv-copy">
          <p>LUX TV KIDS</p>
          <h1>{featured.title}</h1>
          <span>{featured.description}</span>
          <div className="tv-meta">
            <b>{featured.series}</b>
            <b>{featured.duration}</b>
            <b>{featured.rating}</b>
          </div>
          <div className="tv-actions">
            <button
              type="button"
              className="tv-hero-play-btn"
              onClick={() => setSelectedEpisode(featured)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "#ffe45c",
                color: "#151040",
                fontWeight: 800,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              ▶ Watch Preview
            </button>
            <Link
              href={featured.storyUrl || "/blog"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                color: "#ffffff",
                fontWeight: 800,
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "1rem"
              }}
            >
              📖 Read Story
            </Link>
          </div>
        </div>
      </section>

      {/* EPISODE ROWS */}
      <section className="tv-rows" aria-label="Lux TV Kids episode shelves">
        {kidsRows.map((row) => {
          const episodes = row.tag
            ? LUX_TV_KIDS_EPISODES.filter((episode) =>
                episode.tags.some((tag) => tag.toLowerCase().includes(row.tag.toLowerCase()))
              )
            : LUX_TV_KIDS_EPISODES;

          const displayEpisodes = episodes.length > 0 ? episodes : LUX_TV_KIDS_EPISODES;

          return (
            <div className="tv-row" key={row.title}>
              <h2>{row.title}</h2>
              <div className="tv-shelf">
                {displayEpisodes.map((episode) => (
                  <article
                    className="tv-card kids-card-tv"
                    key={episode.slug}
                    onClick={() => setSelectedEpisode(episode)}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <Image src={prefixPath(episode.image)} alt={episode.title} fill sizes="320px" />
                      <span>{episode.duration}</span>
                    </div>
                    <h3>{episode.title}</h3>
                    <p>{episode.description}</p>
                    <small>{episode.tags.join(" / ")}</small>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* NETFLIX PREVIEW / VIDEO PLAYER MODAL */}
      <NetflixVideoPlayerModal
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
      />
    </main>
  );
}
