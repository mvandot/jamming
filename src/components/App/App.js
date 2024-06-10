import React, { useState, useCallback } from 'react';
import './App.css';

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";


const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults)
  }, []);

  //to complete
  const addTrack = useCallback((track) => {

  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id ))
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name)
  });

  //to complete
  const savePlaylist = useCallback(() => {

  }, [playlistName, playlistTracks]);


  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;