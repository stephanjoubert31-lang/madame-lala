/* Bandeau défilant en boucle continue (pur CSS).
   La piste est dupliquée pour un défilement sans couture. */
export default function Marquee({
  items,
  dark = false,
  duration = 28,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  duration?: number;
  className?: string;
}) {
  const color = dark ? "#C9A84C" : "#3D1F0D";
  const separator = (
    <span aria-hidden="true" style={{ color: "#C9A84C", margin: "0 2.2rem", fontSize: "0.6em" }}>
      ✦
    </span>
  );
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="inline-flex items-center">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="inline-flex items-center">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color,
                  }}
                >
                  {item}
                </span>
                {separator}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
