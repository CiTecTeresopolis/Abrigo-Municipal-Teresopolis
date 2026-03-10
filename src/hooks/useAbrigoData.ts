import { useState, useEffect } from "react";
import { AggregatedData, loadAbrigoData, ABRIGO_UNITS } from "@/data/abrigo-data";

export function useAbrigoData(unitId: string) {
  const [data, setData] = useState<AggregatedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unit = ABRIGO_UNITS.find((u) => u.id === unitId);
    if (!unit) return;

    setLoading(true);
    loadAbrigoData(unit.csvPath)
      .then(setData)
      .finally(() => setLoading(false));
  }, [unitId]);

  return { data, loading };
}
