// friends.view.ts
import { friendsTemplate } from "./friends.template";
import { getFriendsList } from "./friends.service";
import { setupEventListeners } from "./friends.events";
import type { Friend } from "./friends.types";

export async function renderFriends(root: HTMLElement) {
  root.innerHTML = friendsTemplate();

  const friendsList = root.querySelector("#friends-list")!;

  try {
    const friends: Friend[] = await getFriendsList();
    for (const friend of friends) {
      const li = document.createElement("li");
      li.dataset.id = friend.id;
      li.classList.toggle("online", friend.online);
      li.textContent = friend.username;
      friendsList.appendChild(li);
    }
  } catch {
    friendsList.textContent = "Failed to load friends list.";
  }

  setupEventListeners({ root, selectedFriend: null });
}
