from imdb import IMDb
import sys
from table_maker import *

def add_to_db(series_list_file, create_tables):
    conn, session = create_connection(eval(create_tables))
    ia = IMDb()
    with open(series_list_file) as s:
        for ser in s:
            print(f'Loading IMDB data for: {ser}')
            i = ia.get_movie(ser)
            print(f'IMDB loaded for: {i}')
            result = Series()
            try:
                result.tconst = i.getID()
            except KeyError:
                result.tconst = 0
            try:
                result.title = i['title']
            except KeyError:
                result.title = ''
            try:
                result.num_seasons = i['seasons']
            except KeyError:
                result.num_seasons = 0
            try:
                result.avg_rating = i['rating']
            except KeyError:
                result.avg_rating = 0
            try:
                result.num_votes = i['votes']
            except KeyError:
                result.num_votes = 0
            
            print("Commit to Database!!!!!!!")
            session.add(result)
            session.commit()

    conn.close()

if __name__ == "__main__":
    args =[a for a in sys.argv]
    add_to_db(args[1], args[2])
 