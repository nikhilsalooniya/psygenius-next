"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_BASE = "https://api.psygenius.mentoragenius.de";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${API_BASE}/api/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {
      // fire-and-forget — silently ignore errors
    });
  }, [pathname]);

  return null;
}
