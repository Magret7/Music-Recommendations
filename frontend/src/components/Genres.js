import { useParams, Outlet, Link } from "react-router-dom";
import genres from "../assets/js/genreData";
import Pagination from "./Pagination";
import React from "react";


export default function Genres() {
    let pageNum = useParams();
    pageNum = pageNum.pageNum
    // TODO: Is there a cleaner way to implement this?
    let sliceLowerRange = 0
    let sliceUpperRange = 4

    if (pageNum) {
        sliceUpperRange = pageNum * 4
        sliceLowerRange = sliceUpperRange - 4
    }
    const genresSlice = genres.slice(sliceLowerRange, sliceUpperRange)


    // Sorting by ascendingOrder or descendingOrder
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(genres);
    });

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
        if (sortDirection === "2"){
            let popularItems = data.sort((a, b) => (b.popularity -  a.popularity));
            setData([...popularItems]);
        }
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

            {/* TODO: Change to Dropdown for better look */}
            <select style={{ marginTop: "0.5rem" }} defaultValue={-1} onChange={onSelectionChange}>
                <option value={-1} disabled>Select Soting Option</option>
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

            <Pagination pageNum={pageNum} arrayLength={genres.length} />

        </>
    )
}