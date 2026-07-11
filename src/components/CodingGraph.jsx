import { useEffect, useRef, useState } from "react";
import { fetchCombinedCodingGraph } from "../utils/codingGraph";

const CELL_SIZE = 10;
const CELL_GAP = 3;
const MD_BREAKPOINT = 760;

const DAY_LABELS = [
  { row: 1, label: "Mon" },
  { row: 3, label: "Wed" },
  { row: 5, label: "Fri" },
];

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getGraphWidth(weekCount) {
  return 27 + 9 + weekCount * (CELL_SIZE + CELL_GAP) - CELL_GAP;
}

function useCountUp(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || !target) {
      setValue(0);
      return;
    }

    let frameId = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, active]);

  return value;
}

export default function CodingGraph() {
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const graphContainerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetchCombinedCodingGraph()
      .then((data) => {
        if (!cancelled) {
          setGraphData(data);
          setError("");
        }
      })
      .catch((fetchError) => {
        if (!cancelled) {
          setError(fetchError.message || "Unable to load coding graph");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const rowHeight = CELL_SIZE + CELL_GAP;
  const graphWidth = graphData ? getGraphWidth(graphData.weeks.length) : 0;
  const graphHeight = 16 + CELL_GAP + rowHeight * 7 - CELL_GAP;
  const animatedTotal = useCountUp(graphData?.totalContributions ?? 0, Boolean(graphData));

  useEffect(() => {
    if (!graphData || !graphContainerRef.current) {
      return undefined;
    }

    const updateScale = () => {
      const container = graphContainerRef.current;
      if (!container) {
        return;
      }

      const isMediumOrBelow = window.innerWidth < MD_BREAKPOINT;
      if (!isMediumOrBelow) {
        setScale(1);
        return;
      }

      const availableWidth = container.clientWidth;
      const nextScale = Math.min(1, availableWidth / graphWidth);
      setScale(nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(graphContainerRef.current);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [graphData, graphWidth]);

  return (
    <section className="w-full flex justify-center py-8 md:py-10 animate-fade-up">
      <div className="flex w-[92%] max-w-6xl flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-white text-lg md:text-xl font-poppins font-semibold">
            Coding Graph
          </h2>

          {graphData && (
            <p className="text-[#7d8590] text-xs md:text-sm font-poppins">
              <span className="text-white font-semibold tabular-nums">
                {animatedTotal.toLocaleString()} contributions
              </span>{" "}
              in the last year
            </p>
          )}
        </div>

        <p className="text-[#7d8590] text-xs font-poppins -mt-1">
          Combined GitHub + LeetCode activity
        </p>

        {loading && (
          <div
            className="animate-pulse rounded-[2px] bg-[#21262d]"
            style={{ height: graphHeight }}
          />
        )}

        {error && (
          <p className="text-red-400 text-sm font-poppins">{error}</p>
        )}

        {graphData && (
          <>
            <div
              ref={graphContainerRef}
              className="w-full overflow-hidden md:overflow-visible"
              style={{ height: graphHeight * scale }}
            >
              <div
                style={{
                  width: graphWidth,
                  transform: scale < 1 ? `scale(${scale})` : undefined,
                  transformOrigin: "top left",
                }}
              >
                <div className="flex gap-[9px]">
                  <div className="w-[27px] shrink-0">
                    <div style={{ height: 16, marginBottom: CELL_GAP }} />
                    <div className="relative" style={{ height: rowHeight * 7 - CELL_GAP }}>
                      {DAY_LABELS.map(({ row, label }) => (
                        <span
                          key={label}
                          className="absolute left-0 text-[10px] leading-none text-[#7d8590] font-poppins"
                          style={{ top: row * rowHeight + 1 }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      className="flex"
                      style={{ gap: CELL_GAP, height: 16, marginBottom: CELL_GAP }}
                    >
                      {graphData.monthLabels.map((label, index) => (
                        <div
                          key={index}
                          style={{ width: CELL_SIZE }}
                          className="text-[10px] leading-none text-[#7d8590] font-poppins whitespace-nowrap"
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    <div className="flex" style={{ gap: CELL_GAP }}>
                      {graphData.weeks.map((week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="flex flex-col origin-bottom animate-graph-column-in"
                          style={{
                            gap: CELL_GAP,
                            animationDelay: `${weekIndex * 12}ms`,
                            opacity: 0,
                          }}
                        >
                          {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const day = week[dayIndex];

                            if (!day) {
                              return (
                                <div
                                  key={dayIndex}
                                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                                />
                              );
                            }

                            return (
                              <div
                                key={day.date}
                                title={`${formatDate(day.date)}: ${day.count} contributions (GitHub ${day.github}, LeetCode ${day.leetcode})`}
                                style={{
                                  width: CELL_SIZE,
                                  height: CELL_SIZE,
                                  backgroundColor: graphData.levelColors[day.level],
                                  borderRadius: 2,
                                }}
                                className="transition-all duration-150 hover:opacity-90 hover:scale-125 hover:z-10"
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-end gap-[3px] text-[10px] text-[#7d8590] font-poppins animate-fade-up"
              style={{ animationDelay: "280ms", opacity: 0 }}
            >
              <span className="mr-1">Less</span>
              {graphData.levelColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: color,
                    borderRadius: 2,
                  }}
                />
              ))}
              <span className="ml-1">More</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
