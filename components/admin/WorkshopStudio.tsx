"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  fetchWorkshops,
  slugifyWorkshopTitle,
  sortWorkshop,
  uploadWorkshopMedia,
  type WorkshopLessonRow,
  type WorkshopModuleRow,
  type WorkshopRow,
  type WorkshopStatus,
} from "@/lib/workshopDb";
import { supabase } from "@/lib/supabase";

type WorkshopForm = {
  title: string;
  slug: string;
  audience: "Lux Automaton" | "Lux AI Kids";
  level: "Beginner" | "Intermediate" | "Advanced";
  ageBand: string;
  duration: string;
  description: string;
  outcome: string;
  imageUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  materials: string;
  learningGoals: string;
  prerequisites: string;
  safetyNotes: string;
  extensionActivities: string;
};

const blankForm: WorkshopForm = {
  title: "",
  slug: "",
  audience: "Lux Automaton",
  level: "Beginner",
  ageBand: "",
  duration: "",
  description: "",
  outcome: "",
  imageUrl: "",
  thumbnailUrl: "",
  videoUrl: "",
  materials: "",
  learningGoals: "",
  prerequisites: "",
  safetyNotes: "",
  extensionActivities: "",
};

const lines = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const joinLines = (value: string[] | null | undefined) => (value || []).join("\n");

function workshopToForm(workshop: WorkshopRow): WorkshopForm {
  return {
    title: workshop.title,
    slug: workshop.slug,
    audience: workshop.audience,
    level: workshop.level,
    ageBand: workshop.age_band,
    duration: workshop.duration,
    description: workshop.description,
    outcome: workshop.outcome,
    imageUrl: workshop.image_url || "",
    thumbnailUrl: workshop.thumbnail_url || "",
    videoUrl: workshop.video_url || "",
    materials: joinLines(workshop.materials),
    learningGoals: joinLines(workshop.learning_goals),
    prerequisites: joinLines(workshop.prerequisites),
    safetyNotes: joinLines(workshop.safety_notes),
    extensionActivities: joinLines(workshop.extension_activities),
  };
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={wide ? "studio-field studio-field-wide" : "studio-field"}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function MediaUpload({
  label,
  accept,
  value,
  onChange,
  folder,
}: {
  label: string;
  accept: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onChange(await uploadWorkshopMedia(file, folder));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label} wide>
      <div className="studio-media-input">
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Paste a media URL or upload a file" />
        <label className="studio-upload-button">
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept={accept} disabled={uploading} onChange={(event) => upload(event.target.files?.[0])} />
        </label>
      </div>
      {error && <small className="studio-error">{error}</small>}
    </Field>
  );
}

