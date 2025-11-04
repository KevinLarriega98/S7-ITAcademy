import axios from 'axios';

export type MediaType = 'movie' | 'tv';

type BaseMedia = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
};

type Recommendation = BaseMedia & { media_type?: MediaType };

type SearchItem = BaseMedia & { media_type: 'movie' | 'tv' | 'person' };

type SearchResult = {
  results: SearchItem[];
  total_pages: number;
};

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const client = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    language: 'es-MX',
  },
});

if (!baseUrl) {
  throw new Error('[tmdb] Missing VITE_TMDB_BASE_URL');
}

if (!apiKey) {
  throw new Error('[tmdb] Missing VITE_TMDB_API_KEY');
}

export async function getAllTrending(timeWindow: 'day' | 'week' = 'day') {
  const res = await client.get<PagedResponse<Recommendation>>(`/trending/all/${timeWindow}`);
  return res.data.results;
}

export async function getTrendingTVs(page = 1, timeWindow: 'day' | 'week' = 'day') {
  const res = await client.get<PagedResponse<BaseMedia>>(`/trending/tv/${timeWindow}`, {
    params: { page },
  });
  return res.data;
}

export async function getTrendingMovies(page = 1, timeWindow: 'day' | 'week' = 'day') {
  const res = await client.get<PagedResponse<BaseMedia>>(`/trending/movie/${timeWindow}`, {
    params: { page },
  });
  return res.data;
}

export async function getDetails(mediaType: MediaType, id: number) {
  const res = await client.get<BaseMedia>(`/${mediaType}/${id}`);
  return res.data;
}

export async function getCast(mediaType: MediaType, id: number) {
  const res = await client.get<CreditsResponse>(`/${mediaType}/${id}/credits`);
  return res.data.cast;
}

export async function getRecommendations(mediaType: MediaType, id: number) {
  const res = await client.get<PagedResponse<Recommendation>>(
    `/${mediaType}/${id}/recommendations`
  );
  return res.data.results;
}

export async function getSimilar(mediaType: MediaType, id: number) {
  const res = await client.get<PagedResponse<Recommendation>>(`/${mediaType}/${id}/similar`);
  return res.data.results;
}

export async function searchContent(query: string, page = 1): Promise<SearchResult> {
  const res = await client.get<PagedResponse<SearchItem>>('/search/multi', {
    params: { query, page },
  });

  const filtered = res.data.results.filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv'
  );

  return {
    results: filtered,
    total_pages: res.data.total_pages,
  };
}