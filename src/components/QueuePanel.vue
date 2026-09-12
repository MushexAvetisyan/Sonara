<script setup>
import {computed} from 'vue'

const props = defineProps({
  queue: {
    type: Array,
    default: () => []
  },

  currentTrackIndex: {
    type: Number,
    default: -1
  }
})

const emit = defineEmits([
  'select',
  'clear'
])

const currentTrack = computed(() => {
  if (
      props.currentTrackIndex < 0 ||
      props.currentTrackIndex >= props.queue.length
  ) {
    return null
  }

  return props.queue[props.currentTrackIndex]
})

const upcomingTracks = computed(() => {
  if (props.currentTrackIndex < 0) {
    return props.queue
  }

  return props.queue.slice(
      props.currentTrackIndex + 1
  )
})

function selectTrack(track) {
  emit('select', track)
}
</script>

<template>
  <aside
      v-if="queue.length"
      class="queue-panel"
  >

    <div class="queue-header">

      <div>
        <span class="queue-label">
          PLAYBACK
        </span>

        <h3>
          Queue
        </h3>
      </div>

      <button
          class="clear-button"
          @click="emit('clear')"
      >
        Clear
      </button>

    </div>

    <!-- CURRENT -->

    <div
        v-if="currentTrack"
        class="now-playing"
    >

      <span class="section-label">
        NOW PLAYING
      </span>

      <div class="current-track">

        <img
            :src="currentTrack.cover"
            :alt="currentTrack.title"
        />

        <div class="track-info">

          <strong>
            {{ currentTrack.title }}
          </strong>

          <span>
            {{ currentTrack.artist }}
          </span>

        </div>

        <div class="playing-indicator">
          <i></i>
          <i></i>
          <i></i>
        </div>

      </div>

    </div>

    <!-- UPCOMING -->

    <div class="up-next">

      <span class="section-label">
        UP NEXT
      </span>

      <div
          v-if="!upcomingTracks.length"
          class="empty-queue"
      >
        No more tracks
      </div>

      <button
          v-for="(track, index) in upcomingTracks"
          :key="track.id"
          class="queue-track"
          @click="selectTrack(track)"
      >

        <span class="track-number">
          {{ String(index + 1).padStart(2, '0') }}
        </span>

        <img
            :src="track.cover"
            :alt="track.title"
        />

        <div class="track-info">

          <strong>
            {{ track.title }}
          </strong>

          <span>
            {{ track.artist }}
          </span>

        </div>

        <span class="play-icon">
          ▶
        </span>

      </button>

    </div>

  </aside>
</template>

<style scoped lang="scss">
.queue-panel {
  position: fixed;
  top: 70px;
  left: 75.2rem;
  width: min(100%, 700px);
  overflow-y: scroll;
  height: 29rem;
  margin: 10px auto 0;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: rgba(15, 15, 20, 0.55);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.queue-header {
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 22px;

  h3 {
    margin: 5px 0 0;

    color: white;

    font-size: 24px;

    letter-spacing: -1px;
  }
}

.queue-label,
.section-label {
  color: #666672;

  font-size: 9px;
  font-weight: 700;

  letter-spacing: 2px;
}

.clear-button {
  padding: 7px 12px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 10px;

  background: transparent;

  color: #777783;

  font-size: 11px;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);

    color: white;
  }
}

.now-playing {
  margin-bottom: 25px;
}

.current-track {
  display: flex;

  align-items: center;

  gap: 14px;

  margin-top: 10px;

  padding: 12px;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.05);
}

.current-track img {
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  border-radius: 12px;

  object-fit: cover;
}

.track-info {
  min-width: 0;

  flex: 1;

  strong,
  span {
    display: block;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
  }

  strong {
    color: white;

    font-size: 13px;
  }

  span {
    margin-top: 5px;

    color: #777783;

    font-size: 11px;
  }
}

.playing-indicator {
  display: flex;

  align-items: end;

  gap: 3px;

  height: 18px;

  padding-right: 5px;

  i {
    width: 3px;

    border-radius: 5px;

    background: white;

    animation: equalizer 0.8s ease-in-out infinite;

    &:nth-child(1) {
      height: 8px;

      animation-delay: 0s;
    }

    &:nth-child(2) {
      height: 16px;

      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      height: 11px;

      animation-delay: 0.3s;
    }
  }
}

.up-next {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

.queue-track {
  width: 100%;

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 9px;

  border: none;

  border-radius: 12px;

  background: transparent;

  color: white;

  text-align: left;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);

    .play-icon {
      opacity: 1;
    }
  }

  img {
    width: 42px;
    height: 42px;

    flex-shrink: 0;

    border-radius: 8px;

    object-fit: cover;
  }
}

.track-number {
  width: 24px;

  color: #555560;

  font-size: 10px;

  text-align: center;
}

.play-icon {
  color: white;

  font-size: 10px;

  opacity: 0;

  transition: 0.2s ease;
}

.empty-queue {
  padding: 18px 0;

  color: #555560;

  font-size: 12px;
}

@keyframes equalizer {
  0%,
  100% {
    transform: scaleY(0.5);
  }

  50% {
    transform: scaleY(1);
  }
}

@media (max-width: 600px) {
  .queue-panel {
    height: 19rem;
    margin-top: 5px;
    left: 0;
    padding: 18px;

    border-radius: 18px;
  }

  .current-track img {
    width: 50px;
    height: 50px;
  }

  .queue-track img {
    width: 38px;
    height: 38px;
  }

  .track-number {
    display: none;
  }
}
</style>