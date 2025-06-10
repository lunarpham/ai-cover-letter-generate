import { jsPDF } from "jspdf";
import { toast } from "react-hot-toast";
import { formatHeaderDate } from "@/lib/utils/dateHelpers";

export function useExportPDF() {
  const saveAsPdf = (content: string, title: string) => {
    if (!content) {
      toast.error("No content to save");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const leftMargin = 10;
      const rightMargin = 10;
      const pageWidth = 290;
      const usableWidth = pageWidth - leftMargin - rightMargin;

      const yPosition = 15;
      const splitText = doc.splitTextToSize(content, usableWidth);

      doc.setFont("serif");
      doc.setFontSize(12);

      doc.text(splitText, leftMargin, yPosition);
      doc.save(`${title || "Cover Letter"}.pdf`);

      toast.success("Cover letter saved as PDF");
      return true;
    } catch (err) {
      toast.error("Failed to save PDF");
      console.error("PDF generation error:", err);
      return false;
    }
  };

  return { saveAsPdf, formatDate: formatHeaderDate };
}
