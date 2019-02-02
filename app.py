# Importing Dependencies
import pandas as pd
from flask import Flask, render_template, redirect, make_response,request, jsonify
import os
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool
from sqlalchemy import create_engine, func
import numpy as np


#################################################
# Database Setup
#################################################

password = os.environ['AWS_IMDB_PW']
user = 'masterblaster'
endpoint = 'imdb-explorer.clhfspuaimbp.us-east-1.rds.amazonaws.com'
args = "ssl_ca=database/config/rds-ca-2015-us-east-1-root.pem"

rds_connection_string = f"{user}:{password}@{endpoint}/imdbtest_db2?{args}"
engine = create_engine(f'mysql://{rds_connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)
NamesBasic = Base.classes.names_basic

session = Session(engine)


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
    results = session.query(NamesBasic.primaryName).all()
    
    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))
    return jsonify(all_names)
#--------------------


###################### End #########################
if __name__ == "__main__":
    app.run(debug=True)