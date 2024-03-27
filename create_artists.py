import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import json
from models import app, db, Artists

#* Set up spotipy variables, tokens, etc.
cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
auth_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

# auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
# token = auth.get_access_token()
# spotify = spotipy.Spotify(auth=token)

#TODO: artist_id (string) --> {artist_name (string), artist_image (array of object), artist_popularity (integer), artist_genres (array of strings), 
#TODO: -- other GET requests -- artist_tracks, artist_albums, related_artists}
#TODO: Need 100 
#* Steps:
#1. search for 100 random artists, save artist ID
#2. use artist ID's url, loop and collect: name, image, pop, genres 
#3. use artist tracks url, get tracks
#4. use artist albums url, get all albums
#5. use related artists url, get related artists
#6. get album ids by looping through retrieved album items and pulling ids
#7. store info in models.py db file
#! note, using spotipy library, dont have to use urls, can use spotipy functions

def create_artist():
    for offset in range(0, 50, 50):
        artist_results = sp.search(q='year:2020', type='artist', limit=50, offset=offset)['artists']['items']
        print("Number of artists processed (Batch 1):", len(artist_results))
        print("Sample artist data (Batch 1):", artist_results[0])
        
        album_ids = []  # Separate list for album IDs
        
        for artist in artist_results:
            id = artist['id']
            name = artist['name']
            image = artist['images']
            popularity = artist['popularity']
            genres = artist['genres']
            track_search = sp.search(q='artist:' + name, type='track', limit=10)['tracks']['items']
            tracks = [track['name'] for track in track_search]
            album_search = sp.search(q='artist:' + name, type='album')['albums']['items']
            albums = [album['name'] for album in album_search]
            album_ids = [album['id'] for album in album_search]
            related_artists = sp.artist_related_artists(artist['id'])
            print(related_artists)
            new_artist = Artists(id=id, name=name, image=image, popularity=popularity, genres=genres,
                                 tracks=tracks, albums=albums, related_artists=related_artists, albums_id=album_ids)
            db.session.add(new_artist)
        
        db.session.commit()
        print("Batch 1 of artists added")

    # for offset in range(50, 100, 50):
    #     artist_results = sp.search(q='year:2020', type='artist', limit=50, offset=offset)['artists']['items']
    #     print("Number of artists processed (Batch 2):", len(artist_results))
    #     print("Sample artist data (Batch 2):", artist_results[0])
        
    #     album_ids = []  # Separate list for album IDs
        
    #     for artist in artist_results:
    #         id = artist['id']
    #         name = artist['name']
    #         image = artist['images']
    #         popularity = artist['popularity']
    #         genres = artist['genres']
    #         tracks = sp.artist_top_tracks(id)
    #         albums = sp.artist_albums(id)
    #         related_artists = sp.artist_related_artists(id)
            
    #         for album in albums['items']:
    #             album_ids.append(album['id'])

    #         new_artist = Artists(id=id, name=name, image=image, popularity=popularity, genres=genres,
    #                              tracks=tracks, albums=albums, related_artists=related_artists, albums_id=album_ids)
    #         db.session.add(new_artist)
        
    #     db.session.commit()
    #     print("Batch 2 of artists added")

db.drop_all()
db.create_all()

create_artist()
