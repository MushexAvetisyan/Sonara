import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'music-vault-favorites'

export const useFavoritesStore = defineStore(
    'favorites',
    () => {
        const favorites = ref(
            JSON.parse(
                localStorage.getItem(STORAGE_KEY) || '[]'
            )
        )

        const favoriteCount = computed(
            () => favorites.value.length
        )

        function saveFavorites() {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(favorites.value)
            )
        }

        function isFavorite(track) {
            return favorites.value.some(
                item => item.id === track.id
            )
        }

        function addFavorite(track) {
            if (isFavorite(track)) {
                return
            }

            favorites.value.unshift(track)

            saveFavorites()
        }

        function removeFavorite(track) {
            favorites.value = favorites.value.filter(
                item => item.id !== track.id
            )

            saveFavorites()
        }

        function toggleFavorite(track) {
            if (isFavorite(track)) {
                removeFavorite(track)
            } else {
                addFavorite(track)
            }
        }

        function clearFavorites() {
            favorites.value = []

            saveFavorites()
        }

        return {
            favorites,
            favoriteCount,
            isFavorite,
            addFavorite,
            removeFavorite,
            toggleFavorite,
            clearFavorites
        }
    }
)