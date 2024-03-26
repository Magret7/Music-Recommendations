import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Artists

#* Set up spotipy variables, tokens, etc.
cid = 'c6f26740cc0b4cfe9c1217330e528549'
secret = '1a822f3c7e084c85b5b6e2b933d46531'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

#TODO: artist_id (string) --> {artist_name (string), artist_image (array of object), artist_popularity (integer), artist_genres (array of strings), 
#TODO: -- other GET requests -- artist_tracks, artist_albums, related_artists}
#TODO: Need 100 
#* Steps:
#1. search for 100 random artists, save artist ID
#2. use artist ID's url, loop and collect: name, image, pop, genres 
#3. use artist tracks url, get tracks
#4. use artist albums url, get all albums
#5. use related artists url, get related artists
#6. get album ids?
#7. store info in models db
#! note, using spotipy library, dont have to use urls, can use spotipy functions

album_ids = []
def create_artist():
    for i in range(0,10000, 50):
        artist_results  = sp.search(q = 'year:1700-2024', type='artist', limit = 50, offset = i) ##needs to change q for getting 100 random artists WIP!!
        for i,t in enumerate(artist_results['artists']['items']):
            id=(t['id'])
            name=(t['name'])
            image=(t['images'])
            popularity = (t['popularity'])
            genres=(t['genres'])
            tracks=(sp.artist_top_tracks(id))
            albums=(sp.artist_albums(id))
            related_artists=(sp.artist_related_artist(id))
            for j in enumerate(albums['items']):
                album_ids.append(j['id'])
            albums_id = album_ids

            newArtist = Artists(id = id, name = name, image = image, popularity = popularity, tracks = tracks, albums = albums, genres = genres, related_artists = related_artists, albums_id = albums_id)
            db.session.add(newArtist)
            db.session.commit

    for i in range(10000,20000, 50):
        artist_results  = sp.search(q = 'year:1700-2024', type='artist', limit = 50, offset = i) ##needs to change q for getting 100 random artists WIP!!
        for i,t in enumerate(artist_results['artists']['items']):
            id=(t['id'])
            name=(t['name'])
            image=(t['images'])
            popularity = (t['popularity'])
            genres=(t['genres'])
            tracks=(sp.artist_top_tracks(id))
            albums=(sp.artist_albums(id))
            related_artists=(sp.artist_related_artist(id))
            for j in enumerate(albums['items']):
                album_ids.append(j['id'])
            albums_id = album_ids

            newArtist = Artists(id = id, name = name, image = image, popularity = popularity, tracks = tracks, albums = albums, genres = genres, related_artists = related_artists, albums_id = albums_id)
            db.session.add(newArtist)
            db.session.commit

# db.drop_all()
# db.create_all()

# create_artist()




