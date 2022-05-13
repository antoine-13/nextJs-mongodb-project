// pages/api/movies.js
import clientPromise from "../../../lib/mongodb";

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
    const movieYear = req.query.year


}
