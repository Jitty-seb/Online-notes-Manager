import jsPDF from "jspdf";

export function downloadNoteAsPDF(note) {
  const doc = new jsPDF();

  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxLineWidth = pageWidth - margin * 2;

  let y = 20;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(note.title || "Untitled ", maxLineWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8 + 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const contentLines = doc.splitTextToSize(note.content || "", maxLineWidth);

    contentLines.forEach((line) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = 20;
      }
    doc.text(line, margin, y);
    y += 7;
    });

    const safeName =
    (note.title || "note").trim().replace(/[^a-z0-9]/gi, "_").slice(0, 40) || "note";
    doc.save(`${safeName}.pdf`);
}