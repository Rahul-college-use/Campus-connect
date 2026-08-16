import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
//preview hona chahiye admin side se h aur v perimum kro 

export default function PostPhoto() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [eventTag, setEventTag] = useState("HackCampus 2026");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    alert("Photo posted to campus gallery!");
    navigate("/gallery");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">Post Photo to Gallery</h1>
        <p className="text-xs text-zinc-500 mb-6">Upload highlights and memorable moments from campus events</p>

        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          {/* File Upload Area */}
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-6 transition hover:border-zinc-400 bg-zinc-50/50">
            {selectedImage ? (
              <div className="relative w-full">
                <img src={selectedImage} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-2 text-xs font-medium text-rose-600 hover:underline"
                >
                  Remove & pick another
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                <span className="font-semibold text-zinc-900">Click to upload image</span>
                <span className="text-[11px] text-zinc-400 mt-1">PNG, JPG or WEBP (Max 5MB)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Associated Event</label>
            <select
              value={eventTag}
              onChange={(e) => setEventTag(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none bg-white"
            >
              <option>HackCampus 2026</option>
              <option>Full-Stack Web Dev Workshop</option>
              <option>Inter-College Cricket League</option>
              <option>Campus Life & General</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Caption</label>
            <input
              type="text"
              placeholder="e.g. Winners of the 24-hour coding sprint receiving awards"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedImage}
            className="w-full rounded-lg bg-zinc-900 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            Post to Campus Gallery
          </button>
        </form>
      </div>
    </div>
  );
}