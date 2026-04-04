import html2canvas from "html2canvas";

export async function generateShareImage(element: HTMLElement): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 3,
    backgroundColor: "#08090D",
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = "meu-mapa-do-padrao.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
