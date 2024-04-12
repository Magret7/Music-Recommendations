import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";

export default function DisplayGenre() {
    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let genreName = useParams().genreName;

    const [genre, setGenre] = useState();

    useEffect(() => {
        fetch(`/genre/${genreName}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network error');
                }
                return res.json()})
            .then((data) => {setGenre(data)})
            .catch(error => setGenre());
    }, [genreName]);
    
    return (
        <>
            {genre ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{genre.name.charAt(0).toUpperCase() +
                                        genre.name.slice(1)}</h1>
                    <div className="column-RelatedArtists">
                        <table>
                            {/* <tr>
                                <th>{genre.name}</th>
                            </tr> */}
                            {/* <tr>
                                <td><b>Information: </b>{genre.info}</td>
                            </tr> */}

                            <tr>
                                <td>
                                    <b>Related Artists</b>
                                    <br/>
                                    {JSON.parse(genre.artists).map(artist => <Link to={`/artist/${artist}`} style={{ marginRight: 10 }}>{artist}</Link>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Related Albums</b>
                                    <br/>
                                    {JSON.parse(genre.albums).map(album => <Link to={`/album/${album}`} style={{ marginRight: 10 }}>{album}</Link>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Related Songs</b>
                                    <br />
                                    {JSON.parse(genre.tracks).map(track => (<>{track} <br /></>))}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            ) : <h4 className='fw-light'>Genre "{genreName}" not found</h4>}
        </>
    )
}