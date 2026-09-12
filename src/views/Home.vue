<script setup>
import { ref } from 'vue'

import SearchBar from '../components/SearchBar.vue'
import MusicGrid from '../components/MusicGrid.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import TrackDetails from '../components/TrackDetails.vue'
import QueuePanel from '../components/QueuePanel.vue'
import SearchHistory from '../components/SearchHistory.vue'
import { searchMusic as searchMusicApi } from '../services/musicApi'

const selectedTrack = ref(null)
const detailsTrack = ref(null)

const searchType = ref('songs')
const hasSearched = ref(false)
const isLoading = ref(false)
const error = ref('')

const tracks = ref([
  {
    id: 1,
    title: 'Time',
    artist: 'Hans Zimmer',
    album: 'Inception',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Cornfield Chase',
    artist: 'Hans Zimmer',
    album: 'Interstellar',
    cover: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Experience',
    artist: 'Ludovico Einaudi',
    album: 'In A Time Lapse',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Outro',
    artist: 'Hajime',
    album: 'Castle',
    cover: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'The Night We Met',
    artist: 'Lord Huron',
    album: 'Strange Trails',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
  }
])

/*
|--------------------------------------------------------------------------
| QUEUE
|--------------------------------------------------------------------------
*/

const queue = ref([])
const currentTrackIndex = ref(-1)

const history = ref(
    JSON.parse(
        localStorage.getItem('music-vault-history') || '[]'
    )
)

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

