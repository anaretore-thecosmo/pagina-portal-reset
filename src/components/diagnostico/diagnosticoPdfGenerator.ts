import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  type EspelhoData,
  getAxisMicro,
  generate7DayPlan,
  generateEditorialDiagnostic,
  buildCtaParams,
} from "@/data/espelhoEngine";

/* ── Color tokens (RGB) ──────────────────────────────── */
const GRAPHITE: [number, number, number] = [30, 30, 28];
const GOLD: [number, number, number] = [176, 141, 87];
const LIGHT_GRAY: [number, number, number] = [200, 195, 185];
const BODY: [number, number, number] = [90, 90, 85];
const COPPER: [number, number, number] = [163, 104, 56];
const SLATE: [number, number, number] = [70, 77, 88];
const DARK_BG: [number, number, number] = [24, 27, 33];
const OFF_WHITE: [number, number, number] = [246, 241, 232];
const OLIVE: [number, number, number] = [58, 64, 45];

const PAGE_W = 210;
const MARGIN = 22;
const CONTENT_W = PAGE_W - MARGIN * 2;

/* ── Helper: horizontal rule ────────────────────────── */
function drawRule(pdf: jsPDF, y: number, color = GOLD) {
  pdf.setDrawColor(color[0], color[1], color[2]);
  pdf.setLineWidth(0.3);
  pdf.line(MARGIN, y, PAGE_W - MARGIN, y);
}

/* ── Helper: dark page background ───────────────────── */
function fillDarkBg(pdf: jsPDF) {
  pdf.setFillColor(DARK_BG[0], DARK_BG[1], DARK_BG[2]);
  pdf.rect(0, 0, 210, 297, "F");
}

/* ── Helper: light page background ──────────────────── */
function fillLightBg(pdf: jsPDF) {
  pdf.setFillColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.rect(0, 0, 210, 297, "F");
}

/* ── Helper: olive page background ──────────────────── */
function fillOliveBg(pdf: jsPDF) {
  pdf.setFillColor(OLIVE[0], OLIVE[1], OLIVE[2]);
  pdf.rect(0, 0, 210, 297, "F");
}

/* ── Main generator ─────────────────────────────────── */

