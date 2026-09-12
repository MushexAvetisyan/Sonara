<script setup>
import {
  computed,
  onBeforeUnmount,
  ref,
  watch
} from 'vue'

const props = defineProps({
  track: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'next',
  'previous',
  'ended'
])

const audio = ref(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)

const progress = computed(() => {
  if (!duration.value) {
    return 0
  }

  return (currentTime.value / duration.value) * 100
})

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)

  const remainingSeconds =
      Math.floor(seconds % 60)

  return `${minutes}:${String(
      remainingSeconds
  ).padStart(2, '0')}`
}

/*
|--------------------------------------------------------------------------
| AUDIO
|--------------------------------------------------------------------------
*/

function createAudio() {
  destroyAudio()

  if (!props.track?.preview) {
    return
  }

  audio.value = new Audio(
      props.track.preview
  )

  audio.value.volume = volume.value

  audio.value.addEventListener(
      'loadedmetadata',
      updateDuration
  )

  audio.value.addEventListener(
      'timeupdate',
      updateProgress
  )

  audio.value.addEventListener(
      'ended',
      handleEnded
  )

  audio.value.addEventListener(
      'error',
      handleAudioError
  )
}

function destroyAudio() {
  if (!audio.value) {
    return
  }

  audio.value.pause()

  audio.value.removeEventListener(
      'loadedmetadata',
      updateDuration
  )

  audio.value.removeEventListener(
      'timeupdate',
      updateProgress
  )

  audio.value.removeEventListener(
      'ended',
      handleEnded
  )

  audio.value.removeEventListener(
      'error',
      handleAudioError
  )

  audio.value.src = ''

  audio.value = null
}

/*
|--------------------------------------------------------------------------
| PROGRESS
|--------------------------------------------------------------------------
*/

function updateDuration() {
  if (audio.value) {
    duration.value = audio.value.duration
  }
}

function updateProgress() {
  if (audio.value) {
    currentTime.value =
        audio.value.currentTime
  }
}

/*
|--------------------------------------------------------------------------
| ENDED
|--------------------------------------------------------------------------
*/

function handleEnded() {
  isPlaying.value = false

  currentTime.value = 0

  emit('ended')
}

/*
|--------------------------------------------------------------------------
| ERROR
|--------------------------------------------------------------------------
*/

function handleAudioError(error) {
  console.error(
      'Audio error:',
      error
  )

  isPlaying.value = false
}

/*
|--------------------------------------------------------------------------
| PLAY / PAUSE
|--------------------------------------------------------------------------
*/

async function togglePlay() {
  if (!audio.value) {
    return
  }

  if (isPlaying.value) {
    audio.value.pause()

    isPlaying.value = false

    return
  }

  try {
    await audio.value.play()

    isPlaying.value = true
  } catch (error) {
    console.error(
        'Playback error:',
        error
    )

    isPlaying.value = false
  }
}

/*
|--------------------------------------------------------------------------
| SEEK
|--------------------------------------------------------------------------
*/

function seek(event) {
  if (
      !audio.value ||
      !duration.value
  ) {
    return
  }

  const percent =
      Number(event.target.value)

  audio.value.currentTime =
      (percent / 100) *
      duration.value
}

/*
|--------------------------------------------------------------------------
| VOLUME
|--------------------------------------------------------------------------
*/

function changeVolume(event) {
  volume.value =
      Number(event.target.value)

  if (audio.value) {
    audio.value.volume =
        volume.value
  }
}

/*
|--------------------------------------------------------------------------
| PREVIOUS
|--------------------------------------------------------------------------
*/

function previous() {
  emit('previous')
}

/*
|--------------------------------------------------------------------------
| NEXT
|--------------------------------------------------------------------------
*/

function next() {
  emit('next')
}

/*
|--------------------------------------------------------------------------
| TRACK CHANGE
|--------------------------------------------------------------------------
*/

watch(
    () => props.track,

    async () => {
      isPlaying.value = false

      currentTime.value = 0

      duration.value = 0

      createAudio()

      if (!audio.value) {
        return
      }

      try {
        await audio.value.play()

        isPlaying.value = true
      } catch {
        // Автозапуск может быть запрещён браузером.
      }
    },

    {
      immediate: true
    }
)

