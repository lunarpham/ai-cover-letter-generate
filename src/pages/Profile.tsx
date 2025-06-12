import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/lib/hooks/useProfile";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { toast } from "react-hot-toast";
import { Meta } from "@/layout";
import { Save } from "lucide-react";
import type { ProfileData } from "@/lib/contexts/profileContext";

export default function Profile() {
  const { profileData, isLoading, error, updateProfile } = useProfile();
  const { setItem } = useLocalStorage();
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    occupation: "",
    address: "",
    profilePicture: "",
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        birthday: profileData.birthday || "",
        gender: profileData.gender || "",
        occupation: profileData.occupation || "",
        address: profileData.address || "",
      });
    }
  }, [profileData]);
  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update profile in state and localStorage
    updateProfile(formData);
    setItem("userProfile", formData);

    toast.success("Profile updated successfully");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <div className="flex items-center justify-center h-64">
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p>Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta
        metadata={{
          title: "Your Profile - AI Cover Letter Generator",
          description: "Manage your personal information for cover letters",
          keywords: "profile, personal information, cover letter, AI",
          ogTitle: "Your Profile - AI Cover Letter Generator",
          ogDescription: "Manage your personal information for cover letters",
        }}
      />
      <div className="w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <p className="text-gray-600 mb-8">
          Manage your personal information that will be used in your cover
          letters
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="flex gap-4 w-full">
            <div className="basis-8/12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Date of Birth</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={profileData?.gender || ""}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  placeholder="Enter your current occupation"
                />
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-3 inline-flex items-center gap-2 rounded-full bg-indigo-200 text-sky-900 hover:bg-indigo-300 transition-colors cursor-pointer"
            >
              <Save size={16} />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
