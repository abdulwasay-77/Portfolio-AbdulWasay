import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time from the profile data. Uses the
 * same lattice motif and palette as the site so a shared link looks
 * like the page it opens.
 */
export default function OpengraphImage() {
  const spokes: Array<[number, number]> = [
    [930, 110], [1090, 210], [1120, 400], [990, 530], [800, 500], [760, 250],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#07080b",
          color: "#f2f5f9",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", inset: 0 }}
        >
          {spokes.map(([x, y], i) => (
            <line key={`s${i}`} x1="940" y1="330" x2={x} y2={y} stroke="#1e3a52" strokeWidth="2" />
          ))}
          {spokes.map(([x, y], i) => {
            const [nx, ny] = spokes[(i + 1) % spokes.length];
            return <line key={`r${i}`} x1={x} y1={y} x2={nx} y2={ny} stroke="#1e3a52" strokeWidth="1.5" />;
          })}
          {spokes.map(([x, y], i) => (
            <circle key={`n${i}`} cx={x} cy={y} r="6" fill="#3da9fc" />
          ))}
          <circle cx="940" cy="330" r="22" fill="#3da9fc" />
          <circle cx="940" cy="330" r="9" fill="#dcefff" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            width: "70%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#78849a",
              marginBottom: 28,
            }}
          >
            {profile.eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#9ba6b6",
              marginTop: 28,
              lineHeight: 1.25,
            }}
          >
            {profile.headline.lead}&nbsp;
            <span style={{ color: "#3da9fc" }}>{profile.headline.accent}.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
