// friends.service.ts
import { apiClient } from "../../services/apiClient";
import type { Friend, ChatMessage } from "./friends.types";

export async function getFriendsList(): Promise<Friend[]> {
  //   return apiClient<Friend[]>("/friends");
  return Promise.resolve([
    { id: "1", username: "Alice", online: true },
    { id: "2", username: "Bob", online: false },
  ]);
}

export async function addFriend(
  username: string
): Promise<{ success: boolean }> {
  return apiClient<{ success: boolean }>("/friends", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}

export async function removeFriend(
  friendId: number
): Promise<{ success: boolean }> {
  return apiClient<{ success: boolean }>(`/friends/${friendId}`, {
    method: "DELETE",
  });
}

export async function getMessages(friendId: string): Promise<ChatMessage[]> {
  //   return apiClient<ChatMessage[]>(`/friends/${friendId}/messages`, {
  // 	method: "GET",
  //   });
  return Promise.resolve([
    {
      id: "m1",
      fromUserId: friendId,
      toUserId: "me",
      content: `Hello from ${friendId}`,
      timestamp: new Date().toISOString(),
    },
    {
      id: "m2",
      fromUserId: "me",
      toUserId: friendId,
      content: "Hey there!",
      timestamp: new Date().toISOString(),
    },
  ]);
}

export async function sendMessage(
  friendId: string,
  message: string
): Promise<ChatMessage> {
  //   return apiClient<ChatMessage>(`/friends/${friendId}/messages`, {
  //     method: "POST",
  //     body: JSON.stringify({ message }),
  //   });
  return Promise.resolve({
    id: "m" + Math.floor(Math.random() * 10000),
    fromUserId: "me",
    toUserId: friendId,
    content: message,
    timestamp: new Date().toISOString(),
  });
}
