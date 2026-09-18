import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og renders this JSX with Satori, which only reads inline styles (no
// classNames or design tokens), so the brand hex values are repeated here by
// necessity. Uses the default sans rather than DM Sans — it keeps the build free
// of font-bundling, and the palette carries the brand.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <span
        style={{
          fontSize: "24px",
          color: "#4A4A4A",
          letterSpacing: "0.14em",
        }}
      >
        EMMANUEL JOE LETSU, SOFTWARE ENGINEER, ACCRA
      </span>

      <div
        style={{
          display: "flex",
          fontSize: "88px",
          fontWeight: 700,
          color: "#111111",
          lineHeight: 1.06,
          letterSpacing: "-0.04em",
          maxWidth: "900px",
        }}
      >
        I build software the way I&apos;d want to inherit it
        <span style={{ color: "#3B2A6B" }}>.</span>
      </div>

      <span
        style={{
          fontSize: "34px",
          fontWeight: 700,
          color: "#111111",
          letterSpacing: "-0.04em",
        }}
      >
        Joe<span style={{ color: "#3B2A6B" }}>.</span>
      </span>
    </div>,
    { ...size },
  );
}