function LessonEditor({
  lesson,
  index,
  total,
  onRefresh,
}: {
  lesson: WorkshopLessonRow;
  index: number;
  total: number;
  onRefresh: () => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: lesson.title,
    duration: lesson.duration,
    overview: lesson.overview,
    objectives: joinLines(lesson.objectives),
    activity: lesson.activity,
    deliverable: lesson.deliverable,
    tips: joinLines(lesson.tips),
    checkIn: lesson.check_in,
    content: lesson.content,
    imageUrl: lesson.image_url || "",
    videoUrl: lesson.video_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("workshop_lessons").update({
      title: form.title.trim() || "Untitled lesson",
      duration: form.duration,
      overview: form.overview,
      objectives: lines(form.objectives),
      activity: form.activity,
      deliverable: form.deliverable,
      tips: lines(form.tips),
      check_in: form.checkIn,
      content: form.content,
      image_url: form.imageUrl || null,
      video_url: form.videoUrl || null,
    }).eq("id", lesson.id);
    setSaving(false);
    if (error) return setMessage(error.message);
    setMessage("Lesson saved");
    await onRefresh();
  };

  const move = async (direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= total) return;
    const { error } = await supabase.rpc("reorder_workshop_lesson", {
      lesson_id_input: lesson.id,
      new_order_input: target,
    });
    if (error) setMessage(error.message);
    else await onRefresh();
  };

  const remove = async () => {
    if (!window.confirm(`Delete “${lesson.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from("workshop_lessons").delete().eq("id", lesson.id);
    if (error) setMessage(error.message);
    else await onRefresh();
  };

  return (
    <details className="studio-lesson" open={index === 0}>
      <summary>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <b>{lesson.title}</b>
        <small>{lesson.duration || "No duration"}</small>
      </summary>
      <div className="studio-lesson-editor">
        <div className="studio-form-grid">
          <Field label="Lesson title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Duration"><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="25 min" /></Field>
          <Field label="Overview" wide><textarea value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} rows={3} /></Field>
          <Field label="Learning objectives — one per line" wide><textarea value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} rows={4} /></Field>
          <Field label="Activity" wide><textarea value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} rows={4} /></Field>
          <Field label="Deliverable" wide><textarea value={form.deliverable} onChange={(e) => setForm({ ...form, deliverable: e.target.value })} rows={3} /></Field>
          <Field label="Tips — one per line" wide><textarea value={form.tips} onChange={(e) => setForm({ ...form, tips: e.target.value })} rows={4} /></Field>
          <Field label="Check-in question" wide><textarea value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} rows={2} /></Field>
          <Field label="Full lesson content" wide><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} placeholder="Add the complete lesson, examples, instructions, and teaching notes." /></Field>
          <MediaUpload label="Lesson image" accept="image/*" value={form.imageUrl} folder={`lessons/${lesson.id}/images`} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
          <MediaUpload label="Lesson video" accept="video/mp4,video/webm" value={form.videoUrl} folder={`lessons/${lesson.id}/videos`} onChange={(videoUrl) => setForm({ ...form, videoUrl })} />
        </div>
        <div className="studio-action-row">
          <button type="button" onClick={() => move(-1)} disabled={index === 0}>Move up</button>
          <button type="button" onClick={() => move(1)} disabled={index === total - 1}>Move down</button>
          <button type="button" className="studio-danger" onClick={remove}>Delete lesson</button>
          <button type="button" className="studio-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save lesson"}</button>
          {message && <span className={message === "Lesson saved" ? "studio-success" : "studio-error"}>{message}</span>}
        </div>
      </div>
    </details>
  );
}

function ModuleEditor({
  module,
  index,
  total,
  onRefresh,
}: {
  module: WorkshopModuleRow;
  index: number;
  total: number;
  onRefresh: () => Promise<void>;
}) {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);
  const [message, setMessage] = useState("");

  const save = async () => {
    const { error } = await supabase.from("workshop_modules").update({ title, description }).eq("id", module.id);
    if (error) setMessage(error.message);
    else {
      setMessage("Module saved");
      await onRefresh();
    }
  };

  const addLesson = async () => {
    const { error } = await supabase.from("workshop_lessons").insert({
      module_id: module.id,
      title: `Lesson ${module.workshop_lessons.length + 1}`,
      order_index: module.workshop_lessons.length,
    });
    if (error) setMessage(error.message);
    else await onRefresh();
  };

  const move = async (direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= total) return;
    const { error } = await supabase.rpc("reorder_workshop_module", {
      module_id_input: module.id,
      new_order_input: target,
    });
    if (error) setMessage(error.message);
    else await onRefresh();
  };

  const remove = async () => {
    if (!window.confirm(`Delete “${module.title}” and all of its lessons?`)) return;
    const { error } = await supabase.from("workshop_modules").delete().eq("id", module.id);
    if (error) setMessage(error.message);
    else await onRefresh();
  };

  return (
    <section className="studio-module">
      <div className="studio-module-head">
        <span>Module {String(index + 1).padStart(2, "0")}</span>
        <div className="studio-module-move">
          <button type="button" onClick={() => move(-1)} disabled={index === 0}>↑</button>
          <button type="button" onClick={() => move(1)} disabled={index === total - 1}>↓</button>
        </div>
      </div>
      <div className="studio-form-grid">
        <Field label="Module title"><input value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Module description" wide><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></Field>
      </div>
      <div className="studio-action-row">
        <button type="button" onClick={addLesson}>+ Add lesson</button>
        <button type="button" className="studio-danger" onClick={remove}>Delete module</button>
        <button type="button" className="studio-primary" onClick={save}>Save module</button>
        {message && <span className={message === "Module saved" ? "studio-success" : "studio-error"}>{message}</span>}
      </div>
      <div className="studio-lessons">
        {module.workshop_lessons.length === 0 ? (
          <p className="studio-empty">No lessons yet. Add the first lesson to begin the curriculum.</p>
        ) : module.workshop_lessons.map((lesson, lessonIndex) => (
          <LessonEditor
            key={lesson.id}
            lesson={lesson}
            index={lessonIndex}
            total={module.workshop_lessons.length}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </section>
  );
}

type LanaBuilderProps = {
  onCreated: (workshopId: number) => Promise<void>;
};

function LanaWorkshopBuilder({ onCreated }: LanaBuilderProps) {
  const [titleHint, setTitleHint] = useState("");
  const [audience, setAudience] = useState<WorkshopForm["audience"]>("Lux Automaton");
  const [level, setLevel] = useState<WorkshopForm["level"]>("Beginner");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaKind, setMediaKind] = useState<"video" | "podcast">("video");
  const [mediaName, setMediaName] = useState("");
  const [generateImages, setGenerateImages] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [building, setBuilding] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ modules: number; lessons: number; lessonImagesGenerated: number } | null>(null);

  const uploadSource = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const detectedKind = file.type.startsWith("audio/") ? "podcast" : "video";
      const url = await uploadWorkshopMedia(file, `sources/${detectedKind}`, setUploadProgress);
      setMediaKind(detectedKind);
      setMediaUrl(url);
      setMediaName(file.name);
      setMessage(`${detectedKind === "podcast" ? "Podcast" : "Video"} uploaded and ready for LANA.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Source upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const build = async () => {
    if (![youtubeUrl, articleUrl, articleText, mediaUrl].some((value) => value.trim())) {
      setMessage("Add at least one YouTube video, article, uploaded video, or podcast.");
      return;
    }

    setBuilding(true);
    setResult(null);
    setMessage("LANA is reading the source, transcribing media, designing the curriculum, and creating the visual package. This may take several minutes.");
    try {
      const { data, error } = await supabase.functions.invoke("lana-workshop-generator", {
        body: {
          titleHint: titleHint.trim(),
          audience,
          level,
          youtubeUrl: youtubeUrl.trim() || undefined,
          articleUrl: articleUrl.trim() || undefined,
          articleText: articleText.trim() || undefined,
          mediaUrl: mediaUrl.trim() || undefined,
          mediaKind: mediaUrl ? mediaKind : undefined,
          generateImages,
        },
      });
      if (error) throw error;
      if (!data?.success || !data.workshopId) throw new Error(data?.error || "LANA did not return a workshop draft.");
      setResult(data);
      setMessage(`“${data.title}” is ready as a private draft. Review every lesson, then publish when you approve it.`);
      await onCreated(data.workshopId);
    } catch (error) {
      const context = error && typeof error === "object" && "context" in error ? (error as { context?: Response }).context : null;
      let detail = "LANA could not complete this workshop.";
      if (context) {
        const payload = await context.clone().json().catch(() => null);
        if (payload?.error) detail = payload.error;
      } else if (error instanceof Error) detail = error.message;
      setMessage(detail);
    } finally {
      setBuilding(false);
    }
  };

  return (
    <section className="lana-workshop-builder" aria-labelledby="lana-builder-title">
      <div className="lana-builder-heading">
        <div className="lana-orb" aria-hidden="true"><span>L</span></div>
        <div>
          <p>LANA Curriculum Agent</p>
          <h2 id="lana-builder-title">Turn source material into a complete workshop.</h2>
          <span>LANA studies your video, podcast, YouTube link, or article, then creates the modules, teaching content, activities, thumbnail, lesson images, and diagrams.</span>
        </div>
        <strong>Review-first publishing</strong>
      </div>

      <div className="lana-builder-grid">
        <Field label="Workshop direction or preferred title" wide>
          <input value={titleHint} onChange={(event) => setTitleHint(event.target.value)} placeholder="Example: Build a consistent AI video series" />
        </Field>
        <Field label="Audience">
          <select value={audience} onChange={(event) => setAudience(event.target.value as WorkshopForm["audience"])}>
            <option>Lux Automaton</option><option>Lux AI Kids</option>
          </select>
        </Field>
        <Field label="Level">
          <select value={level} onChange={(event) => setLevel(event.target.value as WorkshopForm["level"])}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </Field>
      </div>

      <div className="lana-source-grid">
        <label className="lana-source-card">
          <span>01 · YouTube</span><b>Learn from a public video</b>
          <input type="url" value={youtubeUrl} onChange={(event) => setYoutubeUrl(event.target.value)} placeholder="https://youtube.com/watch?v=…" />
        </label>
        <label className="lana-source-card">
          <span>02 · Article</span><b>Read a published article</b>
          <input type="url" value={articleUrl} onChange={(event) => setArticleUrl(event.target.value)} placeholder="https://example.com/article" />
        </label>
        <label className="lana-source-card lana-source-upload">
          <span>03 · Upload</span><b>Video or podcast file</b>
          <small>{mediaName || "MP4, WebM, MP3, M4A, WAV, AAC or OGG"}</small>
          <em>{uploading ? `Uploading source… ${uploadProgress}%` : mediaUrl ? "Replace source" : "Choose source file"}</em>
          <input type="file" disabled={uploading || building} accept="video/mp4,video/webm,audio/mpeg,audio/mp4,audio/wav,audio/aac,audio/ogg" onChange={(event) => uploadSource(event.target.files?.[0])} />
        </label>
      </div>

      <Field label="Paste article text, transcript, notes, or a podcast outline" wide>
        <textarea value={articleText} onChange={(event) => setArticleText(event.target.value)} rows={7} placeholder="Paste source text here. You can combine this with any link or upload above." />
      </Field>

      {audience === "Lux AI Kids" ? (
        <div className="lana-brand-reference kids">
          <Image src="/images/lux-ai-kids-brand/lana-and-ace-classroom.png" alt="Lux AI Kids LANA and Ace classroom visual reference" width={1672} height={941} />
          <div>
            <Image src="/images/lux-ai-kids-brand/lux-ai-kids-logo.png" alt="Lux AI Kids logo" width={900} height={500} />
            <p>Kids visual direction locked</p>
            <b>Deep navy · cyan + violet glow · rainbow learning accents · Ace + LANA warmth</b>
            <span>LANA will apply this supplied style to the workshop cover, photos, and diagrams while the site places the authentic logo over the finished artwork.</span>
          </div>
        </div>
      ) : (
        <div className="lana-brand-reference automaton">
          <Image src="/images/lux-automaton-brand/executive-workshop-reference.png" alt="Lux Automaton Asa and LANA executive workshop visual reference" width={1672} height={941} />
          <div>
            <Image src="/images/lux-automaton-brand/lux-automaton-logo.png" alt="Lux Automaton logo" width={860} height={175} />
            <p>Automaton visual direction locked</p>
            <b>Executive midnight studio · cyan + violet glass systems · Asa + LANA guidance</b>
            <span>LANA will create founder-ready covers, cinematic business photography, and precise operating-system diagrams while the site places the authentic Lux Automaton logo over the finished artwork.</span>
          </div>
        </div>
      )}

      <div className="lana-builder-footer">
        <label className="lana-image-toggle">
          <input type="checkbox" checked={generateImages} onChange={(event) => setGenerateImages(event.target.checked)} />
          <span><b>Create the complete visual package</b><small>Original 16:9 thumbnail plus lesson photos and educational diagrams.</small></span>
        </label>
        <button type="button" className="lana-build-button" onClick={build} disabled={building || uploading}>
          {building ? "LANA is building…" : "Build workshop with LANA"}
        </button>
      </div>

      {message && <div className={`lana-builder-message ${result ? "success" : ""}`} aria-live="polite"><span>{building ? "◌" : result ? "✓" : "i"}</span><p>{message}</p></div>}
      {result && <div className="lana-result-strip"><span><b>{result.modules}</b> modules</span><span><b>{result.lessons}</b> lessons</span><span><b>{result.lessonImagesGenerated}</b> lesson visuals</span><strong>Draft opened below</strong></div>}
    </section>
  );
}

export default function WorkshopStudio() {
  const [workshops, setWorkshops] = useState<WorkshopRow[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<WorkshopForm>(blankForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const selected = useMemo(
    () => workshops.find((workshop) => workshop.id === selectedId) || null,
    [selectedId, workshops],
  );

  const refresh = async (preferredId = selectedId) => {
    setLoading(true);
    try {
      const data = await fetchWorkshops(true);
      setWorkshops(data);
      const next = data.find((workshop) => workshop.id === preferredId) || data[0] || null;
      setSelectedId(next?.id || null);
      if (next) setForm(workshopToForm(sortWorkshop(next)));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load workshops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetchWorkshops(true)
      .then((data) => {
        if (!active) return;
        setWorkshops(data);
        const first = data[0] || null;
        setSelectedId(first?.id || null);
        if (first) setForm(workshopToForm(sortWorkshop(first)));
      })
      .catch((error) => {
        if (active) setMessage(error instanceof Error ? error.message : "Unable to load workshops");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const selectWorkshop = (workshop: WorkshopRow) => {
    setSelectedId(workshop.id);
    setForm(workshopToForm(workshop));
    setMessage("");
  };

  const newWorkshop = () => {
    setSelectedId(null);
    setForm(blankForm);
    setMessage("New draft ready");
  };

  const payload = (status: WorkshopStatus) => ({
    title: form.title.trim(),
    slug: (form.slug || slugifyWorkshopTitle(form.title)).trim(),
    audience: form.audience,
    level: form.level,
    age_band: form.ageBand,
    duration: form.duration,
    description: form.description,
    outcome: form.outcome,
    image_url: form.imageUrl || null,
    thumbnail_url: form.thumbnailUrl || form.imageUrl || null,
    video_url: form.videoUrl || null,
    materials: lines(form.materials),
    learning_goals: lines(form.learningGoals),
    prerequisites: lines(form.prerequisites),
    safety_notes: lines(form.safetyNotes),
    extension_activities: lines(form.extensionActivities),
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  });

  const saveWorkshop = async (status: WorkshopStatus = selected?.status || "draft") => {
    if (!form.title.trim()) return setMessage("Add a workshop title before saving.");
    setSaving(true);
    setMessage("");
    let savedId = selectedId;
    const data = payload(status);

    if (selectedId) {
      const { error } = await supabase.from("workshops").update(data).eq("id", selectedId);
      if (error) {
        setSaving(false);
        return setMessage(error.message);
      }
    } else {
      const { data: created, error } = await supabase.from("workshops").insert(data).select("id").single();
      if (error) {
        setSaving(false);
        return setMessage(error.message);
      }
      savedId = created.id;
    }

    setSaving(false);
    setMessage(status === "published" ? "Workshop published" : "Draft saved");
    await refresh(savedId);
  };

  const addModule = async () => {
    if (!selectedId) return setMessage("Save the workshop draft before adding modules.");
    const { error } = await supabase.from("workshop_modules").insert({
      workshop_id: selectedId,
      title: `Module ${(selected?.workshop_modules.length || 0) + 1}`,
      order_index: selected?.workshop_modules.length || 0,
    });
    if (error) setMessage(error.message);
    else await refresh(selectedId);
  };

  const removeWorkshop = async () => {
    if (!selected || !window.confirm(`Delete “${selected.title}” and every lesson inside it?`)) return;
    const { error } = await supabase.from("workshops").delete().eq("id", selected.id);
    if (error) setMessage(error.message);
    else {
      setSelectedId(null);
      setForm(blankForm);
      await refresh(null);
    }
  };

  return (
    <div className="workshop-studio">
      <header className="studio-hero">
        <div>
          <p>Lux Academy Control Room</p>
          <h1>Workshop Studio</h1>
          <span>Create complete Lux Automaton and Lux AI Kids learning experiences, add original media, preview the curriculum, and publish when it is ready.</span>
        </div>
        <button type="button" className="studio-new" onClick={newWorkshop}>+ New workshop</button>
      </header>

      <LanaWorkshopBuilder onCreated={async (workshopId) => refresh(workshopId)} />

      <div className="studio-layout">
        <aside className="studio-library">
          <div className="studio-library-head">
            <b>Workshop library</b>
            <span>{workshops.length}</span>
          </div>
          {loading ? <p className="studio-empty">Loading studio…</p> : workshops.length === 0 ? (
            <p className="studio-empty">No database workshops yet. Create the first one.</p>
          ) : workshops.map((workshop) => (
            <button
              key={workshop.id}
              type="button"
              className={selectedId === workshop.id ? "active" : ""}
              onClick={() => selectWorkshop(workshop)}
            >
              <span className={`studio-status ${workshop.status}`}>{workshop.status}</span>
              <b>{workshop.title}</b>
              <small>{workshop.audience} · {workshop.workshop_modules.length} modules</small>
              {workshop.generated_by && <em>Generated by LANA</em>}
            </button>
          ))}
        </aside>

        <main className="studio-editor">
          <div className="studio-editor-head">
            <div>
              <p>{selected ? `Editing #${selected.id}` : "New workshop draft"}</p>
              <h2>{form.title || "Untitled workshop"}</h2>
            </div>
            <div className="studio-publish-actions">
              {selected && <span className={`studio-status ${selected.status}`}>{selected.status}</span>}
              {selected?.status === "published" && <a href={`/workshops?workshop=${selected.slug}`} target="_blank" rel="noreferrer">View live</a>}
              <button type="button" onClick={() => saveWorkshop("draft")} disabled={saving}>Save draft</button>
              <button type="button" className="studio-primary" onClick={() => saveWorkshop("published")} disabled={saving}>{saving ? "Saving…" : "Publish"}</button>
            </div>
          </div>

          {message && <div className={message.includes("saved") || message.includes("published") || message.includes("ready") ? "studio-notice success" : "studio-notice"}>{message}</div>}

          <section className="studio-card">
            <div className="studio-section-title">
              <span>01</span>
              <div><h3>Workshop identity</h3><p>The information visitors see in the Lux Academy catalog.</p></div>
            </div>
            <div className="studio-form-grid">
              <Field label="Workshop title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugifyWorkshopTitle(e.target.value) })} placeholder="Build Your First AI Business" /></Field>
              <Field label="URL slug"><input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugifyWorkshopTitle(e.target.value) })} placeholder="build-your-first-ai-business" /></Field>
              <Field label="Audience"><select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value as WorkshopForm["audience"] })}><option>Lux Automaton</option><option>Lux AI Kids</option></select></Field>
              <Field label="Level"><select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as WorkshopForm["level"] })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
              <Field label="Age / audience band"><input value={form.ageBand} onChange={(e) => setForm({ ...form, ageBand: e.target.value })} placeholder="Founders and small businesses" /></Field>
              <Field label="Total duration"><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="3 hours" /></Field>
              <Field label="Description" wide><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></Field>
              <Field label="Final outcome" wide><textarea value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} rows={3} /></Field>
            </div>
          </section>

          <section className="studio-card">
            <div className="studio-section-title">
              <span>02</span>
              <div><h3>Visual media</h3><p>Upload original covers, thumbnails, and a workshop video.</p></div>
            </div>
            <div className="studio-form-grid">
              <MediaUpload label="Hero image" accept="image/*" value={form.imageUrl} folder={`workshops/${selectedId || "draft"}/hero`} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
              <MediaUpload label="Catalog thumbnail" accept="image/*" value={form.thumbnailUrl} folder={`workshops/${selectedId || "draft"}/thumbnail`} onChange={(thumbnailUrl) => setForm({ ...form, thumbnailUrl })} />
              <MediaUpload label="Workshop video" accept="video/mp4,video/webm" value={form.videoUrl} folder={`workshops/${selectedId || "draft"}/video`} onChange={(videoUrl) => setForm({ ...form, videoUrl })} />
            </div>
            {(form.imageUrl || form.videoUrl) && (
              <div className="studio-media-preview">
                {form.videoUrl ? <video src={form.videoUrl} controls playsInline /> : <Image src={form.imageUrl} alt="Workshop preview" width={1600} height={900} />}
              </div>
            )}
          </section>

          <section className="studio-card">
            <div className="studio-section-title">
              <span>03</span>
              <div><h3>Learning framework</h3><p>Enter one item per line so every workshop has a complete teaching plan.</p></div>
            </div>
            <div className="studio-form-grid">
              <Field label="Materials — one per line"><textarea value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} rows={6} /></Field>
              <Field label="Learning goals — one per line"><textarea value={form.learningGoals} onChange={(e) => setForm({ ...form, learningGoals: e.target.value })} rows={6} /></Field>
              <Field label="Prerequisites — one per line"><textarea value={form.prerequisites} onChange={(e) => setForm({ ...form, prerequisites: e.target.value })} rows={6} /></Field>
              <Field label="Safety notes — one per line"><textarea value={form.safetyNotes} onChange={(e) => setForm({ ...form, safetyNotes: e.target.value })} rows={6} /></Field>
              <Field label="Extension activities — one per line" wide><textarea value={form.extensionActivities} onChange={(e) => setForm({ ...form, extensionActivities: e.target.value })} rows={5} /></Field>
            </div>
          </section>

          <section className="studio-card">
            <div className="studio-section-title studio-section-title-actions">
              <span>04</span>
              <div><h3>Modules &amp; lessons</h3><p>Build the full curriculum with images, video, activities, deliverables, and teaching notes.</p></div>
              <button type="button" onClick={addModule}>+ Add module</button>
            </div>
            {!selectedId ? <p className="studio-empty">Save the workshop draft to unlock the curriculum builder.</p> : selected?.workshop_modules.length ? (
              <div className="studio-modules">
                {selected.workshop_modules.map((module, index) => (
                  <ModuleEditor key={module.id} module={module} index={index} total={selected.workshop_modules.length} onRefresh={() => refresh(selectedId)} />
                ))}
              </div>
            ) : <p className="studio-empty">No modules yet. Add the first module to begin.</p>}
          </section>

          {selected && (
            <section className="studio-delete-zone">
              <div><b>Danger zone</b><p>Deleting a workshop removes every module and lesson inside it.</p></div>
              <button type="button" onClick={removeWorkshop}>Delete workshop</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
