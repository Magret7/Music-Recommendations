import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Artists() {
    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        fetch("/artist/json/")
            .then((res) => res.json())
            .then((data) => setArtistData(data.Artists));
    }, []);

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedArtists, setSearchedArtists] = useState();

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    const navigate = useNavigate();

    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const artistsSlice = searchedArtists
        ? searchedArtists.slice(sliceLowerRange, sliceUpperRange)
        : artistData.slice(sliceLowerRange, sliceUpperRange);

    // Sorting by ascendingOrder or descendingOrder
    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        if (sortDirection === "0") {
            let ascendingItems = searchedArtists
                ? searchedArtists.sort(
                      (a, b) => (a.name < b.name) - (a.name > b.name)
                  )
                : artistData.sort(
                      (a, b) => (a.name > b.name) - (a.name < b.name)
                  );
            setSearchedArtists([...ascendingItems]);
            console.log(searchedArtists)
        } else {
            let descendingItems = searchedArtists
                ? searchedArtists.sort(
                      (a, b) => (a.name < b.name) - (a.name > b.name)
                  )
                : artistData.sort(
                      (a, b) => (a.name < b.name) - (a.name > b.name)
                  );
            setSearchedArtists([...descendingItems]);
            console.log(searchedArtists)
        }
    }

    // Searching
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const searchResults = artistData.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchedArtists(searchResults);
            navigate("page/1");
        }
    };

    function handleSearch() {
        const searchResults = artistData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedArtists(searchResults);
        navigate("page/1");
    }

    const artistsMap = artistsSlice.map((artist) => {
        return (
            <>
                {/* <div className="row"> TODO: Why does this have a row but albums does not?*/}
                <div className="col">
                    {/* TODO: Why does this make it display well? */}
                    <table className="artistTable">
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

                        <tr>
                            <td>
                                <b>Genres: </b>
                                {JSON.parse(artist.genres).map((genre) => (
                                    <Link
                                        to={`/genre/${genre}`}
                                        style={{ marginRight: 10 }}
                                    >
                                        {genre.charAt(0).toUpperCase() +
                                            genre.slice(1)}
                                    </Link>
                                ))}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Recommended & Related Artists</b> <br />
                                {JSON.parse(artist.related_artists).map(
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
            <div>
                <input
                    type="text"
                    placeholder="Search for Artists ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <select
                style={{ marginTop: "0.5rem" }}
                onChange={onSelectionChange}
            >
                <option value="" disabled selected>
                    Select your option
                </option>
                <option value={0}>Ascending Order - Artist Name</option>
                <option value={1}>Descending Order - Artist Name</option>
            </select>

            {/* TODO: Maybe change to only even map if there's something there?  Will we always have somethign when the DB is populated? */}
            <section className="row">
                {/* <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5"> */}
                {/* TODO: Make the CSS for rendering these work better */}
                {artistsMap ? artistsMap : <p>Loading...</p>}
                {/* </div> */}
            </section>
            <Pagination
                pageNum={pageNum}
                arrayLength={
                    searchedArtists ? searchedArtists.length : artistData.length
                }
            />
        </>
    );
}
