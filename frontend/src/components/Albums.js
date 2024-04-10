import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import Pagination from "./Pagination";
import { calculateSliceRange } from "../assets/js/helpers";

export default function Albums() {

    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        fetch("/album/json/")
            .then((res) => res.json())
            .then((data) => setAlbumData(data.Albums));
    }, []);

    // Retrieve slice of data returned from API
    let pageNum = useParams().pageNum
    let [sliceLowerRange, sliceUpperRange] = calculateSliceRange(pageNum);
    const albumsSlice = albumData.slice(sliceLowerRange, sliceUpperRange)

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
                                {eval(album.artist).map(artist => <Link to={`/artist/${artist}`}>{artist}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td><b>Released: </b> {JSON.parse(album.info).release_date}</td>
                        </tr>

                        <tr>
                            <td>
                                <b>Album Tracks:</b><br />
                                {eval(album.tracks).map(track => (<>{track} <br /></>))}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Genres of Albums: </b>
                                {eval(album.genres).map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre}</Link>)}
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
            <section className="row">
                {/* <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5"> */}
                {/* TODO: Make the CSS for rendering these work better */}
                {albumsMap ? albumsMap : <p>Loading...</p>}
                {/* </div> */}
            </section>

            <Pagination pageNum={pageNum} arrayLength={albumData.length} />
        </>
    )
}