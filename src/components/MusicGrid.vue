<script setup>
import MusicCard from './MusicCard.vue'

defineProps({
  tracks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'play',
  'details'
])
</script>

<template>
  <section class="music-grid">
    <MusicCard
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        @play="emit('play', $event)"
        @details="emit('details', $event)"
    />
  </section>
</template>

<style scoped lang="scss">
.music-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(190px, 1fr));

  gap: 20px;
}
</style>