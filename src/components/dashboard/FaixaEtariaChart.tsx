import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface FaixaEtariaChartProps {
  data: { name: string; Masculino: number; Feminino: number }[];
}

const FaixaEtariaChart = ({ data }: FaixaEtariaChartProps) => {
  return (
    <ChartSection
      title="Faixa Etária"
      description="Distribuição dos atendidos por idade"
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10 }}
          barGap={6}
          barCategoryGap="20%"
        >
          <XAxis
            type="number"
            tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={110}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
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
            dataKey="Masculino"
            radius={[0, 8, 8, 0]}
            fill="#6a994e"
            barSize={12}
          />
          <Bar
            dataKey="Feminino"
            radius={[0, 8, 8, 0]}
            fill="#bc4749"
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default FaixaEtariaChart;
