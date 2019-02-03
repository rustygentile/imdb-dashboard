USE imdbtest_db3;

ALTER TABLE imdbtest_db3.titles_basic MODIFY COLUMN originalAirDate datetime;

            
SELECT * FROM titles_basic
WHERE tconst = 'tt0177842';
            
            
            
            
/* Total Votes, Avg ratings and avg votes per season */ 
SELECT 		tr.id as rating_id,
			tr.tconst,
            tr.title_id,
            AVG(averageRating) AS Avg_Season_Rating,
            AVG(anumVotes) AS Avg_Season_Votes,
             SUM(anumVotes) AS Total_Season_Votes,
            te.seasonNumber,
            tb.primaryTitle
            
FROM titles_ranking tr

JOIN titles_episodes te ON (tr.title_id = te.title_id)
JOIN titles_basic tb ON(te.parentTconst = tb.tconst)


GROUP BY te.seasonNumber, te.parentTconst 



ORDER BY primaryTitle,seasonNumber,Avg_Season_Rating desc ;

/* Avg series rating */ 
SELECT 		tr.id as rating_id,
			tr.tconst,
            tr.title_id,
            AVG(averageRating) AS Avg_Series_Rating,
            AVG(anumVotes) AS Avg_Series_Votes,
             SUM(anumVotes) AS Total_Series_Votes,
             
            
            tb.primaryTitle as Series_Title
            
FROM titles_ranking tr

JOIN titles_episodes te ON (tr.title_id = te.title_id)
JOIN titles_basic tb ON(te.parentTconst = tb.tconst)


GROUP BY te.parentTconst 



ORDER BY  Total_Series_Votes desc, Avg_Series_Rating desc ;

            
            



            
            


