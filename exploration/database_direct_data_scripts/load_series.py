from imdb import IMDb
import sys
from table_maker import *
# Run this script with a value of true and the list of must_haves to provide
# the data input for shows that you would like to capture. True creates all 3 tables
# using table_maker.py. False appends the data to its corresponding table. 
# Example console syntax: python load_series.py must_haves.txt True
#                         python load_series.py must_haves.txt False
# Repeat the process for load_episodes and load_pics.

# This script will append the series informaiton 
# directly to the series table in the database.

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
 