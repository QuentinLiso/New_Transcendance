// friends.template.ts
export function friendsTemplate(): string {
  return `
    <div class="flex h-full friends-page">
      <section class="friends-list w-56 bg-gray-100 p-4 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">Friends</h2>
        <ul id="friends-list" class="space-y-2"></ul>
      </section>

      <section class="chat-window hidden flex flex-col flex-1 bg-white p-4 shadow-md rounded-l-none rounded-r-lg">
        <header id="chat-header" class="text-lg font-semibold mb-4 border-b border-gray-300 pb-2"></header>
        <ul
          id="chat-messages"
          class="flex-1 overflow-y-auto mb-4 space-y-3 p-2"
          style="scroll-behavior: smooth;"
        ></ul>
        <form id="chat-form" class="flex gap-2">
          <input
            id="chat-input"
            type="text"
            placeholder="Type a message..."
            autocomplete="off"
            class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  `;
}
