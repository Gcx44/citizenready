import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LeafReady — Canadian Citizenship Test Practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#1c1917",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        gap: 24,
      }}
    >
      {/* Maple leaf SVG */}
      <svg
        viewBox="0 0 36 36"
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#D42B2B"
          d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292c-.666-.625 1.542-10.5 1.086-10.698-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282-.456.198 1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5-3.125.312-3.125 1 8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229.576.496 3.839-.83 10.417-.957V35c0 .553.448 1 1 1 .553 0 1-.447 1-1v-6.04c6.577.127 9.841 1.453 10.417.957.496-.428-2.979-2.694-2.417-3.229.562-.536 9-5.084 9-5.771z"
        />
      </svg>

      {/* Title */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#f5f5f4",
          letterSpacing: "-2px",
        }}
      >
        LeafReady
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 28,
          color: "#D42B2B",
          fontWeight: 600,
        }}
      >
        Canadian Citizenship Test Practice
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 8,
        }}
      >
        {[
          ["385+", "questions"],
          ["Bilingual", "EN / FR"],
          ["Free", "always"],
        ].map(([value, label]) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "#f5f5f4", fontSize: 24, fontWeight: 700 }}>
              {value}
            </span>
            <span style={{ color: "#78716c", fontSize: 16 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* URL */}
      <div style={{ fontSize: 20, color: "#57534e", marginTop: 8 }}>
        leafready.ca
      </div>
    </div>,
    size,
  );
}
