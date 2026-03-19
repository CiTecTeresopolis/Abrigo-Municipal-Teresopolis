import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import ChartSection from "./ChartSection";
import { CHART_COLORS } from "@/data/abrigo-data";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface DistritoChartProps {
  data: { name: string; value: number }[];
}

const OrigemDentroChart = ({ data }: DistritoChartProps) => {
  return (
    <ChartSection
      title="DISTRIBUIÇÃO POR BAIRRO DE ORIGEM (MUNICÍPIO)"
      description="Análise do perfil por bairro de origem (%)"
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
            label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                // Se index for 0, usa a primeira cor. Se não, usa a última do array.
                fill={
                  index === 0
                    ? CHART_COLORS[CHART_COLORS.length - 1]
                    : CHART_COLORS[index]
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number, name: string) => [
              value.toLocaleString("pt-BR"),
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={9}
            formatter={(value) => (
              <span className="text-xs text-foreground ml-1 font-medium">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default OrigemDentroChart;
