<script setup>
import { ref } from 'vue'

import MusicGrid from '../components/MusicGrid.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import TrackDetails from '../components/TrackDetails.vue'

import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()

const selectedTrack = ref(null)
const detailsTrack = ref(null)

function playTrack(track) {
  if (!track?.preview) {
    return
  }

  selectedTrack.value = track
}

function nextTrack() {
  if (!selectedTrack.value || !favoritesStore.favorites.length) {
    return
  }

  const favorites = favoritesStore.favorites

  const currentIndex = favorites.findIndex(
      track => track.id === selectedTrack.value.id
  )

  if (currentIndex === -1) {
    return
  }

  const nextIndex = currentIndex + 1

  if (nextIndex >= favorites.length) {
    return
  }

  const nextTrackItem = favorites[nextIndex]

  if (!nextTrackItem.preview) {
    return
  }

  selectedTrack.value = nextTrackItem
}

function previousTrack() {
  if (!selectedTrack.value || !favoritesStore.favorites.length) {
    return
  }

  const favorites = favoritesStore.favorites

  const currentIndex = favorites.findIndex(
      track => track.id === selectedTrack.value.id
  )

  if (currentIndex <= 0) {
    return
  }

  const previousTrackItem = favorites[currentIndex - 1]

  if (!previousTrackItem.preview) {
    return
  }

  selectedTrack.value = previousTrackItem
}

function handleTrackEnded() {
  nextTrack()
}

function openDetails(track) {
  detailsTrack.value = track
}

function closeDetails() {
  detailsTrack.value = null
}

function clearFavorites() {
  favoritesStore.clearFavorites()

  selectedTrack.value = null
}
</script>

<template>
  <div class="favorites-page">
    <section class="favorites-hero">
      <span class="eyebrow">
        MUSIC VAULT
      </span>

      <h1>
        Your
        <span>favorites.</span>
      </h1>

      <p>
        The music you've chosen to keep close.
      </p>
    </section>

    <section class="favorites-content">
      <div
          v-if="favoritesStore.favorites.length"
          class="favorites-header"
      >
        <div>
          <span class="section-label">
            SAVED MUSIC
          </span>

          <h2>
            Favorites
          </h2>
        </div>

        <div class="favorites-actions">
          <span class="favorite-count">
            {{ favoritesStore.favoriteCount }}
            {{ favoritesStore.favoriteCount === 1 ? 'track' : 'tracks' }}
          </span>

          <button
              class="clear-button"
              type="button"
              @click="clearFavorites"
          >
            Clear all
          </button>
        </div>
      </div>

      <div
          v-if="favoritesStore.favorites.length"
          class="favorites-grid"
      >
        <MusicGrid
            :tracks="favoritesStore.favorites"
            @play="playTrack"
            @details="openDetails"
        />
      </div>

      <div
          v-else
          class="empty-state"
      >
        <div class="empty-icon">
          ♡
        </div>

        <span class="section-label">
          NO FAVORITES YET
        </span>

        <h2>
          Your collection is empty.
        </h2>

        <p>
          Find something you like and tap the heart
          to save it here.
        </p>

        <RouterLink
            to="/"
            class="discover-button"
        >
          Discover music
        </RouterLink>
      </div>
    </section>

    <MusicPlayer
        :track="selectedTrack"
        @next="nextTrack"
        @previous="previousTrack"
        @ended="handleTrackEnded"
    />

    <TrackDetails
        :track="detailsTrack"
        @close="closeDetails"
        @play="playTrack"
    />
  </div>
</template>

<style scoped lang="scss">
.favorites-page {
  min-height: calc(100vh - 76px);
  padding-bottom: 150px;
}

.favorites-hero {
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

.favorites-hero h1 {
  margin: 0;

  color: #fff;

  font-size: clamp(42px, 6vw, 76px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.055em;
}

.favorites-hero h1 span {
  display: block;

  color: rgba(255, 255, 255, 0.35);
}

.favorites-hero p {
  max-width: 520px;

  margin: 24px 0 0;

  color: rgba(255, 255, 255, 0.45);

  font-size: 15px;
  line-height: 1.6;
}

.favorites-content {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 0 30px;
}

.favorites-header {
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

.favorites-header h2 {
  margin: 0;

  color: #fff;

  font-size: 26px;
  font-weight: 700;
}

.favorites-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.favorite-count {
  color: rgba(255, 255, 255, 0.4);

  font-size: 12px;
}

.clear-button {
  padding: 9px 14px;

  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.035);

  color: rgba(255, 255, 255, 0.55);

  font-size: 12px;

  cursor: pointer;

  transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
}

.clear-button:hover {
  border-color: rgba(255, 255, 255, 0.15);

  background: rgba(255, 255, 255, 0.08);

  color: #fff;
}

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

  font-size: 34px;
}

.empty-state h2 {
  margin: 5px 0 10px;

  color: #fff;

  font-size: 24px;
}

.empty-state p {
  max-width: 400px;

  margin: 0 0 25px;

  color: rgba(255, 255, 255, 0.4);

  font-size: 13px;
  line-height: 1.6;
}

.discover-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;

  padding: 0 18px;

  border-radius: 11px;

  background: #fff;

  color: #08080c;

  text-decoration: none;

  font-size: 12px;
  font-weight: 600;

  transition:
      transform 0.2s ease,
      opacity 0.2s ease;
}

.discover-button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 700px) {
  .favorites-hero {
    padding: 55px 16px 35px;
  }

  .favorites-content {
    padding: 0 16px;
  }

  .favorites-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .favorites-actions {
    width: 100%;
    justify-content: space-between;
  }

  .empty-state {
    padding: 70px 20px;
  }
}
</style>