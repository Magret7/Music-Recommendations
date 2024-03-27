import os
import sys
import unittest
from models import db, Albums, Artists, Genres

# -----------
# DBTestCases
# -----------




class DBTestCases(unittest.TestCase):
    #ARTISTS
    """
    
    """
    def test_artists_insert_1(self):
        s = Artists(id='123', 
                    name="John Doe", 
                    image="https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4", 
                    popularity= 80, 
                    tracks=["Blank Space"], 
                    albums=["Lover"], 
                    genres = ["pop"],
                    related_artists= ["Jane Doe"], 
                    albums_id=["2Xoteh7uEpea4TohMxjtaq"])
        
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(id = '123').one()
        self.assertEqual(str(r.id), '123')

        db.session.query(Artists).filter_by(id = '123').delete()
        db.session.commit()

    def test_artists_insert_2(self):
        s = Artists(id='4876', 
                    name="Janet Booker", 
                    image="https://i.scdn.co/image/ab67616100e5eb859296c8649e0e4", 
                    popularity= 70, 
                    tracks=["Song 3", "Song 4"], 
                    albums=["Album 1", "Album 2"], 
                    genres = ["pop", "rock"],
                    related_artists= ["John Doe"], 
                    albums_id=["123", "456"])
    
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Artists).filter_by(id = '4876').one()
        self.assertEqual(str(r.id), '4876')

        db.session.query(Artists).filter_by(id = '4876').delete()
        db.session.commit()

    # Inserts an artist into the database and verifies the insertion
    def test_artists_insert_3(self):
        s = Artists(id='456', 
                    name="Jane Smith", 
                    image="https://i.scdn.co/image/ab67616100e5eb859e4c14fa59296c8649e0e4", 
                    popularity= 70, 
                    tracks=["Song 1", "Song 2"], 
                    albums=["Album 1", "Album 2"], 
                    genres = ["pop", "rock"],
                    related_artists= ["John Doe"], 
                    albums_id=["123", "456"])
    
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Artists).filter_by(id = '456').one()
        self.assertEqual(str(r.id), '456')

        db.session.query(Artists).filter_by(id = '456').delete()
        db.session.commit()



    #GENRES
    """
        
    """
    def test_genres_insert_1(self):
        s = Genres(name="John-Re",
                   artists = ["George of the Jungle", "Jack in the beanstalk", "Holly Jolly Santa", "Margaret Thatcher", "Ryan Reynolds"],
                   artist_ids = ["145"],
                   albums = ["Journey To Eden"],
                   album_ids = ["394832"],
                   tracks = ["P.Y.T. (Pretty Young Thing)"])

        db.session.add(s)
        db.session.commit()

        r = db.session.query(Genres).filter_by(name = 'John-Re').one()
        self.assertEqual(str(r.name), 'John-Re')

        db.session.query(Genres).filter_by(name = 'John-Re').delete()
        db.session.commit()

    def test_genres_insert_2(self):
        s = Genres(name="Chopin",
                   artists = ["Frederick", "Artist 2"],
                   artist_ids = ["789", "012"],
                   albums = ["Album 1", "Album 2"],
                   album_ids = ["345", "678"],
                   tracks = ["Nocturne in Eb Major Op 9 No 2", "Song 2"])

        db.session.add(s)
        db.session.commit()

        r = db.session.query(Genres).filter_by(name = 'Chopin').one()
        self.assertEqual(str(r.name), 'Chopin')

        db.session.query(Genres).filter_by(name = 'Chopin').delete()
        db.session.commit()

    def test_genres_insert_3(self):
        s = Genres(name="Drake",
                   artists = ["Drake"],
                   artist_ids = ["42", "012"],
                   albums = ["Album 1", "Album 2"],
                   album_ids = ["345", "678"],
                   tracks = ["Song 1", "Song 2"])

        db.session.add(s)
        db.session.commit()

        r = db.session.query(Genres).filter_by(name = 'Drake').one()
        self.assertEqual(str(r.name), 'Drake')

        db.session.query(Genres).filter_by(name = 'Drake').delete()
        db.session.commit()


    #ALBUMS

    #INSERTION
    def test_albums_insert_1(self):
        s = Albums(id='2345', 
                   name="KID A MNESIA", 
                   artist = "Radiohead", 
                   artist_id = {"4Z8W4fKeB5YxbusRsdQVPb"}, 
                   image= "https://i.scdn.co/image/ab67616d0000b273bbaaa8bf9aedb07135d2c6d3",
                   info = {"release_date": "2021-11-05", "total_tracks": 34}, 
                   tracks= {"Everything In Its Right Place","Kid A"}, 
                   genres = {"alternative rock","art rock","melancholia","oxford indie","permanent wave","rock"})
        
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Albums).filter_by(id = '2345').one()
        self.assertEqual(str(r.id), '2345')

        db.session.query(Albums).filter_by(id = '2345').delete()
        db.session.commit()

    def test_albums_insert_2(self):
        s = Albums(id='40923', 
                   name="Reputation", 
                   artist = "Taylor Swift", 
                   artist_id = {"4Z8W4fKeB5YxbusRsdQVPb"}, 
                   image= "https://i.scdn.co/image/ab67616d0000b273bbaaa8bf9aedb07135d2c6d3",
                   info = {"release_date": "2021-11-05", "total_tracks": 34}, 
                   tracks= {"Everything In Its Right Place","Kid A"}, 
                   genres = {"alternative rock","art rock","melancholia","oxford indie","permanent wave","rock"})
        
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Albums).filter_by(id = '40923').one()
        self.assertEqual(str(r.id), '40923')

        db.session.query(Albums).filter_by(id = '40923').delete()
        db.session.commit()

    def test_albums_insert_3(self):
        s = Albums(id='232345', 
                   name="Row Row Row Your Boat", 
                   artist = "Nursery Rhymes", 
                   artist_id = {"4Z8W4fKeB5YxbusRsdQVPb"}, 
                   image= "https://i.scdn.co/image/ab67616d0000b273bbaaa8bf9aedb07135d2c6d3",
                   info = {"release_date": "2021-11-05", "total_tracks": 34}, 
                   tracks= {"Everything In Its Right Place","Kid A"}, 
                   genres = {"alternative rock","art rock","melancholia","oxford indie","permanent wave","rock"})
        
        db.session.add(s)
        db.session.commit()

        r = db.session.query(Albums).filter_by(id = '232345').one()
        self.assertEqual(str(r.id), '232345')

        db.session.query(Albums).filter_by(id = '232345').delete()
        db.session.commit()



if __name__ == '__main__':
    unittest.main()