"use client";

import { useState } from "react";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

export type ProductPreview = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function ProductShowcaseGallery({
  productName,
  accentColor,
  previews,
}: {
  productName: string;
  accentColor: string;
  previews: ProductPreview[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = previews[activeIndex] || previews[0];

  if (!active) return null;

  return (
    <section className="product-preview-section" style={{ "--product-accent": accentColor } as React.CSSProperties}>
      <div className="product-preview-heading">
        <div>
          <p>Product experience</p>
          <h2>See {productName} in action.</h2>
        </div>
        <span>Screenshot gallery · Add or replace previews anytime</span>
      </div>

      <div className="product-preview-stage">
        <div className="product-preview-browser">
          <div className="product-preview-browser-bar">
            <i /><i /><i />
            <span>{productName.toLowerCase().replaceAll(" ", "-")}.lux</span>
            <b>Live preview</b>
          </div>
          <div className="product-preview-canvas">
            <Image src={prefixPath(active.image)} alt={`${productName}: ${active.title}`} fill sizes="(max-width: 900px) 100vw, 72vw" priority={activeIndex === 0} />
            <div className="product-preview-shade" />
            <div className="product-preview-copy">
              <span>{active.eyebrow}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
          </div>
        </div>

        <div className="product-preview-tabs" role="tablist" aria-label={`${productName} screenshots`}>
          {previews.map((preview, index) => (
            <button
              key={`${preview.title}-${preview.image}`}
              type="button"
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              role="tab"
              aria-selected={activeIndex === index}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <b>{preview.title}</b>
                <small>{preview.eyebrow}</small>
              </div>
              <em>View</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
