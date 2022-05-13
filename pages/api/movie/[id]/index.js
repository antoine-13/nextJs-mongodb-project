// pages/api/movie/[id].js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
* @swagger
* /api/movie/[id]:
*   get:
*     summary: Get a movie by id
*     parameters:
*       - in: [id]
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the movie to get
*     responses:
*         200:
*             description: all the informations of the movie
*         404:
*             description: Not Found
*/
export default async function handler(req, res) {
    const { id } = req.query
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db.collection("movies").find({_id: ObjectId(id) }).toArray();

    if(movie){
        res.json({ status: 200, data: movie });
    }
    else if(id == null){
        res.json({status: 500, data: "Need to specify an id"})
    }
    else{
        res.json({status: 404, data: "Not found"})
    }
    


}