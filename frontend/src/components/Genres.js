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

    if (genreSlice[0]) {
        console.log(genreSlice[0].albums);
    }
    // if(genreSlice[0]){console.log((JSON.parse(genreSlice[0].artists.replace("{", "[").replace("}", "]"))))}
    // if(genreSlice[0]){newSlice = (JSON.parse(genreSlice[0].artists.replace("{", "[").replace("}", "]")))}
    // if(genreSlice[0]){console.log(typeof(JSON.parse(genreSlice[0].artists.replace("{", "[").replace("}", "]"))))}

    // console.log(newSlice)
    // for (let i = 0; i < newSlice.length; i++) {
    //     console.log(newSlice[i])
    // }

    const genreMap = genreSlice.map((genre) => {
        return (
            <div className="col">
                {" "}
                {/* <!-- TODO: Why does this make it display well? --> */}
                <table>
                    <tr>
                        {/* TODO: Can this be broken out of the .map() to make this cleaner? */}
                        <th>
                            {genre.name.charAt(0).toUpperCase() +
                                genre.name.slice(1)}
                        </th>
                    </tr>

                    <tr>
                        <td>
                            <b>Information: </b> {genre.info}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Artists: </b>
                            {/* {JSON.parse(genre.artists.replace("{", "[").replace("}", "]")).map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)} */}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Albums: </b>
                            {/* {JSON.parse(genre.albums).map(album => <Link to={`/album/${album}`} style={{ marginRight: 10 }}>{album}</Link>)} */}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Related Songs: </b>
                            <br />
                            {/* {JSON.parse(genre.artists.replace("{", "[").replace("}", "]")).map(track => (<>{track} <br /></>))} */}
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
