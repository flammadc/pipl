import { defineStore } from 'pinia'
import { ref } from 'vue'
import { post } from '@/services/api'

const STORAGE_KEY = 'pipl_search_state'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveToStorage(idea, result, suggestions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ idea, result, suggestions }))
  } catch {
    // Ignore storage errors (e.g. private browsing quota)
  }
}

export const useSearchStore = defineStore('search', () => {
  // Rehydrate from localStorage on first load
  const saved = loadFromStorage()

  const idea = ref(saved?.idea || '')
  const result = ref(saved?.result || null)   // { similarity_score, similar_titles, verdict }
  const suggestions = ref(saved?.suggestions || [])
  const isLoading = ref(false)
  const error = ref(null)

  async function checkIdea(ideaText) {
    isLoading.value = true
    error.value = null
    idea.value = ideaText
    result.value = null
    suggestions.value = []
    saveToStorage(ideaText, null, [])
    try {
      const data = await post('/api/check-idea', { idea: ideaText })
      result.value = data
      saveToStorage(ideaText, data, suggestions.value)
      return data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  function setSuggestions(data) {
    suggestions.value = data || []
    saveToStorage(idea.value, result.value, suggestions.value)
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
    suggestions.value = []
    saveToStorage(idea.value, result.value, [])
  }

  function clear() {
    idea.value = ''
    result.value = null
    suggestions.value = []
    error.value = null
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return { idea, result, suggestions, isLoading, error, checkIdea, setSuggestions, loadFromHistory, clear }
})
