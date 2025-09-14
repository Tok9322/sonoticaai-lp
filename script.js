// SONOTICA AI — Site Script
// - Smooth scroll with header offset
// - Spotify embed loader (from data-spotify-src)
// - Unreleased player (Google Drive-friendly)
// - Dynamic footer year

(function () {
  const header = document.querySelector('.site-header');
  const headerH = () => (header ? header.offsetHeight : 0);

  // Smooth scroll with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#' || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH() + 8);
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });
  });

  // Spotify embed loader: swap placeholder with iframe if data-spotify-src is present
  document.querySelectorAll('.spotify-embed').forEach((wrap) => {
    const src = wrap.getAttribute('data-spotify-src');
    if (src && src.trim().length > 0) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('style', 'border-radius:12px');
      iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
      iframe.setAttribute('loading', 'lazy');
      iframe.width = '100%';
      iframe.height = '152';
      iframe.src = src;
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    }
  });

  // Unreleased player
  // Provide a global override point: window.unreleasedTracks = [ { title, artist, url } ]
  // Example Google Drive transformation:
  // https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  //   -> https://drive.google.com/uc?export=download&id=FILE_ID

  function toDirectDriveUrl(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes('drive.google.com')) {
        const m = u.pathname.match(/\/file\/d\/([^/]+)\//);
        if (m && m[1]) {
          return `https://drive.google.com/uc?export=download&id=${m[1]}`;
        }
      }
      return url;
    } catch {
      return url;
    }
  }

  const tracks = (window.unreleasedTracks && Array.isArray(window.unreleasedTracks)) ? window.unreleasedTracks : [
    // Example:
    // { title: 'Demo Track', artist: 'Solana Flow', url: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID' },
  ];

  const listEl = document.getElementById('track-list');
  const audioEl = document.getElementById('audio');
  const nowTitleEl = document.getElementById('now-title');
  const nowArtistEl = document.getElementById('now-artist');

  function setNowPlaying(item) {
    if (!item) return;
    nowTitleEl.textContent = item.title || 'Unknown Title';
    nowArtistEl.textContent = item.artist || 'Unknown Artist';
    audioEl.src = toDirectDriveUrl(item.url);
    audioEl.play().catch(() => {});
  }

  function renderTracks() {
    if (!listEl) return;
    listEl.innerHTML = '';
    tracks.forEach((t, idx) => {
      const li = document.createElement('li');
      li.className = 'track-item';
      li.innerHTML = `
        <span class="dot"></span>
        <div class="track-meta">
          <span class="track-title">${t.title || 'Untitled'}</span>
          <span class="track-artist">${t.artist || ''}</span>
        </div>
      `;
      li.addEventListener('click', () => setNowPlaying(tracks[idx]));
      listEl.appendChild(li);
    });
  }

  renderTracks();

  // Dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
