// friends.types.ts
export interface Friend {
  id: string;
  username: string;
  online: boolean;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
}
