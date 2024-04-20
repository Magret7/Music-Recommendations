import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Albums() {
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        fetch("/album/json/")
            .then((res) => res.json())
            .then((data) => setAlbumData(data.Albums));
    }, []);

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedAlbums, setSearchedAlbums] = useState();

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    const navigate = useNavigate();
    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const albumsSlice = searchedAlbums
        ? searchedAlbums.slice(sliceLowerRange, sliceUpperRange)
        : albumData.slice(sliceLowerRange, sliceUpperRange);

    // Sorting by ascendingOrder or descendingOrder
    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        if (sortDirection === "0") {
            let ascendingItems = searchedAlbums
                ? searchedAlbums.sort(
                    (a, b) => (a.name > b.name) - (a.name < b.name)
                )
                : albumData.sort(
                    (a, b) => (a.name > b.name) - (a.name < b.name)
                );
            setSearchedAlbums([...ascendingItems]);
            console.log(searchedAlbums);
        } else {
            let descendingItems = searchedAlbums
                ? searchedAlbums.sort(
                    (a, b) => (a.name < b.name) - (a.name > b.name)
                )
                : albumData.sort(
                    (a, b) => (a.name < b.name) - (a.name > b.name)
                );
            setSearchedAlbums([...descendingItems]);
            console.log(searchedAlbums);
        }
    }

    // Searching
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const searchResults = albumData.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchedAlbums(searchResults);
            navigate("page/1");
        }
    };

    function handleSearch() {
        const searchResults = albumData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedAlbums(searchResults);
        navigate("page/1");
    }

    function getHighlightedText(text, highlight) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {" "}
                {parts.map((part, i) => (
                    <span
                        key={i}
                        className={
                            part.toLowerCase() === highlight.toLowerCase()
                                ? "highlight"
                                : "{}"
                        }
                    >
                        {part}
                    </span>
                ))}{" "}
            </span>
        );
    }

    const albumsMap = albumsSlice.map((album) => {
        return (
            <>
                <div className="col">
                    <table className="artistOrAlbumTable">
                        <tr>
                            <td>
                                <Link
                                    to={`/album/${album.name}`}
                                    className="nav-link link-dark"
                                >
                                    <img
                                        src={album.image}
                                        alt={album.name}
                                        className="artistOrAlbum--img"
                                    />
                                </Link>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <Link
                                    to={`/album/${album.name}`}
                                    className="nav-link link-dark"
                                >
                                    {searchedAlbums
                                        ? getHighlightedText(
                                            album.name,
                                            searchTerm
                                        )
                                        : album.name}
                                </Link>
                            </th>
                        </tr>

                        <tr>
                            <td>
                                <b>Artists: </b>
                                {JSON.parse(album.artist).map((artist) => (
                                    <Link to={`/artist/${artist}`}>
                                        {artist}
                                    </Link>
                                ))}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Released: </b>{" "}
                                {JSON.parse(album.info).release_date}
                            </td>
                        </tr>
                        {/* 
                        <tr>
                            <td>
                                <b>Album Tracks:</b>
                                <br />
                                {JSON.parse(album.tracks).map((track) => (
                                    <>
                                        {track} <br />
                                    </>
                                ))}
                            </td>
                        </tr> */}

                        <tr>
                            <td>
                                <b>Genres of Albums: </b>
                                {JSON.parse(album.genres).map((genre) => (
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
                    </table>
                </div>
            </>
        );
    });

    return (
        <>
            <h1 style={{ textAlign: "center" }}>All Albums</h1>

            <div class="input-group mb-3" style={{ height: "3rem", marginTop: "1.5rem", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Type Here To Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button class="btn btn-primary" type="button" onClick={handleSearch} >Search</button>
            </div>


            <select
                style={{ marginTop: "0.5rem" }}
                defaultValue={-1}
                onChange={onSelectionChange}
                className="mb-3"
            >
                <option value={-1} disabled>
                    Select Sorting Option
                </option>
                <option value={0}>Ascending Order - Album Name</option>
                <option value={1}>Descending Order - Album Name</option>
            </select>
            
            <Pagination
                pageNum={pageNum}
                arrayLength={
                    searchedAlbums ? searchedAlbums.length : albumData.length
                }
            />

            <section className="row">
                {/* <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5"> */}
                {/* TODO: Make the CSS for rendering these work better */}
                {albumsMap ? albumsMap : <p>Loading...</p>}
                {/* </div> */}
            </section>

        </>
    );
}
