import type { WorkshopLesson, WorkshopProgram } from "@/lib/luxContent";
import * as tus from "tus-js-client";
import { supabase, supabasePublishableKey, supabaseUrl } from "@/lib/supabase";

export type WorkshopStatus = "draft" | "published";

export interface WorkshopLessonRow {
  id: number;
  module_id: number;
  title: string;
  duration: string;
  overview: string;
  objectives: string[];
  activity: string;
  deliverable: string;
  tips: string[];
  check_in: string;
  content: string;
  image_url: string | null;
  video_url: string | null;
  resources: Array<{ title: string; url: string; type?: string }>;
  order_index: number;
}

export interface WorkshopModuleRow {
  id: number;
  workshop_id: number;
  title: string;
  description: string;
  order_index: number;
  workshop_lessons: WorkshopLessonRow[];
}

export interface WorkshopRow {
  id: number;
  slug: string;
  audience: "Lux Automaton" | "Lux AI Kids";
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  age_band: string;
  duration: string;
  description: string;
  outcome: string;
  image_url: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  materials: string[];
  learning_goals: string[];
  prerequisites: string[];
  safety_notes: string[];
  extension_activities: string[];
  status: WorkshopStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  source_type?: string | null;
  source_urls?: string[];
  source_summary?: string;
  generated_by?: string | null;
  workshop_modules: WorkshopModuleRow[];
}

const WORKSHOP_SELECT = `
  *,
  workshop_modules (
    *,
    workshop_lessons (*)
  )
`;

export function sortWorkshop(row: WorkshopRow): WorkshopRow {
  return {
    ...row,
    workshop_modules: [...(row.workshop_modules || [])]
      .sort((a, b) => a.order_index - b.order_index)
      .map((module) => ({
        ...module,
        workshop_lessons: [...(module.workshop_lessons || [])].sort((a, b) => a.order_index - b.order_index),
      })),
  };
}

export async function fetchWorkshops(includeDrafts = false): Promise<WorkshopRow[]> {
  let query = supabase
    .from("workshops")
    .select(WORKSHOP_SELECT)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (!includeDrafts) query = query.eq("status", "published");

  const { data, error } = await query;
  if (error) throw error;
  return ((data || []) as unknown as WorkshopRow[]).map(sortWorkshop);
}

export function workshopRowToProgram(row: WorkshopRow): WorkshopProgram {
  const lessons: WorkshopLesson[] = row.workshop_modules.flatMap((module) =>
    module.workshop_lessons.map((lesson) => ({
      title: lesson.title,
      duration: lesson.duration,
      moduleTitle: module.title,
      overview: lesson.overview || lesson.content,
      objectives: lesson.objectives || [],
      activity: lesson.activity,
      deliverable: lesson.deliverable,
      tips: lesson.tips || [],
      checkIn: lesson.check_in,
      content: lesson.content,
      image: lesson.image_url || undefined,
      video: lesson.video_url || undefined,
      resources: lesson.resources || [],
    })),
  );

  return {
    slug: row.slug,
    audience: row.audience,
    title: row.title,
    level: row.level,
    ageBand: row.age_band,
    duration: row.duration,
    lessons,
    image: row.image_url || "/images/lux-world-hero.png",
    thumbnail: row.thumbnail_url || row.image_url || "/images/page-hero-circuit.png",
    brandLogo: row.audience === "Lux AI Kids"
      ? "/images/lux-ai-kids-brand/lux-ai-kids-logo.png"
      : "/images/lux-automaton-brand/lux-automaton-logo.png",
    video: row.video_url || undefined,
    outcome: row.outcome,
    materials: row.materials || [],
    description: row.description,
    learningGoals: row.learning_goals || [],
    prerequisites: row.prerequisites || [],
    safetyNotes: row.safety_notes || [],
    extensionActivities: row.extension_activities || [],
  };
}

export async function uploadWorkshopMedia(
  file: File,
  folder: string,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "");
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Your admin session expired. Sign in again before uploading media.");

  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${supabaseUrl}/storage/v1/upload/resumable`,
      retryDelays: [0, 1000, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${accessToken}`,
        apikey: supabasePublishableKey,
        "x-upsert": "false",
      },
      uploadSize: file.size,
      chunkSize: 6 * 1024 * 1024,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: "workshop-media",
        objectName: path,
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
      },
      onError: reject,
      onProgress: (uploaded, total) => onProgress?.(Math.round((uploaded / total) * 100)),
      onSuccess: () => resolve(supabase.storage.from("workshop-media").getPublicUrl(path).data.publicUrl),
    });

    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length) upload.resumeFromPreviousUpload(previousUploads[0]);
      upload.start();
    }).catch(reject);
  });
}

export function slugifyWorkshopTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
