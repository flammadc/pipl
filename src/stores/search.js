import { defineStore } from 'pinia'
import { ref } from 'vue'
import { post, get } from '@/services/api'

export const useSearchStore = defineStore('search', () => {
  const idea = ref('')
  const result = ref(null)   // { similarity_score, similar_titles, verdict }
  const isLoading = ref(false)
  const error = ref(null)

  async function checkIdea(ideaText) {
    isLoading.value = true
    error.value = null
    idea.value = ideaText
    try {
      const data = await post('/api/check-idea', { idea: ideaText })
      result.value = data
      return data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Populate store from a saved history item (to re-show results
   * without calling the API again).
   */
  function loadFromHistory(item) {
    idea.value = item.idea
    result.value = {
      similarity_score: item.similarity_score,
      similar_titles: item.similar_titles || [],
      verdict: item.verdict,
    }
  }

  function clear() {
    idea.value = ''
    result.value = null
    error.value = null
  }

  return { idea, result, isLoading, error, checkIdea, loadFromHistory, clear }
})
