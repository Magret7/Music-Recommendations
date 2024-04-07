import { Outlet, Link } from "react-router-dom";
import genres from "../assets/js/genreData";

export default function Genres() {

    fetch("/genre/json/")
    // .then(res => console.log(res))
    .then(res => res.json())
    .then(data => console.log(data))

    const genreMap = genres.map(genre => {
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
        // TODO: Improve CSS styling here
        <section className="row">
            {genreMap}
        </section>
    )
}