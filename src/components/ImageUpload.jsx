import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * ImageUpload — uploads a photo to Supabase Storage and returns the public URL.
 * Props:
 *   value      — current image URL (string)
 *   onChange   — called with the new public URL after upload
 *   bucket     — storage bucket name (default: "expert-photos")
 *   label      — label text (default: "Photo")
 *   size       — avatar preview size in px (default: 64)
 */
export const ImageUpload = ({ value, onChange, bucket = "expert-photos", label = "Photo", size = 64 }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("File must be under 5 MB"); return; }

    setError("");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-600">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div
          className="shrink-0 overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100"
          style={{ width: size, height: size }}
        >
          {value ? (
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-400 text-xs font-bold">
              Photo
            </div>
          )}
        </div>

        {/* Upload button */}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-bold text-zinc-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50"
          >
            {uploading ? "Uploading…" : value ? "Change photo" : "Upload photo"}
          </button>
          <p className="text-[11px] text-zinc-400">JPG, PNG or WebP · max 5 MB</p>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};
