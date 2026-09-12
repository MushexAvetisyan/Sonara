<script setup>
import { ref } from 'vue'
import { usePlaylistsStore } from '../stores/playlists'

const playlistsStore = usePlaylistsStore()

const playlistName = ref('')
const showCreateForm = ref(false)

function createPlaylist() {
  const name = playlistName.value.trim()

  if (!name) {
    return
  }

  playlistsStore.createPlaylist(name)

  playlistName.value = ''
  showCreateForm.value = false
}

function deletePlaylist(id) {
  const playlist = playlistsStore.getPlaylist(id)

  if (!playlist) {
    return
  }

  const confirmed = window.confirm(
      `Delete "${playlist.name}"?`
  )

  if (!confirmed) {
    return
  }

  playlistsStore.deletePlaylist(id)
}
</script>

<template>
  <div class="playlists-page">
    <section class="playlists-hero">
      <span class="eyebrow">
        MUSIC VAULT
      </span>

      <h1>
        Your
        <span>playlists.</span>
      </h1>

      <p>
        Create your own collections and keep your
        favorite music organized.
      </p>
    </section>

    <section class="playlists-content">
      <div class="playlists-header">
        <div>
          <span class="section-label">
            YOUR COLLECTION
          </span>

          <h2>
            Playlists
          </h2>
        </div>

        <button
            class="create-button"
            type="button"
            @click="showCreateForm = !showCreateForm"
        >
          <span>+</span>

          New playlist
        </button>
      </div>

      <form
          v-if="showCreateForm"
          class="create-form"
          @submit.prevent="createPlaylist"
      >
        <div class="create-form-content">
          <span class="form-label">
            NEW PLAYLIST
          </span>

          <input
              v-model="playlistName"
              type="text"
              placeholder="Enter playlist name..."
              maxlength="60"
              autofocus
          />
        </div>

        <div class="form-actions">
          <button
              class="cancel-button"
              type="button"
              @click="showCreateForm = false; playlistName = ''"
          >
            Cancel
          </button>

          <button
              class="save-button"
              type="submit"
              :disabled="!playlistName.trim()"
          >
            Create playlist
          </button>
        </div>
      </form>

      <div
          v-if="playlistsStore.playlists.length"
          class="playlist-grid"
      >
        <article
            v-for="playlist in playlistsStore.playlists"
            :key="playlist.id"
            class="playlist-card"
        >
          <div class="playlist-cover">
            <div class="cover-symbol">
              ♫
            </div>

            <div class="cover-glow"></div>
          </div>

          <div class="playlist-info">
            <h3>
              {{ playlist.name }}
            </h3>

            <p>
              {{ playlist.tracks.length }}
              {{ playlist.tracks.length === 1 ? 'track' : 'tracks' }}
            </p>
          </div>

          <div class="playlist-actions">
            <RouterLink
                :to="`/playlists/${playlist.id}`"
                class="open-button"
            >
              Open
            </RouterLink>

            <button
                class="delete-button"
                type="button"
                title="Delete playlist"
                @click="deletePlaylist(playlist.id)"
            >
              ×
            </button>
          </div>
        </article>
      </div>

      <div
          v-else
          class="empty-state"
      >
        <div class="empty-icon">
          ♫
        </div>

        <span class="section-label">
          NO PLAYLISTS YET
        </span>

        <h2>
          Start building your collection.
        </h2>

        <p>
          Create your first playlist and add music
          from your searches and favorites.
        </p>

        <button
            class="empty-create-button"
            type="button"
            @click="showCreateForm = true"
        >
          Create your first playlist
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.playlists-page {
  min-height: calc(100vh - 76px);

  padding-bottom: 100px;
}

.playlists-hero {
  width: min(1400px, 100%);

  margin: 0 auto;

  padding: 80px 30px 45px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 16px;

  color: rgba(255, 255, 255, 0.35);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.18em;
}

.playlists-hero h1 {
  margin: 0;

  color: #fff;

  font-size: clamp(42px, 6vw, 76px);
  font-weight: 700;

  line-height: 0.95;

  letter-spacing: -0.055em;
}

.playlists-hero h1 span {
  display: block;

  color: rgba(255, 255, 255, 0.35);
}

.playlists-hero p {
  max-width: 520px;

  margin: 24px 0 0;

  color: rgba(255, 255, 255, 0.45);

  font-size: 15px;

  line-height: 1.6;
}

.playlists-content {
  width: min(1400px, 100%);

  margin: 0 auto;

  padding: 0 30px;
}

.playlists-header {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 24px;
}

.section-label {
  display: block;

  margin-bottom: 6px;

  color: rgba(255, 255, 255, 0.35);

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.16em;
}

.playlists-header h2 {
  margin: 0;

  color: #fff;

  font-size: 26px;
  font-weight: 700;
}

.create-button,
.empty-create-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  min-height: 42px;

  padding: 0 17px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 11px;

  background: rgba(255, 255, 255, 0.07);

  color: #fff;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;
}

.create-button span {
  font-size: 18px;
  line-height: 1;
}

.create-button:hover,
.empty-create-button:hover {
  transform: translateY(-2px);

  border-color: rgba(255, 255, 255, 0.18);

  background: rgba(255, 255, 255, 0.11);
}

/* CREATE FORM */

.create-form {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 28px;

  padding: 20px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.035);

  backdrop-filter: blur(18px);
}

.create-form-content {
  flex: 1;

  min-width: 0;
}

