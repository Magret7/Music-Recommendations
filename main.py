# main.py
from flask import Flask, render_template, request, redirect, url_for, jsonify
# from flask_paginate import Pagination, get_page_parameter
# from app.models import app, db, Artists, Albums, Tracks
app = Flask(__name__)

# Main Componets: name, Biography, Songs, Albums, Genres, & RelatedArtists
artists = [{'name': 'SZA', 'Biography': 'Solána Imani Rowe, known professionally as SZA, is an American singer-songwriter. She first gained recognition through her self-released extended plays, See.SZA.Run and S, which helped her become the first female artist to sign with Top Dawg Entertainment.', 'Songs': ['Kill Bill', 'All the Stars', 'Snooze', 'Broken Clocks'], 'Albums': ['Lana', 'SOS', 'Ctrl'], 'Genres': ['R&B', 'POP', 'Hip Hop', 'Neo Soul'], 'RelatedArtists': ['H.E.R', 'Ella Mai', 'Franck Ocean', 'Miguel', 'Jhené Aiko']}, \
		   {'name': 'J. Cole', 'Biography': 'Jermaine Lamarr Cole is an American rapper and record producer. Born on a military base in Germany and raised in Fayetteville, North Carolina, Cole initially gained attention as a rapper following the release of his debut mixtape, The Come Up, in early 2007. ', 'Songs': ['She Knows', 'Power Trip', 'No Role Modelz', 'Work Out','Under the Sun'], 'Albums': ['2014 Forest Hills dive', 'Cole World: The Sideline Story', 'Born Sinner', '4 Your Eyez Only', 'KOD', 'The Off-Season'], 'Genres': ['Hip Hop', 'Rap'], 'RelatedArtists': ['Bas', 'Cozz', 'JID', 'Joey Bassa$$', 'Kendrick Lamar', 'JAY-Z']}, \
		   {'name': 'Ariana Grande', 'Biography': 'Ariana Grande-Butera is an American singer, songwriter, and actress. Regarded as a pop culture icon, she is noted as an influential figure in popular music and as one of the most prominent vocalists of her generation, for her four-octave vocal range and signature whistle register.', 'Songs': ['7 Rings', 'Side to Side', 'thank u, next', '34+35','The Way'], 'Albums': ['Yours Truly', 'My Everything', 'Dangerous Woman', 'Sweetener', 'Thank U, Next', 'Positions', 'Eternal Sunshine'], 'Genres': ['Pop', 'Contemporary R&B'], 'RelatedArtists': ['Doja Cat', 'SZA', 'Sabrina Carpenter', 'Victoria Monét', 'Olivia Rodrigo']}]

# Main Componets: name, info, related_Artists, & related_Albums
genres = [{'name': 'R&B', 'info': 'Rhythm and blues, frequently abbreviated as R&B or R''n''B, is a genre of popular music that originated within African-American communities in the 1940s. The term was originally used by record companies to describe recordings marketed predominantly to African Americans, at a time when "rocking, jazz based music ... [with a] heavy, insistent beat" was becoming more popular', 'related_Artists': ['Usher', 'Byeoncé', 'The Weeked', 'SZA', 'Brent Faiyaz'], 'related_Albums': ['Jaguar II', 'Gemini Rights', 'SOS', 'Channel Orange', 'Confessions']}, \
          {'name': 'POP', 'info': 'Pop music is an abbreviation of the word "popular". Its a contemporary form of music that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation. Pop music is commonly found on mainstream radio stations and across a range of countries and cultures.', 'related_Artists': ['Ariana Grande', 'Lady Gaga', 'Harry Styles', 'Katy Perry', 'Miley Cyrus'], 'related_Albums': ['Thriller', 'GUTS', 'Teenage Dream', 'Barbie the Album', 'Midnights', 'Lover']}, \
          {'name': 'Hip Hop', 'info': 'Hip-hop or hip hop, also known as rap, and formerly known as disco rap, is a genre of popular music that originated in the early 1970s by African Americans and Caribbean immigrants in the Bronx, a borough of New York City. Hip-hop consist of stylized rhythmic music (usually built around drum beats) that often accompanies rapping, a rhythmic delivery of poetic speech.', 'related_Artists': ['Kanye West', 'Tyler, The Creator', 'Travi$ Scott','Drake', 'J. Cole', 'Lil Baby'], 'related_Albums': ['ASTROWORLD', 'SremmLife', 'Ho, Why Is You Here?', 'Live. Love. ASAP', 'Whack World', 'Whack World']}, \
          {'name': 'Neo Soul', 'info': 'Neo soul (sometimes called progressive soul) is a genre of popular music. Heavily based in soul music, neo soul is distinguished by a less conventional sound than its contemporary R&B counterpart, with incorporated elements ranging from funk, jazz fusion, hip hop, and African music to pop, rock, and electronic music.', 'related_Artists': ['Kali Uchis', 'UMI', 'Alicia Keys', 'Lauryn Hill', 'Erykah Badu'], 'related_Albums': ['A Seat at the Table', 'Blonde', 'Ctrl',  'Isolation']}, \
          {'name': 'Rap', 'info': 'Rap is an artistic form of vocal delivery and emotive expression that incorporates "rhyme, rhythmic speech, and [commonly] street vernacular". The components of rap include "content" (what is being said, e.g., lyrics), "flow" (rhythm, rhyme), and "delivery" (cadence, tone).', 'related_Artists': ['Eminem', 'Nicki Minaj', 'Cardi B', 'Megan Thee Stallion', 'Don Toliver', 'Lil Wayne', 'Lil Durk'], 'related_Albums': ['Live. Love. ASAP', 'A Gift and a Curse', 'For All The Dogs', 'Hood Hottest Princess']}, \
          {'name': 'Contemporary R&B', 'info': 'Contemporary R&B is a popular music genre that combines rhythm and blues with elements of pop, soul, funk, hip hop, and electronic music.', 'related_Artists': ['Michael Jackson', 'Aaliyah', 'Frank Ocean', 'Summer Walker', 'SZA', 'Rihanna'], 'related_Albums': ['Heaux Tales', 'The ArchAndroid', 'Wasteland', 'Jaguar', 'Ctrl']}]


@app.route('/artists/JSON')
def bookJSON():
	r = json.dumps(artists)
	return r


@app.route('/')
def home():
     return render_template('home.html')


@app.route('/artists/')
def showArtist():
    return render_template('showArtists.html', artists = artists )


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/<artist_name>/relatedArtists')
def relatedArtists(artist_name):
    artist = None
    for a in artists:
        if a['name'] == artist_name:
            artist = a
            break
    if artist:
         return render_template('relatedArtists.html', artist = artist)
    else:
        return "Artist not found", 404

# @app.route('/unitTests')
# def unittests():
#     return render_template('unitTests.html')


# @app.route('/api')
# def api():
#     return render_template('api.html')


if __name__ == "__main__":
    app.debug = True
    app.run()