import { useParams, Outlet, Link } from "react-router-dom";
import genres from "../assets/js/genreData";

export default function DisplayGenre() {
    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let genreParam = useParams();
    const genre = genres.find((genre) => genreParam.genreName === genre.name)

    return (
        <>
            {genre ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{genre.name}</h1>
                    <div className="column-RelatedArtists">
                        <table>
                            <tr>
                                <th>{genre.name}</th>
                            </tr>
                            <tr>
                                <td><b>Information: </b>{genre.info}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Related Artists: </b>
                                    {genre.artists.map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Related Albums: </b>
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
                </>
            ) : <p>Genre "{genreParam.genreName}" not found</p>}
        </>
    )
}