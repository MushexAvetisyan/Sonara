<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

function submitSearch() {
  const query = searchQuery.value.trim()

  if (!query) {
    return
  }

  emit('search', query)
}
</script>

<template>
  <form class="search-wrapper" @submit.prevent="submitSearch">
    <span class="search-icon">⌕</span>

    <input
        v-model="searchQuery"
        type="text"
        placeholder="Search song, artist, group, composer or soundtrack..."
    />

    <button type="submit">
      Search
    </button>
  </form>
</template>

<style scoped lang="scss">
.search-wrapper {
  width: min(900px, 100%);
  height: 64px;

  display: flex;
  align-items: center;

  padding: 0 8px 0 22px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(20px);

  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.25);

  transition: 0.25s ease;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.07);
  }
}

.search-icon {
  margin-right: 14px;

  color: #858591;

  font-size: 28px;
}

input {
  flex: 1;

  min-width: 0;

  border: none;
  outline: none;

  background: transparent;

  color: white;

  font-size: 15px;

  &::placeholder {
    color: #777783;
  }
}

button {
  height: 48px;

  padding: 0 22px;

  border: none;
  border-radius: 13px;

  background: white;

  color: #08080c;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: #e8e8e8;
  }
}
</style>