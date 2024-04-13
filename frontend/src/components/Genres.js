<<<<<<< HEAD
import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import genres from "../assets/js/genreData";
=======
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
>>>>>>> main
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Genres() {
    let pageNum = useParams();
    pageNum = pageNum.pageNum

    const navigate = useNavigate();

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchedGenres, setSearchedGenres] = React.useState(genres);

    // TODO: Is there a cleaner way to implement this?
    let sliceLowerRange = 0
    let sliceUpperRange = 4

    if (pageNum) {
        sliceUpperRange = pageNum * 4
        sliceLowerRange = sliceUpperRange - 4
    }
    const genresSlice = searchedGenres.slice(sliceLowerRange, sliceUpperRange)

    // Setting Up Sorting by ascendingOrder or descendingOrder
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(genres);
    });
=======
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
>>>>>>> main

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
<<<<<<< HEAD

    function handleSearch() {
        const searchResults = genres.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedGenres(searchResults);
        navigate("page/1")
    }

    const genreMap = genresSlice.map(genre => {
=======
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
        return <span> { parts.map((part, i) => 
            <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'highlight' : '{}' }>
                { part }
            </span>)
        } </span>;
    }

    const genreMap = genreSlice.map((genre) => {
>>>>>>> main
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
                                        genre.name.slice(1), searchTerm): genre.name.charAt(0).toUpperCase() +
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
<<<<<<< HEAD
            <h1 style={{ textAlign: "center" }}> Genres</h1>

            <div class="input-group mb-3"  style={{ height: "3rem", marginTop: "1.5rem", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Type Here To Search" 
=======
            <h1 style={{ textAlign: "center" }}>All Genres</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for Genres ..."
>>>>>>> main
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
<<<<<<< HEAD
                  <button class="btn btn-primary" type="button" onClick={handleSearch} >Search</button>
            </div>


            <select style={{ marginTop: "1.5rem" }} onChange={onSelectionChange}>
                <option value="" disabled selected>Select your option</option>
                <option value={0}>Ascending Order - Genre Name</option>
                <option value={1}>Descending Order - Genre Name</option>
                <option value={2}>Most Popular Genres </option>
            </select>

            <section className="row" style={{ marginLeft: "0.5rem" }}>
                <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-sm-3 mb-5">
                    {/* TODO: Make the CSS for rendering these work better */}
                    {genres.length > 0 ? genreMap : <p>No Genres exist</p>}
                </div>
            </section>

            <Pagination pageNum={pageNum} arrayLength={searchedGenres.length} />

        </>
    )
}
=======

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
>>>>>>> main
