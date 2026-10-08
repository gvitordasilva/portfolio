import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { products } from "@/lib/site";
import type { Locale } from "@/lib/locales";

export const alt = "Gabriel Vitor da Silva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const headline = lang === "pt" ? "Construo produtos digitais que ficam no ar." : "I build digital products that stay live.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(90% 80% at 15% 10%, #0b2a1f 0%, #06070a 55%), radial-gradient(70% 70% at 90% 80%, #1a0f3a 0%, #06070a 60%)",
          color: "#e7e9ee",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#9aa3b2" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#34e5a3",
              color: "#04120c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {profile.initials}
          </div>
          {profile.name} · {profile.role[lang]}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, maxWidth: 960 }}>{headline}</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {products.slice(0, 5).map((p) => (
              <div
                key={p.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 22,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, background: "#34e5a3" }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9aa3b2" }}>
          <span>{profile.siteUrl.replace("https://", "")}</span>
          <span>Java · Spring · React · Next.js</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
