import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface ProgramaSexoChartProps {
  data: { causa: string; Masculino: number; Feminino: number }[];
}

const ProgramaSexoChart = ({ data }: ProgramaSexoChartProps) => {
  return (
    <ChartSection title="Perfil de Atendimento" description="Perfil × Gênero">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ left: 10 }}>
          <XAxis
            dataKey="causa"
            tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
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
            dataKey="Masculino"
            fill="#6a994e"
            radius={[6, 6, 0, 0]}
            barSize={26}
          />
          <Bar
            dataKey="Feminino"
            fill="#bc4749"
            radius={[6, 6, 0, 0]}
            barSize={26}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default ProgramaSexoChart;
