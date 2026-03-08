"use client";

import { useState } from "react";
import { getTarabalam } from "@/app/actions/tarabalam";
import type { Panchang, TaraDetail } from "@/lib/types";
import { NAKSHATRAS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";

// ────────────────────────────────
// Types
// ────────────────────────────────
type TarabalamState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; tarabalam: TaraDetail };

type Props = {
  panchang: Panchang | null;
};

// ────────────────────────────────
// Helpers
// ────────────────────────────────
function getResultStyles(result: TaraDetail["result"]) {
  switch (result) {
    case "auspicious":
      return {
        card: "border-auspicious/50 bg-auspicious/5",
        badge: "bg-auspicious/10 text-auspicious border-auspicious/30",
        dot: "bg-auspicious",
        label: "Auspicious ✨",
      };
    case "inauspicious":
      return {
        card: "border-inauspicious/50 bg-inauspicious/5",
        badge: "bg-inauspicious/10 text-inauspicious border-inauspicious/30",
        dot: "bg-inauspicious",
        label: "Inauspicious ⚠️",
      };
    case "neutral":
      return {
        card: "border-neutral-star/50 bg-neutral-star/5",
        badge: "bg-neutral-star/10 text-neutral-star border-neutral-star/30",
        dot: "bg-neutral-star",
        label: "Neutral ⚡",
      };
  }
}

// ────────────────────────────────
// Result Card
// ────────────────────────────────
function ResultCard({ tarabalam }: { tarabalam: TaraDetail }) {
  const styles = getResultStyles(tarabalam.result);

  return (
    <Card className={`w-full min-h-40 border ${styles.card} transition-all duration-500`}>
      <CardContent className="pt-6 space-y-4">

        {/* Result badge */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        {/* Tara group */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Tara
          </p>
          <h3 className="text-2xl font-bold text-foreground">
            {tarabalam.tara}
            <span className="text-muted-foreground text-lg font-normal ml-2">
              #{tarabalam.taraNumber}
            </span>
          </h3>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tarabalam.description}
        </p>

      </CardContent>
    </Card>
  );
}

// ────────────────────────────────
// Main Component
// ────────────────────────────────
export default function TarabalamChecker({ panchang }: Props) {
  const [tarabalamState, setTarabalamState] = useState<TarabalamState>({ status: "idle" });
  const [birthNakshatraId, setBirthNakshatraId] = useState<number | null>(null);

  const handleCheck = async () => {
    if (!birthNakshatraId || !panchang) return;

    setTarabalamState({ status: "loading" });
    try {
      const tarabalam = await getTarabalam(
        birthNakshatraId,
        panchang.nakshatra.id
      );
      if (!tarabalam) throw new Error("Failed to compute tarabalam");
      setTarabalamState({ status: "success", tarabalam });
    } catch (error) {
      setTarabalamState({
        status: "error",
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const isDisabled =
    !birthNakshatraId ||
    !panchang ||
    tarabalamState.status === "loading";

  return (
    <div className="w-full space-y-4">

      {/* Birth Nakshatra Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Your Birth Nakshatra
        </label>
        <Select
          value={birthNakshatraId?.toString() ?? ""}
          onValueChange={(val) => {
            setBirthNakshatraId(Number(val));
            // Reset result when nakshatra changes
            setTarabalamState({ status: "idle" });
          }}
        >
          <SelectTrigger className="w-full border-border bg-card">
            <SelectValue placeholder="Select your birth nakshatra" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {NAKSHATRAS.map((name, index) => (
              <SelectItem
                key={index + 1}
                value={(index + 1).toString()}
                className="text-foreground hover:bg-primary/10"
              >
                {index + 1}. {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Check Button */}
      <Button
        onClick={handleCheck}
        disabled={isDisabled}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        {tarabalamState.status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Check Tarabalam
          </>
        )}
      </Button>

      {/* Error */}
      {tarabalamState.status === "error" && (
        <p className="text-sm text-inauspicious">{tarabalamState.message}</p>
      )}

      {/* Result Card */}
      {tarabalamState.status === "success" && (
        <ResultCard tarabalam={tarabalamState.tarabalam} />
      )}

    </div>
  );
}