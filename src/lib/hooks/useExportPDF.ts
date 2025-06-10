import { jsPDF } from "jspdf";
import { toast } from "react-hot-toast";
import {
  formatHeaderDate,
  hasDatePrefix,
} from "@/lib/utils/dateHelpers";

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

      const formattedDate = formatHeaderDate();

      // If content doesn't have a date, add it to the PDF directly
      // Otherwise, we'll assume it's already in the content
      if (!hasDatePrefix(content)) {
        doc.setFont("serif");
        doc.setFontSize(12);
        doc.text(formattedDate, 15, 15);
      }

      // We could optionally remove any date prefix from content to avoid duplication
      // const cleanContent = removeDatePrefix(content);

      const yPosition = hasDatePrefix(content) ? 15 : 25;
      // Split text into lines for better formatting
      const splitText = doc.splitTextToSize(content, 180);

      doc.text(splitText, 15, yPosition);
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
