import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import genres from "../assets/js/genreData";
import Pagination from "./Pagination";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    // Sorting by ascendingOrder or descendingOrder
    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        if (sortDirection === "0") {
            let ascendingItems = data.sort((a, b) => (a.name > b.name) - (a.name < b.name));
            setData([...ascendingItems]);
        }
        if (sortDirection === "1") {
            let descendingItems = data.sort((a, b) => (a.name < b.name) - (a.name > b.name));
            setData([...descendingItems]);
        }
        if (sortDirection === "2") {
            let popularItems = data.sort((a, b) => (b.popularity - a.popularity));
            setData([...popularItems]);
        }
    }

    // Searching
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    function handleSearch() {
        const searchResults = genres.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedGenres(searchResults);
        navigate("page/1")
    }

    const genreMap = genresSlice.map(genre => {
        return (
            <div className="col">   {/* <!-- TODO: Why does this make it display well? --> */}
                <table>
                    <tr>
                        <th>{genre.name}</th>
                    </tr>

                    <tr>
                        <td><b>Information: </b> {genre.info}</td>
                    </tr>

                    <tr>
                        <td>
                            <b>Artists: </b>
                            {genre.artists.map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)}

                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Albums: </b>
                            {genre.albums.map(album => <Link to={`/album/${album}`} style={{ marginRight: 10 }}>{album}</Link>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Related Songs: </b><br />
                            {genre.tracks.map(track => (<>{track} <br /></>))}
                        </td>
                    </tr>
                </table>
            </div>
        )
    })

    return (
        <>
            <h1 style={{ textAlign: "center" }}> Genres</h1>

            <div>
                <input
                    type="text"
                    placeholder="Search for Genres ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />

                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <select style={{ marginTop: "0.5rem" }} onChange={onSelectionChange}>
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