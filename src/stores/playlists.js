import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'music-vault-playlists'

export const usePlaylistsStore = defineStore(
    'playlists',
    () => {
        const playlists = ref(
            JSON.parse(
                localStorage.getItem(STORAGE_KEY) || '[]'
            )
        )

        const playlistCount = computed(
            () => playlists.value.length
        )

        function savePlaylists() {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(playlists.value)
            )
        }

        function createPlaylist(name) {
            const cleanName = name.trim()

            if (!cleanName) {
                return null
            }

            const playlist = {
                id: Date.now(),
                name: cleanName,
                tracks: [],
                createdAt: new Date().toISOString()
            }

            playlists.value.unshift(playlist)

            savePlaylists()

            return playlist
        }

        function deletePlaylist(id) {
            playlists.value = playlists.value.filter(
                playlist => playlist.id !== id
            )

            savePlaylists()
        }

        function getPlaylist(id) {
            return playlists.value.find(
                playlist => playlist.id === Number(id)
            )
        }

        function addToPlaylist(playlistId, track) {
            const playlist = getPlaylist(playlistId)

            if (!playlist || !track) {
                return
            }

            const alreadyExists = playlist.tracks.some(
                item => item.id === track.id
            )

            if (alreadyExists) {
                return
            }

            playlist.tracks.push(track)

            savePlaylists()
        }

        function removeFromPlaylist(playlistId, trackId) {
            const playlist = getPlaylist(playlistId)

            if (!playlist) {
                return
            }

            playlist.tracks = playlist.tracks.filter(
                track => track.id !== trackId
            )

            savePlaylists()
        }

        function clearPlaylist(playlistId) {
            const playlist = getPlaylist(playlistId)

            if (!playlist) {
                return
            }

            playlist.tracks = []

            savePlaylists()
        }

        return {
            playlists,
            playlistCount,
            createPlaylist,
            deletePlaylist,
            getPlaylist,
            addToPlaylist,
            removeFromPlaylist,
            clearPlaylist
        }
    }
)