/*
|--------------------------------------------------------------------------
| CLEANUP
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {
  destroyAudio()
})
</script>

<template>
  <Transition name="player">

    <div
        v-if="track"
        class="player"
    >

      <!-- TOP -->

      <div class="player-top">

        <div class="player-track">

          <img
              :src="track.cover"
              :alt="track.title"
          />

          <div class="track-text">

            <strong>
              {{ track.title }}
            </strong>

            <span>
              {{ track.artist }}
            </span>

          </div>

        </div>

        <a
            v-if="track.sourceUrl"
            :href="track.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="source-link"
        >
          Open ↗
        </a>

      </div>

      <!-- PROGRESS -->

      <div class="progress-container">

        <span>
          {{ formatTime(currentTime) }}
        </span>

        <input
            class="progress"
            type="range"
            min="0"
            max="100"
            step="0.1"
            :value="progress"
            @input="seek"
        />

        <span>
          {{ formatTime(duration) }}
        </span>

      </div>

      <!-- BOTTOM -->

      <div class="player-bottom">

        <!-- VOLUME -->

        <div class="volume">

          <span>
            🔊
          </span>

          <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="volume"
              @input="changeVolume"
          />

        </div>

        <!-- CONTROLS -->

        <div class="player-controls">

          <button
              title="Previous"
              @click="previous"
          >
            ⏮
          </button>

          <button
              class="main-play"
              title="Play / Pause"
              @click="togglePlay"
          >
            {{ isPlaying ? '⏸' : '▶' }}
          </button>

          <button
              title="Next"
              @click="next"
          >
            ⏭
          </button>

        </div>

        <div class="track-source">
          Preview
        </div>

      </div>

    </div>

  </Transition>
</template>

<style scoped lang="scss">
.player {
  position: fixed;
  left: 50%;
  bottom: 20px;
  z-index: 200;
  width: min(700px, calc(100vw - 40px));
  transform: translateX(-50%);
  padding: 18px 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  background: rgba(15, 15, 20, 0.92);
  backdrop-filter: blur(25px);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
  transition: width 0.25s ease, padding 0.25s ease, bottom 0.25s ease;
}

/* ========================================================= TOP ========================================================= */
.player-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  min-width: 0;
}

.player-track {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;

  img {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 11px;
    object-fit: cover;
  }
}

.track-text {
  min-width: 0;
  flex: 1;

  strong, span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: white;
    font-size: 14px;
  }

  span {
    margin-top: 4px;
    color: #858591;
    font-size: 12px;
  }
}

.source-link {
  flex-shrink: 0;
  color: #858591;
  font-size: 12px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
}

/* ========================================================= PROGRESS ========================================================= */
.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 15px 0 12px;
  color: #777783;
  font-size: 10px;
}

.progress {
  min-width: 0;
  flex: 1;
}

input[type='range'] {
  height: 4px;
  appearance: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  cursor: pointer;
  outline: none;
}

input[type='range']::-webkit-slider-thumb {
  width: 12px;
  height: 12px;
  appearance: none;
  border-radius: 50%;
  background: white;
  transition: transform 0.15s ease;
}

input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

input[type='range']::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

/* ========================================================= BOTTOM ========================================================= */
.player-bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 15px;
}

/* ========================================================= VOLUME ========================================================= */
.volume {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  width: 150px;
  font-size: 12px;

  input {
    width: 90px;
    min-width: 0;
  }
}

/* ========================================================= CONTROLS ========================================================= */
.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  button {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: #aaaab5;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: white;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .main-play {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: white;
    color: #08080c;
    font-size: 15px;

    &:hover {
      color: #08080c;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

/* ========================================================= SOURCE ========================================================= */
.track-source {
  width: 150px;
  overflow: hidden;
  color: #555560;
  font-size: 11px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================================= ANIMATION ========================================================= */
.player-enter-active, .player-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.player-enter-from, .player-leave-to {
  opacity: 0;
  transform: translate(-50%, 30px);
}

/* ========================================================= TABLET ========================================================= */
@media (max-width: 900px) {
  .player {
    width: calc(100vw - 40px);
    padding: 16px 18px;
  }
  .volume {
    width: 120px;

    input {
      width: 70px;
    }
  }
  .track-source {
    width: 100px;
  }
}

/* ========================================================= SMALL TABLET / LARGE MOBILE ========================================================= */
@media (max-width: 700px) {
  .player {
    left: 50%;
    bottom: 10px;
    width: calc(100vw - 20px);
    padding: 14px;
    border-radius: 18px;
  }
  .player-top {
    gap: 10px;
  }
  .player-track {
    gap: 10px;

    img {
      width: 46px;
      height: 46px;
      border-radius: 9px;
    }
  }
  .track-text {
    strong {
      font-size: 13px;
    }

    span {
      font-size: 11px;
    }
  }
  .source-link {
    font-size: 11px;
  }
  .volume, .track-source {
    display: none;
  }
  .player-bottom {
    display: flex;
    justify-content: center;
    gap: 0;
  }
  .player-controls {
    margin: 0 auto;
    gap: 18px;
  }
}

/* ========================================================= SMALL MOBILE ========================================================= */
@media (max-width: 480px) {
  .player {
    bottom: 8px;
    width: calc(100vw - 16px);
    padding: 12px;
    border-radius: 16px;
  }
  .queue-panel{
    left: 0;
  }
  .player-track {
    img {
      width: 42px;
      height: 42px;
    }
  }
  .track-text {
    strong {
      font-size: 12px;
    }

    span {
      margin-top: 3px;
      font-size: 10px;
    }
  }
  .source-link {
    display: none;
  }
  .progress-container {
    gap: 7px;
    margin: 12px 0 10px;
    font-size: 9px;
  }
  .player-controls {
    gap: 14px;

    button {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }

    .main-play {
      width: 42px;
      height: 42px;
      font-size: 14px;
    }
  }
}

/* ========================================================= VERY SMALL PHONES ========================================================= */
@media (max-width: 360px) {
  .player {
    width: calc(100vw - 12px);
    padding: 10px;
  }
  .player-track {
    img {
      width: 38px;
      height: 38px;
    }
  }
  .player-controls {
    gap: 10px;
  }
  .progress-container {
    margin-top: 10px;
  }

  .queue-panel{
    left: 0;
  }
}
</style>