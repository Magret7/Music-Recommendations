import { Outlet, Link } from "react-router-dom";
import ArtistCard from "./ArtistCard"
import AlbumCard from "./AlbumCard";

export default function Home() {
    const artists = [
        {
            'name': "Ariana Grande",
            'img': "https://i.scdn.co/image/ab6761610000517440b5c07ab77b6b1a9075fdc0",
            'followers': 95293158
        },
        {
            'name': 'J. Cole',
            'img': "https://i.scdn.co/image/ab67616100005174add503b411a712e277895c8a",
            'followers': 22953504
        },
        {
            'name': 'SZA',
            'img': "https://i.scdn.co/image/ab676161000051740895066d172e1f51f520bc65",
            'followers': 18560294
        },
    ]

    const albums = [
        {
            'name': "Sweetener",
            'img': "https://i.scdn.co/image/ab67616d00001e02c3af0c2355c24ed7023cd394",
            'tracks': 15,
            'artists': ["Ariana Grande", "Nicki Minaj"],
            'releaseYear': 2018
        },
        {
            'name': "2014 Forest Hills Drive",
            'img': "https://i.scdn.co/image/ab67616d00001e02c6e0948bbb0681ff29cdbae8",
            'tracks': 13,
            'artists': ["J. Cole"],
            'releaseYear': 2014
        },
        {
            'name': "Ctrl",
            'img': "https://i.scdn.co/image/ab67616d00001e024c79d5ec52a6d0302f3add25",
            'tracks': 14,
            'artists': ["SZA"],
            'releaseYear': 2017
        },
    ]

    const artistCardMap = artists.map(artist => {
        return (
            <ArtistCard
                name={artist.name}
                img={artist.img}
                followers={artist.followers}
            />
        )
    })

    const albumCardMap = albums.map(album => {
        return (
            <AlbumCard
                name={album.name}
                img={album.img}
                artists={album.artists}
                tracks={album.tracks}
                releaseYear={album.releaseYear}
            />
        )
    })


    return (
        <>
            <h1>Top Artists</h1>
            <section className="artistCards--list mb-4">
                {artistCardMap}
            </section>

            <h1>Top Albums</h1>
            <section className="artistCards--list">
                {albumCardMap}
            </section>
        </>
    )
}