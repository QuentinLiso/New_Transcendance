import { renderFriends } from "./src/pages/friends/friends.view";

async function main() {
  const app = document.getElementById("app");
  if (!app) {
    throw new Error("App root element not found");
  }
  await renderFriends(app);
}

main().catch(console.error);
