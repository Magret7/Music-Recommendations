import { useParams, Outlet, Link } from "react-router-dom";
import artists from "../assets/js/artistsData";
import Pagination from "./Pagination";


export default function Artists() {
    let pageNum = useParams();
    pageNum = pageNum.pageNum
    console.log(pageNum)

    // TODO: Is there a cleaner way to implement this?
    let sliceLowerRange = 0
    let sliceUpperRange = 4

    if (pageNum) {
        sliceUpperRange = pageNum * 4
        sliceLowerRange = sliceUpperRange - 4
    }
    const artistsSlice = artists.slice(sliceLowerRange, sliceUpperRange)

    const artistsMap = artistsSlice.map((artist) => {
        return (
            <>
                {/* <div className="row"> TODO: Why does this have a row but albums does not?*/}
                <div className="col">   {/* TODO: Why does this make it display well? */}
                    <table>
                        {/* <!-- <tr>
                                <td>
                                    <b> <a href="{{ url_for('showArtist', artist_name=artist)}}">{{ artist.name }}</a></b>
                                </td>
                            </tr> --> */}


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
                {/* </div> */}
            </>
        )
    })


    return (
        <>
            <h1 style={{ textAlign: "center" }}>My Artists</h1>
            {/* TODO: Maybe change to only even map if there's something there?  Will we always have somethign when the DB is populated? */}
            <section className="row">
                {/* <div className="row d-flex row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5"> */}
                {/* TODO: Make the CSS for rendering these work better */}
                {artists.length > 0 ? artistsMap : <p>No Artists exist</p>}
                {/* </div> */}
            </section >

            <Pagination pageNum={pageNum} arrayLength={artists.length} />
        </>
    )
}