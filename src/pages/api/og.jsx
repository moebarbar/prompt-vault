import { ImageResponse } from "next/og";

export const config = { runtime: "edge" };

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "8,000+ Professional AI Prompts";
  const sub = searchParams.get("sub") || "Copy. Paste. Get real results.";
  const category = searchParams.get("category") || null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Indigo glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Decorative prompt cards */}
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            opacity: 0.6,
            transform: "rotate(3deg)",
          }}
        >
          {["Cold Email Sequence", "SEO Blog Outline", "SaaS Pitch Script"].map((label, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? "#4f46e5" : "#18181b",
                border: "2px solid",
                borderColor: i === 0 ? "#6366f1" : "#27272a",
                borderRadius: "12px",
                padding: "12px 18px",
                color: i === 0 ? "white" : "#a1a1aa",
                fontSize: "14px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: "220px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: i === 0 ? "rgba(255,255,255,0.7)" : "#3f3f46",
                }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            height: "100%",
          }}
        >
          {/* Top: Logo + category badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Logo wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#4f46e5",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                ⚡
              </div>
              <span style={{ color: "white", fontSize: "24px", fontWeight: "900", letterSpacing: "-0.5px" }}>
                PromptVault
              </span>
            </div>
            {category && (
              <div
                style={{
                  background: "rgba(79,70,229,0.2)",
                  border: "1.5px solid rgba(99,102,241,0.5)",
                  borderRadius: "999px",
                  padding: "4px 14px",
                  color: "#a5b4fc",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Center: Main headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "680px" }}>
            <div
              style={{
                color: "white",
                fontSize: title.length > 40 ? "52px" : "64px",
                fontWeight: "900",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#a1a1aa",
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: 1.4,
              }}
            >
              {sub}
            </div>
          </div>

          {/* Bottom: Stats row */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[
              { num: "8,000+", label: "Expert prompts" },
              { num: "28", label: "Categories" },
              { num: "Free", label: "To get started" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ color: "#4f46e5", fontSize: "22px", fontWeight: "900" }}>{stat.num}</span>
                <span style={{ color: "#52525b", fontSize: "14px", fontWeight: "600" }}>{stat.label}</span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <div
              style={{
                background: "#4f46e5",
                borderRadius: "12px",
                padding: "12px 24px",
                color: "white",
                fontSize: "16px",
                fontWeight: "800",
                letterSpacing: "-0.3px",
              }}
            >
              promptvault.io →
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
