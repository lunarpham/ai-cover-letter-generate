import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { type BasicInfo } from "@/lib/types/inputTypes";

interface Profile extends BasicInfo {
  id?: string;
  profilePicture?: string;
}

export function useProfile() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      try {
        // First try to get from localStorage
        const storedProfile = getItem<Profile>("userProfile");

        if (storedProfile) {
          setProfileData(storedProfile);
        } else {
          // If no stored profile, you could fetch from an API here
          // For now, just set a default profile for demo purposes
          setProfileData({
            name: "Your Name",
            email: "mail@example.com",
            phone: "123-456-7890",
            birthday: "1990-01-01",
            gender: "male",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  return {
    profileData,
    isLoading,
    error,
    updateProfile: setProfileData,
  };
}
