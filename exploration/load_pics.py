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
            result = Pic()
            try:
                result.tconst = i.getID()
            except KeyError:
                result.tconst = 0
            try:
                result.title = i['title']
            except KeyError:
                result.title = ''
            try:
                result.pic_url = i['cover url']
            except KeyError:
                result.pic_url = ''
            try:
                result.synopsis = i['plot'][0]
            except KeyError:
                result.synopsis = 'No Synopsis is currently found in the IMDb Database'
                    
            print("Commit to Database!!!!!!!")
            session.add(result)
            session.commit()

    conn.close()

if __name__ == "__main__":
    args =[a for a in sys.argv]
    add_to_db(args[1], args[2])
 