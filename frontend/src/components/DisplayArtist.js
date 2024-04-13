import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";

export default function DisplayArtist() {
    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let artistName = useParams().artistName;

    const [artist, setArtist] = useState();
    const [artistData, setArtistData] = useState([]); // For grabbing all artist data
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        fetch(`/artist/${artistName}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network error");
                }
                return res.json();
            })
            .then((data) => {
                setArtist(data);
            })
            .catch((error) => setArtist());

        // Find artist's albums
        fetch("/album/json/")
            .then((res) => res.json())
            .then((data) => setAlbumData(data.Albums));

        // Find related artist info
        fetch("/artist/json/")
            .then((res) => res.json())
            .then((data) => setArtistData(data.Artists));
    }, [artistName]);

    console.log(artist);

    // Display follower count with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Filter album data for this artist's albums
    let artistAlbums = []
    if (artist) {
        artistAlbums = albumData.filter(
            (album) => JSON.parse(album.artist)[0] === artist.name
        );
    }

    const albumCards = artistAlbums.map((album) => {
        return (
            <AlbumCard
                name={album.name}
                img={album.image}
                releaseYear={JSON.parse(album.info).release_date.slice(0, 4)}
                displayPage={true}
            />
        );
    });

    // Filter artist data for this artist's related artists
    let relatedArtists = [];
    if (artist) {
        relatedArtists = JSON.parse(artist.related_artists);
    }

    const filteredRelatedArtists = [];
    artistData.filter(function (artist) {
        for (let i = 0; i < relatedArtists.length; i++) {
            if (relatedArtists[i].name === artist.name) {
                filteredRelatedArtists.push(artist);
            }
        }
    });

    const relatedArtistCards = filteredRelatedArtists.map((relatedArtist) => {
        return (
            <ArtistCard
                name={relatedArtist.name}
                img={JSON.parse(relatedArtist.image)[1].url}
                displayPage={true}
            />
        );
    });

    return (
        <>
            {artist ? (
                <>
                    <div className="container">
                        <div className="row mb-5">
                            <img
                                src={JSON.parse(artist.image)[1].url}
                                alt={artist.name}
                                className="col artistOrAlbum--img"
                            />
                            <div className="col text-start">
                                <h1 className="fw-light">{artist.name}</h1>
                                {artist.followers ? (
                                    <p className="ml-5">
                                        {numberWithCommas(artist.followers)}{" "}
                                        Followers
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        {albumCards.length ? (
                            <>
                                <h3 className="text-start">Album(s)</h3>
                                {albumCards}
                                <br />
                            </>
                        ) : null}
                        {relatedArtistCards.length ? (
                            <>
                                <h3 className="text-start">Related Artists</h3>
                                <div className="row">{relatedArtistCards}</div>
                            </>
                        ) : null}

                        <div className="text-start">
                            <h3>Genres</h3>
                            {JSON.parse(artist.genres).map((genre, index) => (
                                <>
                                    {index ? ", " : ""}
                                    <Link
                                        to={`/genre/${genre}`}
                                        style={{ marginRight: 0 }}
                                    >
                                        {genre.charAt(0).toUpperCase() +
                                            genre.slice(1)}
                                    </Link>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <h4 className="fw-light">Artist "{artistName}" not found</h4>
            )}
        </>
    );
}
