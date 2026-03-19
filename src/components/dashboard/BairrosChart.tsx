import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface BairrosChartProps {
  data: { name: string; value: number }[];
}

const BairrosChart = ({ data }: BairrosChartProps) => {
  return (
    <ChartSection title="Origem" description="Top 5 origens">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            width={130}
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [
              value.toLocaleString("pt-BR"),
              "Atendimentos",
            ]}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            fill="#a7c957"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default BairrosChart;
