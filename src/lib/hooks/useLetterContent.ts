import { useState, useEffect } from "react";
import { ensureDatePrefix } from "@/lib/utils/dateHelpers";

export function useLetterContent(generatedContent: string | null) {
  const [editableCoverLetter, setEditableCoverLetter] = useState<string>("");

  useEffect(() => {
    if (!generatedContent) return;

    // Ensure the cover letter has a properly formatted date
    const letterWithDate = ensureDatePrefix(generatedContent);
    setEditableCoverLetter(letterWithDate);
  }, [generatedContent]);

  const handleCoverLetterEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableCoverLetter(e.target.value);
  };

  return {
    editableCoverLetter,
    setEditableCoverLetter,
    handleCoverLetterEdit,
  };
}
