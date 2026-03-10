import { useState } from "react";
import { ABRIGO_UNITS } from "@/data/abrigo-data";
import { useAbrigoData } from "@/hooks/useAbrigoData";
import KPICard from "@/components/dashboard/KPICard";
import SexoChart from "@/components/dashboard/SexoChart";
import BairrosChart from "@/components/dashboard/BairrosChart";
import DistritoChart from "@/components/dashboard/DistritoChart";
import { Users, MapPin, BookOpen, UserCheck } from "lucide-react";
import ProgramasChart from "@/components/dashboard/ProgramasChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FaixaEtariaChart from "@/components/dashboard/FaixaEtariaChart";
import EscolaridadeChart from "@/components/dashboard/EscolaridadeChart";
import ProgramaSexoChart from "@/components/dashboard/ProgramaSexoChart";
import FaixaEtariaProgramaChart from "@/components/dashboard/FaixaEtariaProgramaChart";

const Index = () => {
  const [selectedUnit, setSelectedUnit] = useState(ABRIGO_UNITS[0].id);
  const { data, loading } = useAbrigoData(selectedUnit);
  const unit = ABRIGO_UNITS.find((u) => u.id === selectedUnit);

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 md:px-6 py-8 md:py-12">
        <DashboardHeader
          selectedUnit={selectedUnit}
          onUnitChange={setSelectedUnit}
        />

        {loading || !data ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-muted-foreground text-lg animate-pulse">
              Carregando dados...
            </div>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 mb-10">
              <KPICard
                title="Total de Atendimentos"
                value={data.total}
                icon={Users}
                accent
                description={""}
              />

              <KPICard
                title="Principal Causa"
                value={[...data.causaData].sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
                icon={BookOpen}
                description="Causa mais frequente"
              />

              <KPICard
                title="Principal Origem"
                value={[...data.bairrosData].sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
                icon={MapPin}
                description=""
              />


              <KPICard
                title="Média de Idade"
                value={data.mediaIdade}
                icon={UserCheck}
                description="Média geral"
              />

              <KPICard
                title="Público Feminino"
                value={`${(((data.sexoData.find((s) => s.name === "Feminino")?.value || 0) / data.total) * 100).toFixed(1)}%`}
                icon={UserCheck}
                description={`${data.sexoData.find((s) => s.name === "Feminino")?.value || 0} atendimentos`}
              />
              <KPICard
                title="Público Masculino"
                value={`${(((data.sexoData.find((s) => s.name === "Masculino")?.value || 0) / data.total) * 100).toFixed(1)}%`}
                icon={UserCheck}
                description={`${data.sexoData.find((s) => s.name === "Masculino")?.value || 0} atendimentos`}
              />
            </div>

            {/* Row 1: Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-5">
              <SexoChart data={data.sexoData} />
              <FaixaEtariaChart data={data.faixaEtariaData} />
              <EscolaridadeChart data={data.escolaridadeData} />
            </div>

            {/* Row 2: Cross analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-5">
              <ProgramaSexoChart data={data.causaPorSexo} />
              <FaixaEtariaProgramaChart data={data.faixaEtariaPorCausa} />
            </div>

            {/* Row 3: Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 mb-5">
              <BairrosChart data={data.bairrosData.slice(0, 10)} />
              <DistritoChart data={data.causaData} />
              <div className="md:col-span-2">
                <ProgramasChart data={data.mesData} />
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-center items-center text-center gap-6 md:gap-8 py-8 text-xs text-muted-foreground/60 font-medium">
          <img
            style={{ width: 250, height: 100 }}
            src="cie.png"
            alt="CIE Logo"
            className="object-contain"
          />
          <p>
            Prefeitura Municipal de Teresópolis // 2026 // Departamento de
            Governança e Dados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
