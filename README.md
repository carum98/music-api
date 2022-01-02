# Music API
API to search songs, get song information and get lyrics.

## Setup
The api use the [Spotify API](https://www.spotify.com/) and [Genius API](https://genius.com/)

`.env`
```
GENIUS_URL=https://api.genius.com
GENIUS_TOKEN=

SPOTIFY_URL=https://api.spotify.com/v1
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

## Docs
Documentation with [Swagger](https://swagger.io/)

Example: https://example.com/api-docs

## GET /search?q=[value]

Example: https://example.com/search?q=shadow

Response:
 ```json
 [
    {
      "artist": {
        "name": "Bring Me The Horizon",
        "image_url": "https://images.genius.com/64c7d35c8d427522574cbf7773084ee3.1000x1000x1.jpg"
      },
      "title": "Shadow Moses",
      "song_url": "/songs/spotify/68osIGtVjM7QWVe6pazLHj",
      "lyrics_url": "/lyrics/Bring-Me-The-Horizon/Shadow-Moses"
    },
 ]
 ```
 
 ## GET /songs/[source]/[id]
 
 Example: https://example.com/songs/spotify/68osIGtVjM7QWVe6pazLHj
 
 Response:
 ```json
 {
    "title": "Shadow Moses",
    "thumbnail_url": "https://i.scdn.co/image/ab67616d0000b27360cf7c8dd93815ccd6cb4830",
    "artist": {
        "name": "Bring Me The Horizon",
        "image_url": ""
    },
    "media": [
        {
            "provider": "spotify",
            "type": "audio",
            "url": "https://open.spotify.com/track/68osIGtVjM7QWVe6pazLHj"
        }
    ],
    "preview_url": "https://p.scdn.co/mp3-preview/7ca68006ce5326244c627241d39e8469508ae4c5?cid=e71927db796d4b57a7387aba0ef786a8",
    "lyrics": "/lyrics/Bring-Me-The-Horizon/Shadow-Moses"
}
 ```
 
 ## GET /lyrics/[artist]/[title]
 
 Example: https://example.com/lyrics/Bring-Me-The-Horizon/Shadow-Moses
 
 Response:
 
 ```json
 {
    "genius": {
        "lyric": "[Chorus]\nCan you tell from the look in our eyes? (We&#x27;re going nowhere)We live our lives like we&#x27;re ready to die ..."
        "source": "https://genius.com/Bring-Me-The-Horizon-Shadow-Moses-lyrics"
    },
    "songLyrics": {
        "lyric": "Can you tell from the look in our eyes;\n\nWe're going nowhere.\n\nWe live our lives like we're ready to die ...";
        "source": "https://genius.com/Bring-Me-The-Horizon-Shadow-Moses-lyrics"
    },
    "lyricMania": {
        "lyric": "",
        "source": "https://www.lyricsmania.com/Shadow_Moses_lyrics_Bring_Me-The-Horizon.html"
    }
}
 ```
