export interface WorkExperience {
  id: string;
  companyName: string;
  startTime: string;
  endTime: string;
  position: string;
  description: string;
}

export interface JobApplication {
  companyName: string;
  position: string;
  motivation: string;
  sourceOfInfoAboutJob: string;
  relatedExperience: string;
}

export interface BasicInfo {
  name: string;
  birthday: string;
  email: string;
  phone: string;
  gender: string;
  occupation?: string;
  address?: string;
}

export const AvailableModel = {
  "Gemini 2.5 Flash": "gemini-2.5-flash-preview-05-20",
  "gemini 1.5 Pro": "gemini-1.5-pro",
} as const;

export const PreferredTone = {
  formal: "formal",
  friendly: "friendly",
  concise: "concise",
};

export type PreferredTone = (typeof PreferredTone)[keyof typeof PreferredTone];

export type AvailableModel =
  (typeof AvailableModel)[keyof typeof AvailableModel];

export interface FormDataType {
  model: AvailableModel;
  contents: {
    requestPrompt: string;
    preferredTone: PreferredTone;
    basicInfo: BasicInfo;
    workExperience: WorkExperience[];
    jobApplication: JobApplication;
    dateRequested: Date;
  };
}
