"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type TvEpisode } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";

interface NetflixVideoPlayerModalProps {
  episode: TvEpisode | null;
  onClose: () => void;
}

export default function NetflixVideoPlayerModal({ episode, onClose }: NetflixVideoPlayerModalProps) {
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPlayingFull(false);
  }, [episode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPlayingFull) {
          setIsPlayingFull(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlayingFull, onClose]);

  if (!episode) return null;

  const handlePreviewTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!isPlayingFull && video.currentTime >= 10) {
      video.currentTime = 0;
    }
  };

  return (
    <div className="netflix-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="netflix-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="netflix-modal-close" onClick={onClose} aria-label="Close preview">
          ✕
        </button>

        {!isPlayingFull ? (
          /* PREVIEW MODE (Netflix Hover / Detail Preview) */
          <div className="netflix-preview-container">
            <div className="netflix-video-wrapper">
              {episode.video ? (
                <video
                  ref={videoRef}
                  src={prefixPath(episode.video)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onTimeUpdate={handlePreviewTimeUpdate}
                  className="netflix-preview-video"
                />
              ) : (
                <Image src={prefixPath(episode.image)} alt={episode.title} fill className="netflix-preview-fallback" />
              )}
              <div className="netflix-video-shade" />
              <div className="netflix-preview-badge">10S PREVIEW LOOP</div>
            </div>

            <div className="netflix-details-body">
              <div className="netflix-meta-row">
                <span className="netflix-series-badge">{episode.series}</span>
                <span className="netflix-duration-tag">⏱ {episode.duration}</span>
                <span className="netflix-rating-tag">RATING: {episode.rating}</span>
              </div>

              <h2 className="netflix-title">{episode.title}</h2>
              <p className="netflix-description">{episode.description}</p>

              <div className="netflix-tags-list">
                {episode.tags.map((tag) => (
                  <span key={tag} className="netflix-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="netflix-actions-row">
                <button
                  type="button"
                  className="netflix-btn-play"
                  onClick={() => setIsPlayingFull(true)}
                >
                  <span className="play-icon">▶</span> Watch Full Episode
                </button>

                <Link
                  href={episode.storyUrl || "/blog"}
                  className="netflix-btn-story"
                  onClick={onClose}
                >
                  <span className="book-icon">📖</span> Read Real Story
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* FULL CINEMA VIDEO PLAYER MODE */
          <div className="netflix-cinema-player">
            <div className="cinema-top-bar">
              <button
                type="button"
                className="cinema-back-btn"
                onClick={() => setIsPlayingFull(false)}
              >
                ← Back to Overview
              </button>
              <span className="cinema-title">{episode.title}</span>
              <Link
                href={episode.storyUrl || "/blog"}
                className="cinema-story-btn"
                onClick={onClose}
              >
                📖 Read Story
              </Link>
            </div>

            <video
              src={prefixPath(episode.video)}
              controls
              autoPlay
              className="cinema-video"
            />
          </div>
        )}
      </div>
    </div>
  );
}
