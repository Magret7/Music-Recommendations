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
    const [sortDirection, setSortDirection] = useState("0");
    const [sortField, setSortField] = useState();

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    const navigate = useNavigate();

    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const genreSlice = searchedGenres
        ? searchedGenres.slice(sliceLowerRange, sliceUpperRange)
        : genreData.slice(sliceLowerRange, sliceUpperRange);

    // Sorting by ascendingOrder or descendingOrder
    function onSortDirectionChange(e) {
        const sortDirection = e.target.value;
        setSortDirection(sortDirection);

        if (sortDirection === "0") {
            let ascendingItems = searchedGenres
                ? searchedGenres.sort(
                      (a, b) =>
                          (a[sortField] > b[sortField]) -
                          (a[sortField] < b[sortField])
                  )
                : genreData.sort(
                      (a, b) =>
                          (a[sortField] > b[sortField]) -
                          (a[sortField] < b[sortField])
                  );
            setSearchedGenres([...ascendingItems]);
        } else {
            let descendingItems = searchedGenres
                ? searchedGenres.sort(
                      (a, b) =>
                          (a[sortField] < b[sortField]) -
                          (a[sortField] > b[sortField])
                  )
                : genreData.sort(
                      (a, b) =>
                          (a[sortField] < b[sortField]) -
                          (a[sortField] > b[sortField])
                  );
            setSearchedGenres([...descendingItems]);
        }
    }

    function onSortFieldChange(e) {
        const sortField = e.target.value;
        setSortField(sortField);
        console.log(sortField);
        let sortedGenres = []
        if (sortDirection === "0") {
            sortedGenres = searchedGenres
                ? searchedGenres.sort(
                      (a, b) =>
                          (a[sortField] > b[sortField]) -
                          (a[sortField] < b[sortField])
                  )
                : genreData.sort(
                      (a, b) =>
                          (a[sortField] > b[sortField]) -
                          (a[sortField] < b[sortField])
                  );
        } else {
            sortedGenres = searchedGenres
                ? searchedGenres.sort(
                      (a, b) =>
                          (a[sortField] < b[sortField]) -
                          (a[sortField] > b[sortField])
                  )
                : genreData.sort(
                      (a, b) =>
                          (a[sortField] < b[sortField]) -
                          (a[sortField] > b[sortField])
                  );
        }
        console.log("new artists are ", sortedGenres);
        setSearchedGenres([...sortedGenres]);
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

    function getHighlightedText(text, highlight) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'highlight' : '{}'}>
                {part}
            </span>)
        } </span>;
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
                                    {searchedGenres ? getHighlightedText(genre.name.charAt(0).toUpperCase() +
                                        genre.name.slice(1), searchTerm) : genre.name.charAt(0).toUpperCase() +
                                    genre.name.slice(1)}
                                </h3>
                            </Link>
                        </th>
                    </tr>

                    <tr>
                        <td>
                            <b>Popularity: </b>{" "}
                            {JSON.parse(genre.popularity)}
                        </td>
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

            <select style={{ marginTop: "0.5rem" }} defaultValue={-1} onChange={onSortFieldChange} className="mx-2">
                <option value={-1} disabled>Sort By</option>
                <option value='name'>Name</option>
                <option value='popularity'>Popularity</option>
            </select>
            {/* TODO: Change to Dropdown for better look */}
            <select style={{ marginTop: "0.5rem" }} defaultValue={-1} onChange={onSortDirectionChange} className="mx-2">
                <option value={0}>Ascending Order</option>
                <option value={1}>Descending Order</option>
            </select>

            <Pagination
                pageNum={pageNum}
                arrayLength={
                    searchedGenres ? searchedGenres.length : genreData.length
                }
            />
            
            <section className="row">
                {genreMap ? genreMap : <p>Loading...</p>}
            </section>
        </>
    );
}
