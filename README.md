# 🎵 Music Vault

> A modern, cinematic music discovery and preview platform built with Vue 3.

Music Vault is a frontend music discovery application designed to search, discover, preview, organize, and save music in a clean cinematic interface.

The project uses the **iTunes Search API** for music discovery and metadata, while user data such as favorites, search history, and playlists is stored locally in the browser using `localStorage`.

The application is currently under active development.

---

## ✨ Features

### 🔎 Music Search

Search for music using the iTunes Search API.

Supported search categories:

* 🎵 Songs
* 🎤 Artists
* 💿 Albums
* 🎬 Soundtracks

Search results include information such as:

* Track title
* Artist
* Album
* Cover artwork
* Genre
* Release date
* Country
* Preview availability
* Official source URL

---

### 🎧 Music Player

Music Vault includes a custom HTML5 audio player.

Current player functionality:

* ▶️ Play / Pause
* ⏮ Previous track
* ⏭ Next track
* 🔊 Volume control
* ⏱ Track progress
* 🔀 Track navigation
* Automatically move to the next available track
* Open the official source
* Responsive desktop and mobile layout

The player uses preview audio URLs provided by the API.

---

### 📋 Queue

The application includes a queue system for managing currently selected tracks.

Current functionality:

* Current track
* Upcoming tracks
* Play tracks from the queue
* Next / Previous
* Automatic next track
* Clear queue

The queue system will be expanded further during development.

---

### ❤️ Favorites

Users can save tracks to their favorites.

Favorites are managed with **Pinia** and persisted using `localStorage`.

Current functionality:

* Add to favorites
* Remove from favorites
* Favorite state on music cards
* Favorites page
* Favorite count
* Clear all favorites
* Persistent storage after page refresh

---

### 🕘 Search History

Music Vault automatically stores recent searches.

Current functionality:

* Save searches
* Repeat previous searches
* Remove individual searches
* Clear search history
* Search history persistence
* Dedicated History page

Search history is stored locally in the browser.

---

### 🎼 Playlists

Playlist functionality is currently being developed.

The current version already supports:

* Create playlists
* Delete playlists
* Playlist count
* Persistent playlists
* LocalStorage persistence
* Dedicated Playlists page

The upcoming playlist system will add:

* Add tracks to playlists
* Remove tracks
* Playlist details
* Playlist playback
* Playlist queue
* Playlist management

---

### 🔍 Track Details

Each track can be opened in a detailed modal.

Information includes:

* Cover artwork
* Track title
* Artist
* Album
* Genre
* Release year
* Country
* Preview playback
* Official source

---

## 🎨 Design

Music Vault uses a dark cinematic interface inspired by modern music applications.

The visual system is built around:

* Dark UI
* Glassmorphism
* Soft gradients
* Blur effects
* Minimal borders
* Cinematic backgrounds
* Smooth transitions
* Responsive cards
* Modern typography
* Subtle hover interactions

The goal is to keep the interface elegant, focused, and comfortable for long browsing sessions.

---

## 🛠️ Tech Stack

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Vue 3             | Frontend framework         |
| Vite              | Development and build tool |
| JavaScript        | Application logic          |
| Vue Router        | Client-side routing        |
| Pinia             | State management           |
| Axios             | API requests               |
| SCSS              | Styling                    |
| HTML5 Audio       | Music preview playback     |
| LocalStorage      | Local persistence          |
| iTunes Search API | Music search and metadata  |
| Vercel            | Deployment                 |

---

## 📡 API

Music Vault currently uses the **iTunes Search API**.

The API is used to retrieve:

* Songs
* Artists
* Albums
* Music metadata
* Artwork
* Preview URLs
* Official source links

The frontend communicates directly with the API through Axios.

No custom backend is required for the current version.

---

## 💾 Data Storage

Music Vault currently uses browser `localStorage` instead of a backend database.

Stored data includes:

```text
music-vault-history
music-vault-favorites
music-vault-playlists
```

This means user-specific data remains available after refreshing the page in the same browser.

Because there is currently no backend or authentication system, this data is device/browser-specific.

---

## 🏗️ Project Structure

```text
musicplayer/
│
├── src/
│   │
│   ├── assets/
│   │   └── main.scss
│   │
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── SearchBar.vue
│   │   ├── MusicCard.vue
│   │   ├── MusicGrid.vue
│   │   ├── MusicPlayer.vue
│   │   ├── TrackDetails.vue
│   │   ├── QueuePanel.vue
│   │   └── SearchHistory.vue
│   │
│   ├── services/
│   │   └── musicApi.js
│   │
│   ├── stores/
│   │   ├── favorites.js
│   │   └── playlists.js
│   │
│   ├── views/
│   │   ├── Home.vue
│   │   ├── History.vue
│   │   ├── Favorites.vue
│   │   └── Playlists.vue
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── App.vue
│   └── main.js
│
├── public/
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Requirements

Before running the project, make sure you have installed:

* Node.js
* npm
* Git

Check your versions:

```bash
node -v
npm -v
git --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/MushexAvetisyan/Sonara.git
```

Enter the project directory:

```bash
cd music-vault
```

Install dependencies:

```bash
npm install
```

---

## 💻 Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available through the local development URL shown by Vite.

Usually:

```text
http://localhost:5173
```

---

## 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

Music Vault is designed as a frontend-only application and can be deployed directly to platforms such as Vercel.

### Vercel

The project can be deployed by connecting the GitHub repository to Vercel.

Typical configuration:

```text
Framework Preset:
Vite

Build Command:
npm run build

