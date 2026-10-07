import type { CSSProperties } from "react";

const UPPER_WAVES = [
  "M-140 92C150-42 390 226 720 70S1260-8 1740 112",
  "M-140 112C154-24 394 246 724 88S1264 8 1740 132",
  "M-140 132C158-6 398 266 728 106S1268 24 1740 152",
  "M-140 152C162 12 402 286 732 124S1272 40 1740 172",
  "M-140 172C166 30 406 306 736 142S1276 56 1740 192",
  "M-140 192C170 48 410 326 740 160S1280 72 1740 212",
  "M-140 212C174 66 414 346 744 178S1284 88 1740 232",
  "M-140 232C178 84 418 366 748 196S1288 104 1740 252",
  "M-140 252C182 102 422 386 752 214S1292 120 1740 272",
] as const;

const LOWER_WAVES = [
  "M-140 620C160 448 400 846 760 656S1260 500 1740 704",
  "M-140 642C164 468 404 868 764 676S1264 520 1740 726",
  "M-140 664C168 488 408 890 768 696S1268 540 1740 748",
  "M-140 686C172 508 412 912 772 716S1272 560 1740 770",
  "M-140 708C176 528 416 934 776 736S1276 580 1740 792",
  "M-140 730C180 548 420 956 780 756S1280 600 1740 814",
  "M-140 752C184 568 424 978 784 776S1284 620 1740 836",
  "M-140 774C188 588 428 1000 788 796S1288 640 1740 858",
  "M-140 796C192 608 432 1022 792 816S1292 660 1740 880",
] as const;

type WaveBackgroundProps = {
  intensity?: number;
  glowOpacity?: number;
  segments?: number;
  color?: string;
  align?: "center" | "bottom";
  className?: string;
};

type WaveBackgroundStyle = CSSProperties & {
  "--wave-color": string;
  "--wave-upper-opacity": number;
  "--wave-lower-opacity": number;
  "--wave-mobile-upper-opacity": number;
  "--wave-mobile-lower-opacity": number;
  "--wave-glow-opacity": number;
};

export function WaveBackground({
  intensity = 0.12,
  glowOpacity = 0.08,
  segments = 1,
  color = "#0D5C63",
  align = "center",
  className = "",
}: WaveBackgroundProps) {
  const safeSegments = Math.max(1, Math.round(segments));
  const style: WaveBackgroundStyle = {
    "--wave-color": color,
    "--wave-upper-opacity": intensity,
    "--wave-lower-opacity": intensity * 0.85,
    "--wave-mobile-upper-opacity": intensity * 0.76,
    "--wave-mobile-lower-opacity": intensity * 0.66,
    "--wave-glow-opacity": glowOpacity,
  };

  return (
    <div aria-hidden="true" data-draw-waves className={`wave-background ${className}`.trim()} style={style}>
      <svg
        viewBox={`0 0 1600 ${900 * safeSegments}`}
        preserveAspectRatio={align === "bottom" ? "xMidYMax slice" : "xMidYMid slice"}
      >
        {Array.from({ length: safeSegments }, (_, segmentIndex) => (
          <g key={segmentIndex} transform={`translate(0 ${segmentIndex * 900})`}>
            <g className="wave-background-group wave-background-group--upper">
              {UPPER_WAVES.map((path, pathIndex) => (
                <path
                  key={path}
                  pathLength={1}
                  className={pathIndex % 2 ? "wave-background-detail" : undefined}
                  d={path}
                />
              ))}
            </g>

            <g className="wave-background-group wave-background-group--lower">
              {LOWER_WAVES.map((path, pathIndex) => (
                <path
                  key={path}
                  pathLength={1}
                  className={pathIndex % 2 ? "wave-background-detail" : undefined}
                  d={path}
                />
              ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
