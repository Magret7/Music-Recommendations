import { useParams, Outlet, Link } from "react-router-dom";
import albums from "../assets/js/albumsData";

export default function Albums() {
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
    const albumsSlice = albums.slice(sliceLowerRange, sliceUpperRange)

    const albumsMap = albumsSlice.map(album => {
        return (
            <>
                <div className="column">
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
            {albums.length > 0 ? albumsMap : <p>No Albums exist</p>}
        </>
    )
}