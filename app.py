# Importing Dependencies
import pandas as pd
from flask import Flask, render_template, redirect, make_response,request, jsonify
import os
import json
import numpy as np
from exploration.table_maker import *

#################################################
# Database Setup
#################################################

conn, session = create_connection(False, './exploration/')

#################################################
######################
# Create an instance of Flask
app = Flask(__name__)
######################
# Route to render index.html
@app.route("/")
def home():

    return render_template("index.html")
#--------------------
# Route to render about.html template using csv data
@app.route("/about")
def about():

    return render_template("about.html")
#--------------------
# Route to render featured.html template using csv data
@app.route("/featured")
def finals():

    return render_template("featured.html")
#--------------------
#error handler
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
#--------------------
@app.route("/API")
def mainapi():
    """List all available api routes."""
    return render_template("api_home.html")
#--------------------

#--------------------
@app.route("/db_test")
def dbtest():
    results = session.query(Series.title).all()
    all_names = list(np.ravel(results))
    return jsonify(all_names)
#--------------------
# API DATA CALLS START HERE!!!!!!
#--------------------
@app.route("/plotdata/all_plots/<series_tconsts>")
def all_plots(series_tconsts):

    # Should be a list of comma separated IMDB id's
    # E.g: '2861424,101178' for Rick and Morty and Ren & Stimpy 
    selected_tconsts = [eval(x) for x in series_tconsts.split(',')]

    data_blob = []
    for tconst in selected_tconsts:
        # Query the episode table
        episode = session.query(Episode)\
            .filter(Episode.parent_tconst == tconst)\
            .all()
        
        # Unpack the data
        dates = [e.original_air_date for e in episode]
        avg_ratings = [e.avg_rating for e in episode]
        titles = [e.title for e in episode]
        plots = [e.plot for e in episode]

        # Query the series table    
        series = session.query(Series)\
            .filter(Series.tconst == tconst)\
            .first()

        data_blob.append({'Series': series.title,
                          'Episodes': {
                                'title': titles,
                                'plot': plots,
                                'original_air_date': dates,
                                'avg_rating': avg_ratings
                                }
                           })

    return jsonify(data_blob)
#--------------------
# Pull all Show names and ID's in data base.
#--------------------
@app.route("/API/all_show_names/")
def all_show_names():
    name_blob = []
    ids = []
    titles = []
    names = session.query(Series)

    for i in names:
        ids = i.tconst
        titles = i.title
        data = {'id': ids, 'title': titles}
        name_blob.append(data)

    return jsonify(name_blob)



###################### End #########################
if __name__ == "__main__":
    app.run(debug=True)