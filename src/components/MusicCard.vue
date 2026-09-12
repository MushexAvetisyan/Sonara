<script setup>
import { useFavoritesStore } from '../stores/favorites'

const props = defineProps({
  track: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'play',
  'details'
])

const favoritesStore = useFavoritesStore()

function toggleFavorite() {
  favoritesStore.toggleFavorite(props.track)
}
</script>

<template>
  <article class="music-card">
    <div class="cover-wrapper">
      <img
          :src="track.cover"
          :alt="track.title"
          class="cover"
      />

      <button
          class="favorite-button"
          type="button"
          :class="{
    active: favoritesStore.isFavorite(track)
  }"
          :aria-label="
    favoritesStore.isFavorite(track)
      ? 'Remove from favorites'
      : 'Add to favorites'
  "
          @click.stop="toggleFavorite"
      >
        {{ favoritesStore.isFavorite(track) ? '♥' : '♡' }}
      </button>

      <button
          class="play-button"
          :disabled="!track.preview"
          @click="emit('play', track)"
      >
        {{ track.preview ? '▶' : '—' }}
      </button>
    </div>

    <div class="track-info">
      <h3>{{ track.title }}</h3>

      <p>{{ track.artist }}</p>

      <span v-if="track.album">
    {{ track.album }}
  </span>

      <button
          class="details-button"
          @click="emit('details', track)"
      >
        Details
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.music-card {
  padding: 12px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.035);

  transition:
      transform 0.25s ease,
      background 0.25s ease,
      border-color 0.25s ease;

  &:hover {
    transform: translateY(-5px);

    background: rgba(255, 255, 255, 0.06);

    border-color: rgba(255, 255, 255, 0.14);
  }
}

.cover-wrapper {
  position: relative;

  aspect-ratio: 1;

  overflow: hidden;

  border-radius: 13px;
}

.cover {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}

.details-button {
  margin-top: 10px;

  padding: 0;

  border: none;

  background: transparent;

  color: #777783;

  font-size: 11px;

  cursor: pointer;

  &:hover {
    color: white;
  }
}

.play-button {
  position: absolute;
  right: 12px;
  bottom: 12px;

  width: 44px;
  height: 44px;

  border: none;
  border-radius: 50%;

  background: white;
  color: #08080c;

  cursor: pointer;

  opacity: 0;

  transform: translateY(8px);

  transition: 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.favorite-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;

  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;

  background: rgba(8, 8, 12, 0.65);
  backdrop-filter: blur(12px);

  color: rgba(255, 255, 255, 0.7);

  font-size: 21px;
  line-height: 1;

  cursor: pointer;

  transition:
      transform 0.2s ease,
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.08);

  border-color: rgba(255, 255, 255, 0.2);

  background: rgba(255, 255, 255, 0.12);

  color: #fff;
}

.favorite-button.active {
  background: rgba(255, 255, 255, 0.1);

  color: #ff6b81;

  border-color: rgba(255, 107, 129, 0.25);
}

.favorite-button.active:hover {
  background: rgba(255, 107, 129, 0.14);
  color: #ff8093;
}

@media (max-width: 480px) {
  .favorite-button {
    top: 9px;
    right: 9px;

    width: 34px;
    height: 34px;

    font-size: 18px;
  }
}

.music-card:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}

.track-info {
  padding: 14px 4px 4px;

  h3 {
    margin: 0 0 5px;

    overflow: hidden;

    color: white;

    font-size: 15px;
    font-weight: 600;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0 0 5px;

    overflow: hidden;

    color: #aaaab5;

    font-size: 13px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: #666672;

    font-size: 11px;
  }
}
</style>