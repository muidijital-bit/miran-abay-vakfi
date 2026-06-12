import React from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=75&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=75&w=400&auto=format&fit=crop",
];

/* Her sütun için görsel listesini offset ile döndür, çift kopyala */
function columnImages(offset: number): string[] {
  const rotated = [...IMAGES.slice(offset), ...IMAGES.slice(0, offset)];
  return [...rotated, ...rotated]; // çift → seamless loop
}

const COLUMNS = [
  { offset: 0, duration: 85,  blur: 3.5 },
  { offset: 4, duration: 105, blur: 2   },
  { offset: 7, duration: 75,  blur: 4   },
  { offset: 2, duration: 95,  blur: 2.5 },
  { offset: 5, duration: 80,  blur: 3   },
];

export default function SpiralHero() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#111",
      }}
    >
      {/* ── GÖRSEL DUVARI ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          gap: "5px",
        }}
      >
        {COLUMNS.map((col, ci) => (
          <div
            key={ci}
            style={{ flex: 1, overflow: "hidden" }}
          >
            <div
              style={{
                animation: `flowUp ${col.duration}s linear infinite`,
                willChange: "transform",
              }}
            >
              {columnImages(col.offset).map((src, ii) => (
                <img
                  key={ii}
                  src={src}
                  loading={ii < 4 ? "eager" : "lazy"}
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "3 / 4",
                    objectFit: "cover",
                    filter: `blur(${col.blur}px)`,
                    marginBottom: "5px",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── OVERLAY: üst-alt solma + genel koyuluk ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0.10) 75%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── METİN: frosted glass kart ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            borderRadius: "1.5rem",
            padding: "clamp(1.75rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem)",
            textAlign: "center",
            maxWidth: "90vw",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "1.25rem",
            }}
          >
            MERHAMET · DAYANIŞMA · UMUT
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 86px)",
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 1px 12px rgba(0,0,0,0.35)",
            }}
          >
            <span style={{ display: "block" }}>Her El</span>
            <span style={{ display: "block", fontStyle: "italic", color: "#4ab82a" }}>
              Bir Umut,
            </span>
            <span style={{ display: "block" }}>Her Adım Değişim.</span>
          </h1>
        </div>
      </div>

      {/* ── SCROLL CÜSÜ ── */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: 1,
            height: 36,
            background: "rgba(255,255,255,0.35)",
          }}
        />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Keşfet
        </span>
      </div>
    </div>
  );
}
