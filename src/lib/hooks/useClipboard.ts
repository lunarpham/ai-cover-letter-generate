export function useClipboard() {
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!text) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Copy failed:", err);
      return false;
    }
  };

  return { copyToClipboard };
}
