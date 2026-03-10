import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS } from "@/data/abrigo-data";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface FaixaEtariaProgramaChartProps {
  data: Record<string, unknown>[];
}

const FaixaEtariaProgramaChart = ({ data }: FaixaEtariaProgramaChartProps) => {
  return (
    <ChartSection
      title="Faixa Etária por Atendimento"
      description="Distribuição etária por atendimento"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 10 }}>
          <XAxis
            dataKey="causa"
            tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <Legend
            iconType="circle"
            iconSize={9}
            formatter={(value) => (
              <span className="text-xs text-foreground ml-1 font-medium">
                {value}
              </span>
            )}
          />
          <Bar
            dataKey="Criança (0-12)"
            fill={CHART_COLORS[1]}
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
          <Bar
            dataKey="Adolescente (13-18)"
            fill={CHART_COLORS[2]}
            stackId="a"
          />
          <Bar dataKey="Jovem (19-29)" fill={CHART_COLORS[3]} stackId="a" />
          <Bar dataKey="Adulto (30-59)" fill={CHART_COLORS[4]} stackId="a" />
          <Bar
            dataKey="Idoso (60+)"
            fill={CHART_COLORS[5]}
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default FaixaEtariaProgramaChart;
