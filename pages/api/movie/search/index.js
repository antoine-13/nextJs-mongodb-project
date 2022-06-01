// pages/api/movies.js
import clientPromise from "../../../../lib/mongodb";

/**
* @swagger
* /api/movie/search:
*   post:
*     summary: Search a movie
*     requestBody:
*       description: Endpoint for adding a comment from a user on a specific movie
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 description: title to search
*               year:
*                 type: string
*                 description: year to search
*               genre:
*                 type: list
*                 description: type of movie to search (split by a comma)
*           
*     responses:
*         200:
*             description: comment added to the movie
*         500:
*             description: Internal server error
*         404:
*             description: Not Found
*/


// TODO: code search fonction 
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movieTitle = req.body.title; 
    const movieGenres = req.body.genre;
    const movieYear = parseInt(req.body.year);
    var aggr = new Array;

    if(movieTitle){
        aggr.push({
            '$search': {
                'index': 'movies',
                'text': {
                  'query': movieTitle,
                  'path': "title"
                }, 
              },
            }
        )
    }

    if(movieYear){
        aggr.push({
            '$match': {
                year: movieYear,
                },
            },
        )
    }

    if(movieGenres){
        aggr.push({
            '$match':{
                genres: { $all: movieGenres.split(",") },
            },
        })
    }

    const searchMovies = await db.collection("movies").aggregate(aggr).toArray();

    if(searchMovies){
        res.json({ status: 200, data: searchMovies });
    }
    else if(id == null){
        res.json({status: 500, data: "Error"})
    }
    else{
        res.json({status: 404, data: "Not found"})
    }
}
