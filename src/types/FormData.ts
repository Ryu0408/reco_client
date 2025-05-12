export interface FormData {
    user_email: string;
    user_password: string;
    user_name: string;
    user_age?: number;
    user_gender?: string;
    user_preferences?: {
      genres: string[];
    };
  }