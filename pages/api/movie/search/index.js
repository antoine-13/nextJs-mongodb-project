// pages/api/movies.js
import clientPromise from "../../../../lib/mongodb";

/**
* @swagger
* /api/movie/search:
*   get:
*       description: search a movie
*       responses:
*           201:
*               description: movie found
*/

// TODO: code search fonction 
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movieTitle = req.body.title; 
    const movieGenres = req.body.genre;
    const movieYear = parseInt(req.body.year);

    
    const searchMoviesTitle = await db.collection("movies").aggregate(
        [
            {
              '$search': {
                'index': 'movies',
                'text': {
                  'query': movieTitle,
                  'path': "title"
                }, 
              }
            }
        ]
    ).toArray();

    const searchMoviesYear = await db.collection("movies").aggregate(
        [
            {
                '$match': {
                    year: movieYear,
                }
            }
        ]
    ).toArray();

    const searchMoviesGenre = await db.collection("movies").find(
        
            {
                genres: {
                    $contains: {movieGenres},
                }
            }
        
    ).toArray();

    if(true){
        res.json({ status: 200, data: searchMoviesGenre });
    }
    else if(id == null){
        res.json({status: 500, data: "Need to specify an id"})
    }
    else{
        res.json({status: 404, data: "Not found"})
    }
}
