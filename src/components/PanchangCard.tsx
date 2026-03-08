"use client";

import { useState, useEffect } from "react";
import { getPanchang } from "@/app/actions/panchang";
import type { Panchang } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

// ────────────────────────────────
// Types
// ────────────────────────────────
type PanchangState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; panchang: Panchang };

type Props = {
  onPanchangLoad: (panchang: Panchang) => void;
};

// ────────────────────────────────
// Helpers
// ────────────────────────────────
function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ────────────────────────────────
// Component
// ────────────────────────────────
export default function PanchangCard({ onPanchangLoad }: Props) {
  const [state, setState] = useState<PanchangState>({ status: "idle" });

  useEffect(() => {
  const fetchPanchang = async () => {
    setState({ status: "loading" });
    try {
      const panchang = await getPanchang();

      if (!panchang) throw new Error("Failed to fetch panchang");

      setState({ status: "success", panchang });
      onPanchangLoad(panchang);

    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  fetchPanchang();
}, [onPanchangLoad]);

  // ────────────────────────────────
  // Loading skeleton
  // ────────────────────────────────
  if (state.status === "idle" || state.status === "loading") {
    return (
      <Card className="w-full bg-card border-border min-h-40">
        <CardContent className="pt-6 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  // ────────────────────────────────
  // Error
  // ────────────────────────────────
  if (state.status === "error") {
    return (
      <Card className="w-full border-inauspicious/50 bg-card min-h-40">
        <CardContent className="pt-6">
          <p className="text-inauspicious text-sm">{state.message}</p>
        </CardContent>
      </Card>
    );
  }

  const { panchang } = state;

  // ────────────────────────────────
  // Success
  // ────────────────────────────────
  return (
    <Card className="w-full bg-card border-border min-h-40">
      <CardContent className="pt-6 space-y-4">

        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">{formatDate(new Date())}</span>
        </div>

        {/* Nakshatra name */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Today&apos;s Nakshatra
          </p>
          <h2 className="text-3xl font-bold text-primary">
            {panchang.nakshatra.name}
          </h2>
        </div>

        {/* Nakshatra duration */}
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="border-border text-muted-foreground gap-1"
          >
            <Clock className="h-3 w-3" />
            {formatTime(panchang.nakshatra.starts_at)}
            {" — "}
            {formatTime(panchang.nakshatra.ends_at)}
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
}