// Music Data
const tracks = [
    {
        id: 1,
        title: "Chikitu-song from cooli",
        artist: "Aniruth",
        album: "coolie",
        duration: "3:20",
        cover: "assets/images/coolie.jpg",
        audio: "assets/audio/Chikitu-song from cooli.mp3",
        liked:false
    },
    // song 2
    {
        id: 2,
        title: "paththavaikkum pariaikara",
        artist: "aniruth",
        album: "devara part 1",
        duration: "4:32",
        cover: "assets/images/devara part 1.jpg",
        audio: "assets/audio/Paththavaikkum.mp3",
        liked: false
    },
     // song 3
    {
        id: 3,
        title: "kanimaa",
        artist: "Santhosh Narayanan",
        album: "Retro",
        duration: "4:32",
        cover: "assets/images/retro.jpg",
        audio: "assets/audio/Kanimaa.mp3",
        liked: false
    },
     // song 4
    {
        id: 4,
        title: "jinguchaa",
        artist: "A R rahman",
        album: "Thug life",
        duration: "4:32",
        cover: "assets/images/jinguchaa.jpg",
        audio: "assets/audio/Jinguchaa.mp3",
        liked: false
    },
     // song 5
    {
        id: 5,
        title: "Muththa-mazhai",
        artist: "A R rahman",
        album: "Thug life",
        duration: "4:32",
        cover: "assets/images/muththa mazhai.jpg",
        audio: "assets/audio/Muththa-Mazhai-(Chinmayi-Version)-MassTamilan.dev.mp3",
        liked: false
    },
      // song 6
    {
        id: 6,
        title: "Yedi",
        artist: "G V prakeh kumar",
        album: "nilavukku en mel ennadi kobam",
        duration: "4:32",
        cover: "assets/images/yedi.jpg",
        audio: "assets/audio/Yedi.mp3",
        liked: false
    },
      // song 7
    {
        id: 7,
        title: "pala palakura",
        artist: "Harris Jayaraj",
        album: "Ayan ",
        duration: "4:32",
        cover: "assets/images/pala palakkura.jpg",
        audio: "assets/audio/Pala Palakura.mp3",
        liked: false
    },
      // song 8
    {
        id: 8,
        title: "poyivaa-nanba",
        artist: "Devi Sri Prasad",
        album: "kubera",
        duration: "4:32",
        cover: "assets/images/kubera.jpg",
        audio: "assets/audio/Poyivaa-Nanba.mp3",
        liked: false
    },
      // song 9
    {
        id: 9,
        title: "pottala muttaye",
        artist: "Santhosh Narayanan",
        album: "Thalaivan Thalaivii",
        duration: "4:32",
        cover: "assets/images/pottala muttaye.jpg",
        audio: "assets/audio/Paththavaikkum.mp3",
        liked: false
    },
  // song 10
    {
        id: 10,
        title: "venmathi venmathiye nillu ",
        artist: "Harris Jayaraj",
        album: "Minnale",
        duration: "4:32",
        cover: "assets/images/venmathi venmathiye nillu.jpg",
        audio: "assets/audio/Venmathiye.mp3",
        liked: false
    },

];

// DOM Elements
const elements = {
    audioPlayer: document.getElementById('audio-player'),
    playBtn: document.getElementById('play-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    shuffleBtn: document.getElementById('shuffle-btn'),
    repeatBtn: document.getElementById('repeat-btn'),
    likeBtn: document.getElementById('like-btn'),
    progressBar: document.getElementById('progress-bar'),
    progress: document.getElementById('progress'),
    currentTime: document.getElementById('current-time'),
    duration: document.getElementById('duration'),
    nowPlayingTitle: document.getElementById('now-playing-title'),
    nowPlayingArtist: document.getElementById('now-playing-artist'),
    nowPlayingCover: document.getElementById('now-playing-cover'),
    trackList: document.getElementById('track-list'),
    playlistGrid: document.getElementById('playlist-grid'),
    volumeBar: document.getElementById('volume-bar'),
    volumeLevel: document.getElementById('volume-level')
};

// Player State
const state = {
    currentTrackIndex: 0,
    isPlaying: false,
    isShuffled: false,
    isRepeat: false,
    isSeeking: false
};

// Initialize the player
function init() {
    renderPlaylists();
    renderTrackList();
    loadTrack(state.currentTrackIndex);
    setupEventListeners();
}

// Render playlists
function renderPlaylists() {
    const playlistHTML = tracks.map(track => `
        <div class="playlist-card" data-id="${track.id}">
            <img src="${track.cover}" alt="${track.album}">
            <h3>${track.title}</h3>
            <p>By ${track.artist}</p>
        </div>
    `).join('');
    elements.playlistGrid.innerHTML = playlistHTML;
}

// Render track list
function renderTrackList() {
    elements.trackList.innerHTML = tracks.map((track, index) => `
        <div class="track" data-id="${track.id}" data-index="${index}">
            <div class="track-number">${index + 1}</div>
            <div class="track-image">
                <img src="${track.cover}" alt="${track.album}">
            </div>
            <div class="track-details">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            </div>
            <div class="track-duration">${track.duration}</div>
        </div>
    `).join('');
}

// Load track
function loadTrack(index) {
    const track = tracks[index];
    
    elements.audioPlayer.src = track.audio;
    elements.nowPlayingTitle.textContent = track.title;
    elements.nowPlayingArtist.textContent = track.artist;
    elements.nowPlayingCover.src = track.cover;
    
    updateLikeButton(track.liked);
    updateActiveTrack(index);
    
    elements.audioPlayer.onloadedmetadata = () => {
        track.duration = formatTime(elements.audioPlayer.duration);
        elements.duration.textContent = track.duration;
        updateTrackDurationInList(index, track.duration);
    };
    
    if (state.isPlaying) {
        elements.audioPlayer.play().catch(console.error);
    }
}

function updateTrackDurationInList(index, duration) {
    const trackElement = document.querySelector(`.track[data-index="${index}"] .track-duration`);
    if (trackElement) trackElement.textContent = duration;
}

function playTrack() {
    elements.audioPlayer.play()
        .then(() => {
            state.isPlaying = true;
            updatePlayButton();
        })
        .catch(console.error);
}

function pauseTrack() {
    elements.audioPlayer.pause();
    state.isPlaying = false;
    updatePlayButton();
}

function playNextTrack() {
    let nextIndex = state.isShuffled ? getRandomIndex() : (state.currentTrackIndex + 1) % tracks.length;
    state.currentTrackIndex = nextIndex;
    loadTrack(nextIndex);
    playTrack();
}

function playPreviousTrack() {
    if (elements.audioPlayer.currentTime > 3) {
        elements.audioPlayer.currentTime = 0;
    } else {
        let prevIndex = state.currentTrackIndex - 1;
        if (prevIndex < 0) prevIndex = tracks.length - 1;
        state.currentTrackIndex = prevIndex;
        loadTrack(prevIndex);
        playTrack();
    }
}

function getRandomIndex() {
    if (tracks.length <= 1) return 0;
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * tracks.length);
    } while (nextIndex === state.currentTrackIndex);
    return nextIndex;
}

