import { jsPDF } from "jspdf";
import { formatHeaderDate } from "@/lib/utils/dateHelpers";
import merriweatherRegular from "@/assets/MerriWeather";
import toast from "react-hot-toast";

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

      try {
        // Try to use custom font first
        doc.addFileToVFS("Merriweather-Regular.ttf", merriweatherRegular);
        doc.addFont(
          "Merriweather-Regular.ttf",
          "Merriweather",
          "normal",
          "Identity-H"
        );
        doc.setFont("Merriweather", "normal");
      } catch (fontError) {
        console.warn("Custom font failed to load, using fallback:", fontError);
        // Fallback to built-in font
        doc.setFont("helvetica", "normal");
      }
      doc.setFontSize(12);

      // If the above doesn't work, comment it out and uncomment this fallback option:
      // Use built-in font as fallback
      // doc.setFont("helvetica", "normal");
      // doc.setFontSize(12);

      const leftMargin = 10;
      const rightMargin = 10;
      const pageWidth = 210;
      const usableWidth = pageWidth - leftMargin - rightMargin;
      const yPosition = 15;

      const splitText = doc.splitTextToSize(content, usableWidth);

      doc.text(splitText, leftMargin, yPosition);
      doc.save(`${title || "Cover Letter"}.pdf`);

      return true;
    } catch (err) {
      console.error("PDF generation error:", err);
      return false;
    }
  };

  return { saveAsPdf, formatDate: formatHeaderDate };
}
