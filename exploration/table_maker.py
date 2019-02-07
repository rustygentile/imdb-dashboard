from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import Session, relationship
import os

Base = declarative_base()

# ORM of our SQL Database Tables
class Series(Base):
   __tablename__ = 'series'
   id = Column(Integer, primary_key=True)
   tconst = Column(Integer, index=True)
   title = Column(String(255))
   num_seasons = Column(Integer)
   avg_rating = Column(Float)
   num_votes = Column(Integer)
   #episode = relationship("Episode", foreign_keys=[id, tconst]) #, back_populates="series")

class Episode(Base):
  __tablename__ = 'episodes'
  id = Column(Integer, primary_key=True)
  parent_id = Column(Integer, ForeignKey('series.id'))
  parent_tconst = Column(Integer, ForeignKey('series.tconst'))
  tconst = Column(Integer)
  original_air_date = Column(DateTime)
  number_votes = Column(Integer)
  avg_rating = Column(Float)
  season = Column(Integer)
  episode = Column(Integer)
  title = Column(String(255))
  plot = Column(Text)
  series_id = relationship("Series", foreign_keys=[parent_id])
  series_tconst = relationship("Series", foreign_keys=[parent_tconst])

class Pic(Base):
  __tablename__ = 'pic'
  id = Column(Integer, primary_key=True)
  tconst = Column(Integer, ForeignKey('series.tconst'))
  title = Column(String(255))
  pic_url = Column(String(255))
  synopsis = Column(String(255))
  series_id = relationship('Series', foreign_keys=[tconst])

# CREATE DATABASE connection
def create_connection(make_tables=False, folder_helper=''):
    password = os.environ['AWS_IMDB_PW']
    user = 'masterblaster'
    endpoint = 'imdb-explorer.clhfspuaimbp.us-east-1.rds.amazonaws.com'
    args = f'ssl_ca={folder_helper}../database/config/rds-ca-2015-us-east-1-root.pem'
    print(args)
    rds_connection_string = f"{user}:{password}@{endpoint}/imdb_production?{args}"
    engine = create_engine(f'mysql://{rds_connection_string}')
    conn = engine.connect()
    if make_tables:
        Base.metadata.create_all(conn)
    
    return conn, Session(engine)