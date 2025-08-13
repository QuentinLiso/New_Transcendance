// profile.view.ts
import { profileTemplate } from "./profile.template";
import {
  getMyId,
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} from "./profile.service";
import type { ProfileResponse } from "./profile.types";
import { formatDate } from "../../utils/formatDate";
import { isValidPseudo, isValidEmail } from "../../utils/validators";

export async function renderProfile(root: HTMLElement) {
  const page = document.createElement("div");
  page.innerHTML = profileTemplate();
  root.replaceChildren(page);

  const $ = <T extends Element = HTMLElement>(sel: string) =>
    page.querySelector(sel) as T | null;

  try {
    const me = await getMyId();
    const data = await getProfile(me.user.sub);
    fillProfile(data);
  } catch (e) {
    console.error("Failed to load profile: ", e);
  }
  $.call(null, "#btn-edit-profile")?.addEventListener("click", () =>
    enterEditMode()
  );
  $.call(null, "#btn-cancel-edit")?.addEventListener("click", () =>
    leaveEditMode()
  );
  $.call(null, "#btn-save-profile")?.addEventListener("click", async () => {
    await handleSaveProfile();
  });
}