async function searchMusic(query) {
  try {
    addToHistory(query)
    isLoading.value = true
    error.value = ''
    hasSearched.value = true

    const results = await searchMusicApi(
        query,
        searchType.value
    )

    tracks.value = results

    // Новый поиск = новая очередь
    queue.value = []
    currentTrackIndex.value = -1
    selectedTrack.value = null

    if (results.length === 0) {
      error.value = 'Nothing found'
    }
  } catch (err) {
    console.error(err)

    error.value = 'Unable to search music'
  } finally {
    isLoading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| DETAILS
|--------------------------------------------------------------------------
*/

function openDetails(track) {
  detailsTrack.value = track
}

function closeDetails() {
  detailsTrack.value = null
}

/*
|--------------------------------------------------------------------------
| PLAY TRACK
|--------------------------------------------------------------------------
*/

function playTrack(track) {
  if (!track) {
    return
  }

  // Если трека ещё нет в очереди,
  // используем текущие результаты поиска
  if (!queue.value.length) {
    queue.value = [...tracks.value]
  }

  const index = queue.value.findIndex(
      item => item.id === track.id
  )

  if (index === -1) {
    queue.value.push(track)
    currentTrackIndex.value = queue.value.length - 1
  } else {
    currentTrackIndex.value = index
  }

  selectedTrack.value = queue.value[currentTrackIndex.value]
}

/*
|--------------------------------------------------------------------------
| NEXT TRACK
|--------------------------------------------------------------------------
*/

function nextTrack() {
  if (!queue.value.length) {
    return
  }

  const nextIndex = currentTrackIndex.value + 1

  // Последний трек
  if (nextIndex >= queue.value.length) {
    return
  }

  currentTrackIndex.value = nextIndex
  selectedTrack.value = queue.value[nextIndex]
}

/*
|--------------------------------------------------------------------------
| PREVIOUS TRACK
|--------------------------------------------------------------------------
*/

function previousTrack() {
  if (!queue.value.length) {
    return
  }

  const previousIndex = currentTrackIndex.value - 1

  // Первый трек
  if (previousIndex < 0) {
    return
  }

  currentTrackIndex.value = previousIndex
  selectedTrack.value = queue.value[previousIndex]
}

function clearQueue() {
  queue.value = []
  currentTrackIndex.value = -1
  selectedTrack.value = null
}

function saveHistory() {
  localStorage.setItem(
      'music-vault-history',
      JSON.stringify(history.value)
  )
}

function addToHistory(query) {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return
  }

  history.value = history.value.filter(
      item =>
          !(
              item.query.toLowerCase() === normalizedQuery.toLowerCase() &&
              item.type === searchType.value
          )
  )

  history.value.unshift({
    id: Date.now(),
    query: normalizedQuery,
    type: searchType.value
  })

  history.value = history.value.slice(0, 20)

  saveHistory()
}

function searchFromHistory(item) {
  searchType.value = item.type
  searchMusic(item.query)
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

/*
|--------------------------------------------------------------------------
| TRACK ENDED
|--------------------------------------------------------------------------
*/

function handleTrackEnded() {
  nextTrack()
}
</script>

<template>
  <div class="home">

    <!-- HERO -->

    <section class="hero">
      <div class="hero-content">

        <span class="eyebrow">
          MUSIC DISCOVERY
        </span>

        <h2>
          Find the music
          <br />
          <span>that moves you.</span>
        </h2>

        <p>
          Search songs, artists, groups, composers
          and soundtracks in one place.
        </p>

        <SearchBar @search="searchMusic" />

        <div class="search-types">

          <button
              :class="{ active: searchType === 'songs' }"
              @click="searchType = 'songs'"
          >
            Songs
          </button>

          <button
              :class="{ active: searchType === 'artists' }"
              @click="searchType = 'artists'"
          >
            Artists
          </button>

          <button
              :class="{ active: searchType === 'albums' }"
              @click="searchType = 'albums'"
          >
            Albums
          </button>

          <button
              :class="{ active: searchType === 'soundtracks' }"
              @click="searchType = 'soundtracks'"
          >
            Soundtracks
          </button>

        </div>

      </div>
    </section>

    <!-- MUSIC -->

    <section class="music-section">

      <div class="section-header">

        <div>
          <span class="section-label">
            {{ hasSearched ? 'SEARCH RESULTS' : 'EXPLORE' }}
          </span>

          <h2>
            {{ hasSearched ? 'Found music' : 'Featured music' }}
          </h2>
        </div>

        <span
            v-if="!isLoading && tracks.length"
            class="result-count"
        >
          {{ tracks.length }} results
        </span>

      </div>

      <div
          v-if="isLoading"
          class="status"
      >
        Searching music...
      </div>

      <div
          v-else-if="error"
          class="status error"
      >
        {{ error }}
      </div>

      <MusicGrid
          v-else
          :tracks="tracks"
          @play="playTrack"
          @details="openDetails"
      />

      <SearchHistory
          :history="history"
          @search="searchFromHistory"
          @remove="removeHistoryItem"
          @clear="clearHistory"
      />

      <QueuePanel
          v-if="queue.length"
          :queue="queue"
          :current-track-index="currentTrackIndex"
          @select="playTrack"
          @clear="clearQueue"
      />

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
.home {
  min-height: calc(100vh - 80px);
}

.hero {
  min-height: 600px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 80px 30px;

  background:
      radial-gradient(
          circle at 50% 20%,
          rgba(100, 100, 120, 0.12),
          transparent 40%
      );
}

.hero-content {
  width: min(1000px, 100%);

  display: flex;
  align-items: center;
  flex-direction: column;

  text-align: center;
}

.eyebrow,
.section-label {
  color: #777783;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 3px;
}

h2 {
  margin: 20px 0;

  font-size: clamp(42px, 7vw, 82px);
  line-height: 0.98;
  letter-spacing: -4px;

  font-weight: 800;

  span {
    color: #777783;
  }
}

.hero p {
  max-width: 600px;

  margin: 0 0 35px;

  color: #858591;

  font-size: 16px;
  line-height: 1.7;
}

.search-types {
  display: flex;

  gap: 10px;

  margin-top: 18px;

  button {
    padding: 7px 13px;

    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 20px;

    background: transparent;

    color: #777783;

    font-size: 11px;

    cursor: pointer;

    transition: 0.2s ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.15);

      color: white;
    }

    &.active {
      border-color: rgba(255, 255, 255, 0.25);

      background: rgba(255, 255, 255, 0.1);

      color: white;
    }
  }
}

.result-count {
  color: #666672;

  font-size: 12px;
}

.status {
  padding: 70px 20px;

  text-align: center;

  color: #858591;

  font-size: 14px;

  &.error {
    color: #aaaab5;
  }
}

.music-section {
  max-width: 1400px;

  margin: 0 auto;

  padding: 30px;
}

.section-header {
  display: flex;

  align-items: end;
  justify-content: space-between;

  margin-bottom: 25px;

  h2 {
    margin: 8px 0 0;

    font-size: 30px;
    letter-spacing: -1px;
  }
}

@media (max-width: 700px) {
  .hero {
    min-height: 520px;

    padding: 60px 20px;
  }

  h2 {
    letter-spacing: -2px;
  }

  .search-types {
    flex-wrap: wrap;
    justify-content: center;
  }

  .music-section {
    padding: 20px;
  }
}
</style>