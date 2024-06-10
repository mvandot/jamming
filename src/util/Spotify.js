let accessToken;
const clientID = "c97ce195ab8c40d69ce032822cb88c83";
const redirectUrl = "https://jammmingtomusic.netlify.app";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
    },

        search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (!jsonResponse) {
                    console.error("Response error")
                }
                return jsonResponse.tracks.items.map((t) => ({
                    id: t.id,
                    name: t.name,
                    artist: t.artists[0].name,
                    album: t.album.name,
                    uri: t.uri,
                }));
            });
    },


    async savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            return;
        }
      
        try {
          const acToken = this.getAccessToken();
          const header = {
            Authorization: `Bearer ${acToken}`,
            'Content-Type': 'application/json',
          };
      
          // Get user ID
          const userResponse = fetch('https://api.spotify.com/v1/me', { headers: header });
          const userJson = userResponse.json();
          const userId = userJson.id;
      
          // Create playlist
          const playlistResponse = fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ name }), 
          });
          const playlistJson = playlistResponse.json();
          const playlistId = playlistJson.id;
      
          // Add tracks to playlist
          fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ uris: trackUris }),
          });
      
          console.log('Playlist created and tracks added successfully!');
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }      
    
}


export { Spotify };