.form-label {
  display: block;

  margin-bottom: 8px;

  color: rgba(255, 255, 255, 0.35);

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.15em;
}

.create-form input {
  width: 100%;

  height: 44px;

  padding: 0 14px;

  border: 1px solid rgba(255, 255, 255, 0.09);

  border-radius: 11px;

  outline: none;

  background: rgba(0, 0, 0, 0.2);

  color: #fff;

  font-size: 13px;

  transition:
      border-color 0.2s ease,
      background 0.2s ease;
}

.create-form input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.create-form input:focus {
  border-color: rgba(255, 255, 255, 0.2);

  background: rgba(0, 0, 0, 0.28);
}

.form-actions {
  display: flex;

  gap: 8px;
}

.cancel-button,
.save-button {
  height: 44px;

  padding: 0 15px;

  border-radius: 10px;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s ease;
}

.cancel-button {
  border: 1px solid rgba(255, 255, 255, 0.08);

  background: transparent;

  color: rgba(255, 255, 255, 0.5);
}

.cancel-button:hover {
  background: rgba(255, 255, 255, 0.05);

  color: #fff;
}

.save-button {
  border: none;

  background: #fff;

  color: #08080c;
}

.save-button:hover:not(:disabled) {
  transform: translateY(-1px);

  opacity: 0.9;
}

.save-button:disabled {
  cursor: not-allowed;

  opacity: 0.3;
}

/* PLAYLIST GRID */

.playlist-grid {
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(240px, 1fr)
  );

  gap: 16px;
}

.playlist-card {
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.07);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.035);

  transition:
      transform 0.25s ease,
      background 0.25s ease,
      border-color 0.25s ease;
}

.playlist-card:hover {
  transform: translateY(-5px);

  border-color: rgba(255, 255, 255, 0.13);

  background: rgba(255, 255, 255, 0.055);
}

.playlist-cover {
  position: relative;

  display: grid;

  place-items: center;

  aspect-ratio: 1;

  overflow: hidden;

  background:
      radial-gradient(
          circle at 30% 20%,
          rgba(255, 255, 255, 0.13),
          transparent 45%
      ),
      linear-gradient(
          145deg,
          #191920,
          #0c0c10
      );
}

.cover-symbol {
  position: relative;

  z-index: 2;

  color: rgba(255, 255, 255, 0.75);

  font-size: 72px;

  text-shadow:
      0 15px 40px rgba(0, 0, 0, 0.5);
}

.cover-glow {
  position: absolute;

  width: 55%;
  height: 55%;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.05);

  filter: blur(30px);
}

.playlist-info {
  padding: 16px 16px 12px;
}

.playlist-info h3 {
  overflow: hidden;

  margin: 0 0 6px;

  color: #fff;

  font-size: 15px;
  font-weight: 600;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.playlist-info p {
  margin: 0;

  color: rgba(255, 255, 255, 0.35);

  font-size: 11px;
}

.playlist-actions {
  display: flex;

  align-items: center;

  gap: 8px;

  padding: 0 12px 12px;
}

.open-button {
  display: flex;

  align-items: center;
  justify-content: center;

  flex: 1;

  height: 38px;

  border-radius: 10px;

  background: rgba(255, 255, 255, 0.07);

  color: rgba(255, 255, 255, 0.7);

  text-decoration: none;

  font-size: 12px;
  font-weight: 600;

  transition: 0.2s ease;
}

.open-button:hover {
  background: rgba(255, 255, 255, 0.12);

  color: #fff;
}

.delete-button {
  width: 38px;
  height: 38px;

  border: 1px solid rgba(255, 255, 255, 0.07);

  border-radius: 10px;

  background: transparent;

  color: rgba(255, 255, 255, 0.3);

  font-size: 20px;

  cursor: pointer;

  transition: 0.2s ease;
}

.delete-button:hover {
  border-color: rgba(255, 80, 80, 0.2);

  background: rgba(255, 80, 80, 0.08);

  color: #ff7070;
}

/* EMPTY */

.empty-state {
  display: flex;

  align-items: center;

  flex-direction: column;

  padding: 100px 20px;

  border: 1px solid rgba(255, 255, 255, 0.06);

  border-radius: 24px;

  background: rgba(255, 255, 255, 0.02);

  text-align: center;
}

.empty-icon {
  display: grid;

  place-items: center;

  width: 72px;
  height: 72px;

  margin-bottom: 25px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.04);

  color: rgba(255, 255, 255, 0.45);

  font-size: 30px;
}

.empty-state h2 {
  margin: 5px 0 10px;

  color: #fff;

  font-size: 24px;
}

.empty-state p {
  max-width: 420px;

  margin: 0 0 25px;

  color: rgba(255, 255, 255, 0.4);

  font-size: 13px;

  line-height: 1.6;
}

@media (max-width: 700px) {
  .playlists-hero {
    padding: 55px 16px 35px;
  }

  .playlists-content {
    padding: 0 16px;
  }

  .playlists-header {
    align-items: flex-start;

    flex-direction: column;
  }

  .create-button {
    width: 100%;
  }

  .create-form {
    align-items: stretch;

    flex-direction: column;
  }

  .form-actions {
    width: 100%;
  }

  .cancel-button,
  .save-button {
    flex: 1;
  }

  .playlist-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .playlist-grid {
    grid-template-columns: 1fr;
  }

  .empty-state {
    padding: 70px 20px;
  }
}
</style>