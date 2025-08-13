// friends.events.ts
import type { Friend, ChatMessage } from "./friends.types";
import * as service from "./friends.service";

interface EventContext {
  root: HTMLElement;
  selectedFriend: Friend | null;
}

export function setupEventListeners(ctx: EventContext) {
  const { root } = ctx;

  const friendsList = root.querySelector("#friends-list")!;
  const chatWindow = root.querySelector(".chat-window")!;
  const chatHeader = root.querySelector("#chat-header")!;
  const chatMessages = root.querySelector(
    "#chat-messages"
  )! as HTMLInputElement;
  const chatForm = root.querySelector("#chat-form")!;
  const chatInput = root.querySelector("#chat-input") as HTMLInputElement;

  friendsList.addEventListener("click", async (ev) => {
    const target = ev.target as HTMLElement;
    const friendLi = target.closest("li[data-id]") as HTMLElement;
    if (!friendLi) return;

    const friendId = friendLi.dataset.id!;
    ctx.selectedFriend = {
      id: friendId,
      username: friendLi.textContent || "Unknown",
      online: friendLi.classList.contains("online"),
    };

    chatHeader.textContent = `Chat with ${ctx.selectedFriend.username}`;
    chatWindow.classList.remove("hidden");
    chatMessages.innerHTML = "Loading...";

    try {
      const messages = await service.getMessages(friendId);
      renderMessages(messages, chatMessages);
    } catch (e) {
      chatMessages.innerHTML = "<li>Error loading messages</li>";
    }
  });

  chatForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!ctx.selectedFriend) return;

    const content = chatInput.value.trim();
    if (!content) return;

    try {
      const msg = await service.sendMessage(ctx.selectedFriend.id, content);
      appendMessage(msg, chatMessages);
      chatInput.value = "";
      chatInput.focus();
    } catch {
      alert("Failed to send message");
    }
  });
}

function renderMessages(messages: ChatMessage[], container: HTMLElement) {
  container.innerHTML = "";
  for (const msg of messages) {
    appendMessage(msg, container);
  }
}

function appendMessage(
  msg: ChatMessage,
  container: HTMLElement,
  currentUserId: string
) {
  const li = document.createElement("li");
  li.classList.add(
    "message",
    "max-w-xs",
    "break-words",
    "px-4",
    "py-2",
    "rounded-lg",
    "shadow-sm"
  );

  const isSentByCurrentUser = msg.fromUserId === currentUserId;

  if (isSentByCurrentUser) {
    li.classList.add("ml-auto", "bg-blue-500", "text-white", "text-right");
  } else {
    li.classList.add("mr-auto", "bg-gray-300", "text-gray-900", "text-left");
  }

  li.textContent = msg.content;

  container.appendChild(li);
  container.scrollTop = container.scrollHeight;
}
