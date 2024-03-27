import { useParams } from 'react-router-dom'
import { Outlet, Link } from "react-router-dom";

export default function DisplayAlbum() {
    const albums = [{ 'name': 'Ctrl', 'image': "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25", 'artist': ['SZA'], 'info': 'Ctrl (pronounced "control") is the debut studio album by American singer SZA. It was released through Top Dawg Entertainment and RCA Records on June 9, 2017', 'tracks': ['Supermodle', 'Drew Barrymore', 'Go Gina', 'Anything', 'Pretty Little Bird', '...'], 'genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'] },
    { 'name': '2014 Forest Hills Drive', 'image': "https://i.scdn.co/image/ab67616d0000b273c6e0948bbb0681ff29cdbae8", 'artist': ['J. Cole'], 'info': '2014 Forest Hills Drive is the third studio album by American rapper J. Cole. It was released on December 9, 2014, by ByStorm Entertainment', 'tracks': ['Intro', 'January 28th', 'Wet Dreamz', '03\' Adolescence', 'A Tale od 2 Citiez', 'Fire Sqaud', '...'], 'genres': ['Hip Hop', 'Rap'] },
    { 'name': 'Sweetener', 'image': "https://i.scdn.co/image/ab67616d0000b273c3af0c2355c24ed7023cd394", 'artist': ['Ariana Grande'], 'info': 'Sweetener is the fourth studio album by American singer Ariana Grande. It was released on August 17, 2018, through Republic Records.', 'tracks': ['sweetener', 'blazed', 'successful', 'raindrops (an angel cried)', 'R.E.M', 'everytime'], 'genres': ['Pop', 'Contemporary R&B'] }
    ]

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