Output Directory:
dist
```

No backend server or environment variables are required for the current API implementation.

---

## 🧭 Current Routes

The current application contains:

```text
/
```

Home / Music Discovery

```text
/favorites
```

Saved favorite tracks

```text
/history
```

Search history and previous searches

```text
/playlists
```

Playlist management

---

## 🗺️ Roadmap

Music Vault is actively evolving.

### Phase 1 — Core Application

* [x] Vue 3 + Vite setup
* [x] SCSS design system
* [x] Vue Router
* [x] Pinia
* [x] Axios
* [x] iTunes Search API
* [x] Music search
* [x] Music cards
* [x] Track details
* [x] Audio preview player
* [x] Queue
* [x] Search history
* [x] Favorites

### Phase 2 — Playlist Manager

* [x] Playlist store
* [x] Create playlists
* [x] Delete playlists
* [x] Playlist persistence
* [x] Playlists page
* [ ] Playlist details
* [ ] Add tracks to playlists
* [ ] Remove tracks
* [ ] Playlist playback
* [ ] Playlist queue
* [ ] Playlist reordering

### Phase 3 — Advanced Queue

* [ ] Add to queue
* [ ] Play next
* [ ] Remove from queue
* [ ] Queue reordering
* [ ] Drag & drop
* [ ] Improved queue persistence

### Phase 4 — Discovery

* [ ] Advanced search
* [ ] Search filters
* [ ] Better artist discovery
* [ ] Artist pages
* [ ] Album pages
* [ ] Soundtrack pages
* [ ] Improved search suggestions

### Phase 5 — Player

* [x] Basic audio player
* [x] Previous / Next
* [x] Volume
* [x] Progress control
* [x] Automatic next track
* [ ] Fullscreen player
* [ ] Mini-player improvements
* [ ] Keyboard shortcuts
* [ ] Visual playback indicators

### Phase 6 — UX

* [ ] Toast notifications
* [ ] Skeleton loading
* [ ] Page transitions
* [ ] Improved error states
* [ ] Better empty states
* [ ] Mobile navigation

### Phase 7 — Personalization

* [ ] Settings
* [ ] Music statistics
* [ ] Favorite sorting
* [ ] Playlist statistics
* [ ] More advanced local preferences

### Phase 8 — Production Polish

* [ ] Full responsive audit
* [ ] SEO metadata
* [ ] Open Graph metadata
* [ ] Favicon
* [ ] Error handling audit
* [ ] Performance optimization
* [ ] Final testing
* [ ] Production deployment

---

## 🔐 Privacy

Music Vault does not currently require user accounts.

There is no custom backend database.

User-generated data such as favorites, history, and playlists is stored locally in the browser using `localStorage`.

Clearing browser storage can remove this data.

---

## ⚠️ Limitations

The current application is intentionally frontend-only.

Because there is no backend:

* There are no user accounts.
* Favorites are local to the browser.
* Playlists are local to the browser.
* Search history is local to the browser.
* Data does not synchronize between devices.
* There is no cloud database.
* There is no server-side authentication.

These limitations may be addressed in a future version if a backend is introduced.

---

## 🎵 Music & Preview Policy

Music Vault is designed as a music discovery and preview application.

The application uses metadata and preview functionality provided through the selected API.

It does **not** provide functionality for unauthorized downloading, ripping, or redistribution of copyrighted music.

Official source links are provided where available so users can access the original platform.

---

## 📚 Architecture

The application follows a simple frontend architecture:

```text
                 ┌──────────────────┐
                 │     Vue 3 UI     │
                 └────────┬─────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
      ┌──────▼──────┐          ┌──────▼──────┐
      │ Vue Router  │          │   Pinia     │
      └─────────────┘          └──────┬──────┘
                                      │
                           ┌──────────┼──────────┐
                           │          │          │
                      Favorites   Playlists   Local State
                           │          │
                           └─────┬────┘
                                 │
                         ┌───────▼────────┐
                         │  LocalStorage  │
                         └────────────────┘

                 ┌────────────────────────┐
                 │      Axios / API       │
                 └───────────┬────────────┘
                             │
                    ┌────────▼─────────┐
                    │ iTunes Search API│
                    └──────────────────┘
```

---

## 🧪 Development Philosophy

Music Vault is being developed incrementally.

The project focuses on:

* Clean component architecture
* Reusable Vue components
* Simple state management
* Minimal dependencies
* Responsive design
* Local-first functionality
* Maintainable code
* Progressive feature development

The goal is to keep the application understandable while gradually moving it toward a polished production-quality music discovery experience.

---

## 📌 Project Status

**Current status: Active Development**

The core music discovery experience is already functional.

Currently working:

* Music search
* Music discovery
* Preview playback
* Track details
* Queue
* Search history
* Favorites
* Local persistence
* Playlist creation and management foundation
* Responsive dark cinematic UI

The next major development milestone is the complete **Playlist Manager**.

---

## 🤝 Contributing

This project is currently developed as a personal learning and portfolio project.

Suggestions, improvements, and constructive feedback are welcome.

---

## 📄 License

This project is intended for educational and portfolio purposes.

Please review the terms and conditions of any third-party API, artwork, metadata, and media source used by the application before distributing a production version.

---

## 👨‍💻 Author
**Mushex Avetisyan**

**https://www.linkedin.com/in/mushegh-avetisyan-06496a22a?utm_source=share_via&utm_content=profile&utm_medium=member_android**

Built with:

```text
Vue 3
Vite
JavaScript
Pinia
Vue Router
Axios
SCSS
iTunes Search API
```

---

⭐ If you find the project interesting, consider giving the repository a star.
