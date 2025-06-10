import { useState } from "react";
import { type FormDataType } from "@/lib/types/inputTypes";

export function useLetterForm(initialData: Partial<FormDataType> = {}) {
  const [formData, setFormData] = useState<FormDataType>({
    model: "gemini-1.5-pro",
    contents: {
      requestPrompt: "",
      dateRequested: new Date(),
      preferredTone: "formal",
      basicInfo: {
        name: "",
        birthday: "",
        email: "",
        phone: "",
        gender: "",
        occupation: "",
        address: "",
      },
      workExperience: [],
      jobApplication: {
        companyName: "",
        position: "",
        sourceOfInfoAboutJob: "",
        motivation: "",
        relatedExperience: "",
      },
    },
    ...initialData,
  });

  const handleInputChange = (
    field: keyof FormDataType["contents"]["basicInfo"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        basicInfo: {
          ...prev.contents.basicInfo,
          [field]: value,
        },
      },
    }));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof FormDataType["contents"]["workExperience"][number],
    value: string
  ) => {
    setFormData((prev) => {
      const updatedWorkExperience = [...prev.contents.workExperience];
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        contents: {
          ...prev.contents,
          workExperience: updatedWorkExperience,
        },
      };
    });
  };

  const handleJobApplicationChange = (
    field: keyof FormDataType["contents"]["jobApplication"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        jobApplication: {
          ...prev.contents.jobApplication,
          [field]: value,
        },
      },
    }));
  };

  const handleToneChange = (
    value: FormDataType["contents"]["preferredTone"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        preferredTone: value,
      },
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        workExperience: [
          ...prev.contents.workExperience,
          {
            id: Date.now().toString(),
            companyName: "",
            startTime: "",
            endTime: "",
            position: "",
            description: "",
          },
        ],
      },
    }));
  };

  const deleteWorkExperience = (index: number) => {
    setFormData((prev) => {
      const updatedWorkExperience = [...prev.contents.workExperience];
      updatedWorkExperience.splice(index, 1);
      return {
        ...prev,
        contents: {
          ...prev.contents,
          workExperience: updatedWorkExperience,
        },
      };
    });
  };

  const updateProfileData = (profileData: any) => {
    if (!profileData) return;

    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        basicInfo: {
          ...prev.contents.basicInfo,
          name: profileData.name || prev.contents.basicInfo.name,
          email: profileData.email || prev.contents.basicInfo.email,
          phone: profileData.phone || prev.contents.basicInfo.phone,
          birthday: profileData.birthday || prev.contents.basicInfo.birthday,
          gender: profileData.gender || prev.contents.basicInfo.gender,
          occupation:
            profileData.occupation || prev.contents.basicInfo.occupation,
          address: profileData.address || prev.contents.basicInfo.address,
        },
      },
    }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleWorkExperienceChange,
    handleJobApplicationChange,
    handleToneChange,
    addWorkExperience,
    deleteWorkExperience,
    updateProfileData,
  };
}
