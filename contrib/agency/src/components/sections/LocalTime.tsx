"use client";

import { useEffect, useState } from "react";

/** Live local time in Damietta (Africa/Cairo) — rendered client-side only. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo", timeZoneName: "short" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time dir="ltr" className="font-latin tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
