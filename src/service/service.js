const GET_PODCAST_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const allowCORS = 'https://api.allorigins.win/get?url='

export async function logMovies() {
  return await fetch(`${allowCORS}${encodeURIComponent(GET_PODCAST_URL)}`)
  .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
  });
}
