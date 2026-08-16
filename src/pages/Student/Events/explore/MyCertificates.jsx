import React, { useState, useEffect } from "react";
import {
  Award,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  X,
  Search,
  ShieldCheck,
} from "lucide-react";

const INITIAL_CERTIFICATES = [
  {
    id: "CERT-2026-8942",
    eventTitle: "HackCampus 2026 - Annual Hackathon",
    category: "Technical",
    issueDate: "Oct 12, 2026",
    issuer: "Department of Computer Science & Engineering",
    role: "Participant / Finalist",
    credentialId: "GECJ-HC-2026-089",
    previewUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "CERT-2026-1920",
    eventTitle: "Full-Stack Web Architecture Workshop",
    category: "Workshop",
    issueDate: "Oct 18, 2026",
    issuer: "Techobytes Technologies & GEC Jehanabad",
    role: "Successfully Completed",
    credentialId: "GECJ-FSW-1920",
    previewUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "CERT-2026-4412",
    eventTitle: "AI in Production: LLMs & Agents Masterclass",
    category: "Seminar",
    issueDate: "Nov 08, 2026",
    issuer: "AI Club & Google Developer Student Group",
    role: "Attendee",
    credentialId: "GECJ-AI-4412",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MyCertificates() {
  const [certificates] = useState(INITIAL_CERTIFICATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  // Background Scroll Freeze when certificate preview modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  // ESC Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCertificates = certificates.filter(
    (c) =>
      c.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (cert, e) => {
    e?.stopPropagation();
    alert(`Downloading verified certificate for: ${cert.eventTitle}`);
    // Real implementation me PDF/Image download trigger hoga
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Student Achievement Vault
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                My Certificates
              </h1>
              <p className="text-xs text-zinc-500">
                View, verify, and download your official participation and completion certificates.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Certificates Grid */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Total Earned: <strong className="text-zinc-900">{certificates.length} Verified Credentials</strong>
          </span>
        </div>

        {filteredCertificates.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center text-xs text-zinc-500">
            No certificates match your search query.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 cursor-pointer"
            >
              {/* Certificate Thumbnail Preview Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                <img
                  src={cert.previewUrl}
                  alt={cert.eventTitle}
                  className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />

                {/* Verified Badge */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-emerald-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                  <ShieldCheck className="h-3 w-3" /> Verified Credential
                </span>

                {/* Role / Type */}
                <span className="absolute top-3 right-3 rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-zinc-900">
                  {cert.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] text-zinc-300 uppercase tracking-wider font-medium">
                    Credential ID: {cert.credentialId}
                  </p>
                  <p className="text-xs font-semibold truncate mt-0.5">
                    {cert.role}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">
                    {cert.eventTitle}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
                    Issued by: {cert.issuer}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Issued on {cert.issueDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center gap-2 border-t border-zinc-100 pt-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    <Eye className="h-3.5 w-3.5 text-zinc-500" /> Preview
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDownload(cert, e)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Certificate Preview Modal (Background Freeze Active) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCert(null)}
          />

          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-900">
                  Official Certificate Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Certificate Graphic Mockup View */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white text-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 border-2 border-amber-500/40 rounded-xl p-6 sm:p-10 bg-zinc-900/90 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                  Government Engineering College Jehanabad
                </span>
                <h2 className="mt-2 text-lg sm:text-xl font-bold tracking-tight">
                  Certificate of Achievement
                </h2>
                <p className="mt-4 text-xs text-zinc-400">This is proudly presented to</p>
                <p className="mt-1 text-base sm:text-lg font-bold text-white underline decoration-amber-500/60 decoration-2 underline-offset-4">
                  Rahul Kumar (221051)
                </p>
                <p className="mt-4 text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
                  for successfully completing the role of <strong className="text-white">{selectedCert.role}</strong> in{" "}
                  <strong className="text-white">{selectedCert.eventTitle}</strong> organized on {selectedCert.issueDate}.
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4 text-[11px] text-zinc-400">
                  <div>
                    <p className="font-semibold text-zinc-300">{selectedCert.issuer}</p>
                    <p className="text-[10px]">Authorized Signature</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-300">{selectedCert.credentialId}</p>
                    <p className="text-[10px]">Secure Credential ID</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-4 bg-white">
              <span className="text-xs text-zinc-500">
                Issued on {selectedCert.issueDate} • Verified by Campus Connect
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Close
                </button>
                <button
                  onClick={(e) => handleDownload(selectedCert, e)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition"
                >
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}