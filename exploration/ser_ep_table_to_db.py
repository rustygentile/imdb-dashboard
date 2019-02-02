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




# CREATE DATABASE connection

# set environment var
password = os.environ['AWS_IMDB_PW']

user = 'masterblaster'
endpoint = 'imdb-explorer.clhfspuaimbp.us-east-1.rds.amazonaws.com'
args = "ssl_ca=../database/config/rds-ca-2015-us-east-1-root.pem"

rds_connection_string = f"{user}:{password}@{endpoint}/imdb_lean?{args}"
engine = create_engine(f'mysql://{rds_connection_string}')

conn = engine.connect()


Base = declarative_base()



session = Session(engine)

# Create Series Class for SQL Database Table
class Series(Base):
   __tablename__ = 'series'
   id = Column(Integer, primary_key=True)
   nconst = Column(Integer)
   title = Column(String(255))
   num_seasons = Column(Integer)
   avg_rating = Column(Float)
   num_votes = Column(Integer)

# Create Episode Class for SQL Database Table

Base.metadata.create_all(conn)

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
#s_result = ia.search_movie('Enter title hear')

# Establish object containing titles. 
curr_titles = ([rick_n_morty,ren_n_stimpy,beevis_n_butthead,aeon_flux,celeb_deathmatch,daria,
                south_park,fam_guy,american_dad,king_hill,space_ghost,futurama,aqua_thf,archer,
                boondocks,metalocalypse,robot_chick,squidbillies,super_jail,big_mouth,bobs_burg,
                bojack,mr_pickles,venture,simpsons,spawn])
# Un-Comment below line for Jupyter note book testing of curr_titles list. 
#print(curr_titles)

# s_title variable is used for alternate csv naming convention. 
print("Fetch Series From IMDB")
series = []
for t in curr_titles:
    fetch = ia.get_movie(t)
    series.append(fetch)

print("Loop through and run Series Class.")
print("Write series info to instance of Class.")
for i in series:
    result = Series()
    try:
        result.nconst = i.getID()
    except KeyError:
        result.nconst = 0
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

    print(i)
    print("Commit to Database!!!!!!!")
    session.add(result)
    session.commit()





