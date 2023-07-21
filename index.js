const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Playlist model
class Song {
  constructor(title, artists, url) {
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.playCount = 0;
  }
}

// Playlist array to store songs
let playlist = [];

// Add song to the playlist
app.post('/add', (req, res) => {
  const { title, artists, url } = req.body;

  if (!title || !artists || !url) {
    return res.status(400).json({ error: 'Please provide title, artists, and URL' });
  }

  const song = new Song(title, artists, url);
  playlist.push(song);
  res.json({ message: 'Song added to the playlist successfully' });
});

// Play a song from the playlist
app.get('/play/:title', (req, res) => {
  const title = req.params.title;
  const song = playlist.find((song) => song.title === title);

  if (!song) {
    return res.status(404).json({ error: 'Song not found in the playlist' });
  }

  // Increment play count
  song.playCount++;

  // Logic to play the song from the URL (not implemented here)
  res.json({ message: `Now playing: ${song.title} by ${song.artists.join(', ')}` });
});

// Get the list of songs from the playlist
app.get('/playlist', (req, res) => {
  res.json(playlist);
});

// Get list of songs sorted by most played
app.get('/playlist/most-played', (req, res) => {
  const sortedPlaylist = playlist.slice().sort((a, b) => b.playCount - a.playCount);
  res.json(sortedPlaylist);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
