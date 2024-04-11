import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";

export default function Genres() {
    const [genreData, setGenresData] = useState([]);

    useEffect(() => {
        fetch("/genre/json/")
            .then((res) => res.json())
            .then((data) => setGenresData(data.Genres));
    }, []);

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum;
    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const genreSlice = genreData.slice(sliceLowerRange, sliceUpperRange);

    const genreMap = genreSlice.map((genre) => {
        return (
            <div className="col">
                {" "}
                {/* <!-- TODO: Why does this make it display well? --> */}
                <table>
                    <tr>
                        <th>
                            <h3>{genre.name.charAt(0).toUpperCase() +
                                genre.name.slice(1)}</h3>
                        </th>
                    </tr>

                    <tr>
                        <td>
                            <b>Information: </b> {genre.info}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Artists</b>
                            <br/>
                            {JSON.parse(genre.artists).map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Albums</b>
                            <br/>

                            {JSON.parse(genre.albums).map(album => <Link to={`/album/${album}`} style={{ marginRight: 10 }}>{album}</Link>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Related Tracks</b>
                            <br />
                            {JSON.parse(genre.tracks).map(track => (<>{track} <br /></>))}
                        </td>
                    </tr>
                </table>
            </div>
        );
    });

    return (
        // TODO: Improve CSS styling here
        <>
            <section className="row">
                {genreMap ? genreMap : <p>Loading...</p>}
            </section>
            <Pagination pageNum={pageNum} arrayLength={genreData.length} />
        </>
    );
}
