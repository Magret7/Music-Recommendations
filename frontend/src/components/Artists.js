import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import artists from "../assets/js/artistsData";
import Pagination from "./Pagination";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Artists() {
    let pageNum = useParams();
    pageNum = pageNum.pageNum

    const navigate = useNavigate();

    // Setting Up for Searching
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchedArtists, setSearchedArtists] = React.useState(artists);

    // TODO: Is there a cleaner way to implement this?
    let sliceLowerRange = 0
    let sliceUpperRange = 4

    if (pageNum) {
        sliceUpperRange = pageNum * 4
        sliceLowerRange = sliceUpperRange - 4
    }
    const artistsSlice = searchedArtists.slice(sliceLowerRange, sliceUpperRange)

    // Sorting by ascendingOrder or descendingOrder
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(artists);
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
    };

    function handleSearch() {
        const searchResults = artists.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedArtists(searchResults);
        navigate("page/1")
    }


    const artistsMap = artistsSlice.map((artist) => {
        return (
            <>
                {/* <div className="row"> TODO: Why does this have a row but albums does not?*/}
                <div className="col">   {/* TODO: Why does this make it display well? */}
                    <table>
                        <tr>
                            <td><img src={artist.image} alt={artist.name} className="artistOrAlbum--img" /></td>
                        </tr>

                        <tr>
                            <td>
                                <b>{artist.name}</b>
                            </td>
                        </tr>

                        <tr>
                            <td><b>Biography: </b> {artist.info}</td>
                        </tr>

                        <tr>
                            {/* TODO: Remove trailing comma */}
                            <td><b>Songs: </b>{artist.tracks.map(track => `${track}, `)}</td>
                        </tr>

                        <tr>
                            <td>
                                <b>Albums: </b>
                                {artist.albums.map(album => <Link to={`/album/${album}`}>{album}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Genres: </b>
                                {artist.genres.map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Recommended & Related Artists</b> <br />
                                {artist.RelatedArtists.map(relatedArtist => <Link to={`/artist/${relatedArtist}`} style={{ marginRight: 10 }}>{relatedArtist}</Link>)}
                            </td>
                        </tr>
                    </table>
                </div>
            </>
        )
    })


    return (
        <>
            <h1 style={{ textAlign: "center" }}>My Artists</h1>

            <div>
                <input
                    style={{ borderRadius: "4px", width: "20rem", height: "3rem", marginTop: "0.5rem" }}
                    type="text"
                    placeholder="  Search for Albums ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />

                <button onClick={handleSearch} style={{ width: "3rem", height: "3rem" }} class="btn btn-primary">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <select style={{ marginTop: "0.5rem" }} onChange={onSelectionChange}>
                <option value="" disabled selected>Select your option</option>
                <option value={0}>Ascending Order - Artist Name</option>
                <option value={1}>Descending Order - Artist Name</option>
            </select>

            <section className="row" style={{ marginLeft: "0.5rem" }}>
                <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-sm-3 mb-5">
                    {/* TODO: Make the CSS for rendering these work better */}
                    {artists.length > 0 ? artistsMap : <p>No Artists exist</p>}
                </div>
            </section>

            <Pagination pageNum={pageNum} arrayLength={searchedArtists.length} />
        </>
    )
}