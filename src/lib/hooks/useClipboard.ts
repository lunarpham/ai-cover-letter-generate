import { toast } from "react-hot-toast";

export function useClipboard() {
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!text) {
      toast.error("No content to copy");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied to clipboard");
      return true;
    } catch (err) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed:", err);
      return false;
    }
  };

  return { copyToClipboard };
}
