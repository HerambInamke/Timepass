import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchYouTubeResources = async (career, skills) => {
  // Check if API key is available
  if (!import.meta.env.VITE_YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    // Create search queries based on career and skills
    const searchQueries = [
      `${career.name} tutorial`,
      ...skills.map(skill => `${skill} for ${career.name}`)
    ];

    // Fetch videos for each query
    const videoPromises = searchQueries.map(query =>
      axios.get(YOUTUBE_API_URL, {
        params: {
          part: 'snippet',
          maxResults: 3,
          q: query,
          type: 'video',
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          relevanceLanguage: 'en'
        }
      })
    );

    const responses = await Promise.all(videoPromises);
    
    // Process and combine results
    const videos = responses.flatMap(response =>
      response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }))
    );

    // Remove duplicates and limit to 9 videos
    const uniqueVideos = Array.from(new Map(videos.map(v => [v.id, v])).values());
    return uniqueVideos.slice(0, 9);
  } catch (error) {
    console.error('Error fetching YouTube resources:', error);
    throw error;
  }
};