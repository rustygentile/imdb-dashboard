import json
import pandas as pd
import datetime as dt
from imdb import IMDb # pip install IMDbPY
from imdb import helpers
from dateutil import parser #pip install python-dateutil
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
import os
import sys
    
ia = IMDb()



# Show Listing
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
# Un-Comment below line for Jupyter note book testing of curr_titles list. 
#print(curr_titles)

# s_title variable is used for alternate csv naming convention. 
s_title = 0
total_ep_id = []
total_ser_id = []
total_plot = []
total_date = []
for t in curr_titles:

    # Create object of all series
    series = ia.get_movie(t)

    #print out listed keys in object
    print(f"Gathering info: {t}")

    # Append Episode Data
    ia.update(series, 'episodes')
    print(f"Appending Episodes to {t}")

    # Sort episodes using sorted Episodes function from IMDbPY
    episodes = helpers.sortedEpisodes(series)
    print(f"Sorting Episodes for {t}")
    print(f">>>>>>>>>>> {episodes[1]['series title']}<<<<<<<<<<<<")
    
    # Create Empty column list variables. 
    title = []
    episode_of = []
    season = []
    episode = []
    rating = []
    votes = []
    original_air_date = []
    year = []
    plot = []
    series_title = []
    episode_title = []
    episode_id = []

    # Parse through episodes and capture column data. 
    print(f"Begin column info gathering for {t}")
    for i in episodes:
        try:
            l_title = i['title']
        except KeyError:
            l_title = None
        # tt addition to this field is created a joining commonality wity Axander's data. 
        try:
            l_episode_of = 'tt' + i['episode of'].getID ()
        except KeyError:
            l_episode_of = None
        try:
            l_season = i['season']
        except KeyError:
            l_season = None 
        try:
            l_episode = i['episode']
        except KeyError:
            l_episode = None       
        try:
            l_rating = i['rating']
        except KeyError:
            l_rating= None 
        try:
            l_votes = i['votes']
        except KeyError:
            l_votes= None
        try:
            if len(i['original air date']) < 5:
                l_original_air_date = None
            else:
                l_original_air_date = parser.parse(i['original air date'])
        except KeyError:
            l_original_air_date = None 
        try:
            l_year = i['year']
        except KeyError:
            l_year= None
        try:
            l_plot = i['plot']
        except KeyError:
            l_plot= None
        try:
            l_series_title = i['series title'].split("(",1)[0].strip(' ') 
        except KeyError:
            l_series_title= None
        try:
            l_episode_title = i['episode title']
        except KeyError:
            l_episode_title = None
        # tt addition to this field is created a joining commonality wity Axander's data. 
        try:
            l_episode_id = 'tt' + i.getID()
        except KeyError:
            l_episode_id = None

        # Append data to their respective lists. 
        title.append(l_title)
        episode_of.append(l_episode_of)
        season.append(l_season)
        episode.append(l_episode)
        rating.append(l_rating)
        votes.append(l_votes)
        original_air_date.append(l_original_air_date)
        year.append(l_year)
        plot.append(l_plot)
        series_title.append(l_series_title)
        episode_title.append(l_episode_title)
        episode_id.append(l_episode_id)

        total_ep_id.append(l_episode_id)
        total_ser_id.append(l_episode_of)
        total_plot.append(l_plot)
        total_date.append(l_original_air_date)

    # Create Data frame and apply lists to columns. 
    print(f"Creating DataFrame for {t}")
    episode_df = pd.DataFrame({'title': title,
                            'series_id': episode_of,
                            'episode_id': episode_id,
                            'season': season,
                            'episode': episode,
                            'rating': rating,
                            'votes': votes,
                            'original_air_date': original_air_date,
                            'year': year,
                            'plot': plot,
                            'series_title': series_title,
                            'episode_title': episode_title
                        })
    # User below for Jupyter Notebook DataFrame Testing view of table. 
    # episode_df.head()
    print(f"Save csv for {t}")
    print(f"Total episodes: {len(episode_of)}")
    # Un-Comment below line and s_title concat line to change csv file name saves to series title. 
    #episode_df.to_csv("ep_data/" + episodes[s_title]['title'] + ".csv")
    episode_df.to_csv("ep_data/" + episode_of[-1] + ".csv")
    #s_title = s_title + 1 
    print("----------------------------------------------------------------------------")

total_df = pd.DataFrame({'series_id': total_ser_id,
                        'episode_id': total_ep_id,
                        'plot': total_plot,
                        'original_air_date': total_date
})
total_df.to_csv("ep_data/axander_append.csv")

""" series = []
for t in curr_titles:
    fetch = ia.get_movie(t)
    series.append(fetch)

series_id = []
title = []
seasons = []
avg_rating = []
num_votes = []

for i in series:
    try:
        l_series_id = i.getID()
    except KeyError:
        l_series = None
    try:
        l_title = i['title']
    except KeyError:
        l_title = None
    try:
        l_seasons = i['seasons']
    except KeyError:
        l_seasons = None
    try:
        l_avg_rating = i['rating']
    except KeyError:
        l_avg_rating = None
    try:
        l_votes = i['votes']
    except KeyError:
        l_votes = None
    
    series_id.append(l_series_id)
    title.append(l_title)
    seasons.append(l_seasons)
    avg_rating.append(l_avg_rating)
    num_votes.append(l_votes)
    
episode_df = pd.DataFrame({
    'series_id': series_id,
    'title': title,
    'seasons': seasons,
    'avg_rating': avg_rating,
    'votes': num_votes
})
episode_df.to_csv("ep_data/series.csv") """



