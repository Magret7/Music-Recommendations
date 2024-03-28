import { useParams, Outlet, Link } from "react-router-dom";
import artists from "../assets/js/artistsData";

export default function DisplayArtist() {


    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let artistParam = useParams();
    const artist = artists.find((artist) => artistParam.artistName === artist.name)

    return (
        <>
            {artist ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{artist.name}</h1>
                    <div className="column-RelatedArtists">
                        <table>
                            <tr>
                                <td><img src={artist.image} alt={artist.name} className="artistOrAlbum--img" /></td>
                            </tr>
                            <tr>
                                <td><b>Biography: </b> {artist.info}</td>
                            </tr>

                            <tr>
                                <td><b>Songs: </b> {artist.tracks.map(track => `${track}, `)}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Albums: </b>
                                    {artist.albums.map(album => <Link to={`/album/${album}`} style={{ marginRight: 10 }}>{album}</Link>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Artist's Genres: </b>
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
            ) : <p>Artist "{artistParam.artistName}" not found</p>}
        </>
    )
}