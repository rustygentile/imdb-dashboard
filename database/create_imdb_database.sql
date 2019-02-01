DROP DATABASE IF EXISTS imdbtest_db2;

CREATE DATABASE imdbtest_db2;

USE imdbtest_db2;

DROP TABLE IF EXISTS names_basic;
CREATE TABLE names_basic(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
nconst  VARCHAR(50) NOT NULL,
primaryName VARCHAR(255),
birthYear date,
deathYear date,
primaryProfession VARCHAR(50),
knownForTitles VARCHAR(255)
);

SELECT * FROM names_basic;

DROP TABLE IF EXISTS titles_basic;
CREATE TABLE titles_basic(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
tconst VARCHAR(50) NOT NULL,

titleType VARCHAR(50),
primaryTitle VARCHAR(255),
originalTitle VARCHAR(255),
isAdult boolean,
originalAirDate date,
startYear date,
endYear date,
runtimeMinutes int,
genres VARCHAR(255),
plot VARCHAR(255)
);




DROP TABLE IF EXISTS titles_principals;
CREATE TABLE titles_principals(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title_id INT NOT NULL,
name_id INT NOT NULL,

INDEX(name_id),
FOREIGN KEY(name_id)
REFERENCES names_basic(id)
ON UPDATE CASCADE ON DELETE RESTRICT,

INDEX(title_id),
FOREIGN KEY(title_id)
REFERENCES titles_basic(id)
ON UPDATE CASCADE ON DELETE RESTRICT,

tconst VARCHAR(50) NOT NULL,
ordering INT,
nconst  VARCHAR(50) NOT NULL,
category VARCHAR(50),
job VARCHAR(50),
characters VARCHAR(255)
);


DROP TABLE IF EXISTS titles_crew;
CREATE TABLE titles_crew(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
nconst  VARCHAR(50) NOT NULL,
name_id INT NOT NULL,

INDEX(name_id),
FOREIGN KEY(name_id)
REFERENCES names_basic(id)
ON UPDATE CASCADE ON DELETE RESTRICT,
directors VARCHAR(255),
writers VARCHAR(255)
);




DROP TABLE IF EXISTS titles_episodes;
CREATE TABLE titles_episodes(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
tconst VARCHAR(50) NOT NULL,
title_id INT NOT NULL,

INDEX(title_id),
FOREIGN KEY(title_id)
REFERENCES titles_basic(id)
ON UPDATE CASCADE ON DELETE RESTRICT,

parentTconst VARCHAR(50) NOT NULL,
seasonNumber INT,
episodeNumber INT

);


DROP TABLE IF EXISTS titles_akas;
CREATE TABLE titles_akas(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
titleId VARCHAR(50) NOT NULL,
title_id INT NOT NULL,

INDEX(title_id),
FOREIGN KEY(title_id)
REFERENCES titles_basic(id)
ON UPDATE CASCADE ON DELETE RESTRICT,

ordering  INT,
title  VARCHAR(255),
region VARCHAR(255),
language  VARCHAR(50),
types VARCHAR(255),
attributes VARCHAR(255),
isOriginalTitle boolean
);






