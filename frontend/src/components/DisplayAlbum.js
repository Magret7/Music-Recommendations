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
                    throw new Error("Network error");
                }
                return res.json();
            })
            .then((data) => {
                setAlbum(data);
                console.log(data);
            })
            .catch((error) => setAlbum());
    }, [albumName]);

    return (
        <>
            {album ? (
                <>
                    <div className="container">
                        <div className="row mb-5">
                            <img
                                src={album.image}
                                alt={album.name}
                                className="col artistOrAlbum--img"
                            />
                            <div className="col text-start">
                                <h1 className="fw-bold">{album.name}</h1>
                                <h4>
                                    Released{" "}
                                    {JSON.parse(album.info).release_date}
                                </h4><br></br>

                                <h1 className="fw-light mt-4">Artist(s)</h1>
                                {JSON.parse(album.artist).map(
                                    (artist, index) => (
                                        <h4>
                                            {index ? ", " : ""}
                                            <Link
                                                to={`/artist/${artist}`}
                                                className="nav-link link-dark"
                                            >
                                                {artist}
                                            </Link>
                                        </h4>
                                    )
                                )}
                            </div>
                        </div>

                        <h2 className="text-start">Tracks</h2>
                        <div className="row">
                            <div className="d-flex flex-column text-start">
                                {/* <div className='col-6'></div>
                                <div className='col-6'>more stuff here</div> */}
                                <div className="albumTracks">
                                    {JSON.parse(album.tracks).map(
                                        (track, index) => (
                                            <p style={{fontSize: "1.25rem"}}>
                                                {index + 1}. {track}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>

                        <div className="text-start">
                            <h2>Genres</h2>
                            {JSON.parse(album.genres).map((genre, index) => (
                                <>
                                    {index ? ", " : ""}
                                    <Link
                                        to={`/genre/${genre}`}
                                        style={{ marginRight: 0 }}
                                    >
                                        {genre.charAt(0).toUpperCase() +
                                            genre.slice(1)}
                                    </Link>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                //             <tr>
                //                 <td>
                //                     <b>Album Tracks: </b><br />
                //                     {JSON.parse(album.tracks).map(track => <>{track}<br /></>)}
                //                 </td>
                //             </tr>

                //             <tr>
                //                 <td>
                //                     <b>Album's Genres: </b>
                //                     {JSON.parse(album.genres).map(genre => <Link to={`/genre/${genre}`} style={{ marginRight: 10 }}>{genre.charAt(0).toUpperCase() +
                //                             genre.slice(1)}</Link>)}
                //                 </td>
                //             </tr>

                //         </table>
                //     </div>
                // </>
                <h4 className="fw-light">Album "{albumName}" not found</h4>
            )}
        </>
    );
}
