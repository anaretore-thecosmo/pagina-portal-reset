import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  type EspelhoData,
  getAxisMicro,
  generate7DayPlan,
  generateEditorialDiagnostic,
} from "@/data/espelhoEngine";

export async function generateDiagnosticoPDF(
  data: EspelhoData,
  userName: string,
  chartElementId: string
) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const graphite: [number, number, number] = [30, 30, 28];
  const gold: [number, number, number] = [176, 141, 87];
  const lightGray: [number, number, number] = [200, 195, 185];
  const bodyGray: [number, number, number] = [100, 100, 95];
  const copper: [number, number, number] = [163, 104, 56];
  const slate: [number, number, number] = [70, 77, 88];

  // ===== CAPA =====
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("PORTAL RESET", margin, 25);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")}`, pageWidth - margin, 25, { align: "right" });

  pdf.setDrawColor(gold[0], gold[1], gold[2]);
  pdf.setLineWidth(0.3);
  pdf.line(margin, 30, pageWidth - margin, 30);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
  pdf.text("Espelho da Clareza", margin, 55);

  pdf.setFontSize(14);
  pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  pdf.text("Mapa do seu padrão atual", margin, 65);

  if (userName) {
    pdf.setFontSize(16);
    pdf.setTextColor(gold[0], gold[1], gold[2]);
    pdf.text(userName, margin, 80);
  }

  // ===== PAGE 1: Diagnóstico editorial =====
  pdf.addPage();
  let y = 25;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("ESPELHO DA CLAREZA", margin, y);
  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
  pdf.text("Diagnóstico editorial", margin, y);
  y += 10;

  const editorialText = generateEditorialDiagnostic(data);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  const editLines = pdf.splitTextToSize(editorialText, contentWidth);
  pdf.text(editLines, margin, y);

  // ===== PAGE 2: Mandala =====
  pdf.addPage();
  y = 25;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("MANDALA DO PADRÃO", margin, y);
  y += 12;

  const chartEl = document.getElementById(chartElementId);
  if (chartEl) {
    try {
      const canvas = await html2canvas(chartEl, {
        backgroundColor: "#F6F1E8",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height / canvas.width) * contentWidth;
      pdf.addImage(imgData, "PNG", margin, y, contentWidth, Math.min(imgHeight, 160));
    } catch {
      pdf.setFontSize(10);
      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.text("(Gráfico indisponível)", margin, y + 20);
    }
  }

  // ===== PAGE 3: Base e Vazamento =====
  pdf.addPage();
  y = 25;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("O QUE ESTÁ FIRME E O QUE ESTÁ DRENANDO", margin, y);
  y += 12;

  // Top 3
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(copper[0], copper[1], copper[2]);
  pdf.text("Zonas de base", margin, y);
  y += 8;

  data.top3.forEach((axis) => {
    const micro = getAxisMicro(axis.type);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
    pdf.text(`${axis.label} — ${axis.mean.toFixed(1)}`, margin, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    const lines = pdf.splitTextToSize(micro.micro, contentWidth);
    pdf.text(lines, margin, y);
    y += lines.length * 4 + 6;
  });

  y += 6;

  // Bottom 3
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(slate[0], slate[1], slate[2]);
  pdf.text("Zonas de vazamento", margin, y);
  y += 8;

  data.bottom3.forEach((axis) => {
    const micro = getAxisMicro(axis.type);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
    pdf.text(`${axis.label} — ${axis.mean.toFixed(1)}`, margin, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    const lines = pdf.splitTextToSize(micro.micro, contentWidth);
    pdf.text(lines, margin, y);
    y += lines.length * 4 + 6;
  });

  // ===== PAGE 4: Conflito central + Plano 7 dias =====
  pdf.addPage();
  y = 25;

  const { centralAxis } = data;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("CONFLITO CENTRAL", margin, y);
  y += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
  pdf.text(`${centralAxis.label} (tensão ${centralAxis.tension.toFixed(0)})`, margin, y);
  y += 7;

  const conflictText =
    centralAxis.clinical > centralAxis.symbolic
      ? `Em ${centralAxis.label}, você executa mais do que sente. A ação corre na frente da presença.`
      : centralAxis.clinical < centralAxis.symbolic
        ? `Em ${centralAxis.label}, você sente mais do que consegue sustentar. A percepção existe, mas falta chão.`
        : `Em ${centralAxis.label}, existe uma oscilação entre sentir e agir. O ponto de equilíbrio ainda não estabilizou.`;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  const conflictLines = pdf.splitTextToSize(conflictText, contentWidth);
  pdf.text(conflictLines, margin, y);
  y += conflictLines.length * 5 + 14;

  // 7-day plan
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("PLANO DE SUSTENTAÇÃO LEVE · 7 DIAS", margin, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text("3 minutos por dia. Sem teatro. Sem pico.", margin, y);
  y += 8;

  const plan = generate7DayPlan(data);
  plan.forEach((day, i) => {
    if (y > 265) {
      pdf.addPage();
      y = 25;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(gold[0], gold[1], gold[2]);
    pdf.text(String(i + 1).padStart(2, "0"), margin, y);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    const dayLines = pdf.splitTextToSize(day.replace(/^Dia \d+ — /, ""), contentWidth - 12);
    pdf.text(dayLines, margin + 10, y);
    y += dayLines.length * 4 + 5;
  });

  // Footer
  y += 8;
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  const footerText = `Seu foco esta semana é estabilizar ${data.bottom3[0].label}, ${data.bottom3[1].label} e reduzir a tensão em ${centralAxis.label}. Proteja ${data.top3[0].label} para não virar sobrecarga.`;
  const footerLines = pdf.splitTextToSize(footerText, contentWidth);
  pdf.text(footerLines, margin, y);

  // ===== PÁGINA FINAL =====
  pdf.addPage();
  y = 100;

  pdf.setDrawColor(gold[0], gold[1], gold[2]);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(graphite[0], graphite[1], graphite[2]);
  pdf.text("Pronta para transformar esse mapa em prática?", margin, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text("Acesse o Portal Reset → portalreset.com", margin, y);

  pdf.save(`espelho-da-clareza-${userName ? userName.toLowerCase().replace(/\s+/g, "-") : "resultado"}.pdf`);
}