function toggleShuffle() {
    state.isShuffled = !state.isShuffled;
    elements.shuffleBtn.classList.toggle('active');
}

function toggleRepeat() {
    state.isRepeat = !state.isRepeat;
    elements.repeatBtn.classList.toggle('active');
}

function toggleLike() {
    tracks[state.currentTrackIndex].liked = !tracks[state.currentTrackIndex].liked;
    updateLikeButton(tracks[state.currentTrackIndex].liked);
}

function updateLikeButton(liked) {
    elements.likeBtn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>`;
    elements.likeBtn.classList.toggle('liked', liked);
}

function updatePlayButton() {
    elements.playBtn.innerHTML = `<i class="fas fa-${state.isPlaying ? 'pause' : 'play'}"></i>`;
}

function updateActiveTrack(index) {
    document.querySelectorAll('.track').forEach(track => track.classList.remove('active'));
    document.querySelector(`.track[data-index="${index}"]`)?.classList.add('active');
}

function updateProgress() {
    if (!state.isSeeking) {
        const { currentTime, duration } = elements.audioPlayer;
        if (duration) {
            elements.progress.style.width = `${(currentTime / duration) * 100}%`;
            elements.currentTime.textContent = formatTime(currentTime);
        }
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function setupEventListeners() {
    // Player controls
    elements.playBtn.addEventListener('click', () => state.isPlaying ? pauseTrack() : playTrack());
    elements.prevBtn.addEventListener('click', playPreviousTrack);
    elements.nextBtn.addEventListener('click', playNextTrack);
    elements.shuffleBtn.addEventListener('click', toggleShuffle);
    elements.repeatBtn.addEventListener('click', toggleRepeat);
    elements.likeBtn.addEventListener('click', toggleLike);
    
    // Progress bar
    elements.progressBar.addEventListener('click', (e) => seekAudio(e));
    elements.progressBar.addEventListener('mousedown', () => state.isSeeking = true);
    document.addEventListener('mousemove', (e) => state.isSeeking && seekAudio(e));
    document.addEventListener('mouseup', () => state.isSeeking = false);
    
    // Volume control
    elements.volumeBar.addEventListener('click', (e) => {
        const volume = e.offsetX / elements.volumeBar.clientWidth;
        elements.audioPlayer.volume = volume;
        elements.volumeLevel.style.width = `${volume * 100}%`;
    });
    
    // Track list
    elements.trackList.addEventListener('click', (e) => {
        const trackElement = e.target.closest('.track');
        if (trackElement) {
            state.currentTrackIndex = parseInt(trackElement.dataset.index);
            loadTrack(state.currentTrackIndex);
            playTrack();
        }
    });
    
    // Playlist grid
    elements.playlistGrid.addEventListener('click', (e) => {
        const playlistElement = e.target.closest('.playlist-card');
        if (playlistElement) {
            const trackId = parseInt(playlistElement.dataset.id);
            const trackIndex = tracks.findIndex(track => track.id === trackId);
            if (trackIndex !== -1) {
                state.currentTrackIndex = trackIndex;
                loadTrack(trackIndex);
                playTrack();
            }
        }
    });
    
    // Audio events
    elements.audioPlayer.addEventListener('timeupdate', updateProgress);
    elements.audioPlayer.addEventListener('ended', () => {
        state.isRepeat ? elements.audioPlayer.play() : playNextTrack();
    });
    elements.audioPlayer.addEventListener('volumechange', () => {
        elements.volumeLevel.style.width = `${elements.audioPlayer.volume * 100}%`;
    });
}

function seekAudio(e) {
    const progressBar = elements.progressBar;
    const rect = progressBar.getBoundingClientRect();
    const percentage = Math.min(Math.max(e.clientX - rect.left, 0), rect.width) / rect.width;
    elements.progress.style.width = `${percentage * 100}%`;
    elements.audioPlayer.currentTime = percentage * elements.audioPlayer.duration;
}

// Initialize
document.addEventListener('DOMContentLoaded', init);