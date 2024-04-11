import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";

export default function DisplayArtist() {
    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let artistName = useParams().artistName;

    const [artist, setArtist] = useState();
    // if(artist){console.log('artist here')} else{console.log('nah')}

    useEffect(() => {
        fetch(`/artist/${artistName}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network error');
                }
                return res.json()})
            .then((data) => {setArtist(data); console.log(data)})
            .catch(error => setArtist());
    }, [artistName]);

    return (
        <>
            {artist ? (
                <>
                    <h1 style={{ textAlign: "center" }}>{artist.name}</h1>
                    <div className="column-RelatedArtists">
                        <table>
                            <tr>
                                <td>
                                    <img
                                        src={JSON.parse(artist.image)[0].url}
                                        alt={artist.name}
                                        className="artistOrAlbum--img"
                                    />
                                </td>
                            </tr>
                            {/* <tr>
                                <td><b>Biography: </b> {artist.info}</td>
                            </tr> */}

                            <tr>
                                <td><b>Songs</b>
                                <br />
                                {JSON.parse(artist.tracks).map((track, index) => {
                                        return (index ? ", " : "") + track;
                                    })}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Albums</b>
                                    <br />
                                    {JSON.parse(artist.albums).map((album) => (
                                        <Link
                                            to={`/album/${album}`}
                                            style={{ marginRight: 10 }}
                                        >
                                            {album}
                                        </Link>
                                    ))}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Genres</b>
                                    <br />
                                    {JSON.parse(artist.genres).map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre.charAt(0).toUpperCase() +
                                genre.slice(1)}</Link>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Recommended & Related Artists</b> <br />
                                    {JSON.parse(artist.related_artists).map(relatedArtist => <Link to={`/artist/${relatedArtist.name}`} style={{ marginRight: 10 }}>{relatedArtist.name}</Link>)}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            ) : (
                <h4 className='fw-light'>Artist "{artistName}" not found</h4>
            )}
        </>
    );
}
