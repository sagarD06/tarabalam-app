"use client";

import { Panchang } from "@/lib/types";
import { useCallback, useState } from "react";
import PanchangCard from "./PanchangCard";
import TarabalamChecker from "./TarabalamCard";

export default function HomeClient() {
  const [panchang, setPanchang] = useState<Panchang | null>(null);

  const handlePanchangLoad = useCallback((panchang: Panchang) => {
    setPanchang(panchang);
  }, []);

  return (
    <div className="space-y-6">
      <PanchangCard onPanchangLoad={handlePanchangLoad} />
      <TarabalamChecker panchang={panchang} />
    </div>
  );
}