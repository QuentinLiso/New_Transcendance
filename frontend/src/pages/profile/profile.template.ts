// src/pages/profile/profile.template.ts
export function profileTemplate() {
  return `
<section class="w-full max-w-4xl mx-auto px-4">
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Profil utilisateur</h2>
      <button id="btn-edit-profile" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Éditer le profil</button>
    </div>

    <div id="profile-display" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 flex flex-col items-center">
        <div class="relative">
          <img id="profile-avatar" src="/uploads/avatars/default-avatar.png" alt="Avatar"
               class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-lg">
        </div>
        <div class="mt-4 flex space-x-2">
          <button id="btn-change-avatar" class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Changer</button>
          <button id="btn-remove-avatar" class="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg">Supprimer</button>
        </div>
        <input type="file" id="avatar-file-input" accept="image/*" class="hidden">
      </div>

      <div class="lg:col-span-1">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Infos</h3>
        <div class="space-y-3">
          <div><span class="font-medium">Pseudo:</span> <span id="profile-username"></span></div>
          <div><span class="font-medium">Email:</span> <span id="profile-email"></span></div>
          <div><span class="font-medium">Membre depuis:</span> <span id="profile-created"></span></div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Statistiques</h3>
        <div class="space-y-3">
          <div>Parties jouées: <span id="profile-games"></span></div>
          <div>Victoires: <span id="profile-wins"></span></div>
          <div>Défaites: <span id="profile-losses"></span></div>
          <div>Win rate: <span id="profile-winrate"></span></div>
          <div>Score total: <span id="profile-totalscore"></span></div>
          <div>Meilleur score: <span id="profile-bestscore"></span></div>
        </div>
      </div>
    </div>

    <div id="profile-edit" class="hidden mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">Pseudo</label>
          <input type="text" id="edit-username" class="w-full px-4 py-3 rounded-lg border" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input type="email" id="edit-email" class="w-full px-4 py-3 rounded-lg border" />
        </div>
      </div>
      <div class="flex space-x-4 mt-4">
        <button id="btn-cancel-edit" class="px-6 py-3 border rounded-lg">Annuler</button>
        <button id="btn-save-profile" class="px-6 py-3 bg-green-600 text-white rounded-lg">Sauvegarder</button>
      </div>
    </div>
  </div>
</section>
  `;
}
