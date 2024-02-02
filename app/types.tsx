export type Poll = {
  id: string;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  votes1: number;
  votes2: number;
  votes3: number;
  votes4: number;
  created_at: number;
};

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months
