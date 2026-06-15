import { ImageResponse } from "next/og";

// iOS home-screen icon. It masks its own rounded corners, so the square is filled
// edge to edge (no transparency, no border radius). Gold "E" on ink, matching the
// SVG favicon. Inline styles are required by next/og's Satori renderer.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A1A18",
        color: "#C8924A",
        fontSize: 112,
        fontWeight: 700,
      }}
    >
      E
    </div>,
    { ...size },
  );
}
