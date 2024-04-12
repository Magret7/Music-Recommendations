import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import albums from "../assets/js/albumsData";
import Pagination from "./Pagination";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Albums() {
    let pageNum = useParams();
    pageNum = pageNum.pageNum

    const navigate = useNavigate();

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchedAlbums, setsearchedAlbums] = React.useState(albums);

    // TODO: Is there a cleaner way to implement this?
    let sliceLowerRange = 0
    let sliceUpperRange = 4

    if (pageNum) {
        sliceUpperRange = pageNum * 4
        sliceLowerRange = sliceUpperRange - 4
    }
    const albumsSlice = searchedAlbums.slice(sliceLowerRange, sliceUpperRange)

    // Sorting by ascendingOrder or descendingOrder
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(albums);
    });

    // Sorting by ascendingOrder or descendingOrder
    function onSelectionChange(e) {
        const sortDirection = e.target.value;

        if (sortDirection === "0") {
            let ascendingItems = data.sort((a, b) => (a.name > b.name) - (a.name < b.name));
            setData([...ascendingItems]);
        }
        else {
            let descendingItems = data.sort((a, b) => (a.name < b.name) - (a.name > b.name));
            setData([...descendingItems]);
        }
    }

    // Searching
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        // filterData(value);
    };

    function handleSearch() {
        const searchResults = albums.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setsearchedAlbums(searchResults);
        navigate("page/1")
    }




    const albumsMap = albumsSlice.map(album => {
        return (
            <>
                <div className="col">
                    <table>
                        <tr>
                            <td><img src={album.image} alt={album.name} className="artistOrAlbum--img" /></td>
                        </tr>

                        <tr>
                            <th>{album.name}</th>
                        </tr>

                        <tr>
                            <td>
                                <b>Artists: </b>
                                {album.artist.map(artist => <Link to={`/artist/${artist}`}>{artist}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td><b>Information: </b> {album.info}</td>
                        </tr>

                        <tr>
                            <td>
                                <b>Album Tracks:</b><br />
                                {album.tracks.map(track => (<>{track} <br /></>))}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Genres of Albums: </b>
                                {album.genres.map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre}</Link>)}
                            </td>
                        </tr>
                    </table>
                </div>
            </>
        )
    })

    return (
        <>
            <h1 style={{ textAlign: "center" }}>All Albums</h1>

            <div>
                <input
                    style={{ borderRadius: "4px", width: "20rem", height: "3rem", marginTop: "0.5rem" }}
                    type="text"
                    placeholder="  Search for Albums ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />

                <button onClick={handleSearch} style={{ width: "3rem", height: "3rem" }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <select style={{ marginTop: "0.5rem" }} onChange={onSelectionChange}>
                <option value="" disabled selected>Select your option</option>
                <option value={0}>Ascending Order - Album Name</option>
                <option value={1}>Descending Order - Album Name</option>
            </select>

            <section className="row" style={{ marginLeft: "0.5rem" }}>
                <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-sm-3 mb-5">
                    {/* TODO: Make the CSS for rendering these work better */}
                    {albums.length > 0 ? albumsMap : <p>No Albums exist</p>}
                </div>
            </section>

            <Pagination pageNum={pageNum} arrayLength={searchedAlbums.length} />
        </>
    )
}
