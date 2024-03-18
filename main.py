from flask import Flask, render_template, request, redirect, url_for, jsonify
# from flask_paginate import Pagination, get_page_parameter
# from models import app, db, Artists, Albums, Genres

app = Flask(__name__)

# Main Componets: name, Biography, Songs, Albums, Genres, v RelatedArtists
artists = [{'name': 'SZA', 'Biography': 'Solána Imani Rowe, known professionally as SZA, is an American singer-songwriter. She first gained recognition through her self-released extended plays, See.SZA.Run and S, which helped her become the first female artist to sign with Top Dawg Entertainment.', 'Songs': ['Kill Bill', 'All the Stars', 'Snooze', 'Broken Clocks'], 'Albums': ['Lana', 'SOS', 'Ctrl'], 'Genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['H.E.R', 'Ella Mai', 'Franck Ocean', 'Miguel', 'Jhené Aiko']},
           {'name': 'J. Cole', 'Biography': 'Jermaine Lamarr Cole is an American rapper and record producer. Born on a military base in Germany and raised in Fayetteville, North Carolina, Cole initially gained attention as a rapper following the release of his debut mixtape, The Come Up, in early 2007. ', 'Songs': ['She Knows', 'Power Trip', 'No Role Modelz', 'Work Out', 'Under the Sun'], 'Albums': ['2014 Forest Hills dive', 'Cole World: The Sideline Story', 'Born Sinner', '4 Your Eyez Only', 'KOD', 'The Off-Season'], 'Genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['Bas', 'Cozz', 'JID', 'Joey Badsa$$', 'Kendrick Lamar', 'JAY-Z']},
           {'name': 'Ariana Grande', 'Biography': 'Ariana Grande-Butera is an American singer, songwriter, and actress. Regarded as a pop culture icon, she is noted as an influential figure in popular music and as one of the most prominent vocalists of her generation, for her four-octave vocal range and signature whistle register.', 'Songs': ['7 Rings', 'Side to Side', 'thank u, next', '34+35', 'The Way'], 'Albums': ['Yours Truly', 'My Everything', 'Dangerous Woman', 'Sweetener', 'Thank U, Next', 'Positions', 'Eternal Sunshine'], 'Genres': ['Pop', 'Contemporary R&B'], 'RelatedArtists': ['Doja Cat', 'SZA', 'Sabrina Carpenter', 'Victoria Monét', 'Olivia Rodrigo']},
          ]

# Main Componets: name, info, related_Artists, related_Albums, related_Songs
genres = [{'name': 'R&B', 'info': 'Rhythm and blues, frequently abbreviated as R&B or R''n''B, is a genre of popular music that originated within African-American communities in the 1940s. The term was originally used by record companies to describe recordings marketed predominantly to African Americans, at a time when "rocking, jazz based music ... [with a] heavy, insistent beat" was becoming more popular', 'related_Artists': ['Usher', 'Byeoncé', 'The Weeked'], 'related_Albums': ['Jaguar II', 'Gemini Rights', 'SOS'],'related_Songs': ['Pick Up Your Feelings', 'Let\'s Get Married', 'Adorn']},
          {'name': 'Pop', 'info': 'Pop music is an abbreviation of the word "popular". Its a contemporary form of music that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation. Pop music is commonly found on mainstream radio stations and across a range of countries and cultures.','related_Artists': ['Ariana Grande', 'Lady Gaga', 'Harry Styles'], 'related_Albums': ['Thriller', 'GUTS', 'Teenage Dream'], 'related_Songs': ['Water', 'Paint The Town Red', 'Feather']},
          {'name': 'Hip Hop', 'info': 'Hip-hop or hip hop, also known as rap, and formerly known as disco rap, is a genre of popular music that originated in the early 1970s by African Americans and Caribbean immigrants in the Bronx, a borough of New York City. Hip-hop consist of stylized rhythmic music (usually built around drum beats) that often accompanies rapping, a rhythmic delivery of poetic speech.', 'related_Artists': ['Kanye West', 'Tyler, The Creator', 'Travi$ Scott'], 'related_Albums': ['ASTROWORLD', 'SremmLife', 'Live. Love. ASAP'], 'related_Songs': ['HISS', 'Lovin On Me', 'Let Me Calm Down']},
          {'name': 'Neo Soul', 'info': 'Neo soul (sometimes called progressive soul) is a genre of popular music. Heavily based in soul music, neo soul is distinguished by a less conventional sound than its contemporary R&B counterpart, with incorporated elements ranging from funk, jazz fusion, hip hop, and African music to pop, rock, and electronic music.', 'related_Artists': ['Kali Uchis', 'UMI', 'Alicia Keys'], 'related_Albums': ['A Seat at the Table', 'Blonde', 'Ctrl'], 'related_Songs': ['When I\'m in Your Arms', 'Cruisin\'', 'On & On']},
          {'name': 'Rap', 'info': 'Rap is an artistic form of vocal delivery and emotive expression that incorporates "rhyme, rhythmic speech, and [commonly] street vernacular". The components of rap include "content" (what is being said, e.g., lyrics), "flow" (rhythm, rhyme), and "delivery" (cadence, tone).', 'related_Artists': ['Eminem', 'Nicki Minaj', 'Cardi B', 'Megan Thee Stallion', 'Don Toliver', 'Lil Wayne', 'Lil Durk'], 'related_Albums': ['Live. Love. ASAP', 'A Gift and a Curse', 'For All The Dogs'], 'related_Songs': ['Like What', 'Yeah Glo!', 'Never Lose Me']},
          {'name': 'Contemporary R&B', 'info': 'Contemporary R&B is a popular music genre that combines rhythm and blues with elements of pop, soul, funk, hip hop, and electronic music.', 'related_Artists': ['Michael Jackson', 'Aaliyah', 'Frank Ocean'], 'related_Albums': ['Wasteland', 'Jaguar', 'Ctrl'],'related_Songs': ['', '', '', '', '', '']}
         ]

# Main Componets: name, info, artist, tracks, genres
albums = [{'name': 'Ctrl', 'artist': 'SZA', 'info': 'Ctrl (pronounced "control") is the debut studio album by American singer SZA. It was released through Top Dawg Entertainment and RCA Records on June 9, 2017', 'Tracks': ['Supermodle', 'Drew Barrymore', 'Go Gina', 'Anything', 'Pretty Little Bird', '...'], 'Genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul']},
          {'name': '2014 Forest Hills Drive', 'artist': 'J. Cole', 'info': '2014 Forest Hills Drive is the third studio album by American rapper J. Cole. It was released on December 9, 2014, by ByStorm Entertainment', 'Tracks': ['Intro', 'January 28th','Wet Dreamz', '03\' Adolescence', 'A Tale od 2 Citiez', 'Fire Sqaud', '...'], 'Genres': ['Hip Hop', 'Rap']},
          {'name': 'Sweetener', 'artist': 'Ariana Grande', 'info': 'Sweetener is the fourth studio album by American singer Ariana Grande. It was released on August 17, 2018, through Republic Records.', 'Tracks': ['sweetener', 'blazed', 'successful', 'raindrops (an angel cried)', 'R.E.M', 'everytime'], 'Genres': ['Pop', 'Contemporary R&B']}
         ]

# Main Componets: name, info, related_Artists, related_Albums, related_Songs
relatedArtists = [{'name': 'H.E.R', 'Biography': 'H.E.R', 'Songs': [], 'Albums': [], 'Genres': ['Contemporary R&B'], 'RelatedArtists': ['SZA']},
                  {'name': '2014 Forest Hills dive', 'Biography': 'Kendrick Lamar', 'Songs': [], 'Albums': [], 'Genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['J. Cole']},
                  {'name': 'Doja Cat', 'Biography': 'Doja Cat', 'Songs': [], 'Albums': [], 'Genres': ['R&B', 'Pop', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['SZA']}
                 ]

@app.route('/artists/JSON')
def bookJSON():
    r = json.dumps(artists)
    return r


# TODO: Flesh out home screen with content once we decide what to display there
# @app.route('/')
# def home():
#     return render_template('home.html')


# @app.route('/unitTests')
# def unittests():
#     return render_template('unitTests.html')


# @app.route('/api')
# def api():
#     return render_template('api.html')


# Showing the About Page
@app.route('/about')
def about():
    return render_template('about.html')



@app.route('/')
# Showing all Artist in Database
@app.route('/artists/')
def showArtist():
    return render_template('showAllArtists.html', artists = artists)
	# artists_list = db.session.query(Artists).all()
	# return render_template('showAllArtists.html', artists_list = artists_list)


# Showing all Albums in Database
@app.route('/albums/',  methods=['GET', 'POST'])
def showAlbums():
    if albums:
        return render_template('showAllAlbums.html',albums = albums)
    	# albums_list = db.session.query(musicdb).all()
	    # return render_template('showAllAlbums.html', albums_list = albums_list)
    else:
        return "Albums not found", 404
    
# Showing all Genres in Database
@app.route('/genres/')
def showGenres():
    if genres:
        return render_template('showAllGenres.html', genres = genres)
        # genres_list = db.session.query(Genres).all()
	    # return render_template('showAllAlbums.html', genres_list = genres_list)
    else:
        return "Genres not found", 404

# Showing all Artists related on another Artists
@app.route('/<artist_name>/relatedArtists')
def relatedArtists(artist_name):
    artist = None
    for a in artists:
        if a['name'] == artist_name:
            artist = a
            break
    if artist:
        return render_template('relatedArtists.html', artist = artist, relatedArtists = relatedArtists)
    else:
        return "Artist not found", 404
    
# Showing one selected Genres
@app.route('/genre/<genre_name>/',  methods=['GET', 'POST'])
def showGenre(genre_name):
    genre = None
    for g in genres:
        if g['name'] == genre_name:
            genre = g
            break
    if genre:
        return render_template('showGenre.html', genre = genre)
    else:
        return "Genre not found", 404
    
# Showing one selected Album
@app.route('/album/<album_name>/',  methods=['GET', 'POST'])
def showAlbum(album_name):
    album = None
    for a in albums:
        if a['name'] == album_name:
            album = a
            break
    if album:
        return render_template('showAlbum.html', album = album)
    else:
        return "Genre not found", 404


if __name__ == "__main__":
    app.debug = True
    app.run()

    
# export PATH=/Library/PostgreSQL/16/bin:$PATH

