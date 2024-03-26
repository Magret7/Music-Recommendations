#!/bin/bash

# Access token
ACCESS_TOKEN="BQDVl1hbSz8ELRyJwq8LzCt66t5tvsGnw-oH3c40VqfMVUJhgPmD6E4DoW88PPFT_B8Wat6rMUHFQkLC_Mmf8SAKKsuILeNE7MsX87QMtGKCmGry86k"

# List of genres
GENRES=("acoustic" "afrobeat" "alt-rock" "alternative" "ambient" "anime" "black-metal" "bluegrass" "blues" "bossanova" "brazil" "breakbeat" "british" "cantopop" "chicago-house" "children" "chill" "classical" "club" "comedy" "country" "dance" "dancehall" "death-metal" "deep-house" "detroit-techno" "disco" "disney" "drum-and-bass" "dub" "dubstep" "edm" "electro" "electronic" "emo" "folk" "forro" "french" "funk" "garage" "german" "gospel" "goth" "grindcore" "groove" "grunge" "guitar" "happy" "hard-rock" "hardcore" "hardstyle" "heavy-metal" "hip-hop" "holidays" "honky-tonk" "house" "idm" "indian" "indie" "indie-pop" "industrial" "iranian" "j-dance" "j-idol" "j-pop" "j-rock" "jazz" "k-pop" "kids" "latin" "latino" "malay" "mandopop" "metal" "metal-misc" "metalcore" "minimal-techno" "movies" "mpb" "new-age" "new-release" "opera" "pagode" "party" "philippines-opm" "piano" "pop" "pop-film" "post-dubstep" "power-pop" "progressive-house" "psych-rock" "punk" "punk-rock" "r-n-b" "rainy-day" "reggae" "reggaeton" "road-trip" "rock" "rock-n-roll" "rockabilly" "romance" "sad" "salsa" "samba" "sertanejo" "show-tunes" "singer-songwriter" "ska" "sleep" "songwriter" "soul" "soundtracks" "spanish" "study" "summer" "swedish" "synth-pop" "tango" "techno" "trance" "trip-hop" "turkish" "work-out" "world-music")

# Function to retrieve artists by genre
get_artists_by_genre() {
    local genre="$1"
    local result=$(curl -s -X GET "https://api.spotify.com/v1/search?q=genre:%22$genre%22&type=artist&limit=5" -H "Authorization: Bearer $ACCESS_TOKEN")
    echo "$result"
}

# Main function
main() {
    echo "{" > genres_artists.json
    for ((i=0; i<${#GENRES[@]}; ++i)); do
        genre=${GENRES[i]}
        echo "  \"$genre\": [" >> genres_artists.json
        artists=$(get_artists_by_genre "$genre")
        # Extract artist names from JSON response
        artist_names=$(echo "$artists" | jq -r '.artists.items[].name' | sed 's/"/\\"/g' | sed 's/^/    "/' | sed 's/$/",/')
        echo "$artist_names" | sed '$s/,$//' >> genres_artists.json
        if [[ $i -lt $((${#GENRES[@]} - 1)) ]]; then
            echo "  ]," >> genres_artists.json
        else
            echo "  ]" >> genres_artists.json
        fi
    done
    echo "}" >> genres_artists.json
    echo "Genres and artists stored in genres_artists.json"
}

# Run main function
main