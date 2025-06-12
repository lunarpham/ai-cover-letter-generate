import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Meta } from "@/layout";
import { Constants } from "@/lib/constants";
import { useSavedLetters } from "@/lib/hooks/useSavedLetter";
import { useExportPDF } from "@/lib/hooks/useExportPDF";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDownToLine,
  Copy,
  Save,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import type { HistoryItem } from "@/lib/types/historyTypes";

export default function LetterDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLetterById, updateLetter, isLoaded } = useSavedLetters();
  const { saveAsPdf } = useExportPDF();
  const { copyToClipboard } = useClipboard();

  const [letter, setLetter] = useState<HistoryItem | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load letter data when component mounts
  useEffect(() => {
    if (!id || !isLoaded) return;

    try {
      const letterData = getLetterById(id);
      if (!letterData) {
        setNotFound(true);
      } else {
        setLetter(letterData);
        setEditedContent(letterData.contents);
        setEditedTitle(letterData.title);
      }
    } catch (error) {
      console.error("Error fetching letter:", error);
      toast.error("Failed to load letter");
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, isLoaded]);

  // Handle saving changes
  const handleSave = () => {
    if (!id || !editedContent) return;

    updateLetter(id, editedContent, editedTitle);
    toast.success("Letter updated successfully");
  };

  // Handle exporting as PDF
  const handleExportPdf = () => {
    if (editedContent) {
      saveAsPdf(editedContent, editedTitle);
      toast.success("Letter exported as PDF");
    }
  };

  // Handle copying to clipboard
  const handleCopyToClipboard = () => {
    if (editedContent) {
      copyToClipboard(editedContent);
      toast.success("Letter copied to clipboard");
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (notFound) {
    return <NotFoundState navigate={navigate} />;
  }

  return (
    <>
      <Meta
        metadata={{
          title: `${letter?.title} - AI Cover Letter`,
          description: "View and edit your saved cover letter",
        }}
      />
      <div className="flex flex-col w-full h-screen bg-white">
        <div className="p-6 flex items-center justify-between">
          <div>
            <Link
              to={"/history"}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-2"
            >
              <ArrowLeft size={16} />
              Back to saved letters
            </Link>
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-lg font-semibold w-96"
              />
            </div>
          </div>
          <div className="items-center flex gap-4">
            <button
              onClick={handleExportPdf}
              className="h-12 w-12 inline-flex justify-center items-center gap-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer"
            >
              <ArrowDownToLine size={18} />
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="h-12 w-12 inline-flex justify-center items-center gap-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 inline-flex items-center gap-2 rounded-full bg-indigo-200 text-sky-900 hover:bg-indigo-300 transition-colors cursor-pointer"
            >
              <Save size={18} />
              Save Change
            </button>
          </div>
        </div>
        <div className="w-full h-full bg-gray-300 p-6 overflow-y-scroll">
          <div className="w-full bg-white shadow-lg p-3 font-serif text-sm">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-4 rounded-lg resize-none"
              placeholder="Edit your cover letter here..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto p-8 flex justify-center items-center h-[70vh]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading letter...</p>
      </div>
    </div>
  );
}

function NotFoundState({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="container mx-auto p-8">
      <Meta
        metadata={{
          title: "Letter Not Found",
          description: "The requested letter could not be found",
        }}
      />
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle size={48} className="text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Letter Not Found</h1>
        <p className="text-gray-600 mb-6">
          The letter you're looking for doesn't exist or may have been deleted.
        </p>
        <button
          onClick={() => navigate(Constants.Routes.HISTORY())}
          className="px-4 py-2 bg-rose-200 inline-flex items-center gap-2 text-red-900 rounded-lg hover:bg-rose-300 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Return to Saved Letters
        </button>
      </div>
    </div>
  );
}
