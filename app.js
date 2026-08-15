const videoData = [
  {
    id: 'space-documentary',
    title: 'Space Documentary',
    description: 'An immersive science film exploring the edge of the universe.',
    tag: 'Documentary',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'city-lights',
    title: 'City Lights Reel',
    description: 'A fast-paced reel capturing night-time city energy.',
    tag: 'Reel',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'action-trailer',
    title: 'Action Trailer',
    description: 'A dramatic trailer with high-energy cuts and impact.',
    tag: 'Trailer',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'tech-showcase',
    title: 'Tech Showcase',
    description: 'A sleek product video for a modern tech release.',
    tag: 'Promo',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
]

const videoPlayer = document.getElementById('videoPlayer')
const activeTitle = document.getElementById('activeTitle')
const activeDescription = document.getElementById('activeDescription')
const activeTag = document.getElementById('activeTag')
const videoList = document.getElementById('videoList')
const reelsList = document.getElementById('reelsList')
const homeBtn = document.getElementById('homeBtn')
const refreshBtn = document.getElementById('refreshBtn')
const playPauseBtn = document.getElementById('playPauseBtn')
const muteBtn = document.getElementById('muteBtn')

function renderVideoCards() {
  if (!videoList) return
  videoList.innerHTML = videoData
    .map(
      (video) => `
      <article class="video-card">
        <div>
          <h4>${video.title}</h4>
          <p>${video.description}</p>
        </div>
        <div class="action-row">
          <span class="badge">${video.tag}</span>
          <button type="button" data-video-id="${video.id}" class="primary-btn">Play</button>
        </div>
      </article>
    `,
    )
    .join('')
}

function renderReels() {
  if (!reelsList) return
  reelsList.innerHTML = videoData
    .filter((video) => video.tag === 'Reel' || video.tag === 'Trailer')
    .map(
      (video) => `
      <article class="reel-card">
        <div>
          <h4>${video.title}</h4>
          <p>${video.description}</p>
        </div>
        <div class="action-row">
          <button type="button" data-video-id="${video.id}" class="secondary-btn">Watch</button>
        </div>
      </article>
    `,
    )
    .join('')
}

function setActiveVideo(video) {
  if (!videoPlayer || !activeTitle || !activeDescription || !activeTag) return

  activeTitle.textContent = video.title
  activeDescription.textContent = video.description
  activeTag.textContent = video.tag

  if (videoPlayer.src !== video.src) {
    videoPlayer.src = video.src
  }
  videoPlayer.play()
}

function initializeEvents() {
  if (!videoList || !reelsList) return

  videoList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-video-id]')
    if (!button) return
    const id = button.dataset.videoId
    const selected = videoData.find((video) => video.id === id)
    if (selected) {
      setActiveVideo(selected)
    }
  })

  reelsList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-video-id]')
    if (!button) return
    const id = button.dataset.videoId
    const selected = videoData.find((video) => video.id === id)
    if (selected) {
      setActiveVideo(selected)
    }
  })

  if (playPauseBtn && videoPlayer) {
    playPauseBtn.addEventListener('click', () => {
      if (videoPlayer.paused) {
        videoPlayer.play()
        playPauseBtn.textContent = 'Pause'
      } else {
        videoPlayer.pause()
        playPauseBtn.textContent = 'Play'
      }
    })
  }

  if (muteBtn && videoPlayer) {
    muteBtn.addEventListener('click', () => {
      videoPlayer.muted = !videoPlayer.muted
      muteBtn.textContent = videoPlayer.muted ? 'Unmute' : 'Mute'
    })
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      window.location.reload()
    })
  }
}

function initializeSite() {
  renderVideoCards()
  renderReels()
  initializeEvents()
}

initializeSite()
