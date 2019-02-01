import json
import pandas as pd
import datetime as dt
from imdb import IMDb
from imdb import helpers
ia = IMDb()


rick_n_morty = '2861424'
ren_n_stimpy = '0101178'
beevis_n_butthead = '0105950'
aeon_flux = '0111873' # in case of re search copy Æon Flux
celeb_deathmatch = '0208614'
daria = '0118298'
south_park = '0121955'
fam_guy = '0182576'
american_dad = '0397306'
king_hill = '0118375'
space_ghost = '0108937'
futurama = '0149460'
aqua_thf = '0297494'
archer = '1486217'
boondocks = '0373732'
metalocalypse = '0839188'
robot_chick = '0437745'
squidbillies = '0457146'
super_jail = '1031283'
big_mouth = '6524350'
bobs_burg = '1561755'
bojack = '3398228'
mr_pickles = '2950342'
venture = '0417373'
simpsons = '0096697'
spawn = '0118475'

# Search for titles
s_result = ia.search_movie('Enter title hear')

# Establish object containing titles. 
curr_titles = ([rick_n_morty,ren_n_stimpy,beevis_n_butthead,aeon_flux,celeb_deathmatch,daria,
                south_park,fam_guy,american_dad,king_hill,space_ghost,futurama,aqua_thf,archer,
                boondocks,metalocalypse,robot_chick,squidbillies,super_jail,big_mouth,bobs_burg,
                bojack,mr_pickles,venture,simpsons,spawn])
curr_titles


for t in curr_titles:

    # Create object of all series
    series = ia.get_movie(t)

    #print out listed keys in object
    print(f"Gathering info: {t}")

    # Append Episode Data
    #ia.update(series, 'episodes')
    #print(f"Appending Episodes to {t}")

    # Sort episodes using sorted Episodes function from IMDbPY
    #episodes = helpers.sortedEpisodes(series)
    #print(f"Sorting Episodes for {t}")

    # Create Empty column list variables. 

    #'genres',
    #'number of seasons',
    #'rating',
    #'votes',
    #'title',
    #'year',
    #'seasons',
    #'synopsis',
    title = []
    year = []
    genres = []
    seasons = []
    votes = []
    rating = []
    number_of_seasons = []
    synopsis = []
    series_id = []

    # Through through episodes and capture column data. 
    print(f"Begin column info gathering for {t}")
    for i in series:
        try:
            l_title = i['title']
        except KeyError:
            l_title = None
        try:
            l_year = i['year']
        except KeyError:
            l_year = None
        try:
            l_genres = i['genres']
        except KeyError:
            l_genres = None
        try:
            l_seasons = i['seasons']
        except KeyError:
            l_seasons = None
        try:
            l_votes = i['votes']
        except KeyError:
            l_votes = None
        try:
            l_rating = i['rating']
        except KeyError:
            l_rating = None
        try:
            l_number_of_seasons = i['number of seasons']
        except KeyError:
            l_number_of_seasons = None
        try:
            l_synopsis = i['synopsis']
        except KeyError:
            l_synopsis = None
        try:
            l_series_id = i.getID()
        except KeyError:
            l_series_id = None

        # Append data to their respective lists. 
        title.append(l_title)
        year.append(l_year)
        genres.append(l_genres)
        seasons.append(l_seasons)
        votes.append(l_votes)
        rating.append(l_rating)
        number_of_seasons.append(l_number_of_seasons)
        synopsis.append(l_synopsis)
        series_id.append(l_series_id)


    print(f"Creating DataFrame for {t}")
    series_df = pd.DataFrame({'title': title,
                        'year': year,
                        'genres': genres,
                        'seasons': seasons,
                        'votes': votes,
                        'rating': rating,
                        'number_of_seasons': number_of_seasons,
                        'synopsis': synopsis,
                        'series_id': series_id
                        })
    series_df.head()
    print(f"Save csv for {t}")
    episode_df.to_csv("ser_data/" + t + ".csv")




