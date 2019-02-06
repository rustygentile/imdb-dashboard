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
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey 
import os
import sys


# set environment var
password = os.environ['AWS_IMDB_PW']

# AWS connection setup. Declare username and endpoint piece. 
user = 'masterblaster'
endpoint = 'imdb-explorer.clhfspuaimbp.us-east-1.rds.amazonaws.com'
args = "ssl_ca=../database/config/rds-ca-2015-us-east-1-root.pem"

# AWS username and password. 
rds_connection_string = f"{user}:{password}@{endpoint}/imdb_production?{args}"
engine = create_engine(f'mysql://{rds_connection_string}')


# Connection attachment. 
conn = engine.connect()
Base = declarative_base()



session = Session(engine)


# Create Series Class for SQL Database Table
class Pic(Base):
  __tablename__ = 'pic'
  id = Column(Integer, primary_key=True)
  tconst = Column(Integer)
  title = Column(String(255))
  pic_url = Column(String(255))
  synopsis = Column(String(255))

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


    print(result.pic_url)
    print(i['cover url'])
    print("Commit to Database!!!!!!!")
    session.add(result)
    session.commit()







