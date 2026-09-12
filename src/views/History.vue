<script setup>
import { ref } from 'vue'

import SearchHistory from '../components/SearchHistory.vue'
import MusicGrid from '../components/MusicGrid.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import TrackDetails from '../components/TrackDetails.vue'

import { searchMusic as searchMusicApi } from '../services/musicApi'

const history = ref(
    JSON.parse(
        localStorage.getItem('music-vault-history') || '[]'
    )
)

const tracks = ref([])
const selectedTrack = ref(null)
const detailsTrack = ref(null)

const isLoading = ref(false)
const error = ref('')

const searchType = ref('songs')

/* =========================
   HISTORY
========================= */

function saveHistory() {
  localStorage.setItem(
      'music-vault-history',
      JSON.stringify(history.value)
  )
}

function removeHistoryItem(id) {
  history.value = history.value.filter(
      item => item.id !== id
  )

  saveHistory()
}

function clearHistory() {
  history.value = []
  saveHistory()
}

/* =========================
   SEARCH
========================= */

async function performSearch(item) {
  searchType.value = item.type

  try {
    isLoading.value = true
    error.value = ''

    selectedTrack.value = null
    detailsTrack.value = null

    const results = await searchMusicApi(
        item.query,
        item.type
    )

    tracks.value = results

    if (!results.length) {
      error.value = 'Nothing found'
    }
  } catch (err) {
    console.error(err)

    error.value = 'Unable to search music'
    tracks.value = []
  } finally {
    isLoading.value = false
  }
}

/* =========================
   PLAYER
========================= */

function playTrack(track) {
  if (!track) {
    return
  }

  if (!track.preview) {
    return
  }

  selectedTrack.value = track
}

function nextTrack() {
  if (!selectedTrack.value || !tracks.value.length) {
    return
  }

  const currentIndex = tracks.value.findIndex(
      track => track.id === selectedTrack.value.id
  )

  if (currentIndex === -1) {
    return
  }

  const nextIndex = currentIndex + 1

  if (nextIndex >= tracks.value.length) {
    return
  }

  const nextTrackItem = tracks.value[nextIndex]

  if (!nextTrackItem.preview) {
    return
  }

  selectedTrack.value = nextTrackItem
}

function previousTrack() {
  if (!selectedTrack.value || !tracks.value.length) {
    return
  }

  const currentIndex = tracks.value.findIndex(
      track => track.id === selectedTrack.value.id
  )

  if (currentIndex <= 0) {
    return
  }

  const previousTrackItem = tracks.value[currentIndex - 1]

  if (!previousTrackItem.preview) {
    return
  }

  selectedTrack.value = previousTrackItem
}

function handleTrackEnded() {
  nextTrack()
}

/* =========================
   DETAILS
========================= */

function openDetails(track) {
  detailsTrack.value = track
}

function closeDetails() {
  detailsTrack.value = null
}
</script>

<template>
  <div class="history-page">

    <!-- HERO -->

    <section class="history-hero">
      <span class="eyebrow">
        MUSIC VAULT
      </span>

      <h1>
        Your search
        <span>history.</span>
      </h1>

      <p>
        Quickly return to music you've searched for before.
      </p>
    </section>


    <!-- HISTORY -->

    <section class="history-content">

      <SearchHistory
          :history="history"
          @search="performSearch"
          @remove="removeHistoryItem"
          @clear="clearHistory"
      />


      <!-- LOADING -->

      <div
          v-if="isLoading"
          class="status"
      >
        <span class="loading-dot"></span>

        Searching music...
      </div>


      <!-- ERROR -->

      <div
          v-else-if="error"
          class="status error"
      >
        {{ error }}
      </div>


      <!-- RESULTS -->

      <section
          v-else-if="tracks.length"
          class="results-section"
      >

        <div class="results-header">
          <div>
            <span class="section-label">
              SEARCH RESULTS
            </span>

            <h2>
              Found music
            </h2>
          </div>

          <span class="result-count">
            {{ tracks.length }} results
          </span>
        </div>


        <MusicGrid
            :tracks="tracks"
            @play="playTrack"
            @details="openDetails"
        />

      </section>

    </section>


    <!-- PLAYER -->

    <MusicPlayer
        :track="selectedTrack"
        @next="nextTrack"
        @previous="previousTrack"
        @ended="handleTrackEnded"
    />


    <!-- DETAILS -->

    <TrackDetails
        :track="detailsTrack"
        @close="closeDetails"
        @play="playTrack"
    />

  </div>
</template>


<style scoped lang="scss">

.history-page {
  min-height: calc(100vh - 80px);

  padding: 100px 30px 160px;
}


/* =========================
   HERO
========================= */

.history-hero {
  width: min(900px, 100%);

  margin: 0 auto;

  text-align: center;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 18px;

  color: rgba(255, 255, 255, 0.4);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.2em;
}

.history-hero h1 {
  margin: 0;

  font-size: clamp(42px, 7vw, 76px);

  line-height: 0.95;

  letter-spacing: -0.04em;
}

.history-hero h1 span {
  color: rgba(255, 255, 255, 0.35);
}

.history-hero p {
  max-width: 550px;

  margin: 25px auto 0;

  color: rgba(255, 255, 255, 0.5);

  font-size: 16px;

  line-height: 1.6;
}


/* =========================
   CONTENT
========================= */

.history-content {
  width: min(1400px, 100%);

  margin: 70px auto 0;
}


/* =========================
   STATUS
========================= */

.status {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  margin-top: 30px;

  padding: 30px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.025);

  color: rgba(255, 255, 255, 0.6);

  text-align: center;
}

.status.error {
  color: #ff7777;
}


/* =========================
   LOADING
========================= */

.loading-dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.7);

  animation: loadingPulse 1s infinite ease-in-out;
}

@keyframes loadingPulse {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}


/* =========================
   RESULTS
========================= */

.results-section {
  margin-top: 70px;
}

.results-header {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 28px;
}

.results-header h2 {
  margin: 0;

  color: #fff;

  font-size: clamp(26px, 4vw, 38px);

  letter-spacing: -0.03em;
}

.section-label {
  display: block;

  margin-bottom: 8px;

  color: rgba(255, 255, 255, 0.35);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.16em;
}

.result-count {
  color: rgba(255, 255, 255, 0.35);

  font-size: 13px;

  white-space: nowrap;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 700px) {
  .history-page {
    padding: 70px 20px 150px;
  }

  .history-content {
    margin-top: 50px;
  }

  .results-section {
    margin-top: 50px;
  }

  .results-header {
    align-items: flex-start;

    flex-direction: column;

    gap: 10px;
  }
}

@media (max-width: 480px) {
  .history-page {
    padding: 55px 15px 140px;
  }

  .history-hero p {
    font-size: 14px;
  }

  .results-header h2 {
    font-size: 27px;
  }
}

</style>