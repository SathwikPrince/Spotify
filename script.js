console.log("Welcome to Spotify");

// Select elements
let songItems = document.querySelectorAll(".songItem");
let progressBar = document.getElementById("myProgressBar");
let playPauseBtn = document.getElementById("playPause");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let currentSongText = document.getElementById("currentSong");

let songs = [
    { songName: "Faded", filePath: "songs/2.mp3" },
    { songName: "Alone", filePath: "songs/3.mp3" },
    { songName: "On My Way", filePath: "songs/4.mp3" },
    { songName: "Spectre", filePath: "songs/5.mp3" },
    { songName: "Believer", filePath: "songs/6.mp3" },
    { songName: "Shape of You", filePath: "songs/7.mp3" },
    { songName: "Cheap Thrills", filePath: "songs/8.mp3" }
];

let audioElement = new Audio();
let currentSongIndex = -1;

function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    audioElement.src = songs[index].filePath;
    audioElement.play();
    playPauseBtn.classList.remove("fa-play-circle");
    playPauseBtn.classList.add("fa-pause-circle");
    currentSongText.innerText = songs[index].songName;
    currentSongIndex = index;

    updatePlayIcons(index);
}

// ✅ Fix: Updates the play/pause icon for selected song
function updatePlayIcons(activeIndex) {
    songItems.forEach((item, index) => {
        let playIcon = item.querySelector("i");
        if (index === activeIndex) {
            playIcon.classList.remove("fa-play-circle");
            playIcon.classList.add("fa-pause-circle");
        } else {
            playIcon.classList.remove("fa-pause-circle");
            playIcon.classList.add("fa-play-circle");
        }
    });
}

// Song List Click Handler
songItems.forEach((item, index) => {
    item.addEventListener("click", function () {
        playSong(index);
    });
});

// Play/Pause Button
playPauseBtn.addEventListener("click", function () {
    if (currentSongIndex === -1) return;

    if (audioElement.paused) {
        audioElement.play();
        playPauseBtn.classList.remove("fa-play-circle");
        playPauseBtn.classList.add("fa-pause-circle");
    } else {
        audioElement.pause();
        playPauseBtn.classList.remove("fa-pause-circle");
        playPauseBtn.classList.add("fa-play-circle");
    }
});

// Next Button
nextBtn.addEventListener("click", function () {
    if (currentSongIndex === -1) return;

    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    playSong(currentSongIndex);
});

// Previous Button
prevBtn.addEventListener("click", function () {
    if (currentSongIndex === -1) return;

    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    playSong(currentSongIndex);
});

// Autoplay next song when current song ends
audioElement.addEventListener("ended", function () {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    playSong(currentSongIndex);
});