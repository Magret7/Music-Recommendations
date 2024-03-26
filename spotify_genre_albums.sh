#!/bin/bash

# Access token
ACCESS_TOKEN="BQDVl1hbSz8ELRyJwq8LzCt66t5tvsGnw-oH3c40VqfMVUJhgPmD6E4DoW88PPFT_B8Wat6rMUHFQkLC_Mmf8SAKKsuILeNE7MsX87QMtGKCmGry86k"

# List of genres
GENRES=("acoustic" "afrobeat" "alt-rock" "alternative" "ambient" "anime" "black-metal" "bluegrass" "blues" "bossanova" "brazil" "breakbeat" "british" "cantopop" "chicago-house" "children" "chill" "classical" "club" "comedy" "country" "dance" "dancehall" "death-metal" "deep-house" "detroit-techno" "disco" "disney" "drum-and-bass" "dub" "dubstep" "edm" "electro" "electronic" "emo" "folk" "forro" "french" "funk" "garage" "german" "gospel" "goth" "grindcore" "groove" "grunge" "guitar" "happy" "hard-rock" "hardcore" "hardstyle" "heavy-metal" "hip-hop" "holidays" "honky-tonk" "house" "idm" "indian" "indie" "indie-pop" "industrial" "iranian" "j-dance" "j-idol" "j-pop" "j-rock" "jazz" "k-pop" "kids" "latin" "latino" "malay" "mandopop" "metal" "metal-misc" "metalcore" "minimal-techno" "movies" "mpb" "new-age" "new-release" "opera" "pagode" "party" "philippines-opm" "piano" "pop" "pop-film" "post-dubstep" "power-pop" "progressive-house" "psych-rock" "punk" "punk-rock" "r-n-b" "rainy-day" "reggae" "reggaeton" "road-trip" "rock" "rock-n-roll" "rockabilly" "romance" "sad" "salsa" "samba" "sertanejo" "show-tunes" "singer-songwriter" "ska" "sleep" "songwriter" "soul" "soundtracks" "spanish" "study" "summer" "swedish" "synth-pop" "tango" "techno" "trance" "trip-hop" "turkish" "work-out" "world-music")

# Function to retrieve albums by genre
get_albums_by_genre() {
    local genre="$1"
    local result=$(curl -s -X GET "https://api.spotify.com/v1/search?q=genre:%22$genre%22&type=album&limit=5" -H "Authorization: Bearer $ACCESS_TOKEN")
    echo "$result"
}

# Main function
main() {
    echo "{" > genres_albums.json
    for ((i=0; i<${#GENRES[@]}; ++i)); do
        genre=${GENRES[i]}
        echo "  \"$genre\": [" >> genres_albums.json
        albums=$(get_albums_by_genre "$genre")
        # Extract unique album names and artists from JSON response
        album_info=$(echo "$albums" | jq -r '.albums.items[] | "\(.name) by \(.artists[0].name)"' | sort -u | sed 's/"/\\"/g' | sed 's/^/    "/' | sed 's/$/",/')
        echo "$album_info" | sed '$s/,$//' >> genres_albums.json
        if [[ $i -lt $((${#GENRES[@]} - 1)) ]]; then
            echo "  ]," >> genres_albums.json
        else
            echo "  ]" >> genres_albums.json
        fi
    done
    echo "}" >> genres_albums.json
    echo "Genres and albums stored in genres_albums.json"
}

# Run main function
main