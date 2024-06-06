import React, { useState, useCallback } from 'react';
import './App.css';

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";


const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults)
  }, [])


  return (
    <div>   
      <h1>Jamming</h1>
      <div className='App'>
        <SearchBar onSearch={search} />

      </div>

    </div>
  );
}

export default App;