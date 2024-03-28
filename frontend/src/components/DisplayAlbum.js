import { useParams } from 'react-router-dom'
import { Outlet, Link } from "react-router-dom";
import albums from "../assets/js/albumsData";

export default function DisplayAlbum() {

    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let albumParam = useParams();
    const album = albums.find((album) => albumParam.albumName === album.name)

    return (
        <>
            {album ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{album.name}</h1>
                    <div className="column-RelatedArtists">
                        <table>
                            <tr>
                                <td><img src={album.image} alt={album.name} className="artistOrAlbum--img" /></td>
                            </tr>

                            <tr>
                                <td>
                                    <b>
                                        {album.artist.map(artist => <Link to={`/artist/${artist}`}>{artist}</Link>)}
                                    </b>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Information: </b>{album.info}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Album Tracks: </b><br />
                                    {album.tracks.map(track => <>{track}<br /></>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Album's Genres: </b>
                                    {album.genres.map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre}</Link>)}
                                </td>
                            </tr>

                        </table>
                    </div>
                </>
            ) : <p>Album "{albumParam.albumName}" not found</p>}
        </>
    )
}