import cors from 'cors';
app.use(cors());

const videoListContainer = document.getElementById('videoList');
const searchInput = document.getElementById('searchInput');

// Function to fetch videos from backend
async function fetchVideos() {
    try {
        const res = await fetch('http://localhost:4000/dashboard/videos');
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        return data.videos || [];
    } catch (err) {
        console.error(err);
        videoListContainer.innerHTML = '<p class="text-red-500">Failed to load videos.</p>';
        return [];
    }
}

// Function to render videos
function renderVideos(videos) {
    if (!videos.length) {
        videoListContainer.innerHTML = '<p>No videos found.</p>';
        return;
    }

    videoListContainer.innerHTML = videos
        .map(video => `
            <div class="bg-gray-800 rounded-lg p-2 flex flex-col gap-2 shadow-lg hover:shadow-xl transition">
                <video controls class="w-full h-48 rounded-md bg-black">
                    <source src="${video.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <h3 class="text-sm font-medium truncate">${video.name}</h3>
                <p class="text-xs text-gray-400">Size: ${(video.size / (1024*1024)).toFixed(2)} MB</p>
                <p class="text-xs text-gray-400">Last Modified: ${new Date(video.lastModified).toLocaleString()}</p>
            </div>
        `).join('');
}

// Function to filter videos by search input
function filterVideos(videos, query) {
    return videos.filter(video => video.name.toLowerCase().includes(query.toLowerCase()));
}

// Initial load
let videosData = [];
fetchVideos().then(videos => {
    videosData = videos;
    renderVideos(videosData);
});

// Search event
searchInput.addEventListener('input', (e) => {
    const filtered = filterVideos(videosData, e.target.value);
    renderVideos(filtered);
});