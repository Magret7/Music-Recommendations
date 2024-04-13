import { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";

export default function Home() {
    const [artistData, setArtistData] = useState([]);
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        fetch("/artist/json/")
            .then((res) => res.json())
            .then((data) => setArtistData(data.Artists));
        fetch("/album/json/")
            .then((res) => res.json())
            .then((data) => setAlbumData(data.Albums));
    }, []);


    // Find info for top 3 artists
    artistData.sort((a, b) => b.followers - a.followers);
    let artistSlice = artistData.slice(0, 3);
    let topArtists = [];
    for (let i = 0; i < artistSlice.length; i++) {
        topArtists.push(artistSlice[i].name);
    }

    // Filter album data for an album from each top artist
    let albumSlice = [];
    albumData.filter(function (album) {
        for (let i = 0; i < topArtists.length; i++) {
            if (JSON.parse(album.artist)[0] === topArtists[i]) {
                albumSlice.push(album);
            }
        }
    });

    const artistCardMap = artistSlice.map((artist) => {
        return (
            <ArtistCard
                name={artist.name}
                img={JSON.parse(artist.image)[1].url}
                followers={artist.followers}
            />
        );
    });

    const albumCardMap = albumSlice.map((album) => {
        return (
            <AlbumCard
                name={album.name}
                img={album.image}
                artists={JSON.parse(album.artist)}
                releaseYear={JSON.parse(album.info).release_date.slice(0, 4)}
            />
        );
    });

    return (
        <>
            <h1>Top Artists</h1>
            <section className="artistCards--list mb-4">
                {artistCardMap}
            </section>

            <h1>Top Albums</h1>
            <section className="artistCards--list">{albumCardMap}</section>
        </>
    );
}
