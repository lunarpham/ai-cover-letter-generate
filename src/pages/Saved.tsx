import React, { useState } from "react";
import { Meta } from "@/layout";
import { useSavedLetters } from "@/lib/hooks/useSavedLetter";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";
import { Trash2, AlertTriangle, X, Plus } from "lucide-react";
import { Constants } from "@/lib/constants";
import { toast } from "react-hot-toast";

export default function Saved() {
  const { savedLetters, deleteLetter } = useSavedLetters();
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    letterId: string | null;
    letterTitle: string;
  }>({
    isOpen: false,
    letterId: null,
    letterTitle: "",
  });

  const handleDeleteClick = (
    id: string,
    title: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleteConfirmation({
      isOpen: true,
      letterId: id,
      letterTitle: title,
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.letterId) {
      deleteLetter(deleteConfirmation.letterId);
      toast.success("Letter deleted successfully");
    }

    closeDeleteConfirmation();
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      letterId: null,
      letterTitle: "",
    });
  };

  return (
    <>
      <Meta
        metadata={{
          title: "Saved Letters",
          description: "View your saved cover letters",
          keywords: "AI, cover letter, job application, career, saved",
          ogTitle: "AI Cover Letter Generator - Saved Letters",
          ogDescription: "View your previously saved cover letters",
          twitterCard: "summary_large_image",
        }}
      />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Your Saved Cover Letters</h1>

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-4 text-amber-600">
                <AlertTriangle size={24} />
                <h2 className="text-lg font-bold">Confirm Delete</h2>
              </div>
              <p className="mb-6">
                Are you sure you want to delete "
                {deleteConfirmation.letterTitle}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeDeleteConfirmation}
                  className="px-4 py-2 inline-flex items-center gap-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 inline-flex items-center gap-2 bg-rose-200 text-red-900 rounded-full hover:bg-rose-300 cursor-pointer"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {savedLetters.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-4">
              You don't have any saved cover letters yet
            </p>
            <Link to={Constants.Routes.CREATE_LETTER()}>
              <button className="px-6 py-3 inline-flex items-center gap-2 bg-indigo-200 text-blue-900 rounded-full hover:bg-indigo-300 transition-colors cursor-pointer ">
                <Plus size={18} />
                Create a Cover Letter
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedLetters.map((letter) => (
              <Link
                to={Constants.Routes.LETTER_DETAIL(letter.id)}
                key={letter.id}
                className="block"
              >
                <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow group relative">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-semibold text-lg line-clamp-1">
                        {letter.title}
                      </h2>
                      <button
                        onClick={(e) =>
                          handleDeleteClick(letter.id, letter.title, e)
                        }
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete letter"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">
                      Last updated: {formatDate(new Date(letter.updatedAt))}
                    </p>
                    <div className="h-24 overflow-hidden text-gray-600 text-sm">
                      <p className="line-clamp-4">{letter.contents}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
