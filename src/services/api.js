/**
 * Centralized API service layer.
 * Automatically injects Authorization: Bearer <token> when available.
 * All requests go through Vite proxy → http://localhost:3001
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

export async function patch(path, body = {}) {
  const res = await fetch(path, {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}

export async function put(path, body = {}) {
  const res = await fetch(path, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}

export async function del(path) {
  const res = await fetch(path, {
    method: 'DELETE',
    headers: buildHeaders(),
  })
  return handleResponse(res)
}

export async function postForm(path, formData) {
  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(path, {
    method: 'POST',
    headers,
    body: formData,
  })
  return handleResponse(res)
}

export async function getFile(path, params = {}, filename = 'download') {
  const url = new URL(path, window.location.origin)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })
  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url.toString(), { headers })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || data.detail || `HTTP ${res.status}`)
  }
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(a.href)
}
