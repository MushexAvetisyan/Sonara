<script setup>
defineProps({
  history: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'search',
  'remove',
  'clear'
])
</script>

<template>
  <section
      v-if="history.length"
      class="search-history"
  >
    <div class="history-header">
      <div>
        <span class="section-label">
          RECENT SEARCHES
        </span>

        <h3>Search history</h3>
      </div>

      <button
          class="clear-button"
          type="button"
          @click="emit('clear')"
      >
        Clear history
      </button>
    </div>

    <div class="history-list">
      <button
          v-for="item in history"
          :key="item.id"
          class="history-item"
          type="button"
          @click="emit('search', item)"
      >
        <span class="history-icon">⌕</span>

        <span class="history-content">
          <strong>{{ item.query }}</strong>

          <small>
            {{ item.type }}
          </small>
        </span>

        <span
            class="remove-history"
            title="Remove"
            @click.stop="emit('remove', item.id)"
        >
          ×
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.search-history {
  margin-top: 45px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(20px);
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.section-label {
  display: block;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.history-header h3 {
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
}

.clear-button {
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: 0.2s ease;
}

.clear-button:hover {
  background: rgba(255, 255, 255, 0.09);
  color: #fff;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 58px;
  padding: 10px 14px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  color: #fff;
  text-align: left;
  cursor: pointer;
  transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
}

.history-item:hover {
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(3px);
}

.history-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-right: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
}

.history-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 3px;
}

.history-content strong {
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-content small {
  color: rgba(255, 255, 255, 0.35);
  font-size: 11px;
  text-transform: capitalize;
}

.remove-history {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.35);
  font-size: 20px;
  transition:
      background 0.2s ease,
      color 0.2s ease;
}

.remove-history:hover {
  background: rgba(255, 80, 80, 0.12);
  color: #ff7070;
}

@media (max-width: 600px) {
  .search-history {
    margin-top: 30px;
    padding: 18px;
    border-radius: 18px;
  }

  .history-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .history-header h3 {
    font-size: 20px;
  }

  .clear-button {
    width: 100%;
  }

  .history-item {
    min-height: 54px;
  }
}

@media (max-width: 380px) {
  .search-history {
    padding: 14px;
  }

  .history-item {
    padding: 8px 10px;
  }

  .history-icon {
    width: 30px;
    height: 30px;
    margin-right: 9px;
  }
}
</style>