import {
  Download,
  FileText,
  AlertTriangle,
  Home,
  GraduationCap,
  Users,
  MapPin,
  BookOpen,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AggregatedData } from "@/data/abrigo-data";

// Componente de Seção com a nova paleta
const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div
        className="p-1.5 rounded-lg"
        style={{ backgroundColor: "#6a994e20" }}
      >
        <Icon className="h-4 w-4" style={{ color: "#386641" }} />
      </div>
      <h3 className="font-semibold text-[#386641]">{title}</h3>
    </div>
    <div className="text-sm text-slate-700 leading-relaxed pl-9 space-y-2">
      {children}
    </div>
  </div>
);

const AnaliseModal = ({
  data,
  year,
}: {
  data?: AggregatedData;
  year: string;
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Analise_dos_Dados_do_CREAS.docx";
    link.download = "Analise_dos_Dados_do_CREAS.docx";
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          style={{
            width: "100%",
            marginBottom: 25,
            borderColor: "#6a994e",
            color: "#386641",
          }}
          className="gap-2 hover:bg-[#6a994e10] transition-all"
        >
          <FileText className="h-4 w-4" />
          Visualizar Análise Sintética
        </Button>
      </DialogTrigger>

      {/* Background do modal usando Vanilla Cream */}
      <DialogContent
        style={{ backgroundColor: "#f8f8f8" }}
        className="max-w-2xl max-h-[85vh] p-0 border-[#a7c957]/30 overflow-hidden shadow-xl"
      >
        <DialogHeader
          className="px-4 sm:px-6 pt-6 pb-4"
          style={{
            background: "linear-gradient(to right, #6a994e15, #a7c95715)",
          }}
        >
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-[#386641]">
            <FileText className="h-5 w-5" />
            Análise dos Dados do Abrigo Municipal – Teresópolis ({year})
          </DialogTitle>
          <DialogDescription className="text-[#386641]/70">
            Diagnóstico completo baseado nos {data?.totalUnique || 0} perfis
            únicos atendidos em {year}.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea
          className="px-4 sm:px-6 pb-2"
          style={{ maxHeight: "calc(85vh - 180px)" }}
        >
          <div className="space-y-6 py-2">
            {/* Visão Geral com Sage Green e Blushed Brick */}
            <div
              className="rounded-xl border p-4 space-y-2"
              style={{ backgroundColor: "#6a994e10", borderColor: "#6a994e30" }}
            >
              <p className="text-sm font-medium text-[#386641]">
                O painel mostra <strong>{data?.total || 0} atendimentos</strong>{" "}
                em {year}, com forte concentração em:
              </p>
              <div className="flex gap-3 flex-wrap">
                {(() => {
                  const topCausas = data?.causaData.slice(0, 2) || [];
                  const totalTop = topCausas.reduce(
                    (sum, causa) => sum + causa.value,
                    0,
                  );
                  return topCausas.map((causa, index) => {
                    const percentage = totalTop
                      ? ((causa.value / totalTop) * 100).toFixed(1)
                      : "0.0";
                    return (
                      <span
                        key={causa.name}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor:
                            index === 0 ? "#bc474920" : "#a7c95730",
                          color: index === 0 ? "#bc4749" : "#386641",
                        }}
                      >
                        {causa.name} – {percentage}%
                      </span>
                    );
                  });
                })()}
              </div>
              <p className="text-xs text-slate-600">
                Esses dois grupos somam{" "}
                <strong>
                  {(
                    (data?.causaData
                      .slice(0, 2)
                      .reduce((sum, causa) => sum + causa.value, 0) /
                      (data?.totalUnique || 1)) *
                      100 || 0
                  ).toFixed(2)}
                  %
                </strong>{" "}
                de toda a demanda.
              </p>
            </div>

            <Separator style={{ backgroundColor: "#a7c95740" }} />

            {/* Seções dinâmicas para as principais causas */}
            {data?.causaData.slice(0, 2).map((causa, index) => (
              <div key={causa.name}>
                <Section
                  icon={index === 0 ? AlertTriangle : Home}
                  title={`${causa.name} (${causa.value} casos${data.totalUnique ? ` – ${((causa.value / data.totalUnique) * 100).toFixed(2)}%` : ""})`}
                >
                  <p>
                    {index === 0 ? (
                      <>
                        Concentração territorial em{" "}
                        <strong>
                          {data.bairrosMunicipioData
                            .slice(0, 5)
                            .map((b) => b.name)
                            .join(", ")}
                        </strong>
                        .
                      </>
                    ) : (
                      <>
                        Maior incidência entre <strong>homens adultos</strong>.
                        Conexão com saúde mental e desemprego.
                      </>
                    )}
                  </p>
                  <div
                    className="rounded-lg p-3 border text-xs"
                    style={{
                      backgroundColor: "#f2e8cf",
                      borderColor: index === 0 ? "#bc474930" : "#6a994e30",
                    }}
                  >
                    <strong
                      style={{ color: index === 0 ? "#bc4749" : "#386641" }}
                    >
                      Indicação:
                    </strong>{" "}
                    {index === 0
                      ? "Necessidade de políticas de proteção à mulher e prevenção à violência."
                      : "Exige políticas intersetoriais de habitação e saúde."}
                  </div>
                </Section>
                <Separator style={{ backgroundColor: "#a7c95740" }} />
              </div>
            ))}

            <Section icon={GraduationCap} title="Escolaridade dos Atendidos">
              <p>
                Predomínio de <strong>fundamental incompleto</strong>. A baixa
                escolaridade é fator de risco social.
              </p>
            </Section>

            <Separator style={{ backgroundColor: "#a7c95740" }} />

            <Section icon={MapPin} title="Diagnóstico Geral">
              <ol className="list-decimal pl-4 space-y-1 text-[#386641]">
                <li>
                  <strong>Violência doméstica</strong> como principal demanda.
                </li>
                <li>
                  <strong>Situação de rua</strong> em crescimento.
                </li>
                <li>
                  <strong>Vulnerabilidade territorial</strong> concentrada.
                </li>
              </ol>
            </Section>

            {/* Conclusão com degradê Sage e Yellow Green */}
            <div
              className="rounded-xl border p-4 shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, #6a994e10 0%, #a7c95710 100%)",
                borderColor: "#6a994e30",
              }}
            >
              <h3 className="font-semibold text-[#386641] mb-2">Conclusão</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Os dados revelam um cenário de{" "}
                <strong>alta vulnerabilidade</strong>. As políticas precisam ser
                intersetoriais e territorializadas.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div
          className="px-4 sm:px-6 py-2 border-t flex justify-end"
          style={{ borderColor: "#a7c95740" }}
        >
          {/* <Button
            onClick={handleDownload}
            className="gap-2 text-white"
            style={{
              backgroundColor: "#386641",
              // hover: { backgroundColor: "#6a994e" },
            }}
          >
            <Download className="h-4 w-4" />
            Baixar Análise (.docx)
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnaliseModal;
