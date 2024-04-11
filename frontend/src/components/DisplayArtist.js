import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";

export default function DisplayArtist() {
    // TODO: Is this the right way to get the URL parameters?  Refer to React Router tutorial
    let artistName = useParams().artistName;

    const [artist, setArtist] = useState();
    // if(artist){console.log('artist here')} else{console.log('nah')}

    useEffect(() => {
        fetch(`/artist/${artistName}/`)
            .then((res) => res.json())
            .then((data) => setArtist(data));
    }, []);

    if (artist) {
        console.log(JSON.parse(artist.related_artists).artists);
    }
    console.log(artist);

    // return (
    //     <>
    //         <div className='row'>
    //             <div className='d-flex'>
    //             <img
    //                 src={artist.image}
    //                 alt={artist.name}
    //                 className="mx-5 displayArtist--img"
    //             />
    //             {/* <h1 style={{ textAlign: "center" }}>{artist.name}</h1> */}
    //             <h1 className="align-text-top displayArtist--headerText">{artist.name}</h1>
    //             </div>
    //         </div>
    //     </>
    // );

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
                                {/* <td><b>Songs: </b> {artist.tracks.map(track => `${track}, `)}</td> */}
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
                                    {/* TODO: Why doesn't this link work? */}
                                    {JSON.parse(artist.related_artists).artists.map(relatedArtist => <Link to={`/artist/${relatedArtist.name}`} style={{ marginRight: 10 }}>{relatedArtist.name}</Link>)}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            ) : (
                <p>Artist "{artistName}" not found</p>
            )}
        </>
    );
}
