# IMDB Dashboard

## Application

https://imdb-dashboard.herokuapp.com/

## Authors

* [Rusty Gentile](https://github.com/rustygentile)
* [Minal Jajoo](https://github.com/minaljajoo)
* [Scott Nubar](https://github.com/Rasbeartin)
* [Juan Carlos Medina](https://github.com/JCMedinaG)
* [Axander Wilson](https://github.com/AxanderW)

## Files and Folders

`app.py` - Flask application which will render our site

`./templates` - site to be rendered by Flask app

`./static` - contains static files i.e. CSS, Javascript, images

`./exploration` - use for data exploration, brainstorming, prototyping figures, etc.

`./database` - files related to ETL, SQL database design and setup

`./doc` - technical writeup

## Dependencies

Application:

* sqlalchemy
* mysqlclient
* flask
* gunicorn
* numpy

ETL / Database:

* pandas
* IMDdPy
* dateutil
* sqlalchemy
* mysqlclient
* MySQL 