export async function generateDiagnosticoPDF(
  data: EspelhoData,
  userName: string,
  chartElementId: string
) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const dateStr = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // ===================================================================
  // PAGE 1 — CAPA (fundo escuro)
  // ===================================================================
  fillDarkBg(pdf);

  // Top rule
  drawRule(pdf, 30, GOLD);

  // Kicker
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("PORTAL RESET", MARGIN, 25);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text(dateStr, PAGE_W - MARGIN, 25, { align: "right" });

  // Title block — centered vertically
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(36);
  pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.text("ESPELHO DA", PAGE_W / 2, 110, { align: "center" });
  pdf.text("CLAREZA", PAGE_W / 2, 125, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(13);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("Mapa do padrão atual", PAGE_W / 2, 138, { align: "center" });

  if (userName) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
    pdf.text(userName, PAGE_W / 2, 155, { align: "center" });
  }

  // Bottom rule
  drawRule(pdf, 267, GOLD);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text("Documento pessoal · uso individual", PAGE_W / 2, 275, { align: "center" });

  // ===================================================================
  // PAGE 2 — MANDALA (fundo claro)
  // ===================================================================
  pdf.addPage();
  fillLightBg(pdf);
  let y = 28;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("ESPELHO DA CLAREZA", MARGIN, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text("02", PAGE_W - MARGIN, y, { align: "right" });

  y += 5;
  drawRule(pdf, y, GOLD);
  y += 14;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(GRAPHITE[0], GRAPHITE[1], GRAPHITE[2]);
  pdf.text("Mandala do padrão", MARGIN, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(BODY[0], BODY[1], BODY[2]);
  pdf.text(
    "Quanto mais preenchida a fatia, mais estável está seu padrão naquele eixo.",
    MARGIN,
    y
  );
  y += 10;

  // Capture chart as PNG
  const chartEl = document.getElementById(chartElementId);
  if (chartEl) {
    try {
      const canvas = await html2canvas(chartEl, {
        backgroundColor: "#F6F1E8",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgW = CONTENT_W;
      const imgH = (canvas.height / canvas.width) * imgW;
      const centeredX = MARGIN;
      pdf.addImage(imgData, "PNG", centeredX, y, imgW, Math.min(imgH, 160));
      y += Math.min(imgH, 160) + 8;
    } catch {
      pdf.setFontSize(10);
      pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
      pdf.text("(Gráfico indisponível)", MARGIN, y + 20);
      y += 30;
    }
  }

  // Mini legend
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(BODY[0], BODY[1], BODY[2]);

  // Copper dot = base
  pdf.setFillColor(COPPER[0], COPPER[1], COPPER[2]);
  pdf.circle(MARGIN + 2, y, 1.5, "F");
  pdf.text("Zonas de base (top 3)", MARGIN + 6, y + 1);

  // Slate dot = vazamento
  pdf.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  pdf.circle(MARGIN + 55, y, 1.5, "F");
  pdf.text("Zonas de vazamento (bottom 3)", MARGIN + 59, y + 1);

  // Olive dot = tensão
  pdf.setFillColor(OLIVE[0], OLIVE[1], OLIVE[2]);
  pdf.circle(MARGIN + 120, y, 1.5, "F");
  pdf.text("Conflito central", MARGIN + 124, y + 1);

  // ===================================================================
  // PAGE 3 — BASE E VAZAMENTO (fundo escuro)
  // ===================================================================
  pdf.addPage();
  fillDarkBg(pdf);
  y = 28;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("ESPELHO DA CLAREZA", MARGIN, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text("03", PAGE_W - MARGIN, y, { align: "right" });

  y += 5;
  drawRule(pdf, y, GOLD);
  y += 14;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.text("O que está firme", MARGIN, y);
  y += 7;
  pdf.text("e o que está vazando", MARGIN, y);
  y += 14;

  // Editorial diagnostic
  const editorialParagraphs = generateEditorialDiagnostic(data);
  const editorialText = editorialParagraphs.join("\n\n");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  const editLines = pdf.splitTextToSize(editorialText, CONTENT_W);
  pdf.text(editLines, MARGIN, y);
  y += editLines.length * 5 + 12;

  // Top 3 — Zonas de base
  drawRule(pdf, y, COPPER);
  y += 8;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(COPPER[0], COPPER[1], COPPER[2]);
  pdf.text("Zonas de base", MARGIN, y);
  y += 3;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  const topIndices = data.top3.map((a) => a.axis).join(", ");
  pdf.text(`Eixos ${topIndices}`, MARGIN, y + 4);
  y += 10;

  data.top3.forEach((axis) => {
    const micro = getAxisMicro(axis.type);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
    pdf.text(`${axis.label} — ${axis.mean.toFixed(1)}`, MARGIN, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
    const lines = pdf.splitTextToSize(micro.micro, CONTENT_W);
    pdf.text(lines, MARGIN, y);
    y += lines.length * 4 + 6;
  });

  y += 6;

  // Bottom 3 — Zonas de vazamento
  drawRule(pdf, y, SLATE);
  y += 8;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  pdf.text("Zonas de vazamento", MARGIN, y);
  y += 3;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  const botIndices = data.bottom3.map((a) => a.axis).join(", ");
  pdf.text(`Eixos ${botIndices}`, MARGIN, y + 4);
  y += 10;

  data.bottom3.forEach((axis) => {
    const micro = getAxisMicro(axis.type);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
    pdf.text(`${axis.label} — ${axis.mean.toFixed(1)}`, MARGIN, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
    const lines = pdf.splitTextToSize(micro.micro, CONTENT_W);
    pdf.text(lines, MARGIN, y);
    y += lines.length * 4 + 6;
  });

  // ===================================================================
  // PAGE 4 — PLANO DE 7 DIAS (fundo claro)
  // ===================================================================
  pdf.addPage();
  fillLightBg(pdf);
  y = 28;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("ESPELHO DA CLAREZA", MARGIN, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text("04", PAGE_W - MARGIN, y, { align: "right" });

  y += 5;
  drawRule(pdf, y, GOLD);
  y += 14;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(GRAPHITE[0], GRAPHITE[1], GRAPHITE[2]);
  pdf.text("Plano de sustentação leve", MARGIN, y);
  y += 7;
  pdf.text("7 dias · 3 minutos por dia", MARGIN, y);
  y += 5;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(BODY[0], BODY[1], BODY[2]);
  pdf.text("Sem teatro. Sem pico. Sem intensidade forçada.", MARGIN, y);
  y += 12;

  const plan = generate7DayPlan(data);
  plan.forEach((day, i) => {
    if (y > 265) {
      pdf.addPage();
      fillLightBg(pdf);
      y = 28;
    }

    // Day number
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    pdf.text(String(i + 1).padStart(2, "0"), MARGIN, y + 1);

    // Day text
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(GRAPHITE[0], GRAPHITE[1], GRAPHITE[2]);
    const dayText = day.replace(/^Dia \d+ — /, "");
    const dayLines = pdf.splitTextToSize(dayText, CONTENT_W - 18);
    pdf.text(dayLines, MARGIN + 16, y);
    y += Math.max(dayLines.length * 5, 8) + 8;

    // Subtle separator
    if (i < plan.length - 1) {
      pdf.setDrawColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
      pdf.setLineWidth(0.15);
      pdf.line(MARGIN + 16, y - 5, PAGE_W - MARGIN, y - 5);
    }
  });

  // Footer note
  y += 6;
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(BODY[0], BODY[1], BODY[2]);
  const footerText = `Seu foco esta semana é estabilizar Eixos ${botIndices} e reduzir a tensão em ${data.centralAxis.label}. Proteja Eixos ${topIndices} para não virar sobrecarga.`;
  const footerLines = pdf.splitTextToSize(footerText, CONTENT_W);
  pdf.text(footerLines, MARGIN, y);

  // ===================================================================
  // PAGE 5 — CTA FINAL (fundo oliva)
  // ===================================================================
  pdf.addPage();
  fillOliveBg(pdf);

  // Centered content
  const ctaY = 100;

  drawRule(pdf, ctaY, GOLD);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.text("Pronta para transformar", PAGE_W / 2, ctaY + 18, { align: "center" });
  pdf.text("esse mapa em prática?", PAGE_W / 2, ctaY + 28, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  pdf.text("Receber plano de ação", PAGE_W / 2, ctaY + 44, { align: "center" });

  // Clickable link
  const ctaParams = buildCtaParams(data);
  const checkoutUrl = `https://pay.kiwify.com.br/ns0fjIx${ctaParams}`;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.textWithLink("Acessar o Portal Reset →", PAGE_W / 2 - 22, ctaY + 56, {
    url: checkoutUrl,
  });

  // Underline the link manually
  pdf.setDrawColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
  pdf.setLineWidth(0.2);
  pdf.line(PAGE_W / 2 - 22, ctaY + 57, PAGE_W / 2 + 22, ctaY + 57);

  // Bottom
  drawRule(pdf, 267, GOLD);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  pdf.text("PORTAL RESET · portalreset.com", PAGE_W / 2, 275, { align: "center" });

  // ===================================================================
  // AUTHOR CREDIT (on every page)
  // ===================================================================
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    // Determine text color based on page background
    const isLightPage = p === 2 || p === 4;
    if (isLightPage) {
      pdf.setTextColor(GRAPHITE[0], GRAPHITE[1], GRAPHITE[2]);
    } else {
      pdf.setTextColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
    }
    // Use low opacity via alpha-like lighter color
    const creditColor: [number, number, number] = isLightPage
      ? [Math.round(GRAPHITE[0] * 0.65 + 246 * 0.35), Math.round(GRAPHITE[1] * 0.65 + 241 * 0.35), Math.round(GRAPHITE[2] * 0.65 + 232 * 0.35)]
      : [Math.round(OFF_WHITE[0] * 0.65 + DARK_BG[0] * 0.35), Math.round(OFF_WHITE[1] * 0.65 + DARK_BG[1] * 0.35), Math.round(OFF_WHITE[2] * 0.65 + DARK_BG[2] * 0.35)];
    pdf.setTextColor(creditColor[0], creditColor[1], creditColor[2]);
    pdf.text("© Ana Retore. Todos os direitos de design e copy reservados.", MARGIN, 290);
  }

  // ===================================================================
  // SAVE
  // ===================================================================
  const fileName = userName
    ? `espelho-da-clareza-${userName.toLowerCase().replace(/\s+/g, "-")}.pdf`
    : "espelho-da-clareza.pdf";

  pdf.save(fileName);
}
