// user.services.ts
import { apiClient } from "../../services/apiClient";
import type { ProfileResponse, User } from "./profile.types";

export async function getMyId() {
  return apiClient<{ user: { sub: string } }>("/api/me");
}

export async function getProfile(userId: string) {
  return apiClient<ProfileResponse>(`/api/users/${userId}/profile`);
}

export async function updateProfile(payload: Partial<{}>) {
  return apiClient<{ user: User }>("/api/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function uploadAvatar(file: File) {
  const fd = new FormData();
  fd.append("avatar", file);
  return apiClient<{ avatarUrl: string }>("/api/users/me/avatar", {
    method: "POST",
    body: fd,
  });
}

export async function deleteAvatar() {
  return apiClient<{}>("/api/users/me/avatar", {
    method: "DELETE",
  });
}
