export class Constants {
  static readonly APP_NAME = "AI Cover Letter Generator";
  static readonly APP_DESCRIPTION =
    "Generate personalized cover letters using AI";
  static readonly API_BASE_URL = "https://api.example.com"; // Replace with your actual API base URL
  static readonly GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  static readonly Routes = {
    HOME: () => "/",
    HISTORY: () => "/history",
    CREATE_LETTER: () => "/create-letter",
    LETTER_DETAIL: (id: string) => `/letter/${id}`,
    PROFILE: () => "/profile",
  };
}
