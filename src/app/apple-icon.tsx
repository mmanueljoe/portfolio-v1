import { ImageResponse } from "next/og";

// iOS home-screen icon. It masks its own rounded corners, so the square is filled
// edge to edge (no transparency, no border radius). The wordmark shortened to
// "J." like the favicon — "Joe." is unreadable at home-screen size. Inline styles
// are required by next/og's Satori renderer, hence the repeated brand hexes.
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
        backgroundColor: "#FFFFFF",
        color: "#111111",
        fontSize: 104,
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      J<span style={{ color: "#3B2A6B" }}>.</span>
    </div>,
    { ...size },
  );
}
