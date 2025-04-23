export const fetchSongs = async (query: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`
  );
  const data = await response.json();
  return data.tracks.items; // You might need to adjust based on API response
};

export async function searchSpotify(query: string, accessToken: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data.tracks.items; // contains preview_url, artists, name, etc.
}
