const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:3001';

async function request(path, params = {}) {
  const url = new URL(`${GATEWAY_URL}/api/games${path}`);
  Object.entries(params).forEach(([k, v]) => v !== undefined && v !== '' && url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || error.message || `HTTP ${res.status}: Error en la petición`);
  }

  return res.json();
}

export async function getGames({ query, limit = 20, genre, platform } = {}) {
  return request('', { query, limit, genre, platform });
}

export async function getGameSuggestions(query, limit = 5) {
  return request('/suggestions', { query, limit });
}

export async function getGameById(id) {
  return request(`/${id}`);
}

export async function getSimilarGames(id) {
  return request(`/${id}/similar`);
}
