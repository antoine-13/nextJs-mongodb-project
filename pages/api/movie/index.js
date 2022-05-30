// pages/api/movies.js
import clientPromise from "../../../lib/mongodb";

/**
* @swagger
* /api/movie/:
*   get:
*       summary: get 10 firsts movies
*       description: Returns movies
*       responses:
*           200:
*               description: request OK
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    res.json({movies});
}
