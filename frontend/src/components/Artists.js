import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";

export default function Artists() {
    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        fetch("/artist/json/")
            .then((res) => res.json())
            .then((data) => setArtistData(data.Artists));
    }, []);

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const artistsSlice = artistData.slice(sliceLowerRange, sliceUpperRange);
    if (artistsSlice[0]) {
        console.log(JSON.parse(artistsSlice[0].related_artists).artists);
    }

    const artistsMap = artistsSlice.map((artist) => {
        return (
            <>
                {/* <div className="row"> TODO: Why does this have a row but albums does not?*/}
                <div className="col">
                    {/* TODO: Why does this make it display well? */}
                    <table>
                        {/* <!-- <tr>
                                <td>
                                    <b> <a href="{{ url_for('showArtist', artist_name=artist)}}">{{ artist.name }}</a></b>
                                </td>
                            </tr> --> */}
                        <tr>
                            <td>
                                <Link
                                    to={`/artist/${artist.name}`}
                                    className="nav-link link-dark"
                                >
                                    <img
                                        src={JSON.parse(artist.image)[1].url}
                                        alt={artist.name}
                                        className="artistOrAlbum--img"
                                    />
                                </Link>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Link
                                    to={`/artist/${artist.name}`}
                                    className="nav-link link-dark"
                                >
                                    <b>{artist.name}</b>
                                </Link>
                            </td>
                        </tr>

                        {/* <tr>
                            <td>
                                <b>Biography: </b> {artist.info}
                            </td>
                        </tr> */}

                        <tr>
                            <td>
                                <b>Songs: </b>
                                {JSON.parse(artist.tracks).map(
                                    (track, index) => {
                                        return (index ? ", " : "") + track;
                                    }
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Albums: </b>
                                {JSON.parse(artist.albums).map((album) => (
                                    <>
                                        <Link
                                            to={`/album/${album}`}
                                            className="mx-1"
                                        >{`${album}`}</Link>
                                    </>
                                ))}
                            </td>
                        </tr>

                        {/* <tr>
                            <td>
                                <b>Genres: </b>
                                {artist.genres.map((genre) => (
                                    <Link
                                        to={`/genre/${genre}`}
                                        style={{ marginRight: 10 }}
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </td>
                        </tr> */}

                        <tr>
                            <td>
                                <b>Recommended & Related Artists</b> <br />
                                {JSON.parse(artist.related_artists).artists.map(
                                    (relatedArtist) => (
                                        <Link
                                            to={`/artist/${relatedArtist.name}`}
                                            style={{ marginRight: 10 }}
                                        >
                                            {relatedArtist.name}
                                        </Link>
                                    )
                                )}
                            </td>
                        </tr>
                    </table>
                </div>
                {/* </div> */}
            </>
        );
    });

    return (
        <>
            {/* {artistData} */}
            {/* <pre>{JSON.stringify(artistData, null, 2)}</pre> */}
            <h1 style={{ textAlign: "center" }}>All Artists</h1>
            {/* TODO: Maybe change to only even map if there's something there?  Will we always have somethign when the DB is populated? */}
            <section className="row">
                {/* <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5"> */}
                {/* TODO: Make the CSS for rendering these work better */}
                {artistsMap ? artistsMap : <p>Loading...</p>}
                {/* </div> */}
            </section>
            <Pagination pageNum={pageNum} arrayLength={artistData.length} />
        </>
    );
}
