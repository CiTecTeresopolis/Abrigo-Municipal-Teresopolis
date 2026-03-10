import { AlertTriangle, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  accent?: boolean;
}

const KPICard = ({
  title,
  value,
  icon: Icon,
  description,
  accent,
}: KPICardProps) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 ${accent
          ? "dashboard-gradient text-primary-foreground shadow-lg shadow-primary/20"
          : "glass-card kpi-glow"
        }`}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-1.5">
          <p
            className={`text-[11px] font-semibold uppercase tracking-widest ${accent ? "text-primary-foreground" : "text-muted-foreground"}`}
          >
            {title}
          </p>
          <p className="text-2xl font-black tracking-tight font-mono">
            {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
          </p>
          {description && (
            <p
              className={`text-xs font-medium ${accent ? "text-primary-foreground" : "text-muted-foreground"}`}
            >
              {description}
            </p>
          )}
        </div>
        <div
          className={`p-2.5 rounded-xl ${accent ? "bg-white/10 border border-white/10" : "bg-primary/5 border border-primary/10"}`}
        >
          <Icon
            className={`h-5 w-5`}
            color={Icon == AlertTriangle ? "red" : accent ? "white" : "black"}
          />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
