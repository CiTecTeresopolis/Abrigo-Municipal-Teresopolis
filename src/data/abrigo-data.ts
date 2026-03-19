export const CHART_COLORS = [
  "#a7c957",
  "#6a994e",
  "#386641",
  "#f7b801",
  "#f18701",
  "#bc4749",
  "#390099",
  "#9e0059",
  "#179b64",
  "#4895ef",
];

export interface AbrigoRecord {
  id: string;
  mes: string;
  sexo: string;
  idade: number | string;
  escolaridade: string;
  bairro: string;
  municipio: string;
  estado: string;
  causa: string;
}

export interface AbrigoUnit {
  id: string;
  label: string;
  csvPath: string;
}

export const ABRIGO_UNITS: AbrigoUnit[] = [
  { id: "2025", label: "2025", csvPath: "/data/abrigo-2025.csv" },
  // Adicione novas unidades aqui:
  // { id: "exemplo", label: "CRAS Exemplo", csvPath: "/data/cras-exemplo.csv" },
];

function getFaixaEtaria(idade: number | string): string {
  if (typeof idade === "string") {
    const lower = idade.toLowerCase();
    if (lower === "menor") return "Adolescente (13-18)";
    return "Desconhecido";
  }
  if (idade <= 12) return "Criança (0-12)";
  if (idade <= 18) return "Adolescente (13-18)";
  if (idade <= 29) return "Jovem (19-29)";
  if (idade <= 59) return "Adulto (30-59)";
  return "Idoso (60+)";
}

export function parseCsv(text: string): AbrigoRecord[] {
  const lines = text.split("\n").slice(1); // skip header
  const records: AbrigoRecord[] = [];

  for (const line of lines) {
    const cols = line.split(",");
    const mes = cols[0]?.trim();
    const id = cols[1]?.trim();
    const sexo = cols[2]?.trim();
    const idadeStr = cols[3]?.trim();
    const escolaridade = cols[4]?.trim();
    const bairro = cols[5]?.trim();
    const municipio = cols[6]?.trim();
    const estado = cols[7]?.trim();
    const causa = cols[8]?.trim();

    if (!sexo || !idadeStr || !id) continue;
    let idade: number | string = parseInt(idadeStr, 10);
    if (isNaN(idade)) {
      idade = idadeStr;
    }

    records.push({
      id,
      mes,
      sexo,
      idade,
      escolaridade,
      bairro,
      municipio,
      estado,
      causa,
    });
  }

  return records;
}

export interface AggregatedData {
  total: number;
  totalUnique: number;
  mediaIdade: string;
  sexoData: { name: string; value: number; fill: string }[];
  faixaEtariaData: { name: string; Masculino: number; Feminino: number }[];
  escolaridadeData: { name: string; Masculino: number; Feminino: number }[];
  bairrosData: { name: string; value: number }[];
  bairrosMunicipioData: { name: string; value: number }[];
  municipiosData: { name: string; value: number }[];
  estadosData: { name: string; value: number }[];
  mesData: { name: string; value: number }[];
  causaData: { name: string; value: number }[];
  causaPorSexo: { causa: string; Masculino: number; Feminino: number }[];
  faixaEtariaPorCausa: Record<string, unknown>[];
}

