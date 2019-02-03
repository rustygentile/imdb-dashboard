import sys
from dateutil import parser
from imdb import IMDb
from imdb import helpers
from table_maker import *

def add_to_db(series_list_file, create_tables):
    conn, session = create_connection(eval(create_tables))
    ia = IMDb()
    with open(series_list_file) as f:
        for ser in f:
            print(f'Extracting IMDB data for: {ser}')
            s = ia.get_movie(ser)
            print(f'IMDB data loaded for {s}')

            # Make sure the series has been loaded already
            quer = session.query(Series).filter(Series.tconst == s.getID()).all()
            if len(quer) != 1:
                print(f'Series {s} not found in database. Load this before adding episodes.')
                break

            # Get the episode data through IMDBpy
            print(f'Extracting IMDB episode data for {s}')
            ia.update(s, 'episodes')
            print(f'IMDB episode data loaded for {s}')

            parent_id = quer[0].id
            parent_tconst = quer[0].tconst

            # Sort episodes using sorted Episodes function from IMDbPY
            episodes = helpers.sortedEpisodes(s)

            for e in episodes:
                print(f'Processing episode: {e}')
                result = Episode()
                result.parent_id = parent_id
                result.parent_tconst = parent_tconst
                try:
                    result.tconst = e.getID()
                except:
                    print(f'tconst not found for {e}')
                    break
                try:
                    if len(e['original air date']) < 5:
                        result.original_air_date = None
                    else:
                        result.original_air_date = parser.parse(e['original air date'])
                except KeyError:
                    result.original_air_date = None
                try:
                    result.number_votes = e['votes']
                except KeyError:
                    result.number_votes = None
                try:
                    result.avg_rating = e['rating']
                except KeyError:
                    result.avg_rating = None
                try:
                    result.season = e['season']
                except KeyError:
                    result.season = None
                try:
                    result.episode = e['episode']
                except KeyError:
                    result.episode = None
                try:
                    result.title = e['title']
                except KeyError:
                    result.title = None
                try:
                    result.plot = e['plot']
                except KeyError:
                    result.plot = None

                print("Commit to Database!!!!!!!")
                session.add(result)
                session.commit()

    conn.close()

if __name__ == "__main__":
    args =[a for a in sys.argv]
    add_to_db(args[1], args[2])
