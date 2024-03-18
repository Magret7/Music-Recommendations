
# import modules and libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

cwd = os.getcwd() 
print("Current working directory:", cwd)

# initializing Flask app 
app = Flask(__name__)


# Database Info
app.app_context().push()
# Change this accordingly 
USER ="postgres"
PASSWORD = ""
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="musicdb"

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = \ 
os.environ.get("DB_STRING", f'postgresql://{USER}:{USER}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)



# Artists
# ------------
class Artists(db.Model):
    """
    Artists class attrbiutes 

    id
    name
    image
    biography
    tracks
    albums
    genres
    related_artists

    """
    __tablename__ = 'artists'

    artist_id = db.Column(db.String(512), primary_key = True)
    artist_name = db.Column(db.String(512), nullable = False)
    artist_image = db.Column(db.String(512), nullable = False)
    artist_biography = db.Column(db.String(512), nullable = False)
    artist_tracks = db.Column(db.String(512), nullable = False)
    artist_albums = db.Column(db.String(512), nullable = False)
    artist_genres = db.Column(db.String(512), nullable = False)
    related_artists = db.Column(db.String(512), nullable = False)

    # ------------
    # serialize
    # ------------
    def serialize(self):
       """
       returns a dictionary
       """
       return {
          'artist_id': self.artist_id, 
          'artist_name': self.artist_name,
          'artist_image': self.artist_image, 
          'artist_biography': self.artist_biography,
          'artist_tracks': self.artist_tracks, 
          'artist_albums': self.artist_albums,  
          'artist_genres': self.artist_genres, 
          'related_artists': self.related_artists    
        }


# ------------
# Albums
# ------------
class Albums(db.Model):
    """
    Albums class attrbiutes 

    id
    artist
    artist id
    image
    name
    info
    tracks
    genres

    """
    __tablename__ = 'albums'

    album_id = db.Column(db.String(512), primary_key = True)
    album_artist = db.Column(db.String(512), nullable = False)
    album_artist_id = db.Column(db.String(512), nullable = False)
    album_image = db.Column(db.String(512), nullable = False)
    album_name = db.Column(db.String(512), nullable = False)
    album_info = db.Column(db.String(512), nullable = False)
    album_tracks = db.Column(db.String(512), nullable = False)
    album_genres = db.Column(db.String(512), nullable = False)

    # ------------
    # serialize
    # ------------
    def serialize(self):
       """
       returns a dictionary
       """
       return {
          'album_id': self.album_id, 
          'album_artist': self.album_artist,
          'album_artist_id': self.album_artist_id, 
          'album_image': self.album_image,
          'album_name': self.album_name, 
          'album_info': self.album_info,  
          'album_tracks': self.album_tracks, 
          'album_genres': self.album_genres    
        }



# ------------
# Genres
# ------------
class Genres(db.Model):
    """
    Genres class attrbiutes 

    id
    name
    info
    artist
    albums
    tracks

    """

    __tablename__ = 'genres'

    genres_id = db.Column(db.String(512), primary_key = True)
    genres_name = db.Column(db.String(512), nullable = False)
    genres_info = db.Column(db.String(512), nullable = False)
    related_artists = db.Column(db.String(512), nullable = False)
    related_albums = db.Column(db.String(512), nullable = False)
    related_tracks = db.Column(db.String(512), nullable = False)

    # ------------
    # serialize
    # ------------
    def serialize(self):
       """
       returns a dictionary
       """
       return {
          'genres_id': self.genres_id, 
          'genres_name': self.genres_name,
          'genres_info': self.genres_info, 
          'related_artists': self.related_artists,
          'related_albums': self.related_albums, 
          'related_tracks': self.related_tracks   
        } 

with app.app_context():
    db.drop_all()
    db.create_all()
