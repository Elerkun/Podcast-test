const GET_PODCAST_LIST_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const GET_PODCAST_DETAIL_URL = "https://itunes.apple.com/lookup?id="
const allowCORS = 'https://api.allorigins.win/get?url='
const GET_PODCAST_EPISODE = '&media=podcast&entity=podcastEpisode&limit=100';

export async function getPodcastListService() {
  return await fetch(`${allowCORS}${encodeURIComponent(GET_PODCAST_LIST_URL)}`)
  .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
  });
}

export async function getPodcastDetailService(id) {
  const URL = `${GET_PODCAST_DETAIL_URL}${id}`
  return await fetch(`${allowCORS}${encodeURIComponent(URL)}`)
  .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
  });
}
export async function getListOfEpisode(Id) {
  const URL = `${GET_PODCAST_DETAIL_URL}${Id}${GET_PODCAST_EPISODE}`
  return await fetch(`${allowCORS}${encodeURIComponent(URL)}`)
  .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
  });
}