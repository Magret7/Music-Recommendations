import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function DisplayAlbum() {

    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let albumName = useParams().albumName;

    const [album, setAlbum] = useState();

    useEffect(() => {
        fetch(`/album/${albumName}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network error');
                }
                return res.json()})
            .then((data) => {setAlbum(data); console.log(data)})
            .catch(error => setAlbum());
    }, [albumName]);

    if(album){console.log('album is: ', album)}

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
                                        {JSON.parse(album.artist).map(artist => <Link to={`/artist/${artist}`}>{artist}</Link>)}
                                    </b>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Released: </b>{JSON.parse(album.info).release_date}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Album Tracks: </b><br />
                                    {JSON.parse(album.tracks).map(track => <>{track}<br /></>)}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Album's Genres: </b>
                                    {JSON.parse(album.genres).map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre.charAt(0).toUpperCase() +
                                            genre.slice(1)}</Link>)}
                                </td>
                            </tr>

                        </table>
                    </div>
                </>
            ) : <h4 className='fw-light'>Album "{albumName}" not found</h4>}
        </>
    )
}