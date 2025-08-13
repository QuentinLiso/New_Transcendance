// profiles.types.ts

export type User = {
  sub: string;
  pseudo: string;
  email: string;
  created_at?: string;
  avatar?: string | null;
};

export type Stats = {
  games_played: number;
  wins: number;
  losses: number;
  win_ratio: number;
  total_score?: number;
  best_score?: number;
};

export type ProfileResponse = {
  user: User;
  stats: Stats;
};
