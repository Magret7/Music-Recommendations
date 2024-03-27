import { Outlet, Link } from "react-router-dom";

export default function Artists() {
    const artists = [{ 'name': 'SZA', 'image': 'Place Image Here', 'info': 'Solána Imani Rowe, known professionally as SZA, is an American singer-songwriter. She first gained recognition through her self-released extended plays, See.SZA.Run and S, which helped her become the first female artist to sign with Top Dawg Entertainment.', 'tracks': ['Kill Bill', 'All the Stars', 'Snooze', 'Broken Clocks'], 'albums': ['Ctrl'], 'genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['H.E.R', 'Ella Mai', 'Franck Ocean', 'Miguel', 'Jhené Aiko'] },
    { 'name': 'J. Cole', 'image': 'Place Image Here', 'info': 'Jermaine Lamarr Cole is an American rapper and record producer. Born on a military base in Germany and raised in Fayetteville, North Carolina, Cole initially gained attention as a rapper following the release of his debut mixtape, The Come Up, in early 2007. ', 'tracks': ['She Knows', 'Power Trip', 'No Role Modelz', 'Work Out', 'Under the Sun'], 'albums': ['2014 Forest Hills Drive'], 'genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['Bas', 'Cozz', 'JID', 'Joey Badsa$$', 'Kendrick Lamar', 'JAY-Z'] },
    { 'name': 'Ariana Grande', 'image': 'Place Image Here', 'info': 'Ariana Grande-Butera is an American singer, songwriter, and actress. Regarded as a pop culture icon, she is noted as an influential figure in popular music and as one of the most prominent vocalists of her generation, for her four-octave vocal range and signature whistle register.', 'tracks': ['7 Rings', 'Side to Side', 'thank u, next', '34+35', 'The Way'], 'albums': ['Sweetener'], 'genres': ['Pop', 'Contemporary R&B'], 'RelatedArtists': ['Doja Cat', 'SZA', 'Sabrina Carpenter', 'Victoria Monét', 'Olivia Rodrigo'] },
    ]

    const artistsMap = artists.map((artist) => {
        return (
            <>
                {/* <div className="row"> TODO: Why does this have a row but albums does not?*/}
                <div className="column">   {/* TODO: Why does this make it display well? */}
                    <table>
                        {/* <!-- <tr>
                                <td>
                                    <b> <a href="{{ url_for('showArtist', artist_name=artist)}}">{{ artist.name }}</a></b>
                                </td>
                            </tr> --> */}

                        <tr>
                            <td>
                                <b>{artist.name}</b>
                            </td>
                        </tr>

                        <tr>
                            <td><b>Image: </b> {artist.image}</td>
                        </tr>

                        <tr>
                            <td><b>Biography: </b> {artist.info}</td>
                        </tr>

                        <tr>
                            {/* TODO: Remove trailing comma */}
                            <td><b>Songs: </b>{artist.tracks.map(track => `${track}, `)}</td>
                        </tr>

                        <tr>
                            <td>
                                <b>Albums: </b>
                                {artist.albums.map(album => <Link to={`/album/${album}`}>{album}</Link>)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Genres: </b>
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
                {/* </div> */}
            </>
        )
    })


    return (
        <>
            <h1 style={{ textAlign: "center" }}>My Artists</h1>
            {/* TODO: Maybe change to only even map if there's something there?  Will we always have somethign when the DB is populated? */}
            {artists.length > 0 ? artistsMap : <p>No Artists exist</p>}
        </>
    )
}