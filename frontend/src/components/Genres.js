import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Genres() {
    const [genreData, setGenresData] = useState([]);

    useEffect(() => {
        fetch("/genre/json/")
            .then((res) => res.json())
            .then((data) => setGenresData(data.Genres));
    }, []);

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedGenres, setSearchedGenres] = useState();

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    const navigate = useNavigate();

    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const genreSlice = searchedGenres
        ? searchedGenres.slice(sliceLowerRange, sliceUpperRange)
        : genreData.slice(sliceLowerRange, sliceUpperRange);

    // Sorting by ascendingOrder or descendingOrder
    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        if (sortDirection === "0") {
            let ascendingItems = searchedGenres
                ? searchedGenres.sort(
                      (a, b) => (a.name > b.name) - (a.name < b.name)
                  )
                : genreData.sort(
                      (a, b) => (a.name > b.name) - (a.name < b.name)
                  );
            setSearchedGenres([...ascendingItems]);
            console.log(searchedGenres);
        } else {
            let descendingItems = searchedGenres
                ? searchedGenres.sort(
                      (a, b) => (a.name < b.name) - (a.name > b.name)
                  )
                : genreData.sort(
                      (a, b) => (a.name < b.name) - (a.name > b.name)
                  );
            setSearchedGenres([...descendingItems]);
            console.log(searchedGenres);
        }
    }

    // Searching
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const searchResults = genreData.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchedGenres(searchResults);
            navigate("page/1");
        }
    };

    function handleSearch() {
        const searchResults = genreData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedGenres(searchResults);
        navigate("page/1");
    }

    const genreMap = genreSlice.map((genre) => {
        return (
            <div className="col">
                {/* <!-- TODO: Why does this make it display well? --> */}
                <table>
                    <tr>
                        <th>
                            <Link
                                to={`/genre/${genre.name}`}
                                className="nav-link link-dark"
                            >
                                <h3>
                                    {genre.name.charAt(0).toUpperCase() +
                                        genre.name.slice(1)}
                                </h3>
                            </Link>
                        </th>
                    </tr>

                    <tr>
                        <td>
                            <b>Artists</b>
                            <br />
                            {JSON.parse(genre.artists).map((artist) => (
                                <Link
                                    to={`/artist/${artist}`}
                                    style={{ marginRight: 10 }}
                                >
                                    {artist}
                                </Link>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Albums</b>
                            <br />

                            {JSON.parse(genre.albums).map((album) => (
                                <Link
                                    to={`/album/${album}`}
                                    style={{ marginRight: 10 }}
                                >
                                    {album}
                                </Link>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Related Tracks</b>
                            <br />
                            {JSON.parse(genre.tracks).map((track) => (
                                <>
                                    {track} <br />
                                </>
                            ))}
                        </td>
                    </tr>
                </table>
            </div>
        );
    });

    return (
        // TODO: Improve CSS styling here
        <>
            <h1 style={{ textAlign: "center" }}>All Genres</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for Genres ..."
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
                className="mb-3"
            >
                <option value="" disabled selected>
                    Select sorting option
                </option>
                <option value={0}>Ascending Order - Genre Name</option>
                <option value={1}>Descending Order - Genre Name</option>
            </select>

            <section className="row">
                {genreMap ? genreMap : <p>Loading...</p>}
            </section>
            <Pagination
                pageNum={pageNum}
                arrayLength={
                    searchedGenres ? searchedGenres.length : genreData.length
                }
            />
        </>
    );
}
