<script setup>
defineProps({
  track: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'play'])
</script>

<template>
  <Transition name="modal">
    <div
        v-if="track"
        class="modal-overlay"
        @click.self="emit('close')"
    >
      <div class="modal">

        <button
            class="close-button"
            @click="emit('close')"
        >
          ×
        </button>

        <div class="details">

          <div class="cover-section">
            <img
                :src="track.cover"
                :alt="track.title"
            />
          </div>

          <div class="info-section">

            <span class="label">
              TRACK DETAILS
            </span>

            <h2>
              {{ track.title }}
            </h2>

            <p class="artist">
              {{ track.artist }}
            </p>

            <div class="metadata">

              <div
                  v-if="track.album"
                  class="metadata-item"
              >
                <span>Album</span>
                <strong>{{ track.album }}</strong>
              </div>

              <div
                  v-if="track.genre"
                  class="metadata-item"
              >
                <span>Genre</span>
                <strong>{{ track.genre }}</strong>
              </div>

              <div
                  v-if="track.releaseDate"
                  class="metadata-item"
              >
                <span>Release</span>
                <strong>
                  {{ new Date(track.releaseDate).getFullYear() }}
                </strong>
              </div>

              <div
                  v-if="track.country"
                  class="metadata-item"
              >
                <span>Country</span>
                <strong>{{ track.country }}</strong>
              </div>

            </div>

            <div class="actions">

              <button
                  v-if="track.preview"
                  class="play-button"
                  @click="emit('play', track)"
              >
                ▶ Play preview
              </button>

              <a
                  v-if="track.sourceUrl"
                  :href="track.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="source-button"
              >
                Open source ↗
              </a>

            </div>

          </div>

        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;

  inset: 0;

  z-index: 500;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.75);

  backdrop-filter: blur(15px);
}

.modal {
  position: relative;

  width: min(900px, 100%);

  padding: 30px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;

  background: #111116;

  box-shadow:
      0 30px 100px rgba(0, 0, 0, 0.6);
}

.close-button {
  position: absolute;

  top: 15px;
  right: 15px;

  width: 38px;
  height: 38px;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.06);

  color: #aaaab5;

  font-size: 25px;

  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);

    color: white;
  }
}

.details {
  display: grid;

  grid-template-columns: 320px 1fr;

  gap: 35px;

  align-items: center;
}

.cover-section img {
  width: 100%;

  aspect-ratio: 1;

  display: block;

  border-radius: 18px;

  object-fit: cover;

  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.5);
}

.label {
  color: #777783;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 3px;
}

.info-section h2 {
  margin: 12px 0 8px;

  color: white;

  font-size: 38px;

  line-height: 1.05;
}

.artist {
  margin: 0 0 30px;

  color: #9999a5;

  font-size: 18px;
}

.metadata {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 15px;

  margin-bottom: 30px;
}

.metadata-item {
  padding: 13px;

  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.03);

  span,
  strong {
    display: block;
  }

  span {
    margin-bottom: 5px;

    color: #666672;

    font-size: 10px;

    text-transform: uppercase;
  }

  strong {
    overflow: hidden;

    color: #dddde5;

    font-size: 13px;

    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.actions {
  display: flex;

  gap: 10px;
}

.play-button,
.source-button {
  height: 45px;

  padding: 0 18px;

  border-radius: 12px;

  font-size: 13px;

  font-weight: 600;

  text-decoration: none;

  cursor: pointer;
}

.play-button {
  border: none;

  background: white;

  color: #08080c;
}

.source-button {
  display: flex;

  align-items: center;

  border: 1px solid rgba(255, 255, 255, 0.1);

  background: rgba(255, 255, 255, 0.04);

  color: #ccc;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .modal {
    padding: 20px;

    max-height: 90vh;

    overflow-y: auto;
  }

  .details {
    grid-template-columns: 1fr;

    gap: 20px;
  }

  .cover-section img {
    width: min(280px, 100%);

    margin: 0 auto;
  }

  .info-section h2 {
    font-size: 28px;
  }
}
</style>