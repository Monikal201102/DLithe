import { useState, useRef } from "react";
import "./MusicApp.css";

const songs = [
  {
    id: 1,
    title: "Insecurities",
    artist: "Vishnu Vijay",
    src: "/Insecurities(KoshalWorld.Com).mp3",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    title: "Hey Minnale",
    artist: "G V Prakash",
    src: "/Hey Minnale (Tamil)(KoshalWorld.Com).mp3",
    liked: false,
    saved: false,
  },
  {
    id: 3,
    title: "Pularaadha",
    artist: "Aishwarya Ravichandran",
    src: "/Pularaadha-MassTamilan.mp3",
    liked: false,
    saved: false,
  },
];

export default function MusicApp() {
  const [playlist, setPlaylist] = useState(songs);
  const [likedSongs, setLikedSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const audioRef = useRef(null);

  const toggleLike = (id) => {
    setPlaylist((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, liked: !song.liked } : song
      )
    );
    const likedSong = playlist.find((song) => song.id === id);
    if (likedSong.liked) {
      setLikedSongs((prev) => prev.filter((song) => song.id !== id));
    } else {
      setLikedSongs((prev) => [...prev, likedSong]);
    }
  };

  const toggleSave = (id) => {
    setPlaylist((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, saved: !song.saved } : song
      )
    );
    const savedSong = playlist.find((song) => song.id === id);
    if (savedSong.saved) {
      setSavedSongs((prev) => prev.filter((song) => song.id !== id));
    } else {
      setSavedSongs((prev) => [...prev, savedSong]);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setPlaying(song.id);
    if (audioRef.current) {
      audioRef.current.src = song.src;
      audioRef.current.play();
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Spotify Music App</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="song-list">
        {playlist
          .filter((song) =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-info" onClick={() => playSong(song)}>
                <h2>{song.title}</h2>
                <p>{song.artist}</p>
              </div>
              <div className="song-actions">
                <button onClick={() => (playing === song.id ? pauseSong() : playSong(song))}>
                  {playing === song.id ? "⏸" : "▶"}
                </button>
                <button onClick={() => toggleLike(song.id)} className={song.liked ? "liked" : ""}>
                  ♥
                </button>
                <button onClick={() => toggleSave(song.id)} className={song.saved ? "saved" : ""}>
                  💾
                </button>
              </div>
              {playing === song.id && (
  <div className="playing-visualizer">
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
  </div>
)}

            </div>
          ))}
      </div>
      <audio ref={audioRef} controls hidden />
      <div className="liked-songs">
        <h2>Liked Songs</h2>
        {likedSongs.map((song) => (
          <div key={song.id} className="song-card" onClick={() => playSong(song)}>
            <div className="song-info">
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="saved-songs">
        <h2>Saved Songs</h2>
        {savedSongs.map((song) => (
          <div key={song.id} className="song-card" onClick={() => playSong(song)}>
            <div className="song-info">
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
