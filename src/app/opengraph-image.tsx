import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og renders this JSX with Satori, which only reads inline styles (no
// classNames or design tokens), so the brand hex values are repeated here by
// necessity. Uses the default sans rather than DM Sans — the palette carries the
// brand and it keeps the build free of font-bundling.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px",
        backgroundColor: "#FAF6EE",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            backgroundColor: "#C8924A",
          }}
        />
        <span
          style={{
            fontSize: "28px",
            color: "#C8924A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Software Engineer
        </span>
      </div>
      <div
        style={{
          fontSize: "96px",
          fontWeight: 700,
          color: "#1A1A18",
          lineHeight: 1.05,
        }}
      >
        Emmanuel Joe Letsu
      </div>
      <div
        style={{
          fontSize: "36px",
          color: "#555250",
          marginTop: "28px",
          maxWidth: "820px",
        }}
      >
        I build full-stack web applications, from the API to the interface.
      </div>
    </div>,
    { ...size },
  );
}