function countBy<T>(arr: T[], keyFn: (item: T) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of arr) {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

function sortedEntries(
  map: Map<string, number>,
  limit?: number,
): { name: string; value: number }[] {
  const entries = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
  return limit ? entries.slice(0, limit) : entries;
}

function calculateAverageAge(records: AbrigoRecord[]): string {
  const validRecords = records.filter((r) => typeof r.idade === "number");
  if (validRecords.length === 0) return "0.00";
  const sum = validRecords.reduce(
    (acc, curr) => acc + (curr.idade as number),
    0,
  );
  return (sum / validRecords.length).toFixed(0); // Retorna com 0 casas decimais
}

export function aggregateData(records: AbrigoRecord[]): AggregatedData {
  // Filtrar registros únicos por id para análises qualitativas
  const uniqueRecords = records.filter(
    (record, index, self) =>
      index === self.findIndex((r) => r.id === record.id),
  );

  const total = records.length; // Total de atendimentos (quantitativo)
  const totalUnique = uniqueRecords.length; // Total de perfis únicos (qualitativo)

  const mediaIdade = calculateAverageAge(uniqueRecords); // Média de idade baseada em perfis únicos

  // Sexo (qualitativo)
  const sexoMap = countBy(uniqueRecords, (r) => r.sexo);
  const sexoData = [
    {
      name: "Masculino",
      value: sexoMap.get("Masculino") || 0,
      fill: "#6a994e",
    },
    { name: "Feminino", value: sexoMap.get("Feminino") || 0, fill: "#bc4749" },
  ];

  // Faixa Etária (qualitativo)
  const faixaOrder = [
    "Criança (0-12)",
    "Adolescente (13-18)",
    "Jovem (19-29)",
    "Adulto (30-59)",
    "Idoso (60+)",
  ];
  const faixaEtariaData = faixaOrder.map((name) => {
    const filtered = uniqueRecords.filter(
      (r) => getFaixaEtaria(r.idade) === name,
    );
    return {
      name,
      Masculino: filtered.filter((r) => r.sexo === "Masculino").length,
      Feminino: filtered.filter((r) => r.sexo === "Feminino").length,
    };
  });

  // Escolaridade (qualitativo)
  const escMap = new Map<string, { Masculino: number; Feminino: number }>();
  for (const r of uniqueRecords) {
    const name = r.escolaridade || "";
    if (!escMap.has(name)) {
      escMap.set(name, { Masculino: 0, Feminino: 0 });
    }
    const obj = escMap.get(name)!;
    if (r.sexo === "Masculino") obj.Masculino += 1;
    else if (r.sexo === "Feminino") obj.Feminino += 1;
  }
  const escolaridadeData = Array.from(escMap.entries())
    .map(([name, counts]) => ({ name, ...counts }))
    .sort((a, b) => b.Masculino + b.Feminino - (a.Masculino + a.Feminino));

  // Bairros (qualitativo)
  const bairroMap = countBy(uniqueRecords, (r) => r.bairro);
  const bairrosData = sortedEntries(bairroMap);

  // Bairros do Município (qualitativo)
  const bairroMunicipioMap = countBy(
    uniqueRecords.filter((r) => r.bairro !== "Fora do município"),
    (r) => r.bairro
  );
  const bairrosMunicipioData = sortedEntries(bairroMunicipioMap);

  // Municípios (qualitativo)
  const municipioMap = countBy(uniqueRecords, (r) => r.municipio);
  const municipiosData = sortedEntries(municipioMap);

  // Estados (qualitativo)
  const estadoMap = countBy(uniqueRecords, (r) => r.estado);
  const estadosData = sortedEntries(estadoMap);

  // Sazonalidade (Mês) - quantitativo, pois conta atendimentos por mês
  const mesMap = countBy(records, (r) => r.mes);
  const MONTHS_ORDER = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const mesData = Array.from(mesMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      const indexA = MONTHS_ORDER.indexOf(a.name);
      const indexB = MONTHS_ORDER.indexOf(b.name);
      return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });

  // Causas (qualitativo)
  const causaMap = countBy(uniqueRecords, (r) => r.causa);
  const causaData = sortedEntries(causaMap);

  // Causa por Sexo (qualitativo)
  const causas = causaData.map((p) => p.name);
  const causaPorSexo = causas.map((causa) => {
    const filtered = uniqueRecords.filter((r) => r.causa === causa);
    return {
      causa,
      Masculino: filtered.filter((r) => r.sexo === "Masculino").length,
      Feminino: filtered.filter((r) => r.sexo === "Feminino").length,
    };
  });

  // Faixa Etária por causa (qualitativo)
  const topCausas = causas.slice(0, 4);
  const faixaEtariaPorCausa = topCausas.map((causa) => {
    const filtered = uniqueRecords.filter((r) => r.causa === causa);
    const faixaCounts = countBy(filtered, (r) => getFaixaEtaria(r.idade));
    const entry: Record<string, unknown> = { causa };
    for (const faixa of faixaOrder) {
      entry[faixa] = faixaCounts.get(faixa) || 0;
    }
    return entry;
  });

  return {
    total,
    totalUnique,
    sexoData,
    mediaIdade,
    faixaEtariaData,
    escolaridadeData,
    bairrosData,
    bairrosMunicipioData,
    municipiosData,
    estadosData,
    mesData,
    causaData,
    causaPorSexo,
    faixaEtariaPorCausa,
  };
}

export async function loadAbrigoData(csvPath: string): Promise<AggregatedData> {
  const response = await fetch(csvPath);
  const text = await response.text();
  const records = parseCsv(text);
  return aggregateData(records);
}
