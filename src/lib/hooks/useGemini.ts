import { useState, useEffect, useCallback } from "react";
import geminiClient from "@/lib/api/geminiClient";
import type { FormDataType } from "@/lib/types/inputTypes";

export function useGemini() {
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChunk = useCallback((chunk: string) => {
    setCoverLetter((prev) => prev + chunk);
  }, []);

  const generateCoverLetter = async (formData: FormDataType) => {
    setIsGenerating(true);
    setError(null);
    setCoverLetter(""); // Reset previous content

    try {
      await geminiClient.generateCoverLetter(formData, handleTextChunk);
      return coverLetter; // This will return the accumulated text so far
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    coverLetter,
    isGenerating,
    error,
    generateCoverLetter,
  };
}
