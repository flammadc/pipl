/**
 * Centralized API service layer.
 * Automatically injects Authorization: Bearer <token> when available.
 * All requests go through Vite proxy → http://localhost:3000
 */

function getToken() {
  return localStorage.getItem('auth_token')
}

function buildHeaders(extra = {}) {
  const headers = { 'Content-Type': 'application/json', ...extra }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.error || data.detail || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

export async function get(path, params = {}) {
  const url = new URL(path, window.location.origin)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url.toString(), { headers: buildHeaders() })
  return handleResponse(res)
}

export async function post(path, body = {}) {
  const res = await fetch(path, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}
