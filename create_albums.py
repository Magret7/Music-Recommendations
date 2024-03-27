import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
from models import app, db, Albums, Artists


cid = '518bb56f9b9f489db20b12846ba33dfb'
secret = 'bd119741e86445aba2cf1306730b09a4'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)

"""
    GET INFORMATION FOR DB FOR THESE PARAMETERS:
        id
        name
        artist
        artist_id
        image
        info
        tracks
        genres
"""

#query list of artist ids from the database and store in variable
def query_artist_ids():
    artist_names = Artists.query.with_entities(Artists.name).all()
    return [name[0] for name in artist_names]


"""FOR DEBUGGING ONLY
#Test function with random artist id's generated
def get_artist_ids(sp, num_artists=50):
    unique_artist_ids = set()

    while len(unique_artist_ids) < num_artists:
        # Use the browse 'categories' endpoint to find playlists, then get artists from there
        categories = sp.categories(limit=50)['categories']['items']
        for category in categories:
            playlists = sp.category_playlists(category_id=category['id'], limit=50)['playlists']['items']
            for playlist in playlists:
                try:
                    tracks = sp.playlist_tracks(playlist['id'], limit=100)['items']
                    for track in tracks:
                        # Check if track and artists exist
                        if track['track'] and track['track']['artists']:
                            artist_id = track['track']['artists'][0]['id']
                            unique_artist_ids.add(artist_id)
                            if len(unique_artist_ids) >= num_artists:
                                return list(unique_artist_ids)
                except spotipy.SpotifyException as e:
                    print(f"Error processing playlist {playlist['id']}: {e}")

    return list(unique_artist_ids)
"""


#get and add first album released by artist for every artist in [artist_names]
def create_album():
    artist_ids = query_artist_ids() 
    print(artist_ids)
    """For debugging only
    try:
        artist_ids = get_artist_ids(sp, num_artists=50) # Get unique artist IDs
    except Exception as e:
        print(f"An error occurred: {e}")
    """

    for artist_id in artist_ids:
        show_artist_albums(artist_id) #call method to show every album released by that artist
            

"""
SHOWS ARTIST ALBUMS AND ADDS TO DB
#call spotify to fetch albums by artist's id (input param) - only albums should be fetched
#LIMIT set to 1 to just get 1 album for speed and simplicity
"""
def show_artist_albums(artist_id):
    # fetch first album only - Call Spotify to fetch albums by the artist's ID, but only fetch the first one
    results = sp.artist_albums(artist_id, album_type='album', limit=1)
    if not results['items']:
        print(f"No albums found for artist with ID {artist_id}.")
        return None

    first_album = results['items'][0]  # first album from fetched results
    album_details = sp.album(first_album['id'])  # Fetch detailed album information using the album ID

    # use detailed album information and extract track name, artist name, artist id
    track_names = [track['name'] for track in album_details['tracks']['items']]  # get every track
    album_image = album_details['images'][0]['url'] if album_details['images'] else None  # get album image if exists

    album_info = {
        'release_date': album_details.get('release_date', 'Unknown release date'),
        'total_tracks': album_details.get('total_tracks', 0)
    }

    # get the album's genre
    artist_info = sp.artist(artist_id)  # genres are fetched from the artist
    genres = artist_info.get('genres', [])

    """DATABASE ADDITION: add album to db"""
    newAlbum = Albums(
        id=first_album['id'], 
        name=first_album['name'], 
        artist=[artist_info['name']],  # Artist name from artist_info
        artist_id=[artist_id],  # Single artist ID in a list
        image=album_image, 
        info=album_info, 
        tracks=track_names, 
        genres=genres
    )
    db.session.add(newAlbum)
    db.session.commit()



db.drop_all()
db.create_all()

create_album()
