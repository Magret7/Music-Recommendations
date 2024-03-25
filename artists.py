import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util

#* Set up spotipy variables, tokens, etc.
cid = 'c6f26740cc0b4cfe9c1217330e528549'
secret = '1a822f3c7e084c85b5b6e2b933d46531'

username = 'your_account_number' #change up
scope = 'user-library-read' #check the documentation
authorization_url = 'https://accounts.spotify.com/authorize'
token_url = 'https://accounts.spotify.com/api/token'
redirect_uri ='https://localhost.com/callback/'

token = util.prompt_for_user_token(username,scope,client_id='client_id_number',client_secret='client_secret',redirect_uri='https://localhost.com/callback/')
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

auth = SpotifyClientCredentials(client_id=cid,client_secret=secret)
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)
# print(token)
# print(spotify)

#TODO: artist_id (string) --> {artist_name (string), artist_image (array of object), artist_info (href (string)), artist_genres (array of strings), 
#TODO: -- other GET requests -- artist_tracks, artist_albums, related_artists}
#TODO: Need 100 
#* Steps:
#1. search for 100 random artists, save artist ID
#2. use artist ID's url, loop and collect: name, image, info, genres 
#3. use artist tracks url, get tracks
#4. use artist albums url, get all albums
#5. use related artists url, get related artists
#6. store info in sql db
#! note, using spotipy library, dont have to use urls, can use spotipy functions

artist_id = []
artist_name = []
artist_image = []
artist_info = []
artist_genres = []
artist_tracks = []
artist_albums = []
artist_related = []
#?think about combining into dictionaries??

for i in range(0,10000, 50):
    artist_results  = sp.search(q ='year:2018', type='artist', limit = 100, offset = i) ##needs to change q for getting 100 random artists WIP!!
    for i,t in enumerate(artist_results['artists']['items']):
        artist_id.append(t['id']) #thoughts on storing id as a variable for easier access on other appends?
        artist_name.append(t['name'])
        artist_image.append(t['images'])
        artist_info.append(t['href']) #may need to look into this to get full info, this is just a link to current info, but could be ok?
        artist_genres.append(t['genres'])
        artist_tracks.append(sp.artist_top_tracks(t['id']))
        artist_albums.append(sp.artist_albums(t['id']))
        artist_related.append(sp.artist_related_artist(t['id']))




