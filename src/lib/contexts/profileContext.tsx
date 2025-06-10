import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { BasicInfo } from "../types/inputTypes";

// Extend BasicInfo with additional profile fields
export interface ProfileData extends BasicInfo {
  id?: string;
  username?: string;
  profilePicture?: string;
}

// Define context interface
interface ProfileContextType {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<ProfileData>) => void;
}

// Create context with initial undefined value
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create the provider component
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getItem, setItem } = useLocalStorage();

  // Load profile data from localStorage on initial render
  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      try {
        // Try to get from localStorage
        const storedProfile = getItem<ProfileData>("userProfile");

        if (storedProfile) {
          setProfileData(storedProfile);
        } else {
          // Set empty profile if no stored data exists
          const emptyProfile: ProfileData = {
            name: "",
            email: "",
            phone: "",
            birthday: "",
            gender: "",
            occupation: "",
            address: "",
            username: "",
            profilePicture: "",
          };
          setProfileData(emptyProfile);
          setItem("userProfile", emptyProfile);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  // Update profile data and persist to localStorage
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData((prev) => {
      if (!prev) return data as ProfileData;

      const updatedProfile = { ...prev, ...data };
      setItem("userProfile", updatedProfile);
      return updatedProfile;
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        isLoading,
        error,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use the profile context
export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}

// For backward compatibility with existing useProfile hook
export function useProfile() {
  return useProfileContext();
}
